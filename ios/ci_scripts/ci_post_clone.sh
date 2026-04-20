#!/bin/zsh
set -euo pipefail

# The default execution directory of this script is ios/ci_scripts.
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Xcode Cloud shells can have a minimal PATH.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

# Ensure npm is available before installing JS dependencies.
if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found in PATH. Attempting to install Node via Homebrew..."
  if command -v brew >/dev/null 2>&1; then
    brew install node
  else
    echo "Homebrew is not available and npm is missing."
    exit 127
  fi
fi

# Install JavaScript dependencies.
npm ci

# Install CocoaPods dependencies required by the workspace/scheme.
cd ios
pod install --repo-update
