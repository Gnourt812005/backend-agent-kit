---
template: repository-interface
kind: structure
placeholders: [DomainName]
layer: "{domain}"
---

# {{DomainName}} Repository Ports

Repository ports: interfaces in domain terms for loading and saving the aggregate (write side) and for reading DTOs (read side).

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Write port | `findById(id)`, `save(aggregate, tx?)`, and other aggregate-level operations; nothing else |
| Read port | Query methods returning DTOs or pages of DTOs for query handlers |
| Transaction context | Write methods accept an optional unit-of-work context |
| No leakage | No query builders, driver types, or storage concepts in signatures |

## Language-Neutral Sketch

```text
port {{DomainName}}Repository
    findById(id) -> {{DomainName}} | none
    save(aggregate, tx?)

port {{DomainName}}ReadRepository
    getById(id) -> {{DomainName}}Dto | none
    list(filter, page) -> Page<{{DomainName}}ListItemDto>
```

## Post-Generation Checklist
- [ ] Signatures speak the domain language only
- [ ] Write port returns aggregates; read port returns DTOs
- [ ] Ports bound to adapters only in the composition root
