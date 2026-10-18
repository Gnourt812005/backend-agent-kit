---
template: command
kind: structure
placeholders: [FeatureName]
layer: "{application}"
---

# {{FeatureName}} Command

Command: an immutable request to change state, carrying already-validated input and the acting identity.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Name | Imperative: `PlaceOrder`, `CancelOrder` |
| Payload | Validated input DTO fields plus actor/correlation context |
| Immutability | Read-only after construction |

## Language-Neutral Sketch

```text
Command {{FeatureName}}
    actor, correlationId
    ...validated input fields
```

## Post-Generation Checklist
- [ ] Imperative name
- [ ] Immutable
- [ ] Contains no domain objects or persistence types
