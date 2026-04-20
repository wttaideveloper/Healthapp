#!/bin/zsh
set -euo pipefail

cd "$CI_PRIMARY_REPOSITORY_PATH"

# Install JavaScript dependencies
npm ci

# Install CocoaPods dependencies required by the workspace/scheme
cd ios
pod install --repo-update
