---
name: domain-modeling
description: Models aggregate roots, entities, value objects, domain invariants, and domain events using ubiquitous language. Use when creating aggregates or clarifying business rules.
---

# Domain Modeling Skill

## Instructions

1. Read `docs/domains/<domain>/domain.md` for business requirements and invariants.
2. Identify aggregate boundaries:
   - An aggregate is a consistency boundary: everything inside it changes atomically.
   - Reference other aggregates by identity only.
3. Enforce invariants inside the aggregate root:
   - A creation factory that validates the initial invariants.
   - A rehydration path that rebuilds persisted state without re-running creation rules.
   - Private fail-fast guards that raise domain errors.
4. Model validated or compound attributes as immutable value objects.
5. Record each meaningful state change as a domain event on the aggregate, to be pulled by the application layer after saving.
6. Render from `.agents/templates/domain/`.
