# eslint-optimizer skill

Token-minimizing ESLint cleanup pipeline for TypeScript projects. See `SKILL.md`
for the full workflow explanation — this file is just install/quick-start.

## Install (as a Claude Code / agent skill)

Copy this whole folder into your project's skills directory, e.g.:

```bash
cp -r eslint-optimizer-skill .claude/skills/eslint-optimizer
```

Or, to just use the scripts standalone without an agent:

```bash
cp -r eslint-optimizer-skill/scripts <your-repo>/scripts/eslint-optimizer
cd <your-repo>
npm install -D ts-morph
```

## Quick start

```bash
# 1. autofix (free)
npx eslint . --fix

# 2. known codemods (free)
node scripts/codemods/run.js --all

# 3. compile + group what's left
node scripts/compile-lint.js

# inspect .cache/eslint/summary.json to triage, then
# .cache/eslint/report.json for the actual batches to hand to an agent

# 4. after everything's fixed:
node scripts/compile-lint.js --verify-clean && rm -rf .cache/eslint
```

## Extending the codemod registry

Copy `scripts/codemods/TEMPLATE.js` to `scripts/codemods/registry/<rule-id>.js`
(replace `@`, `/`, `:` in the rule id with `_`/`-`), implement the AST match +
fix using ts-morph, and it's automatically picked up by `run.js` and by
`run.js --all`.

Two working examples are included:
- `_typescript-eslint_consistent-type-imports.js`
- `_typescript-eslint_explicit-function-return-type.js`
