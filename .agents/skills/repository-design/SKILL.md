---
name: repository-design
description: Designs Mongoose database schemas, repository implementations, read services, and Symbol DI token bindings.
---

# Repository Design Skill

## Instructions

1. Define repository interface port in Core layer (`src/core/interfaces/repositories/`).
2. Export Symbol DI token in `SCREAMING_SNAKE_CASE` (e.g. `CAMPAIGN_REPOSITORY`).
3. Define Mongoose Schema in Infrastructure layer (`src/infrastructure/mongo/schemas/`) with `snake_case` fields.
4. Implement Mongo Repository (`src/infrastructure/mongo/repositories/`):
   - Supports Unit of Work database session.
   - Maps bidirectional: Mongoose Document ↔ Aggregate Root.
5. Render template `.agents/templates/infrastructure/mongo-repository.md`.
