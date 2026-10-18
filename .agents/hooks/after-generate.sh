#!/usr/bin/env bash
set -uo pipefail

HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)"
failed=0

echo "==> [after-generate] Running boundary, import, contract, and link validations..."
bash "$HOOKS_DIR/validate-links.sh" --fix || failed=1
bash "$HOOKS_DIR/validate-boundaries.sh" || failed=1
bash "$HOOKS_DIR/validate-imports.sh" || failed=1
bash "$HOOKS_DIR/validate-contracts.sh" || failed=1

if [ "$failed" -ne 0 ]; then
  echo "==> [after-generate] One or more validations FAILED (see above)."
  exit 1
fi
echo "==> [after-generate] All validations passed."
