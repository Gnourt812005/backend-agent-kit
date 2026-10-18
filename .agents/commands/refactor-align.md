---
name: refactor-align
description: Phase 1 of legacy refactoring — restructure messy modules into Clean/Hexagonal layers, blank tangled logic, insert inline backlinks, and write Refactor Notes in docs/refactor/.
---

# Command: refactor-align

## Intent
Execute Phase 1 Architecture Alignment on a messy legacy module. Restructure files into Clean/Hexagonal layers, blank out tangled DB/external logic, insert inline backlinks (`// see: docs/refactor/...`), create Refactor Notes in `docs/refactor/`, and verify boundary hooks pass.

## Preconditions
- Messy legacy module path (e.g. `<source_root>/modules/campaign/`)

## Steps
1. Activate [`architect`](../agents/architect.md) and [`code-reviewer`](../agents/code-reviewer.md) agents.
2. Run skill [`refactor-engine`](../skills/refactor-engine/SKILL.md) (Phase 1: Architecture Alignment).
3. Run [`after-generate.sh`](../hooks/after-generate.sh) to verify structural boundary compliance.

## Deliverables
- Restructured code passing `.agents/hooks/after-generate.sh`
- Open Refactor Note in `docs/refactor/` with raw code snippets & inline backlinks
