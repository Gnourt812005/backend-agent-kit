---
name: add-event
description: Add a domain event or integration event with transactional outbox publishing or an idempotent consumer, including schema documentation in docs/domains/<x>/events.md.
---

# Command: add-event

## Intent
Add a domain or integration event, published through the transactional outbox or consumed from the project's broker.

## Preconditions
- Domain name, event name (e.g. `OrderPlaced`), producer or consumer side

## Steps
1. Activate [`event-designer`](../agents/event-designer.md) agent.
2. Read `docs/domains/<domain>/events.md`.
3. Run skill [`event-contract-design`](../skills/event-contract-design/SKILL.md).
4. Generate from templates:
   - [`templates/domain/domain-event.md`](../templates/domain/domain-event.md) → `{domain}`
   - [`templates/infrastructure/outbox-producer.md`](../templates/infrastructure/outbox-producer.md) → `{infrastructure}`
5. If consuming: generate an idempotent consumer as a driving adapter in `{api}` (or `{infrastructure}`, per the project's layout).
6. Update `docs/domains/<domain>/events.md`.
7. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- Typed domain and integration event definitions
- Outbox publishing wired into the write transaction
- Documented, versioned event schema in `docs/domains/<domain>/events.md`
