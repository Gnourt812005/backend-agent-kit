---
template: query
kind: structure
placeholders: [FeatureName]
layer: "{application}"
---

# {{FeatureName}} Query

Query: an immutable read request with filter and pagination parameters.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Name | `Get…`, `List…`, `Find…` |
| Payload | Filters, sort, pagination, actor for authorization |
| Immutability | Read-only |

## Language-Neutral Sketch

```text
Query {{FeatureName}}
    actor
    filter, sort, page
```

## Post-Generation Checklist
- [ ] Read-only intent
- [ ] Pagination bounded with a maximum page size
