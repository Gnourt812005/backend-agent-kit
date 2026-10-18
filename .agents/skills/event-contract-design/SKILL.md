---
name: event-contract-design
description: Designs domain events, integration events, transactional outbox producers, and idempotent message consumers.
---

# Event Contract Design Skill

## Instructions

1. Distinguish event scopes:
   - **Domain event**: internal fact in the domain layer (`{domain}`), named in the past tense.
   - **Integration event**: versioned public contract published to the broker from `{infrastructure}`.
2. Implement the outbox (see skill `uow-outbox`):
   - Map domain events to integration events.
   - Insert outbox records inside the aggregate's unit of work.
3. Design consumers to be idempotent: deduplicate by event ID and tolerate reordering.
4. Render templates:
   - Event: `.agents/templates/domain/domain-event.md`
   - Outbox producer: `.agents/templates/infrastructure/outbox-producer.md`
5. Document event contracts, versions, and producers/consumers in `docs/domains/<domain>/events.md`.
