#!/usr/bin/env bash
# Regenerates .claude/commands/, .claude/skills/, .claude/agents/, .claude/rules/
# and CLAUDE.md from .agents/ (core + optional stack pack + kit.toml).
# Logic lives in sync_claude_native.py; this wrapper keeps the familiar entry point.
set -euo pipefail
python3 -I "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/sync_claude_native.py" "$@"
