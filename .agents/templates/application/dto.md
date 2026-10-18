---
template: dto
kind: structure
placeholders: [FeatureName]
layer: "{application}"
---

# {{FeatureName}} DTOs

Input/output DTOs for a use case. Input DTOs are validated at the driving adapter with the project's validation library.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Input DTO | Fields, types, constraints (required, length, ranges, formats) |
| Output DTO | Only what the caller needs; never internal IDs or secrets the caller shouldn't see |
| Validation | Declared once, executed at the adapter boundary |
| Independence | No aggregates, persistence models, or transport types |

## Language-Neutral Sketch

```text
{{FeatureName}}Input:  customerId (uuid, required), items (1..50) ...
{{FeatureName}}Output: orderId
```

## Post-Generation Checklist
- [ ] Every input field has explicit constraints
- [ ] Output exposes no internal-only data
- [ ] Validation runs before the handler
