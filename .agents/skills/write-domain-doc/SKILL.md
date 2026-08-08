---
name: write-domain-doc
description: Generate or update comprehensive Clean Architecture domain documentation under docs/domains/<name>/domain.md. Supports two modes: 'generate' (new domain from business rules) and 'document' (scan existing codebase).
---

# Write Domain Documentation Skill

This skill creates or updates a domain specification in `docs/domains/<domain>/domain.md` following the structure defined in [`templates/docs/domain.md`](../../templates/docs/domain.md) — 10 mandatory sections (Overview → Domain Layer → State Machines → Applications Layer → Infrastructure Layer → API Layer → E2E Flows → File Map → Key Invariants → Decisions). Do not invent, skip, or reorder sections; render the template as-is and fill it in.

## Modes of Operation

1. **`generate` mode** (New domain): Writes domain doc from user prompt/business description before code is generated. Frontmatter is set to `status: draft`.
2. **`document` mode** (Existing domain): Scans source code under `src/` to reverse-engineer and document implemented behavior. Frontmatter is set to `status: reviewed`.

## Document Frontmatter Format

```yaml
---
domain: Campaign
generated-by: agent
last-updated: 2026-07-23
status: draft # draft | reviewed | approved
---
```

## Section 10 — Decisions

Add one row whenever a domain-scoped choice rejected a plausible alternative (e.g. why an attribute became a Value Object instead of a primitive, why one aggregate boundary was chosen over another). If the decision is cross-domain or architectural rather than scoped to this one domain, write an ADR instead (`architect` agent, `templates/docs/adr.md`) and link it here rather than duplicating it.

## Execution Steps

1. **Extract Domain Name**: PascalCase (e.g., `Campaign`, `Order`).
2. **Determine Mode**:
   - If `src/domain/aggregate-roots/<domain>.root.ts` exists → `document` mode.
   - If creating new domain → `generate` mode.
3. **Execute Mode Flow**:
   - **In `generate` mode**: Clone `templates/docs/domain.md` → `docs/domains/<domain>/domain.md`, fill every section from requirements, set `status: draft`.
   - **In `document` mode**: Scan all 4 layers under `src/`, extract properties and methods, fill every section, set `status: reviewed`.
4. **Update Glossary**: Append new ubiquitous language terms to `docs/architecture/glossary.md`.
