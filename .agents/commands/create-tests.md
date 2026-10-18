---
name: create-tests
description: Generate unit tests for domain aggregates and application handlers, plus integration/end-to-end tests for adapters, using the project's test framework.
---

# Command: create-tests

## Intent
Generate unit and integration tests for aggregates, use cases, or adapters.

## Preconditions
- Target module or domain, target layer (Domain, Application, API, Infrastructure)

## Steps
1. Activate [`test-engineer`](../agents/test-engineer.md) agent.
2. Read domain invariants in `docs/domains/<domain>/domain.md`.
3. Run skill [`testing-strategy`](../skills/testing-strategy/SKILL.md).
4. Generate unit tests for domain types.
5. Generate unit tests for handlers with in-memory or mocked ports.
6. Generate integration / end-to-end tests for adapters.
7. Run [`run-tests.sh`](../hooks/run-tests.sh).

## Deliverables
- Unit and integration test files
- Passing test run
