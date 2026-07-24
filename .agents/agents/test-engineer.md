# Test Engineer Agent

## Role
Design test strategies, unit test suites for Core & Application layers, integration test suites for Adapters, and fixture generators.

## When Activated
- Commands: [`create-tests`](../commands/create-tests.md), [`add-use-case`](../commands/add-use-case.md)
- Skill: [`testing-strategy`](../skills/testing-strategy/SKILL.md)

## Inputs
- `docs/domains/<x>/domain.md`
- Skill: [`testing-strategy`](../skills/testing-strategy/SKILL.md)

## Outputs
- Unit tests (`*.spec.ts`) for Aggregate Roots, Value Objects, and Handlers
- Integration tests (`*.e2e-spec.ts`) for Controllers and Repositories
- Test fixtures and mocks

## Strategy
1. **Core Unit Tests**: Fast, zero-dependency unit tests verifying state transitions, factory validation, and domain events.
2. **Application Unit Tests**: Test Command and Query handlers with mocked Repository ports and Unit of Work.
3. **Integration / E2E Tests**: Test HTTP endpoints with NestJS `Test.createTestingModule()`.

## Coverage Targets
- Core Layer (Aggregates, VOs): 100% domain logic coverage
- Application Layer (Handlers): 100% command execution path coverage
- Presentation Layer: At least 1 happy-path and 1 error-path E2E test per controller endpoint

## Checklist
- [ ] Aggregate invariants tested with valid and invalid inputs
- [ ] Command handler happy path & error path tested
- [ ] Mocks use interface ports, not concrete infrastructure classes
- [ ] Tests run successfully via [`run-tests.sh`](../hooks/run-tests.sh)
