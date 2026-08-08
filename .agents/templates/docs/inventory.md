# Project Inventory — `{{ServiceName}}`

<!-- Rendered by init-kit (adapt-existing mode) before customizing rules/templates/hooks. -->

## A. Directory Structure

| Question | Answer |
|----------|--------|
| What are your 4 layer directory names? (domain, application, infrastructure, api) | |
| Do you use any non-standard directories? (shared, grpc, kafka, cache, etc.) | |

## B. Naming Conventions

| Question | Answer |
|----------|--------|
| Aggregate Root class suffix? (e.g., `{Name}Root`, `{Name}Aggregate`) | |
| Aggregate Root file pattern? (e.g., `{name}.root.ts`, `{name}.aggregate.ts`) | |
| Value Object suffix? (e.g., `{Name}VO`, `{Name}Value`) | |
| Value Object file pattern? (e.g., `{name}.vo.ts`, `{name}.value-object.ts`) | |
| Entity suffix? (e.g., `{Name}Entity`) | |
| Entity file pattern? (e.g., `{name}.entity.ts`) | |
| Repository interface suffix? (e.g., `{Name}RepositoryPort`, `I{Name}Repository`) | |
| Repository file pattern? (e.g., `{name}.repository.port.ts`) | |
| Read repository suffix? (e.g., `{Name}ReadRepositoryPort`) | |
| Read repository file pattern? (e.g., `{name}-read.repository.port.ts`) | |
| DI token format? (e.g., `Symbol('NAME_REPOSITORY')`) | |
| Exception base class? (e.g., `DomainException`) | |
| Command/Query handler suffix? (e.g., `{Feature}Handler`) | |
| Command/Query handler file pattern? (e.g., `{feature}.handler.ts`) | |
| Command class pattern? (e.g., `{Feature}Command extends Command<Dto>`) | |
| Enum prefix? (e.g., `E{Name}`) | |
| Domain Event suffix? (e.g., `{Name}Event`) | |
| Domain Event file pattern? (e.g., `{name}.event.ts`) | |

## C. Base Classes & Core Abstractions

| Question | Answer |
|----------|--------|
| Aggregate Root base class name & path? | |
| Entity base class name & path? | |
| Value Object base class name & path? | |
| Domain Event base class name & path? | |
| Unit of Work / Transaction Runner interface name & path? | |
| Event Service interface name & path? | |

## D. Framework Patterns

| Question | Answer |
|----------|--------|
| Language & version? | |
| Framework? (NestJS, Fastify, Express, etc.) | |
| Database & ODM/ORM? (Mongoose, Prisma, TypeORM, etc.) | |
| Message bus? (RabbitMQ, Kafka, SQS, etc.) | |
| Validation library? (Zod, Joi, class-validator, etc.) | |
| Test framework? (Jest, Vitest, Mocha, etc.) | |
| API style? (REST, gRPC, GraphQL) | |
| Auth mechanism? (JWT, OAuth, CASL, etc.) | |
| Path aliases? (e.g., `@domain/*`, `@app/*`) | |
| Outbox implementation? (DB collection, table, etc.) | |
