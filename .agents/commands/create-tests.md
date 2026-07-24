# Command: create-tests

## Intent
Generate unit and integration tests for domain aggregates, use cases, or controllers.

## Preconditions
- Target module or domain name, target layer (Core, Application, Presentation)

## Steps
1. Activate [`test-engineer`](../agents/test-engineer.md) agent.
2. Read domain invariants in `docs/domains/<domain>/domain.md`.
3. Run skill [`testing-strategy`](../skills/testing-strategy/SKILL.md).
4. Generate unit tests for Domain classes (`*.spec.ts`).
5. Generate unit tests for Handler classes with port mocks.
6. Generate E2E tests (`*.e2e-spec.ts`) for gRPC controllers using NestJS testing utilities.
7. Run [`run-tests.sh`](../hooks/run-tests.sh).

## Deliverables
- Unit & E2E test files
- Passing test execution output
