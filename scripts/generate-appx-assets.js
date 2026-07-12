#!/usr/bin/env node
/**
 * Generates Microsoft Store / AppX tile assets (and a multi-size Windows .ico)
 * from assets/healthAge_Icon.png so electron-builder does not fall back to
 * SampleAppx.* default Electron logos.
 *
 * Output:
 *   build/appx/*.png  – required + recommended AppX logos
 *   build/icon.ico    – Windows executable icon
 */

const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "assets", "healthAge_Icon.png");
const APPX_DIR = path.join(ROOT, "build", "appx");
const ICO_PATH = path.join(ROOT, "build", "icon.ico");
const BACKGROUND = "#FFFFFF";
const PADDING_RATIO = 0.1;

const APPX_ASSETS = [
  { name: "StoreLogo.png", width: 50, height: 50 },
  { name: "Square44x44Logo.png", width: 44, height: 44 },
  { name: "Square150x150Logo.png", width: 150, height: 150 },
  { name: "Wide310x150Logo.png", width: 310, height: 150 },
  { name: "LargeTile.png", width: 310, height: 310 },
  { name: "SmallTile.png", width: 71, height: 71 },
  { name: "SplashScreen.png", width: 620, height: 300 },
  { name: "BadgeLogo.png", width: 24, height: 24 }
];

const ICO_SIZES = [16, 24, 32, 48, 64, 128, 256];

function assertWindows() {
  if (process.platform !== "win32") {
    throw new Error(
      "generate-appx-assets requires Windows (System.Drawing). AppX packaging is Windows-only anyway."
    );
  }
}

function ensureSource() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Source icon not found: ${SOURCE}`);
  }
}

function ensureDirs() {
  fs.mkdirSync(APPX_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(ICO_PATH), { recursive: true });
}

function writePowerShellScript(tempPs1, jobs) {
  const jobsJson = JSON.stringify(jobs).replace(/'/g, "''");
  const script = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$sourcePath = '${SOURCE.replace(/'/g, "''")}'
$backgroundHex = '${BACKGROUND}'
$paddingRatio = ${PADDING_RATIO}
$jobs = '${jobsJson}' | ConvertFrom-Json

$src = [System.Drawing.Image]::FromFile($sourcePath)
try {
  $bgColor = [System.Drawing.ColorTranslator]::FromHtml($backgroundHex)

  foreach ($job in $jobs) {
    $canvasW = [int]$job.width
    $canvasH = [int]$job.height
    $bmp = New-Object System.Drawing.Bitmap $canvasW, $canvasH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    try {
      $g.Clear($bgColor)
      $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      $padX = [Math]::Floor($canvasW * $paddingRatio)
      $padY = [Math]::Floor($canvasH * $paddingRatio)
      $availW = [Math]::Max(1, $canvasW - (2 * $padX))
      $availH = [Math]::Max(1, $canvasH - (2 * $padY))
      $scale = [Math]::Min($availW / $src.Width, $availH / $src.Height)
      $drawW = [Math]::Max(1, [int][Math]::Floor($src.Width * $scale))
      $drawH = [Math]::Max(1, [int][Math]::Floor($src.Height * $scale))
      $dx = [int][Math]::Floor(($canvasW - $drawW) / 2)
      $dy = [int][Math]::Floor(($canvasH - $drawH) / 2)

      $g.DrawImage($src, $dx, $dy, $drawW, $drawH)
      $outDir = Split-Path -Parent $job.path
      if (-not (Test-Path $outDir)) {
        New-Item -ItemType Directory -Force -Path $outDir | Out-Null
      }
      $bmp.Save($job.path, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $g.Dispose()
      $bmp.Dispose()
    }
  }
} finally {
  $src.Dispose()
}
`;
  fs.writeFileSync(tempPs1, script, "utf8");
}

function runPowerShell(tempPs1) {
  execFileSync(
    "powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", tempPs1],
    { stdio: "inherit" }
  );
}

function writeIco(icoPath, images) {
  const count = images.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  const payloads = [];

  for (const image of images) {
    const png = image.png;
    entries.push({
      width: image.size >= 256 ? 0 : image.size,
      height: image.size >= 256 ? 0 : image.size,
      size: png.length,
      offset
    });
    payloads.push(png);
    offset += png.length;
  }

  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);

  let entryAt = 6;
  for (const entry of entries) {
    buf[entryAt] = entry.width;
    buf[entryAt + 1] = entry.height;
    buf[entryAt + 2] = 0;
    buf[entryAt + 3] = 0;
    buf.writeUInt16LE(1, entryAt + 4);
    buf.writeUInt16LE(32, entryAt + 6);
    buf.writeUInt32LE(entry.size, entryAt + 8);
    buf.writeUInt32LE(entry.offset, entryAt + 12);
    entryAt += 16;
  }

  let payloadAt = headerSize;
  for (const png of payloads) {
    png.copy(buf, payloadAt);
    payloadAt += png.length;
  }

  fs.writeFileSync(icoPath, buf);
}

function verifyPngDimensions(filePath, expectedW, expectedH) {
  const buf = fs.readFileSync(filePath);
  if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") {
    throw new Error(`Not a PNG: ${filePath}`);
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (width !== expectedW || height !== expectedH) {
    throw new Error(
      `Dimension mismatch for ${path.basename(filePath)}: got ${width}x${height}, expected ${expectedW}x${expectedH}`
    );
  }
}

function main() {
  assertWindows();
  ensureSource();
  ensureDirs();

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "healthage-appx-"));
  const tempPs1 = path.join(tempDir, "generate.ps1");

  try {
    const jobs = APPX_ASSETS.map((asset) => ({
      path: path.join(APPX_DIR, asset.name),
      width: asset.width,
      height: asset.height
    }));

    const icoStaging = ICO_SIZES.map((size) => ({
      path: path.join(tempDir, `ico-${size}.png`),
      width: size,
      height: size
    }));

    console.log("Generating AppX tile assets from assets/healthAge_Icon.png ...");
    writePowerShellScript(tempPs1, [...jobs, ...icoStaging]);
    runPowerShell(tempPs1);

    for (const asset of APPX_ASSETS) {
      const filePath = path.join(APPX_DIR, asset.name);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Failed to create ${filePath}`);
      }
      verifyPngDimensions(filePath, asset.width, asset.height);
      console.log(`  ✓ build/appx/${asset.name} (${asset.width}x${asset.height})`);
    }

    console.log("Generating build/icon.ico ...");
    const icoImages = ICO_SIZES.map((size) => {
      const pngPath = path.join(tempDir, `ico-${size}.png`);
      verifyPngDimensions(pngPath, size, size);
      return { size, png: fs.readFileSync(pngPath) };
    });
    writeIco(ICO_PATH, icoImages);
    console.log(`  ✓ build/icon.ico (${ICO_SIZES.join(", ")} px)`);

    console.log("\nDone. electron-builder will load build/appx/ instead of SampleAppx defaults.");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

main();
