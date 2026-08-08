---
name: spec-implement
description: Execute tasks.md sequentially item by item, marking each completed immediately to support seamless resumption after session interruption.
---

# Command: spec-implement

## Intent
Execute implementation tasks in `specs/NNN-<name>/tasks.md` sequentially, marking items complete immediately after generation to ensure seamless session interruption recovery.

## Preconditions
- Task checklist `specs/NNN-<name>/tasks.md`

## Steps
1. Activate specialist agents based on phase ([`domain-modeler`](../agents/domain-modeler.md), [`database-engineer`](../agents/database-engineer.md), [`api-designer`](../agents/api-designer.md)).
2. Run skill [`spec-implement-guideline`](../skills/spec-implement-guideline/SKILL.md) — resumes from the first uncompleted item, checkpoints `tasks.md` after each one.

## Deliverables
- Fully generated & tested code implementation
- Real-time updated `tasks.md` checklist checkpoint
