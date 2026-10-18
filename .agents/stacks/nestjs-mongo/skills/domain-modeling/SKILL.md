---
name: domain-modeling
description: Models aggregate roots, entities, value objects, domain invariants, and domain events using ubiquitous language. Use when creating aggregates or clarifying business rules.
---

# Domain Modeling Skill

## Instructions

1. Read `docs/domains/<domain>/domain.md` for business requirements and invariants.
2. Identify aggregate boundaries:
   - Consistency boundary: State changes within an aggregate must be strictly transactional.
   - Aggregate Root: Single entry point class (`{Name}Root`).
3. Enforce invariants inside the Aggregate Root:
   - Provide `static create(input)` factory with invariant checks.
   - Provide `static rehydrateProps(props)` for database reconstitution.
   - Use private `assert*()` fail-fast methods.
4. Represent complex attributes as immutable Value Objects (`BaseValueObject`).
5. Record state changes as Domain Events using `this.addDomainEvent(new SomeEvent(...))`.
6. Refer to templates: `.agents/templates/domain/`.
