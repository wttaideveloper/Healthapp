# Health Age Windows Build Guide

This project builds the Windows desktop app by exporting the Expo web app and packaging it with Electron.

## Prerequisites

- Node.js 22.12.0 or newer
- npm
- Windows 10/11 build machine for final Windows packaging
- Microsoft Partner Center account for Store deployment
- Windows code-signing certificate for direct installer distribution

Install dependencies:

```bash
npm install
```

## Local Desktop Smoke Test

Use this first while developing. It opens Electron against the live Expo web dev server.

Terminal 1:

```bash
npm run web
```

Terminal 2:

PowerShell:

```powershell
$env:ELECTRON_START_URL="http://localhost:8081"; npm run electron
```

Command Prompt:

```bat
set ELECTRON_START_URL=http://localhost:8081 && npm run electron
```

If Expo starts on another port, use that URL instead.

## Preview Desktop Smoke Test

Use this before making an installer. It exports the production web bundle and opens it in Electron without installing anything:

```bash
npm run electron:preview
```

This is the best quick check for blank-screen issues.

If the app opens as a blank white window, inspect the Electron devtools console first. This project serves the exported `dist/` folder from a local `127.0.0.1` server inside Electron because Expo web export uses absolute asset URLs such as `/_expo/static/...`; loading `dist/index.html` directly with `file://` will not work correctly.

## Production Web Export

```bash
npm run build:web
```

The exported app is written to `dist/`. Electron loads `dist/index.html` in packaged builds.

## Windows Installer Build

Build an unpacked Windows app first:

```bash
npm run dist:win:dir
```

Output:

```text
release/win-unpacked/Health Age.exe
```

Run that `.exe` on Windows. If it works, create the installer.

Run this on Windows:

```bash
npm run dist:win
```

Output:

```text
release/Health Age Setup <version>.exe
```

Use this installer for direct deployment from your website, email, private sharing, or MDM.

The default command builds Windows x64. For Windows ARM64:

```bash
npm run dist:win:arm64
```

## Microsoft Store Package Build

Before building for the Store, replace the placeholders in `package.json`:

- `build.appx.identityName`
- `build.appx.publisher`
- `build.appx.publisherDisplayName`

Get these values from Microsoft Partner Center:

```text
Partner Center > Apps and games > Health Age > Product management > Product identity
```

Then run on Windows:

```bash
npm run dist:win:store
```

Output:

```text
release/*.appx
```

Upload that package in Partner Center.

The default Store command builds Windows x64. For Windows ARM64:

```bash
npm run dist:win:store:arm64
```

## Store Submission Checklist

1. Reserve the app name in Microsoft Partner Center.
2. Copy the package identity values into `package.json`.
3. Increment the app version in `package.json`.
4. Run `npm run dist:win:store` on Windows.
5. Upload the generated `.appx` package.
6. Add screenshots, description, privacy policy URL, support URL, category, and age rating.
7. Complete certification notes if the app uses login, payment, or restricted features.
8. Submit for certification.

## Direct Installer Checklist

1. Increment the app version in `package.json`.
2. Run `npm run dist:win` on Windows.
3. Code-sign the installer before public distribution.
4. Test install, launch, uninstall, and reinstall on a clean Windows machine.
5. Publish the signed `.exe`.

## Code Signing Notes

For production, configure certificate environment variables on the Windows build machine or CI:

```powershell
$env:CSC_LINK="C:\path\to\certificate.pfx"
$env:CSC_KEY_PASSWORD="certificate-password"
npm run dist:win
```

Without signing, Windows SmartScreen warnings are expected for direct installers.

## CI Recommendation

Use GitHub Actions on `windows-latest` for release builds. Build direct installer and Store packages separately so Store identity settings and signing credentials are easier to manage.
