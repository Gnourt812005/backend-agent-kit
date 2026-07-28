---
name: init-session
description: Warm up and anchor the agent session to .agents/ conventions by loading architecture rules, naming standards, and layer constraints — run at the start of every session.
---

# Command: init-session

## Intent
Warm up and anchor the agent session to the workspace's `.agents/` conventions by activating the `initialize-session-context` skill. This ensures the model operates under precise alignment with project-specific guardrails without generating verbose output.

## Preconditions
- `.agents/AGENT.md` exists
- `.agents/` directory is present

## Steps
1. Read [`.agents/AGENT.md`](../AGENT.md) for operating model, constraints, and workflow.
2. Activate skill [`initialize-session-context`](../skills/initialize-session-context/SKILL.md).
3. Scan `.agents/` configuration files to extract:
   - Architecture patterns (Hexagonal, DDD, CQRS, Event-Driven)
   - Naming conventions (class/file patterns, DI tokens)
   - Coding standards (strict mode, no `any`, explicit return types)
   - Layer dependency rules (Domain → Applications → Infrastructure → API)
   - Security rules (guard stack, data masking)
   - Observability rules (structured logging, correlation IDs)
4. Anchor internal attention weights to prioritize these guardrails.
5. Output concise workspace architecture summary (max 10 keywords).

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
- If `.agents/AGENT.md` does not exist, prompt user to run `init-project` first.
