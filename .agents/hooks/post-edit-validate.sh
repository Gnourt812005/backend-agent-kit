#!/usr/bin/env bash
# PostToolUse hook (Claude Code), matcher Edit|Write|MultiEdit.
# Runs the fast boundary/import validators only when the edited file is inside
# the source root. On a violation it exits 2, which makes Claude Code show the
# validator output to Claude so it fixes the problem in the same turn.
# Costs zero context tokens when the edit is clean.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
HOOKS="$ROOT/.agents/hooks"
KIT="$ROOT/.agents/kit.toml"

source_root="src"
if [ -f "$KIT" ]; then
  v="$(sed -n 's/^[[:space:]]*source_root[[:space:]]*=[[:space:]]*"\([^"]*\)".*/\1/p' "$KIT" | head -1)"
  [ -n "$v" ] && source_root="$v"
fi

# Extract tool_input.file_path from the hook's stdin JSON.
payload="$(cat)"
file_path=""
if command -v jq >/dev/null 2>&1; then
  file_path="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)"
elif command -v python3 >/dev/null 2>&1; then
  file_path="$(printf '%s' "$payload" | python3 -I -c 'import json,sys
try: print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))
except Exception: pass' 2>/dev/null)"
fi

# Only validate edits inside the source root.
case "$file_path" in
  "$ROOT/$source_root/"*|"$source_root/"*) ;;
  *) exit 0 ;;
esac

out=""
failed=0
for check in validate-boundaries.sh validate-imports.sh; do
  [ -f "$HOOKS/$check" ] || continue
  if ! result="$(bash "$HOOKS/$check" 2>&1)"; then
    failed=1
    out="$out$result"$'\n'
  fi
done

if [ "$failed" -ne 0 ]; then
  printf 'Architecture check failed after editing %s:\n%s' "$file_path" "$out" >&2
  exit 2
fi
exit 0
