---
template: aggregate
kind: structure
placeholders: [DomainName, DOMAIN_NAME]
layer: "{domain}"
---

# {{DomainName}} Aggregate Root

Aggregate root: the consistency boundary that owns state transitions, enforces business invariants, and records domain events.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Identity | A stable ID generated or assigned at creation |
| State | Pure domain attributes only, with no persistence IDs, ORM metadata, or framework types |
| Creation factory | Validates initial invariants and creates a new instance; the only way to create a brand-new aggregate |
| Rehydration | Rebuilds an existing aggregate from persisted state without re-running creation rules; used only by repositories |
| Domain methods | Named after business actions (`cancel`, `ship`), never generic setters |
| Guards | Private fail-fast checks that raise domain errors with stable codes |
| Domain events | Recorded on each meaningful state change and pulled by the application after saving |
| Encapsulation | Construction and state are not mutable from outside |

## Language-Neutral Sketch

```text
Aggregate {{DomainName}}
    state: id, ownerId, status, createdAt, updatedAt

    create(input) -> {{DomainName}}
        require input.ownerId else error({{DOMAIN_NAME}}_INVALID_OWNER)
        return new {{DomainName}}(id=new_id(), status=DRAFT, ...)

    rehydrate(state) -> {{DomainName}}      # repositories only

    changeStatus(newStatus)
        guard transitionAllowed(status, newStatus)   # raises {{DOMAIN_NAME}}_INVALID_TRANSITION
        previous = status; status = newStatus; touch updatedAt
        record {{DomainName}}StatusChanged(id, previous, newStatus)

    pullDomainEvents() -> events   # returns and clears recorded events
```

## Post-Generation Checklist
- [ ] Creation factory and rehydration both exist and are distinct
- [ ] Every invariant is guarded with a domain error carrying a stable code
- [ ] Each state change records a domain event
- [ ] No framework, ORM, or transport import in the file
