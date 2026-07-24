---
name: repository-design
description: Designs Mongoose database schemas, repository implementations, read repository ports, and Symbol DI token bindings.
---

# Repository Design Skill

## Instructions

1. Define repository port interface in Domain layer (`src/domain/ports/repositories/`).
2. Export Symbol DI token in `SCREAMING_SNAKE_CASE` (e.g. `ASSET_REPOSITORY`).
3. Define Read Repository Port in `src/domain/ports/repositories/read/`.
4. Define Mongoose Schema in Infrastructure layer (`src/infrastructure/persistence/mongoose/schemas/`) with `snake_case` fields.
5. Implement Mongo Repository (`src/infrastructure/persistence/mongoose/repositories/`):
   - Supports Transaction Runner session via `options?: { session?: unknown }`.
   - Maps bidirectional: Mongoose Document ↔ Aggregate Root.
6. Render template `.agents/templates/infrastructure/mongo-repository.md`.
