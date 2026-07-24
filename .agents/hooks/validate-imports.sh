#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
SRC_DIR="$ROOT_DIR/src"

echo "==> [validate-imports] Checking Applications layer imports..."

if [ ! -d "$SRC_DIR/applications" ]; then
  echo "    No src/applications directory found, skipping import check."
  exit 0
fi

# Applications layer must not import concrete infrastructure classes or API controllers
VIOLATIONS=$(grep -rnE "from ['\"](\.\./\.\./infrastructure/persistence/mongoose/repositories|\.\./\.\./api)" "$SRC_DIR/applications" || true)

if [ -n "$VIOLATIONS" ]; then
  echo "❌ IMPORT VIOLATION: Applications layer imports concrete infrastructure repositories or API controllers!"
  echo "$VIOLATIONS"
  exit 1
else
  echo "✅ Applications layer imports clean."
fi
