---
name: spec-tasks-guideline
description: Generates a dependency-ordered checklist of fine-grained, granular implementation tasks at specs/NNN-<name>/tasks.md based on plan.md.
---

# Spec Tasks Skill

## Instructions

1. Read `specs/NNN-<name>/plan.md` and `specs/NNN-<name>/spec.md`.
2. Render [`templates/spec/tasks.md`](../../templates/spec/tasks.md) into `specs/NNN-<name>/tasks.md`.
3. **Granular Task Decomposition**:
   - Break implementation down into small, fine-grained, atomic task items.
   - Each task item should cover a single specific file or single small concern (e.g. *"Define `EStatus` enum"*, *"Implement `CampaignRoot.create()` factory"*, *"Implement `CreateCampaignCommand` & DTO"*).
   - Avoid broad, multi-file tasks (e.g., avoid *"Implement core domain"*).
4. Organize tasks into 4 ordered phases:
   - **Phase 1: Core Domain** (Enums → Value Objects → Entities → Aggregate Root → Domain Events → Repository Port)
   - **Phase 2: Application Layer** (Command DTOs & Handlers → Query Handlers → Mappers)
   - **Phase 3: Infrastructure & Presentation** (Mongoose Schema → Repository Adapter → Read Service → Module → Controller)
   - **Phase 4: Verification & Docs Convergence** (Unit Tests → Integration Tests → Validation Hooks → Sync `docs/`)
5. **Tag every task** with `[deps: ...]`, `[effort: ...]`, `[file: ...]` (see the "Task Tags" section in [`templates/spec/tasks.md`](../../templates/spec/tasks.md)):
   - `deps`: list every task ID (`T{phase}.{n}`) whose output this task reads or extends. Depend only on what's actually needed — under-specifying deps risks a race, over-specifying kills parallelism.
   - `effort`: `low` only if the task is fully mechanical from `plan.md` alone (render a template, wire a known pattern) with zero invariant/business-rule judgment. Use `high` for anything that defines invariants, chooses a business rule, or shapes a public contract (e.g. the Aggregate Root's `create()`); `medium` for everything in between (e.g. a handler that wires known pieces together but still makes small judgment calls).
   - `file`: the one file this task's diff lands in. Two tasks touching the same file always get the same `file` value, even across otherwise-unrelated concerns — that shared value is what stops them from being parallelized, regardless of `deps`. Use `file: -` for tasks with no single target file (tests spanning multiple files, hook runs, doc syncs).
