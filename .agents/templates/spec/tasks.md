---
template: tasks
placeholders: [FeatureName, FeatureNumber]
generates: specs/{{FeatureNumber}}-{{featureName}}/tasks.md
---

# Tasks Checklist: {{FeatureName}}

**Feature**: `specs/{{FeatureNumber}}-{{featureName}}`

> ⚠️ **Execution Rule**: The agent MUST update this file immediately after completing each individual granular task item before moving to the next item: `[x]` on success, `[!]` if blocked (see [`spec-implement-guideline`](../../skills/spec-implement-guideline/SKILL.md)).

## Task Tags

Each task line carries three inline tags:
- `[deps: ...]` — task IDs that must be `[x]` before this one can start. Empty (`[deps: -]`) means no dependency.
- `[effort: low|medium|high]` — `low` = fully-specified, mechanical (dispatchable to the `implementer` subagent); `medium`/`high` = needs judgment, stays with the orchestrator or the relevant specialist agent.
- `[file: ...]` — primary file this task writes. Two tasks that share a `file` value are never dispatched in parallel, even if neither depends on the other.

A **wave** is the set of not-yet-`[x]` tasks in the current phase whose `deps` are all `[x]`. Only same-wave `effort: low` tasks with non-overlapping `file` values are candidates for parallel dispatch.

## Phase 1: Domain Layer
- [ ] T1.1 [deps: -] [effort: low] [file: src/domain/enums/{{name}}-status.enum.ts] Define domain status enum
- [ ] T1.2 [deps: T1.1] [effort: low] [file: src/domain/value-objects/{{name}}.vo.ts] Implement Value Objects
- [ ] T1.3 [deps: T1.1,T1.2] [effort: low] [file: src/domain/entities/{{name}}.entity.ts] Implement Domain Entities
- [ ] T1.4 [deps: T1.1,T1.2,T1.3] [effort: high] [file: src/domain/aggregate-roots/{{name}}.root.ts] Implement Aggregate Root `create()` & domain methods
- [ ] T1.5 [deps: T1.1] [effort: low] [file: src/domain/events/{{name}}.event.ts] Define Domain Events
- [ ] T1.6 [deps: T1.3] [effort: low] [file: src/domain/ports/repositories/{{name}}.repository.port.ts] Define Repository Port & Symbol DI token
- [ ] T1.7 [deps: T1.3] [effort: low] [file: src/domain/ports/repositories/read/{{name}}-read.repository.port.ts] Define Read Repository Port

## Phase 2: Applications Layer
- [ ] T2.1 [deps: T1.4] [effort: low] [file: src/applications/commands/{{name}}/{{name}}.command.ts] Define Command class & Zod DTO schema
- [ ] T2.2 [deps: T2.1,T1.6] [effort: medium] [file: src/applications/commands/{{name}}/{{name}}.handler.ts] Implement Command Handler with Transaction Runner wrap
- [ ] T2.3 [deps: T1.7] [effort: low] [file: src/applications/queries/{{name}}/{{name}}.handler.ts] Define Query class & Query Handler with Read Repository projection
- [ ] T2.4 [deps: T1.4] [effort: low] [file: src/applications/mappers/{{name}}.mapper.ts] Implement DTO Mappers

## Phase 3: Infrastructure & API
- [ ] T3.1 [deps: T1.3] [effort: low] [file: src/infrastructure/persistence/mongoose/schemas/{{name}}.schema.ts] Define Mongoose Schema
- [ ] T3.2 [deps: T3.1,T1.6] [effort: medium] [file: src/infrastructure/persistence/mongoose/repositories/{{name}}.repository.ts] Implement Mongo Repository Adapter
- [ ] T3.3 [deps: T3.1,T1.7] [effort: low] [file: src/infrastructure/persistence/mongoose/repositories/{{name}}-read.repository.ts] Implement Mongo Read Repository
- [ ] T3.4 [deps: T3.2,T3.3,T2.2,T2.3] [effort: low] [file: src/infrastructure/modules/{{name}}.module.ts] Wire providers & Symbol DI tokens in Feature Module
- [ ] T3.5 [deps: T2.2,T2.3] [effort: medium] [file: src/api/grpc/{{name}}.controller.ts] Implement gRPC Controller with guards

## Phase 4: Verification & Docs Convergence
- [ ] T4.1 [deps: T1.4,T2.2] [effort: medium] [file: -] Write Domain & Handler unit tests
- [ ] T4.2 [deps: T3.4,T3.5] [effort: low] [file: -] Execute `.agents/hooks/after-generate.sh` boundary validations
- [ ] T4.3 [deps: T4.2] [effort: low] [file: -] Sync domain state back to `docs/domains/` and set `spec.md` status to completed
