---
template: persistence-model
kind: structure
placeholders: [DomainName, domainName]
layer: "{infrastructure}"
---

# {{DomainName}} Persistence Model

Persistence model: how the aggregate is stored in the project's datastore (table, collection, or document).

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Fields | Storage names may differ from domain names (e.g. snake_case); the mapping lives in the adapter |
| Keys and indexes | Derived from documented access patterns in `docs/domains/<x>/domain.md` |
| Concurrency | A version or timestamp field if concurrent updates are possible |
| Audit | Created/updated timestamps |

## Language-Neutral Sketch

```text
{{domainName}}s
    id (pk), owner_id (index), status (index), version, created_at, updated_at
```

## Post-Generation Checklist
- [ ] Every index justified by an access pattern
- [ ] Optimistic concurrency field where needed
- [ ] Matches the migration that creates it
