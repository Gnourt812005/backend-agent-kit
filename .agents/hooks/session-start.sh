#!/usr/bin/env bash
# SessionStart hook (Claude Code). Prints a one-line kit status that Claude
# Code injects into context. Replaces the old init-session "warm-up" ritual:
# deterministic, ~30 tokens, and it re-runs after /clear and compaction.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
KIT="$ROOT/.agents/kit.toml"

# Read `key = "value"` from kit.toml, ignoring trailing comments.
field() {
  sed -n "s/^[[:space:]]*$1[[:space:]]*=[[:space:]]*\"\([^\"]*\)\".*/\1/p" "$KIT" | head -1
}

if [ ! -f "$KIT" ]; then
  echo "[kit] .agents/kit.toml missing. Run /init-kit before generating code."
  exit 0
fi

status="$(field status)"
if [ "$status" != "configured" ]; then
  echo "[kit] status=${status:-unknown}. Run /init-kit before generating code."
  exit 0
fi

echo "[kit] configured | project=$(field name) | stack=$(field language)/$(field framework) | source_root=$(field source_root) | invariants: .agents/CORE.md"
exit 0
