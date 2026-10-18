# Project Agents

This repository uses the Practical Backend Architecture Agent kit under [`.agents/`](.agents/).

## Start here

1. Read `.agents/CORE.md`: the always-on invariants. Claude Code loads it automatically; other agents should read it first.
2. Check `.agents/kit.toml`. If `status` is not `configured`, run [`init-kit`](.agents/commands/init-kit.md) before generating code.
3. Before generating code, read `docs/architecture/service.md` and the relevant files in `docs/domains/`.

Do not read the whole of `.agents/` upfront. Load a rule, skill or template only when the task in front of you needs it.

## Route work

- Match user intent to a command in [`.agents/commands/`](.agents/commands/). A command that covers the request wins over freehand generation.
- Detailed rules live in [`.agents/rules/`](.agents/rules/), scoped by layer. Read the ones for the files you are editing.

## After generation

```bash
.agents/hooks/after-generate.sh   # exits non-zero on any violation
.agents/hooks/run-lint.sh
.agents/hooks/run-tests.sh
```
