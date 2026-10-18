---
name: init-kit
description: Initialize the .agents/ kit for a project — writes kit.toml (stack, layout, boundaries) and scaffolds docs/ for new projects, or inventories an existing project and maps it onto the kit without editing core kit files.
---

# Command: init-kit

## Intent

Configure the kit for one project. Works in two modes:

- **new-project**: Choose the stack and layout, then scaffold `docs/` for a brand-new service.
- **adapt-existing**: Inventory an existing codebase, then map its stack and layout onto the kit.

**Core rule: init-kit never edits core kit files** (`rules/`, `templates/`, `skills/`, `commands/`, `agents/`, `hooks/`). Everything project-specific goes into [`kit.toml`](../kit.toml), `docs/`, or a stack pack under [`stacks/`](../stacks/). That keeps the core upgradeable.

## Preconditions

- `.agents/` directory is present
- `.agents/AGENT.md` exists

---

## Mode Detection

```yaml
if docs/architecture/service.md exists:
  → adapt-existing mode (project docs already present)
else:
  → new-project mode (no project docs yet)
```

Force a mode with `init-kit --new` or `init-kit --adapt`.

---

## Shared step: choose the stack

1. List the packs in `stacks/` and read each pack's `README.md` (only the README).
2. Choose one:
   - **A pack matches** (language, framework, datastore, transport): use it.
   - **Close but not exact**: copy the closest pack to `stacks/<new-name>/`, then edit the copy.
   - **Nothing matches**: use no pack. The core structure specs are rendered in the project's language. Offer to create a pack later, once the project's conventions settle.
3. Record the choice in `kit.toml` under `[stack] pack`.

---

## Mode: new-project

### Steps

1. Activate [`architect`](../agents/architect.md) agent.
2. Ask the user for missing identity parameters: service name, domain summary, language, framework, datastore, broker, transport, auth mechanism.
3. Run **Shared step: choose the stack**.
4. Write `kit.toml`:
   - `[project]` name, language, framework
   - `[layout]` layer directories (use the pack README's defaults if a pack was chosen) and `source_extensions`
   - `[boundaries]` forbidden imports per layer (frameworks, ORMs, drivers, transports)
5. Scaffold `docs/`:
   - [`templates/docs/service.md`](../templates/docs/service.md) → `docs/architecture/service.md`, filled in
   - `docs/architecture/glossary.md` (blank table)
   - [`templates/docs/adr.md`](../templates/docs/adr.md) → `docs/architecture/decisions/001-initial-architecture.md`, recording the stack and architecture choices with the alternatives considered
   - `docs/tech/stack.md` and `docs/tech/integrations.md`
   - `docs/domains/` directory
6. Mark the kit configured: `status = "configured"`, `mode = "new-project"`, `initialized_at` = today.
7. Run `.agents/hooks/sync-claude-native.sh`, then [`after-generate.sh`](../hooks/after-generate.sh).

### Stop Conditions

- If `docs/architecture/service.md` already exists and `--new` was not passed, switch to adapt-existing.

---

## Mode: adapt-existing

### Steps

1. **Inventory** — Render [`templates/docs/inventory.md`](../templates/docs/inventory.md) → `docs/architecture/inventory.md` and answer every question from the codebase:
   - Map the directory tree of the source root (e.g. `find <source_root> -type d | sort`).
   - Sample 50–80 source file names to learn naming patterns.
   - Read the dependency manifest (`package.json`, `go.mod`, `pyproject.toml`, `pom.xml`, …) for framework, datastore, broker, validation, and test libraries.
   - Ask the user only for what the code cannot answer.
2. Run **Shared step: choose the stack**.
3. **Map the layout** — Fill `[layout]` in `kit.toml` with the project's real layer directories. If the project has no clear layers yet, set the target layout and plan [`refactor-align`](refactor-align.md).
4. **Set boundaries** — Fill `[boundaries]` from the dependency manifest: every framework, ORM, driver, and transport library the domain (and application) must not import.
5. **Record conventions** — Naming and structure conventions that differ from the chosen pack go into that pack's `rules/global/naming.md`, or into a new pack. Never edit the core `rules/`.
6. **Write project docs** — `docs/architecture/service.md` if missing, and an ADR recording the adoption decision.
7. Mark the kit configured: `status = "configured"`, `mode = "adapt-existing"`, `initialized_at` = today.
8. **Regenerate and verify**:
   - Run `.agents/hooks/sync-claude-native.sh`, so `.claude/rules/` gets real paths and pack overrides.
   - Run [`validate-links.sh`](../hooks/validate-links.sh).
   - Run [`check-health.sh`](../hooks/check-health.sh) `--full` to baseline existing boundary violations, instead of failing on them.

### Deliverables

- `docs/architecture/inventory.md` answered
- `kit.toml` configured (project, stack pack, layout, boundaries)
- A health baseline in `docs/health/`
- No changes to core kit files

### Notes

- The universal workflows (`spec-*`, `refactor-*`, `review-architecture`, `repair-kit`) are stack-agnostic and must never be modified per project.
- To clean up legacy code after adoption, use [`refactor-align`](refactor-align.md), then [`refactor-restore`](refactor-restore.md).

---

## Related

- [`init-session`](init-session.md) — Optional per-session project context load
- [`repair-kit`](repair-kit.md) — Validate and repair markdown links across `.agents/`
- [`review-architecture`](review-architecture.md) — Git-anchored health check for ongoing drift detection
