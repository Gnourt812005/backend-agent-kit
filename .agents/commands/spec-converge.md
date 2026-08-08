---
name: spec-converge
description: Verify completed implementation against spec.md, sync domain changes back to permanent docs/domains/, and lock the spec directory as an immutable historical record.
---

# Command: spec-converge

## Intent
Assess completed code against `specs/NNN-<name>/spec.md`, sync changes to permanent `docs/domains/`, and lock spec as complete.

## Preconditions
- Fully executed `tasks.md`

## Steps
1. Activate [`code-reviewer`](../agents/code-reviewer.md) agent.
2. Run skill [`spec-converge-guideline`](../skills/spec-converge-guideline/SKILL.md).

## Deliverables
- Permanent architecture documentation in `docs/domains/` updated
- Spec folder `specs/NNN-<name>/` locked as immutable history
