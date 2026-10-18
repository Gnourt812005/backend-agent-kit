#!/usr/bin/env bash
# Runs the project's test command from [commands] test in .agents/kit.toml.
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cmd="$(sed -n 's/^[[:space:]]*test[[:space:]]*=[[:space:]]*"\([^"]*\)".*/\1/p' "$ROOT_DIR/.agents/kit.toml" | head -1)"
echo "==> [run-test] Executing project test command..."
if [ -z "$cmd" ]; then
  echo "    [commands] test is not set in .agents/kit.toml, skipping."
  exit 0
fi
cd "$ROOT_DIR" && bash -c "$cmd"
