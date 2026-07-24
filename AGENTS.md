# Project Agents

This repository uses the Practical Backend Architecture Agent kit under [`.agents/`](.agents/).

## Always load first

1. Read [`.agents/AGENT.md`](.agents/AGENT.md) for operating model, constraints, and workflow.
2. Read project truth in `docs/architecture/service.md` and `docs/architecture/decisions/` before generating code.
3. Read relevant domain specifications in `docs/domains/` before editing domain features.
4. Follow rules in [`.agents/rules/global/`](.agents/rules/global/) on every change.

## Route work

- Match user intent to a command in [`.agents/commands/`](.agents/commands/).
- Activate the matching specialist in [`.agents/agents/`](.agents/agents/).
- Apply relevant skills in [`.agents/skills/`](.agents/skills/).
- Generate from templates in [`.agents/templates/`](.agents/templates/).

## After generation

Prefer running:

```bash
.agents/hooks/after-generate.sh
.agents/hooks/run-lint.sh
.agents/hooks/run-tests.sh
```
