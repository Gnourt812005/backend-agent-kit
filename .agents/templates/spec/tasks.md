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

Replace every `{layer}` placeholder and `<…>` file description with the real path, using `[layout]` in `.agents/kit.toml` and `rules/global/naming.md`, when you generate a real `tasks.md`.

A **wave** is the set of not-yet-`[x]` tasks in the current phase whose `deps` are all `[x]`. Only same-wave `effort: low` tasks with non-overlapping `file` values are candidates for parallel dispatch.

## Phase 1: Domain Layer
- [ ] T1.1 [deps: -] [effort: low] [file: {domain}/<status enum>] Define domain status enum
- [ ] T1.2 [deps: T1.1] [effort: low] [file: {domain}/<value objects>] Implement value objects
- [ ] T1.3 [deps: T1.1,T1.2] [effort: low] [file: {domain}/<entities>] Implement domain entities
- [ ] T1.4 [deps: T1.1,T1.2,T1.3] [effort: high] [file: {domain}/<aggregate root>] Implement aggregate root creation factory and domain methods
- [ ] T1.5 [deps: T1.1] [effort: low] [file: {domain}/<domain events>] Define domain events
- [ ] T1.6 [deps: T1.3] [effort: low] [file: {domain}/<repository port>] Define repository port
- [ ] T1.7 [deps: T1.3] [effort: low] [file: {domain}/<read repository port>] Define read repository port

## Phase 2: Application Layer
- [ ] T2.1 [deps: T1.4] [effort: low] [file: {application}/<command + input DTO>] Define command and validated input DTO
- [ ] T2.2 [deps: T2.1,T1.6] [effort: medium] [file: {application}/<command handler>] Implement command handler inside the unit of work
- [ ] T2.3 [deps: T1.7] [effort: low] [file: {application}/<query handler>] Define query and query handler on the read repository
- [ ] T2.4 [deps: T1.4] [effort: low] [file: {application}/<mappers>] Implement DTO mappers

## Phase 3: Infrastructure & API
- [ ] T3.1 [deps: T1.3] [effort: low] [file: {infrastructure}/<persistence model>] Define persistence model and indexes
- [ ] T3.2 [deps: T3.1,T1.6] [effort: medium] [file: {infrastructure}/<repository adapter>] Implement repository adapter
- [ ] T3.3 [deps: T3.1,T1.7] [effort: low] [file: {infrastructure}/<read repository adapter>] Implement read repository adapter
- [ ] T3.4 [deps: T3.2,T3.3,T2.2,T2.3] [effort: low] [file: <composition root>] Bind ports to adapters and register handlers
- [ ] T3.5 [deps: T2.2,T2.3] [effort: medium] [file: {api}/<driving adapter>] Implement driving adapter with auth and input validation

## Phase 4: Verification & Docs Convergence
- [ ] T4.1 [deps: T1.4,T2.2] [effort: medium] [file: -] Write Domain & Handler unit tests
- [ ] T4.2 [deps: T3.4,T3.5] [effort: low] [file: -] Execute `.agents/hooks/after-generate.sh` boundary validations
- [ ] T4.3 [deps: T4.2] [effort: low] [file: -] Sync domain state back to `docs/domains/` and set `spec.md` status to completed
