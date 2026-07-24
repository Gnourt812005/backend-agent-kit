# Command: refactor-restore

## Intent
Execute Phase 2 Logic Restoration. Read pending Refactor Notes in `docs/refactor/`, locate raw code snippets, re-implement logic inside-out into proper `.agents/` layers, run tests, and mark notes as completed (`status: done`).

## Preconditions
- Pending Refactor Note in `docs/refactor/` (status: `pending` or `in-progress`)

## Steps
1. Activate [`domain-modeler`](../agents/domain-modeler.md), [`database-engineer`](../agents/database-engineer.md), and [`api-designer`](../agents/api-designer.md) agents.
2. Run skill [`refactor-engine`](../skills/refactor-engine/SKILL.md).
3. Read target Refactor Note in `docs/refactor/`.
4. Restore logic inside-out:
   - **Step 1 Domain**: Aggregate Root methods & VOs
   - **Step 2 Infrastructure**: Mongoose Schemas & Repository Adapters
   - **Step 3 Applications**: Command/Query Handlers + Transaction Runner
   - **Step 4 API**: gRPC Controllers & Zod DTO Validation
5. Run unit & E2E tests (`.agents/hooks/run-tests.sh`).
6. Update Refactor Note status to `done`.

## Deliverables
- Fully restored, working business logic in correct layers
- Refactor Note marked `done`
- Clean test execution & boundary validation
