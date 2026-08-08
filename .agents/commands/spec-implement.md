---
name: spec-implement
description: Execute tasks.md phase by phase — effort:low tasks with no file overlap run in parallel via the implementer subagent, effort:medium/high tasks run inline, and tasks.md is checkpointed immediately after each one.
---

# Command: spec-implement

## Intent
Execute implementation tasks in `specs/NNN-<name>/tasks.md`, dispatching each phase's dependency-satisfied, non-conflicting `effort: low` tasks to parallel `implementer` subagents while `effort: medium`/`high` tasks run inline, marking each task complete immediately to ensure seamless session interruption recovery.

## Preconditions
- Task checklist `specs/NNN-<name>/tasks.md` with `deps`/`effort`/`file` tags on every task

## Steps
1. Activate specialist agents based on phase ([`domain-modeler`](../agents/domain-modeler.md), [`database-engineer`](../agents/database-engineer.md), [`api-designer`](../agents/api-designer.md)) for `effort: medium`/`high` tasks; dispatch `effort: low` tasks to the [`implementer`](../agents/implementer.md) subagent.
2. Run skill [`spec-implement-guideline`](../skills/spec-implement-guideline/SKILL.md) — computes each phase's wave from `deps`, parallelizes non-conflicting low-effort tasks, checkpoints `tasks.md` after every task.

## Deliverables
- Fully generated & tested code implementation
- Real-time updated `tasks.md` checklist checkpoint
