---
name: event-contract-design
description: Designs domain events, integration events, transactional outbox producers, and idempotent message queue consumers.
---

# Event Contract Design Skill

## Instructions

1. Distinguish event scopes:
   - **Domain Event**: Internal fact in Core layer (`src/core/events/`).
   - **Integration Event**: Public contract sent via RabbitMQ / Outbox (`src/infrastructure/events/`).
2. Implement Outbox pattern:
   - Domain event mapped to Integration Event.
   - Inserted into Outbox collection within the aggregate's Unit of Work transaction.
3. Render templates:
   - Event class: `.agents/templates/domain/domain-event.md`
   - Outbox producer: `.agents/templates/infrastructure/outbox-producer.md`
4. Document event contracts in `docs/domains/<domain>/events.md`.
