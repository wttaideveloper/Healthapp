#!/bin/zsh
set -euo pipefail

cd "$CI_PRIMARY_REPOSITORY_PATH"

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found, installing Node..."
  brew install node
fi

npm ci

# ── Patch 1: RCTInstance.mm ──────────────────────────────────────────────────
# isFatal receives `id _Nullable` from a dict; BOOL param needs explicit cast.
RCT_FILE="node_modules/react-native/ReactCommon/react/runtime/platform/ios/ReactCommon/RCTInstance.mm"
if [ -f "$RCT_FILE" ]; then
  perl -0777 -i -pe \
    's/isFatal:errorData\[@"isFatal"\]/isFatal:[((NSNumber *)errorData[@"isFatal"]) boolValue]/g' \
    "$RCT_FILE"
  echo "Patched RCTInstance.mm"
fi

# ── Patch 2: RNSScreen.mm ────────────────────────────────────────────────────
# isStable is BOOL; C++ struct OnSheetDetentChanged expects bool.
# macOS 26 SDK enforces C++11 narrowing strictly — add explicit cast.
RNS_FILE="node_modules/react-native-screens/ios/RNSScreen.mm"
if [ -f "$RNS_FILE" ]; then
  perl -0777 -i -pe \
    's/\.isStable = isStable/.isStable = static_cast<bool>(isStable)/g' \
    "$RNS_FILE"
  echo "Patched RNSScreen.mm"
fi

cd ios
pod install --repo-update