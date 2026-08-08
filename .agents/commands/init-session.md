---
name: init-session
description: Warm up and anchor the agent session to .agents/ conventions by loading architecture rules, naming standards, and layer constraints — run at the start of every session.
---

# Command: init-session

## Intent
Warm up and anchor the agent session to the workspace's `.agents/` conventions by activating the `initialize-session-context` skill. This ensures the model operates under precise alignment with project-specific guardrails without generating verbose output.

## Preconditions
- `.agents/` directory is present
- `.agents/kit.toml` exists with `status = "configured"`

## Steps
1. Read [`kit.toml`](../kit.toml) for kit status and project metadata.
2. Read [`.agents/AGENT.md`](../AGENT.md) for operating model, constraints, and workflow.
3. Activate skill [`initialize-session-context`](../skills/initialize-session-context/SKILL.md).

## Deliverables
- Anchored session context aligned with `.agents/` conventions
- Concise architecture keyword summary
- Ready for source code ingestion

## Usage
Run this command at the start of every session before generating code or refactoring:

```bash
# This command activates the initialize-session-context skill
# which scans .agents/ and anchors the session
```

## Stop Conditions
- If [`kit.toml`](../kit.toml) is missing or has `status = "fresh"`, prompt user to run [`init-kit`](init-kit.md) first.
