---
template: outbox-producer
kind: structure
placeholders: [EventName]
layer: "{infrastructure}"
---

# {{EventName}} Outbox Producer

Outbox producer: maps domain events to versioned integration events and writes outbox rows in the current transaction (see skill `uow-outbox`).

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Mapping | Domain event → integration event (type, version, payload) |
| Write | Outbox rows inserted with the caller's transaction context |
| Routing | Broker destination stored with the row |
| Context | Correlation ID copied onto the row |

## Language-Neutral Sketch

```text
publish(aggregate, tx):
    for e in aggregate.pullDomainEvents():
        ie = map(e)                       # skip if not public
        outbox.insert({id, type: ie.type, version, payload, routing, correlationId, status: pending}, tx)
    relay.signal()
```

## Post-Generation Checklist
- [ ] Rows written in the same transaction as the aggregate
- [ ] Integration event schema versioned and documented
- [ ] Relay retries bounded; consumers idempotent
