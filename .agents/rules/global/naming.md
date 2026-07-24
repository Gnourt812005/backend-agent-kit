---
trigger: always_on
description: Naming conventions for classes, interfaces, files, and DI tokens
---

# Naming Conventions

## Class & File Naming Matrix

| Artifact | Class Pattern | File Pattern | Directory |
|----------|--------------|--------------|-----------|
| Aggregate Root | `{Domain}Root` | `<domain>.aggregate.ts` | `src/core/aggregate-roots/` |
| Entity | `{Name}` | `<name>.entity.ts` | `src/core/entities/` |
| Value Object | `{Name}VO` | `<name>.value-object.ts` | `src/core/value-objects/` |
| Domain Event | `{Name}Event` | `<name>.domain-event.ts` | `src/core/events/` |
| Enum | `E{Name}` | `<name>.enum.ts` | `src/core/enums/` |
| Exception | `{Domain}Exception` | `<domain>.exception.ts` | `src/core/exceptions/` |
| Repository Interface | `I{Name}Repository` | `<name>.repository.ts` | `src/core/interfaces/repositories/` |
| Command | `{Feature}Command` | `<feature>.command.ts` | `src/application/commands/<feature>/` |
| Command Handler | `{Feature}CommandHandler` | `<feature>.handler.ts` | `src/application/commands/<feature>/` |
| Query | `{Feature}Query` | `<feature>.query.ts` | `src/application/queries/<feature>/` |
| Query Handler | `{Feature}QueryHandler` | `<feature>.handler.ts` | `src/application/queries/<feature>/` |
| DTO | `{Feature}Dto` | `<feature>.dto.ts` | `src/application/commands/<feature>/` |
| Repository Impl | `Mongo{Name}Repository` | `<name>.repository.ts` | `src/infrastructure/mongo/repositories/` |
| Read Service Impl | `Mongo{Name}ReadService` | `<name>.read-service.ts` | `src/infrastructure/mongo/read-services/` |
| Mongoose Schema | `{Name}Model` / `{Name}Schema` | `<name>.schema.ts` | `src/infrastructure/mongo/schemas/` |
| Controller | `{Domain}AdminController` | `<domain>-admin.controller.ts` | `src/presentation/controllers/<domain>/` |

## Symbol Dependency Injection Tokens

Every port interface used in NestJS DI must export a `Symbol` constant in `SCREAMING_SNAKE_CASE`:

```typescript
export const CAMPAIGN_REPOSITORY = Symbol('CAMPAIGN_REPOSITORY');
export const CAMPAIGN_READ_SERVICE = Symbol('CAMPAIGN_READ_SERVICE');
```

## Database Schema Fields

Database schema fields (Mongoose props) MUST use `snake_case` in database storage while mapping to `camelCase` in TS properties.
