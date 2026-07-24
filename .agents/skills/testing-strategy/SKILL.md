---
name: testing-strategy
description: Guides black-box Jest test design for Core domain logic, Application handlers, and Presentation controllers.
---

# Testing Strategy Skill

## Instructions

1. Core Layer Unit Tests (`src/core/**/*.spec.ts`):
   - Test aggregate root invariants, factory `create()` validation, state machine methods, and domain event creation.
   - Zero framework or mock dependencies.
2. Application Layer Unit Tests (`src/application/**/*.spec.ts`):
   - Test Command/Query handlers.
   - Mock repository ports (`ICampaignRepository`) and Unit of Work (`IUnitOfWork`).
3. Presentation E2E Tests (`test/**/*.e2e-spec.ts`):
   - Test HTTP controllers with NestJS `Test.createTestingModule()`.
   - Verify status codes and response envelope structure.
4. Execute via `.agents/hooks/run-tests.sh`.
