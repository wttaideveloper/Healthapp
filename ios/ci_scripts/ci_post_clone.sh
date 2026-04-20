#!/bin/zsh
set -euo pipefail

# The default execution directory of this script is ios/ci_scripts.
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Install JavaScript dependencies.
npm ci

# Install CocoaPods dependencies required by the workspace/scheme.
cd ios
pod install --repo-update
