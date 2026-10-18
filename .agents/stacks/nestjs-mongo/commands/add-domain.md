---
name: add-domain
description: Scaffold a complete new business domain including Aggregate Root, Entities, Value Objects, Domain Events, Repository Ports, Mongoose Schema, Repository Adapter, NestJS Module, and gRPC Controller.
---

# Command: add-domain

## Intent
Scaffold a complete new business domain (Aggregate Root, Entities, Value Objects, Domain Events, Repository Port, Read Repository Port, Mongoose Schema, Repository Adapter, Module, gRPC Controller) and write its specification in `docs/domains/<name>/`.

## Preconditions
- Domain name, business summary, key invariants

## Steps
1. Activate [`domain-modeler`](../agents/domain-modeler.md) agent.
2. Run skill [`write-domain-doc`](../skills/write-domain-doc/SKILL.md) in `generate` mode to write `docs/domains/<name>/domain.md` (with `status: draft` frontmatter).
3. Activate [`event-designer`](../agents/event-designer.md) agent → generate `docs/domains/<name>/events.md` if async integration events exist.
4. Activate [`api-designer`](../agents/api-designer.md) agent → generate `docs/domains/<name>/api.md`.
5. Generate Domain layer code from templates:
   - [`templates/domain/aggregate.md`](../templates/domain/aggregate.md) → `src/domain/aggregate-roots/<name>.root.ts`
   - [`templates/domain/entity.md`](../templates/domain/entity.md) → `src/domain/entities/<name>-*.entity.ts`
   - [`templates/domain/value-object.md`](../templates/domain/value-object.md) → `src/domain/value-objects/<name>-*.vo.ts`
   - [`templates/domain/domain-event.md`](../templates/domain/domain-event.md) → `src/domain/events/<name>-*.event.ts`
   - [`templates/domain/repository-interface.md`](../templates/domain/repository-interface.md) → `src/domain/ports/repositories/<name>.repository.port.ts`
   - [`templates/infrastructure/read-service.md`](../templates/infrastructure/read-service.md) → `src/domain/ports/repositories/read/<name>-read.repository.port.ts`
6. Activate [`database-engineer`](../agents/database-engineer.md) agent:
   - [`templates/infrastructure/mongoose-schema.md`](../templates/infrastructure/mongoose-schema.md) → `src/infrastructure/persistence/mongoose/schemas/<name>.schema.ts`
   - [`templates/infrastructure/mongo-repository.md`](../templates/infrastructure/mongo-repository.md) → `src/infrastructure/persistence/mongoose/repositories/<name>.repository.ts`
   - [`templates/infrastructure/module.md`](../templates/infrastructure/module.md) → `src/infrastructure/modules/<name>.module.ts`
7. Update `docs/architecture/glossary.md` with new Ubiquitous Language terms.
8. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- `docs/domains/<name>/domain.md` specification
- Complete 4-layer file scaffold for the new domain
- Clean compilation and boundary validation

## Stop Conditions
- Ask user for confirmation if aggregate boundary overlaps with an existing domain.
