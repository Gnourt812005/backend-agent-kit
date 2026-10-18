---
name: testing-strategy
description: Guides black-box test design for domain logic, application handlers, and adapters using the project's test framework.
---

# Testing Strategy Skill

## Instructions

1. **Domain unit tests**:
   - Test invariants, creation-factory validation, state transitions, and emitted domain events.
   - No framework, no mocks, no I/O.
2. **Handler unit tests**:
   - Test command and query handlers against in-memory or mocked ports and a fake unit of work.
   - Assert on outcomes and recorded events, not on internal calls.
3. **Adapter integration tests**:
   - Repositories and publishers against a real datastore or broker (containers where possible).
   - Driving adapters through the transport: response shape, auth, and error mapping.
4. Run via `.agents/hooks/run-tests.sh`.
