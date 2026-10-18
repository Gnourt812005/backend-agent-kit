---
description: Naming conventions for classes, interfaces, files, and DI tokens
paths:
  - "src/**"
  - "test/**"
---

# Naming Conventions

## Class & File Naming Matrix

| Artifact | Class Pattern | File Pattern | Directory |
|----------|--------------|--------------|-----------|
| Aggregate Root | `{Name}Root` | `<name>.root.ts` | `src/domain/aggregate-roots/` |
| Entity | `{Name}Entity` | `<name>.entity.ts` | `src/domain/entities/` |
| Value Object | `{Name}VO` | `<name>.vo.ts` | `src/domain/value-objects/` |
| Domain Event | `{Name}Event` | `<name>.event.ts` | `src/domain/events/` |
| Enum | `E{Name}` | `<name>.enum.ts` | `src/domain/enums/` |
| Exception | `{Name}Exception` | `<name>.exception.ts` | `src/domain/exceptions/` |
| Repository Port | `{Name}RepositoryPort` | `<name>.repository.port.ts` | `src/domain/ports/repositories/` |
| Read Repository Port | `{Name}ReadRepositoryPort` | `<name>-read.repository.port.ts` | `src/domain/ports/repositories/read/` |
| Service Port | `{Name}Port` | `<name>.port.ts` | `src/domain/ports/services/` |
| Command | `{Feature}Command` | `<feature>.command.ts` | `src/applications/commands/<feature>/` |
| Command Handler | `{Feature}Handler` | `<feature>.handler.ts` | `src/applications/commands/<feature>/` |
| Query | `{Feature}Query` | `<feature>.query.ts` | `src/applications/queries/<feature>/` |
| Query Handler | `{Feature}Handler` | `<feature>.handler.ts` | `src/applications/queries/<feature>/` |
| DTO | `{Feature}Dto` | `<feature>.dto.ts` | `src/applications/dtos/` |
| Repository Impl | `Mongo{Name}Repository` | `<name>.repository.ts` | `src/infrastructure/persistence/mongoose/repositories/` |
| Read Repository Impl | `Mongo{Name}ReadRepository` | `<name>-read.repository.ts` | `src/infrastructure/persistence/mongoose/repositories/` |
| Mongoose Schema | `{Name}Model` / `{Name}Schema` | `<name>.schema.ts` | `src/infrastructure/persistence/mongoose/schemas/` |
| gRPC Controller | `{Name}GrpcController` | `<name>.grpc.controller.ts` | `src/api/grpc/` |
| Kafka Controller | `{Name}KafkaController` | `<name>.kafka.controller.ts` | `src/api/kafka/` |

## Symbol Dependency Injection Tokens

Every port interface used in NestJS DI must export a `Symbol` constant in `SCREAMING_SNAKE_CASE`:

```typescript
export const ASSET_REPOSITORY = Symbol('ASSET_REPOSITORY');
export const ASSET_READ_REPOSITORY = Symbol('ASSET_READ_REPOSITORY');
export const MONGO_TRANSACTION_RUNNER = Symbol('MONGO_TRANSACTION_RUNNER');
export const EVENT_SERVICE = Symbol('IEventService');
```

## Path Aliases

Use TypeScript path aliases defined in `tsconfig.json`:

| Alias | Maps To |
|-------|---------|
| `@domain/*` | `src/domain/*` |
| `@applications/*` | `src/applications/*` |
| `@shared/*` | `src/shared/*` |
| `@api/*` | `src/api/*` |
| `@infrastructure/*` | `src/infrastructure/*` |
| `@app/*` | `src/app/*` |
| `@security/*` | `src/security/*` |

## Database Schema Fields

Database schema fields (Mongoose props) MUST use `snake_case` in database storage while mapping to `camelCase` in TS properties.
