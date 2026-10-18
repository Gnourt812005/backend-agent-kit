#!/usr/bin/env bash
# PostToolUse hook (Claude Code), matcher Edit|Write|MultiEdit.
# Checks only the file that was just edited. On a violation it exits 2, which
# makes Claude Code show the output to Claude so it fixes it in the same turn.
# Costs zero context tokens when the edit is clean.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"

payload="$(cat)"
file_path="$(printf '%s' "$payload" | python3 -I -c 'import json,sys
try: print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))
except Exception: pass' 2>/dev/null)"
[ -n "$file_path" ] || exit 0
case "$file_path" in /*) ;; *) file_path="$ROOT/$file_path" ;; esac

if ! out="$(python3 -I "$ROOT/.agents/hooks/boundaries.py" --file "$file_path" 2>&1)"; then
  printf 'Architecture check failed after editing %s:\n%s\n' "$file_path" "$out" >&2
  exit 2
fi
exit 0
