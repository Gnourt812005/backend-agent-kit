---
template: entity
kind: structure
placeholders: [DomainName, EntityName]
layer: "{domain}"
---

# {{EntityName}} Entity

Entity: a child object with its own identity that lives inside an aggregate and changes only through its aggregate root.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Identity | Unique within the aggregate (or globally, if the domain needs it) |
| State | Domain attributes only |
| Behavior | Methods for its own invariants, called by the aggregate root |
| Access | Never loaded or saved on its own; always through the aggregate |

## Language-Neutral Sketch

```text
Entity {{EntityName}}  (inside {{DomainName}})
    state: id, ...
    create(input) -> {{EntityName}}     # validates own invariants
    rename(newName)                     # called by the aggregate root
```

## Post-Generation Checklist
- [ ] Has identity and equality by identity
- [ ] Not referenced directly by other aggregates
- [ ] Mutated only via the aggregate root
