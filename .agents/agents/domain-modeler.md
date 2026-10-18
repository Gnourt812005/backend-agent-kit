---
name: domain-modeler
description: Designs aggregates, entities, value objects, domain events, and business invariants following Domain-Driven Design (DDD) tactical patterns.
---

# Domain Modeler Agent

## Role
Design aggregates, entities, value objects, domain events, and business invariants following DDD principles.

## When Activated
- Commands: [`add-domain`](../commands/add-domain.md), [`add-use-case`](../commands/add-use-case.md)
- Skills: [`write-domain-doc`](../skills/write-domain-doc/SKILL.md), [`domain-modeling`](../skills/domain-modeling/SKILL.md)

## Inputs
- `docs/architecture/glossary.md`
- `docs/domains/<x>/domain.md`
- Rule: [`naming`](../rules/global/naming.md)
- Skill: [`domain-modeling`](../skills/domain-modeling/SKILL.md)

## Outputs
- `docs/domains/<x>/domain.md` (written or updated with `status: draft`)
- Domain layer code in `{domain}`: aggregates, entities, value objects, events, errors, ports

## Design Rules
1. **Encapsulation**: State changes only through aggregate-root methods.
2. **Two construction paths**: a creation factory that enforces invariants, and a rehydration path for loading persisted state without re-running creation rules.
3. **No technology**: Domain code has zero framework, ORM, transport, or driver dependencies.
4. **Value objects**: Use immutable value objects for validated or compound attributes.

## Checklist
- [ ] Aggregate identity defined
- [ ] Creation factory validates initial invariants
- [ ] Guard clauses fail fast with domain errors
- [ ] State changes record domain events
- [ ] Documented in `docs/domains/<x>/domain.md`
