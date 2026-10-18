---
template: value-object
kind: structure
placeholders: [ValueObjectName]
layer: "{domain}"
---

# {{ValueObjectName}} Value Object

Value object: an immutable value defined by its attributes, validated at construction (e.g. `EmailAddress`, `Money`).

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Validation | Construction fails with a domain error if the value is invalid |
| Immutability | No setters; changes return a new instance |
| Equality | By value, comparing all attributes |
| Behavior | Domain operations on the value (e.g. `Money.add`), when meaningful |

## Language-Neutral Sketch

```text
ValueObject {{ValueObjectName}}
    of(raw) -> {{ValueObjectName}}     # validate, normalize, or raise error
    equals(other) -> bool              # compare all attributes
```

## Post-Generation Checklist
- [ ] Invalid input cannot produce an instance
- [ ] Immutable after construction
- [ ] Value equality implemented
