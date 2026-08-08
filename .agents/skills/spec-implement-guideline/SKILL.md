---
name: spec-implement-guideline
description: Executes tasks.md phase by phase, dispatching each phase's dependency-satisfied, non-conflicting effort:low tasks to parallel implementer subagents while effort:medium/high tasks run inline, updating tasks.md immediately after each task so a new session can resume from the exact checkpoint.
---

# Spec Implement Skill

## Instructions

1. Read `specs/NNN-<name>/tasks.md` and `specs/NNN-<name>/plan.md`.
2. Work through phases in order (Phase 1 before Phase 2, etc.) — never start a phase while any task in an earlier phase is still `[ ]` or `[!]`.
3. **Within the current phase, compute a wave**: every task still `[ ]` whose every `deps` ID is already `[x]`.
   - If the wave is empty but the phase isn't complete, every remaining task is blocked on something `[!]` — stop and report (see step 6).
4. **Split the wave and dispatch**:
   - Among `effort: low` tasks in the wave, group by `file`. Tasks with distinct, non-overlapping `file` values (and `file: -` tasks only if they don't touch the same files as each other) are parallel-safe — dispatch them together as concurrent `implementer` subagent calls in a single batch, each given only that task's line (description, `deps`, `file`) as its instructions.
   - Tasks sharing a `file` value, even both `effort: low`, are never dispatched together — run them one at a time, in task-ID order.
   - `effort: medium` and `effort: high` tasks are never dispatched to `implementer`. Run them inline (activating the relevant specialist agent from `.agents/agents/` if the task calls for domain/architectural judgment), one at a time.
5. **Per-task completion**:
   - On success: verify the file compiles / passes lint, then **immediately** mark that task `[x]` in `tasks.md` before touching the next task — including right after each subagent in a parallel batch returns, not only after the whole batch finishes.
   - On an `implementer` escalation (or any task you cannot complete as specified): mark it `[!]` instead of `[x]`, and record why directly on that task's line (what was attempted, where it got stuck, what decision is needed). Do not guess a resolution and do not mark it `[x]`.
6. **Blocked tasks**: after a wave, if any dispatched task came back `[!]`, stop working this phase and report the blocked task(s) and their reasons — do not skip ahead to unrelated later-phase tasks even if their `deps` happen to be satisfied.
7. Once every task in the phase is `[x]`, run [`after-generate.sh`](../../hooks/after-generate.sh) before moving to the next phase.
8. **Resumption**: a new session resumes correctly by re-reading `tasks.md` alone — recompute the current phase and wave from the `[x]`/`[ ]`/`[!]` markers and `deps`; no separate progress state is needed. `[!]` tasks stay `[!]` until manually resolved (re-run them once unblocked; they behave like any other not-yet-`[x]` task in wave computation).
