# Health Age macOS Direct Distribution Guide

This guide documents the configuration and Mac-side steps for separate Apple Silicon (`arm64`) and Intel (`x64`) DMG installers. It does not change the Windows installer, AppX packaging, iOS, Android, or App Store workflows. Configuration alone does not mean that an artifact has been built, signed, notarized, stapled, or tested.

## Prerequisites

- A Mac with a supported Node.js 22.12.0+ installation and npm.
- Xcode command-line tools.
- Access to the Health Age repository and its committed `package-lock.json`.
- The production value of `EXPO_PUBLIC_API_BASE_URL` supplied through the release shell or CI secret store. Do not commit it to an environment file for release use. The release guard permits only the verified production hostname `healthage.healthexporesources.com`, established from the committed EAS profiles. The API client supports either the host root or its `/api/v1` base path.
- A Developer ID Application certificate available to the Mac keychain or CI runner. Do not hardcode a certificate identity in this repository.
- Apple notarization credentials supplied securely. electron-builder 26.15.3 supports Apple API-key, Apple-ID/app-specific-password, or keychain-profile credentials; prefer the API-key approach.

## macOS icon

`build/icon.icns` was generated from the current 1024x1024 application artwork at `assets/healthAge_Icon.png`. If branding changes, regenerate the ICNS file on a Mac from approved 1024x1024 artwork:

```bash
mkdir -p /tmp/HealthAge.iconset
sips -z 16 16 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_16x16.png
sips -z 32 32 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_16x16@2x.png
sips -z 32 32 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_32x32.png
sips -z 64 64 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_32x32@2x.png
sips -z 128 128 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_128x128.png
sips -z 256 256 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_128x128@2x.png
sips -z 256 256 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_256x256.png
sips -z 512 512 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_256x256@2x.png
sips -z 512 512 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_512x512.png
sips -z 1024 1024 assets/healthAge_Icon.png --out /tmp/HealthAge.iconset/icon_512x512@2x.png
iconutil -c icns /tmp/HealthAge.iconset -o build/icon.icns
```

## Build environment

The macOS scripts reject a missing, malformed, non-HTTPS, credential-bearing, local/development, arbitrary, or lookalike API hostname before creating the Expo web export. The guard compares the normalized hostname exactly against the approved production hostname above; it does not use substring or suffix matching. Set the verified production API URL only in the release environment:

```bash
export EXPO_PUBLIC_API_BASE_URL="<production API URL>"
```

The release build uses the web Stripe flow. It does not use the Mac Catalyst billing-mode setting or change existing StoreKit/RevenueCat behavior.

## Dependency installation

Run on the Mac from `Healthapp`:

```bash
npm ci
```

## Architecture-specific DMGs

With the signing and notarization prerequisites in place, run one command per architecture:

```bash
npm run dist:mac:arm64
npm run dist:mac:x64
```

Each command validates the release API URL, creates a fresh Expo web export, and invokes electron-builder with the corresponding architecture and DMG target. Do not run them from Windows and do not claim success until the resulting DMG has been tested on matching hardware.

## Signing and notarization

`build.mac` enables hardened runtime, uses `build/entitlements.mac.plist` for the app and `build/entitlements.mac.inherit.plist` for helper processes, and enables electron-builder's built-in notarization integration. This configuration does not complete signing or notarization by itself.

Before a release, ensure the build environment contains one supported credential set for notarization and an available Developer ID Application signing certificate. Credentials, certificates, private keys, and signing identities must remain in the Keychain or CI secret store and must never be committed.

If the signing certificate or notarization credentials are unavailable, stop before release. An unsigned or unstapled public DMG is not an acceptable substitute.

## Verification on the Mac

Replace placeholders with the generated application and DMG paths:

```bash
codesign --verify --deep --strict --verbose=2 "<Health Age.app>"
spctl --assess --type execute --verbose "<Health Age.app>"
xcrun stapler validate "<Health Age.dmg>"
shasum -a 256 "<Health Age.dmg>"
```

Retain the SHA-256 checksum with the release notes. Actual signing, notarization, stapling, Gatekeeper verification, and one clean installation per architecture remain required Mac-side release steps.

## Functional release testing

On both Apple Silicon and Intel Macs:

1. Install the DMG to Applications, launch it from Finder, quit, and relaunch it.
2. Verify Gatekeeper acceptance after notarization and stapling.
3. Sign up, sign in, sign out, restore a session, and verify production API connectivity.
4. Complete a health assessment, create history, group/search reports, and verify local persistence.
5. Download report PDFs, CSVs, questionnaires, and report templates; confirm the saved file location.
6. Test report printing and Save as PDF. The web print fallback opens a new window, so test it specifically in Electron.
7. Complete Stripe Checkout, return to the application, confirm entitlement refresh, open the Billing Portal, return, and test cancellation handling.
8. Test external legal/support links, offline behavior, macOS window close/reopen behavior, and uninstall/reinstall behavior.

## Release handoff

For each architecture provide:

- DMG filename, version, architecture, and SHA-256 checksum.
- Release notes and known limitations.
- Confirmation of signing, notarization, stapling, Gatekeeper, and matching-hardware test results.

The public download page and artifact hosting are outside this phase and must be implemented in the correct website repository after it is identified.
