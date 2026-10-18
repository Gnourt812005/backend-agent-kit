---
name: add-domain
description: Scaffold a complete new business domain including aggregate root, entities, value objects, domain events, repository ports, persistence adapter, wiring, and its driving adapter.
---

# Command: add-domain

## Intent
Scaffold a new business domain across all four layers (aggregate root, entities, value objects, domain events, repository and read-repository ports, persistence model and adapter, wiring, driving adapter) and write its specification in `docs/domains/<name>/`.

Layer directories come from `[layout]` in `.agents/kit.toml`. File names follow `rules/global/naming.md` and the active stack pack.

## Preconditions
- Domain name, business summary, key invariants

## Steps
1. Activate [`domain-modeler`](../agents/domain-modeler.md) agent.
2. Run skill [`write-domain-doc`](../skills/write-domain-doc/SKILL.md) in `generate` mode to write `docs/domains/<name>/domain.md` (with `status: draft` frontmatter).
3. Activate [`event-designer`](../agents/event-designer.md) agent → write `docs/domains/<name>/events.md` if integration events exist.
4. Activate [`api-designer`](../agents/api-designer.md) agent → write `docs/domains/<name>/api.md`.
5. Generate the domain layer in `{domain}` from:
   - [`templates/domain/aggregate.md`](../templates/domain/aggregate.md)
   - [`templates/domain/entity.md`](../templates/domain/entity.md)
   - [`templates/domain/value-object.md`](../templates/domain/value-object.md)
   - [`templates/domain/domain-event.md`](../templates/domain/domain-event.md)
   - [`templates/domain/repository-interface.md`](../templates/domain/repository-interface.md) (write and read ports)
6. Activate [`database-engineer`](../agents/database-engineer.md) agent and generate in `{infrastructure}` from:
   - [`templates/infrastructure/persistence-model.md`](../templates/infrastructure/persistence-model.md)
   - [`templates/infrastructure/repository-adapter.md`](../templates/infrastructure/repository-adapter.md)
   - [`templates/infrastructure/read-service.md`](../templates/infrastructure/read-service.md)
   - [`templates/infrastructure/module.md`](../templates/infrastructure/module.md) (bind ports to adapters)
7. Update `docs/architecture/glossary.md` with new ubiquitous-language terms.
8. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- `docs/domains/<name>/domain.md` specification
- Complete four-layer scaffold for the new domain
- Clean build and boundary validation

## Stop Conditions
- Ask the user for confirmation if the aggregate boundary overlaps an existing domain.
