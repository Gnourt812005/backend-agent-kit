---
name: repository-design
description: Designs repository ports, read-repository ports, persistence models, and repository adapters for the project's datastore, including their composition-root binding.
---

# Repository Design Skill

## Instructions

1. Declare the repository port in the domain layer (`{domain}`) in domain terms: load by identity, save the aggregate. No query-builder leakage.
2. Declare a read-repository port for query use cases that returns DTOs.
3. Define the persistence model in `{infrastructure}` for the datastore in `docs/architecture/service.md`. Storage field names may differ from domain names.
4. Implement the repository adapter in `{infrastructure}`:
   - Joins the active unit of work so writes commit with outbox records.
   - Maps record ↔ aggregate in both directions, using the aggregate's rehydration path.
5. Bind ports to adapters in the composition root.
6. Render from `.agents/templates/infrastructure/persistence-model.md` and `.agents/templates/infrastructure/repository-adapter.md`.
