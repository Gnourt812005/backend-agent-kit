---
name: eslint-optimizer
description: Use when fixing ESLint violations in a TypeScript project, especially large/legacy codebases with many pre-existing violations. Runs a token-minimizing pipeline (eslint --fix -> ts-morph codemods -> grouped/deduped agent batches) instead of feeding raw lint output straight to an agent. Triggers on "fix eslint", "clean up lint errors", "reduce lint debt", or when a lint report is too large to read directly.
---

# ESLint Optimizer

A staged pipeline for clearing ESLint debt in a TypeScript project while minimizing
tokens spent on any LLM (agent) step. The core idea: exhaust free, deterministic
fixes first (autofix, then AST codemods), and only spend agent tokens on the
residual violations that genuinely need judgement — and even then, batched,
deduped, and stripped of noise.

All working state lives under `.cache/eslint/` in the target repo. This directory
is the single source of truth for the run and MUST be deleted once the desired
violations are resolved (see "Cleanup" below). Never treat `.cache/eslint/` as
permanent project state — it's scratch space for one cleanup session.

## Pipeline overview

```
1. eslint --fix                     (free, deterministic)
2. ts-morph codemods (known rules)  (free, deterministic)
3. compile + group report           (script, zero tokens) -> .cache/eslint/report.json
4. agent pass, per rule, batched    (tokens spent ONLY here)
5. verify (re-lint + tsc)           (free)
6. promote any new fix pattern to a codemod for next time
7. delete .cache/eslint/            (cleanup)
```

## Step 1 — Autofix

```bash
npx eslint . --fix
```

Always run first and after any codemod pass (codemods can leave formatting that
--fix would clean up). Costs zero tokens. Expect this to resolve a large chunk
of violations in a neglected codebase (spacing, quotes, import order, prefer-const, etc).

## Step 2 — Known codemods

Check `scripts/codemods/registry/` for a ts-morph script matching a violated rule
before ever routing it to the agent. Run any that match:

```bash
node scripts/codemods/run.js <rule-id>
```

If a rule doesn't have a codemod yet, it falls through to step 4. After the agent
successfully fixes a rule type in step 4, write a codemod for it (see "Growing
the registry" below) so it costs zero tokens on every future project.

## Step 3 — Compile and group the report

```bash
node scripts/compile-lint.js
```

This runs `eslint --format json`, strips noisy fields (`nodeType`, `endLine`,
`endColumn`, raw `fix` ranges), separates errors from warnings, groups by
`ruleId`, deduplicates near-identical violation shapes, and writes:

- `.cache/eslint/report.json` — full grouped/deduped report
- `.cache/eslint/summary.json` — counts per rule only, for quick triage

Default behavior processes **errors only**. Pass `--include-warnings` to also
process warnings — decide this deliberately per run rather than always including
both; warnings are usually a separate, lower-priority pass.

```bash
node scripts/compile-lint.js --include-warnings
node scripts/compile-lint.js --changed-only   # git diff scope, for incremental cleanup
```

## Step 4 — Agent pass (the only step that spends tokens)

Read `.cache/eslint/summary.json` first — it's the triage view. For each
remaining rule, in descending count order:

1. Read that rule's entry in `.cache/eslint/report.json`. It contains, per
   deduped shape: a representative code slice (minimal enclosing function/class
   member, not full file — extracted via ts-morph), a count of how many
   locations share that shape, and the full location list.
2. Fix ONE rule per agent turn. Do not mix rules in a single batch — this
   causes cross-application of fix patterns, especially with weaker/free models.
3. Batch size: 5-10 locations per call max. If a rule has more, loop batches.
4. State the expected fix shape explicitly in the prompt (e.g. "replace `any`
   with the most specific inferable type from usage; if truly dynamic, use
   `unknown` and narrow" — not just "fix this any type"). Don't rely on the
   model inferring rule intent, especially with free models.
5. Require a strict output format (unified diff, or `{file, line, oldCode,
   newCode}` JSON) so results can be parsed and applied programmatically. Strip
   markdown fences before parsing.

## Step 5 — Verify

After applying any batch of fixes:

```bash
npx eslint <touched-files> --format json
npx tsc --noEmit
```

If either fails for a file, revert that file's change. This is mandatory with
free/weaker models — they will occasionally produce syntactically broken or
type-incorrect fixes.

## Step 6 — Grow the codemod registry

If an agent-fixed rule was NOT already in `scripts/codemods/registry/`, and the
fix pattern was consistent across its instances, write a ts-morph codemod for it
now (see `scripts/codemods/TEMPLATE.js`) and register it. This is what makes
repeated runs (and future projects) cheaper over time — token spend should trend
toward zero per rule as the registry grows.

## Cleanup

Once all desired violations (per this run's scope — errors, or errors+warnings)
are resolved:

```bash
node scripts/compile-lint.js --verify-clean && rm -rf .cache/eslint
```

`--verify-clean` re-runs the compile step and exits non-zero if any in-scope
violations remain, so cleanup only happens on a genuinely clean state. Do not
delete `.cache/eslint/` manually mid-run — the report is what step 4 reads from,
and re-running step 3 is cheap if you need a fresh one.

## Notes

- `.gitignore` should include `.cache/` if it doesn't already — this is scratch
  space, never commit it.
- For incremental/CI use (not a full legacy cleanup), prefer `--changed-only` to
  scope every step to files touched since a base ref, so you never re-surface
  the full historical backlog on every run.
