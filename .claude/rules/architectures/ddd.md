---
description: Domain-Driven Design (DDD) tactical patterns rules
paths:
  - "src/domain/**"
---

<!-- GENERATED from .agents/rules/architectures/ddd.md by .agents/hooks/sync-claude-native.sh — edit the source, not this file. -->

# DDD Tactical Pattern Rules

- **Aggregate Root**: Boundary of consistency. Only Aggregate Roots can be retrieved directly from Repositories.
- **Entities**: Child objects with identity inside an aggregate.
- **Value Objects**: Immutable attributes compared by value.
- **Domain Events**: Facts capturing significant business state transitions.
- **Ubiquitous Language**: Class and property names MUST match terms documented in `docs/architecture/glossary.md`.
