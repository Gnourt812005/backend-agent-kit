---
name: spec-tasks
description: Generate a dependency-ordered implementation checklist at specs/NNN-<name>/tasks.md from the approved plan.md, each task tagged with deps/effort/file so spec-implement can parallelize safely.
---

# Command: spec-tasks

## Intent
Generate dependency-ordered implementation task checklist in `specs/NNN-<name>/tasks.md`, with each task tagged `[deps: ...] [effort: low|medium|high] [file: ...]`.

## Preconditions
- Proposed `specs/NNN-<name>/plan.md`

## Steps
1. Activate [`architect`](../agents/architect.md) agent.
2. Run skill [`spec-tasks-guideline`](../skills/spec-tasks-guideline/SKILL.md).
3. Generate `specs/NNN-<name>/tasks.md` broken into 4 dependency-ordered phases, every task tagged with `deps`/`effort`/`file`.

## Deliverables
- `specs/NNN-<name>/tasks.md` checklist, ready for `spec-implement` to execute with parallel dispatch
