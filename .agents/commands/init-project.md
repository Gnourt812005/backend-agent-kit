---
name: init-project
description: Initialize the project documentation scaffold under docs/ including service.md, glossary, ADR 001, and domain template — run once before any code generation.
---

# Command: init-project

## Intent
Initialize project documentation scaffold (`docs/`) and configuration for a new service.

## Preconditions
- Service name, domain summary, target language, framework, datastore, auth mechanism

## Steps
1. Activate [`architect`](../agents/architect.md) agent.
2. Ask user for any missing identity parameters (or accept defaults from [`AGENT.md`](../AGENT.md)).
3. Scaffold `docs/` structure:
   - Copy [`templates/docs/service.md`](../templates/docs/service.md) → `docs/architecture/service.md` and fill identity
   - Create `docs/architecture/glossary.md` (blank table)
   - Copy [`templates/docs/adr.md`](../templates/docs/adr.md) → `docs/architecture/decisions/001-initial-architecture.md`
   - Create `docs/tech/stack.md` and `docs/tech/integrations.md`
   - Create `docs/domains/` directory and copy [`templates/docs/domain.md`](../templates/docs/domain.md) → `docs/domains/_template.md`
4. Run [`before-generate.sh`](../hooks/before-generate.sh) to confirm `docs/` readiness.

## Deliverables
- Fully scaffolded `docs/` directory
- `docs/architecture/service.md` filled with project metadata
- ADR 001 recorded
- `docs/domains/_template.md` ready for new domains

## Stop Conditions
- If `docs/architecture/service.md` already exists, prompt user before overwriting.
