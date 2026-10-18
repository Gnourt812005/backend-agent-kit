---
name: add-use-case
description: Add a new CQRS command (write) or query (read) use case to an existing domain, including input DTO validation and handler registration.
---

# Command: add-use-case

## Intent
Add a CQRS command handler or query handler to an existing domain.

## Preconditions
- Domain name, use case name (e.g. `PlaceOrder`, `ListOrders`), input parameters

## Steps
1. Read `docs/domains/<domain>/domain.md` and `docs/domains/<domain>/api.md`.
2. Determine type: write (command) or read (query).
3. Activate [`domain-modeler`](../agents/domain-modeler.md) (command) or [`database-engineer`](../agents/database-engineer.md) (query).
4. Run skill [`cqrs-generator`](../skills/cqrs-generator/SKILL.md).
5. Generate in `{application}` from templates:
   - Command: [`command.md`](../templates/application/command.md), [`dto.md`](../templates/application/dto.md), [`command-handler.md`](../templates/application/command-handler.md)
   - Query: [`query.md`](../templates/application/query.md), [`dto.md`](../templates/application/dto.md), [`query-handler.md`](../templates/application/query-handler.md)
6. Register the handler in the composition root.
7. Update `docs/domains/<domain>/api.md` with the new use case.
8. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- Command or query handler with validated input DTO
- Handler registration
- Updated domain API contract docs
