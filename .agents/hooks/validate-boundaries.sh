#!/usr/bin/env bash
# Domain layer must not import outer layers or forbidden libraries.
# Layer paths and forbidden patterns come from [layout] / [boundaries] in .agents/kit.toml.
set -uo pipefail
HOOKS_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "==> [validate-boundaries] Checking domain layer boundaries..."
python3 -I "$HOOKS_DIR/boundaries.py" --layer domain
