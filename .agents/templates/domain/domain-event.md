---
template: domain-event
kind: structure
placeholders: [EventName]
layer: "{domain}"
---

# {{EventName}} Domain Event

Domain event: an immutable record of a business fact that already happened, named in the past tense.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Name | Past tense: `OrderPlaced`, `PaymentFailed` |
| Payload | Aggregate ID plus the minimal facts consumers need; no aggregates or persistence models |
| Metadata | Event ID and occurred-at time; correlation ID is attached by the application layer |
| Immutability | Read-only after construction |

## Language-Neutral Sketch

```text
DomainEvent {{EventName}}
    eventId, occurredAt
    aggregateId
    ...facts (primitives or value objects)
```

## Post-Generation Checklist
- [ ] Past-tense name in the ubiquitous language
- [ ] Immutable
- [ ] Mapped to an integration event only in infrastructure, if published
