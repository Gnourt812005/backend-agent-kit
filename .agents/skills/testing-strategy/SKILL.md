---
name: testing-strategy
description: Guides black-box Jest test design for Domain logic, Handler classes, and gRPC controllers.
---

# Testing Strategy Skill

## Instructions

1. Domain Layer Unit Tests (`src/domain/**/*.spec.ts`):
   - Test aggregate root invariants, factory `create()` validation, state machine methods, and domain event creation.
   - Zero framework or mock dependencies.
2. Handler Unit Tests (`src/applications/**/*.spec.ts`):
   - Test Command/Query handlers.
   - Mock repository ports (`{Name}RepositoryPort`) and Transaction Runner (`MongoTransactionRunnerPort`).
3. API E2E Tests (`tests/**/*.e2e-spec.ts`):
   - Test gRPC controllers with NestJS `Test.createTestingModule()`.
   - Verify response structure and error handling.
4. Execute via `.agents/hooks/run-tests.sh`.
