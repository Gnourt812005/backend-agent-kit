#!/usr/bin/env bash
# Application and API layers must not import adapters or forbidden libraries.
# Layer paths and forbidden patterns come from [layout] / [boundaries] in .agents/kit.toml.
set -uo pipefail
HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)"
status=0
echo "==> [validate-imports] Checking application layer imports..."
python3 -I "$HOOKS_DIR/boundaries.py" --layer application || status=1
echo "==> [validate-imports] Checking api layer imports..."
python3 -I "$HOOKS_DIR/boundaries.py" --layer api || status=1
exit $status
