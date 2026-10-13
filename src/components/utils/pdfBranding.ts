import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Shared by the native (PrintScreen.tsx) and web (PrintScreen.web.tsx) printable-form
// flows so branding behaves identically. Only imports pdf-lib, so it is unit-testable
// under `node --test`.
//
// Layout constants match the previous native implementation: logo 30x30 at the bottom
// left, contact line starting at x = 70 on the first page.

export type PdfSource = string | Uint8Array | ArrayBuffer; // string = base64

export type BrandingInput = {
  /** PNG or JPG, as base64 or raw bytes. Omit/null to skip the logo. */
  logo?: PdfSource | null;
  address?: string | null;
  phoneNumber?: string | null;
};

export type BrandingResult = {
  bytes: Uint8Array;
  /** A logo was supplied but could not be embedded (not a valid PNG/JPG). */
  logoFailed: boolean;
  /** Some contact characters can't be encoded by the built-in font and were dropped. */
  contactCharsDropped: boolean;
};

const isPng = (src: PdfSource): boolean => {
  if (typeof src === "string") return src.startsWith("iVBORw0KGgo");
  const b = src instanceof Uint8Array ? src : new Uint8Array(src);
  return b.length > 4 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
};

const isJpg = (src: PdfSource): boolean => {
  if (typeof src === "string") return src.startsWith("/9j/");
  const b = src instanceof Uint8Array ? src : new Uint8Array(src);
  return b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
};

/**
 * Strip a `data:<mime>;base64,` prefix, returning bare base64. Returns the input
 * unchanged when it has no data-URL prefix.
 */
export const stripDataUrlPrefix = (value: string): string => {
  const match = /^data:[^;,]+;base64,/i.exec(value);
  return match ? value.slice(match[0].length) : value;
};

export const brandTemplatePdf = async (
  template: PdfSource,
  branding: BrandingInput
): Promise<BrandingResult> => {
  const pdfDoc = await PDFDocument.load(template as any);
  const firstPage = pdfDoc.getPages()[0];
  if (!firstPage) {
    throw new Error("The PDF template has no pages.");
  }

  let logoFailed = false;
  if (branding.logo) {
    try {
      const logo = branding.logo;
      let image;
      if (isPng(logo)) {
        image = await pdfDoc.embedPng(logo as any);
      } else if (isJpg(logo)) {
        image = await pdfDoc.embedJpg(logo as any);
      } else {
        throw new Error("Unsupported logo format (PNG or JPG required).");
      }
      firstPage.drawImage(image, { x: 5, y: 0, width: 30, height: 30 });
    } catch (error) {
      console.warn("Failed to embed logo:", error);
      logoFailed = true;
    }
  }

  const rawLine = [branding.address, branding.phoneNumber]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join("  |  ");

  let contactCharsDropped = false;
  if (rawLine) {
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let line = "";
    for (const ch of rawLine) {
      try {
        font.widthOfTextAtSize(ch, 10);
        line += ch;
      } catch {
        contactCharsDropped = true;
      }
    }
    line = line.trim();
    if (line) {
      firstPage.drawText(line, {
        x: 70,
        y: 15,
        size: 10,
        font,
        color: rgb(0, 0, 0),
        maxWidth: 430,
        lineHeight: 12,
      });
    }
  }

  const bytes = await pdfDoc.save();
  return { bytes, logoFailed, contactCharsDropped };
};
