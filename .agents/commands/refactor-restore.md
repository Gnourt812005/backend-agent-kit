---
name: refactor-restore
description: Phase 2 of legacy refactoring — read pending Refactor Notes, re-implement blanked logic inside-out into correct layers, run tests, and mark notes as done.
---

# Command: refactor-restore

## Intent
Execute Phase 2 Logic Restoration. Read pending Refactor Notes in `docs/refactor/`, locate raw code snippets, re-implement logic inside-out into proper `.agents/` layers, run tests, and mark notes as completed (`status: done`).

## Preconditions
- Pending Refactor Note in `docs/refactor/` (status: `pending` or `in-progress`)

## Steps
1. Activate [`domain-modeler`](../agents/domain-modeler.md), [`database-engineer`](../agents/database-engineer.md), and [`api-designer`](../agents/api-designer.md) agents.
2. Read target Refactor Note in `docs/refactor/`.
3. Run skill [`refactor-engine`](../skills/refactor-engine/SKILL.md) (Phase 2: Logic Restoration).
4. Run unit & E2E tests ([`run-tests.sh`](../hooks/run-tests.sh)).

## Deliverables
- Fully restored, working business logic in correct layers
- Refactor Note marked `done`
- Clean test execution & boundary validation
