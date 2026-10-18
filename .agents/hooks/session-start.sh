#!/usr/bin/env bash
# SessionStart hook (Claude Code). Prints a one-line kit status that Claude
# Code injects into context. Deterministic, ~40 tokens, and it re-runs after
# /clear and compaction.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
KIT="$ROOT/.agents/kit.toml"

field() {  # first `key = "value"` in kit.toml, ignoring comments
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

pack="$(field pack)"
echo "[kit] configured | project=$(field name) | stack=$(field language)/$(field framework) | pack=${pack:-none} | layers: domain=$(field domain) application=$(field application) infrastructure=$(field infrastructure) api=$(field api) | invariants: .agents/CORE.md"
exit 0
