---
name: init-session
description: Optional. Load project truth (service doc and ADR index) before a coding session and print a short status. Kit invariants are already loaded automatically, so do not re-read .agents/.
---

# Command: init-session

## Intent

Load the *project's* context (not the kit's) when you are about to generate code. Kit invariants come from `.agents/CORE.md` (auto-loaded) and layer rules load from `.claude/rules/` when matching files are touched, so this command never scans `.agents/`.

## Steps

Read exactly these, and nothing else:

1. `.agents/kit.toml`. If `status` is not `configured`, stop and tell the user to run [`init-kit`](init-kit.md).
2. `docs/architecture/service.md`, if it exists.
3. The **file names only** in `docs/architecture/decisions/` (list the directory; do not open the ADRs). Open an ADR later only when a task touches its decision.

## Output

Reply with exactly this block, filled in from what you read, and nothing else:

```
Project:   <name> (<language>/<framework>)
Service:   <one-line purpose from service.md, or "service.md missing">
ADRs:      <count> — <comma-separated short titles, max 8>
Next:      <"ready" | "run /init-kit" | "fill docs/architecture/service.md">
```

## Budget

This command should add roughly 1–3k tokens of context. If `service.md` is much larger than that, it needs a summary section at the top; read only that section.
