#!/usr/bin/env bash
# Runs the project's lint command from [commands] lint in .agents/kit.toml.
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cmd="$(sed -n 's/^[[:space:]]*lint[[:space:]]*=[[:space:]]*"\([^"]*\)".*/\1/p' "$ROOT_DIR/.agents/kit.toml" | head -1)"
echo "==> [run-lint] Executing project lint command..."
if [ -z "$cmd" ]; then
  echo "    [commands] lint is not set in .agents/kit.toml, skipping."
  exit 0
fi
cd "$ROOT_DIR" && bash -c "$cmd"
