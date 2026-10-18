---
template: read-service
kind: structure
placeholders: [DomainName]
layer: "{infrastructure}"
---

# {{DomainName}} Read Repository Adapter

Read repository adapter: serves query handlers directly from storage or projections, returning DTOs.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Implements | `{{DomainName}}ReadRepository` |
| Projection | Selects only needed fields; no aggregate rehydration |
| Pagination | Bounded, stable ordering |

## Language-Neutral Sketch

```text
Adapter <Tech>{{DomainName}}ReadRepository
    list(filter, page): rows = db.query(select fields, where filter, order, limit); return map(toDto, rows)
```

## Post-Generation Checklist
- [ ] No aggregate created
- [ ] Query uses an index
- [ ] Page size capped
