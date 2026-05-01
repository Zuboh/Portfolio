#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-}"
if [[ -z "$TARGET" ]]; then
  echo "Usage: ./bootstrap.sh <target-directory>"
  exit 1
fi

SRC="$(cd "$(dirname "$0")" && pwd)"

echo "→ Creating $TARGET"
mkdir -p "$TARGET"

echo "→ Copying source files"
rsync -a --exclude=node_modules --exclude=.next --exclude=out --exclude=.git \
  --exclude='*.tsbuildinfo' --exclude='.DS_Store' \
  "$SRC/" "$TARGET/"

echo "→ Installing dependencies"
cd "$TARGET"
npm install

echo ""
echo "Done. Start dev server:"
echo "  cd $TARGET && npm run dev"
