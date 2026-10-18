---
description: Naming conventions for domain, application, and adapter artifacts
paths:
  - "{source_root}/**"
  - "{tests}/**"
---

# Naming Conventions

These are *role* names. The active stack pack decides the concrete casing, file extensions, and file layout for the language (`rules/global/naming.md` in the pack overrides this file).

## Artifact roles

| Artifact | Name pattern | Lives in |
|----------|--------------|----------|
| Aggregate Root | `{Name}Root` or `{Name}` | `{domain}` |
| Entity | `{Name}Entity` or `{Name}` | `{domain}` |
| Value Object | `{Name}` (named for the concept, e.g. `EmailAddress`) | `{domain}` |
| Domain Event | `{Name}{PastTenseVerb}` (e.g. `OrderPlaced`) | `{domain}` |
| Domain Exception | `{Name}Error` / `{Name}Exception` | `{domain}` |
| Repository Port | `{Name}Repository` | `{domain}` |
| Read Repository Port | `{Name}ReadRepository` | `{domain}` or `{application}` |
| Service Port | `{Capability}Port` / `{Capability}Gateway` | `{domain}` or `{application}` |
| Command | `{Verb}{Name}Command` | `{application}` |
| Query | `{Get\|List\|Find}{Name}Query` | `{application}` |
| Handler | `{Command\|Query name}Handler` | `{application}` |
| DTO | `{UseCase}Input` / `{UseCase}Output` | `{application}` |
| Repository Adapter | `{Technology}{Name}Repository` | `{infrastructure}` |
| Persistence Model | `{Name}Record` / `{Name}Model` | `{infrastructure}` |
| Driving Adapter | `{Name}{Transport}Controller` / `{Name}{Transport}Handler` | `{api}` |

## Rules

1. Names come from the ubiquitous language in `docs/architecture/glossary.md`. Do not invent synonyms.
2. Adapter names carry their technology (`Postgres…`, `Redis…`, `Http…`); port names never do.
3. Persistence field casing may differ from domain casing. Map it in the adapter, never in the domain.
4. One public artifact per file, and the file name follows the artifact name in the language's convention.
