---
name: add-migration
description: Create a database migration or schema evolution script, with apply and rollback, for a data model change.
---

# Command: add-migration

## Intent
Create a migration for a data model change, using the project's migration tool.

## Preconditions
- Target (table or collection), change summary (indexes, new fields, backfill)

## Steps
1. Activate [`database-engineer`](../agents/database-engineer.md) agent.
2. Read the persistence model in `{infrastructure}` and `docs/domains/<domain>/domain.md`.
3. Create the migration where the project's migration tool expects it.
4. Include both apply and rollback steps. If a step cannot be rolled back, say so in the migration and the PR.
5. Make large backfills batched and resumable.
6. Update the schema documentation in `docs/domains/<domain>/domain.md`.
7. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- Migration with apply and rollback
- Updated schema documentation
