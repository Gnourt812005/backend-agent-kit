# Project Inventory — `{{ServiceName}}`

<!-- Rendered by init-kit (adapt-existing mode) before customizing rules/templates/hooks. -->

## A. Directory Structure

| Question | Answer |
|----------|--------|
| What are your 4 layer directory names? (domain, application, infrastructure, api) | |
| Do you use any non-standard directories? (shared, transport-specific, cache, etc.) | |

## B. Naming Conventions

| Question | Answer |
|----------|--------|
| Aggregate Root class suffix? (e.g., `{Name}Root`, `{Name}Aggregate`) | |
| Aggregate Root file pattern? (e.g., `order.root.*`, `order_aggregate.*`, `Order.*`) | |
| Value Object suffix? (e.g., `{Name}VO`, `{Name}Value`) | |
| Value Object file pattern? (e.g., `email.vo.*`, `email_address.*`) | |
| Entity suffix? (e.g., `{Name}Entity`) | |
| Entity file pattern? (e.g., `order_line.*`, `order-line.entity.*`) | |
| Repository interface suffix? (e.g., `{Name}RepositoryPort`, `I{Name}Repository`) | |
| Repository file pattern? (e.g., `order_repository.*`, `order.repository.port.*`) | |
| Read repository suffix? (e.g., `{Name}ReadRepositoryPort`) | |
| Read repository file pattern? (e.g., `order_read_repository.*`) | |
| Dependency injection / wiring style? (container, framework DI, manual wiring in main) | |
| Exception base class? (e.g., `DomainException`) | |
| Command/Query handler suffix? (e.g., `{Feature}Handler`) | |
| Command/Query handler file pattern? (e.g., `place_order_handler.*`, `place-order.handler.*`) | |
| Command class pattern? (e.g., `{Feature}Command extends Command<Dto>`) | |
| Enum prefix? (e.g., `E{Name}`) | |
| Domain Event suffix? (e.g., `{Name}Event`) | |
| Domain Event file pattern? (e.g., `order_placed.*`, `order-placed.event.*`) | |

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
| Framework? (e.g., NestJS, Gin, FastAPI, Spring, none) | |
| Database & ODM/ORM? (e.g., Mongoose, Prisma, GORM, SQLAlchemy, raw driver) | |
| Message bus? (e.g., RabbitMQ, Kafka, SQS, NATS, none) | |
| Validation library? (e.g., Zod, go-playground/validator, Pydantic) | |
| Test framework? (e.g., Jest, Vitest, go test, pytest) | |
| API style? (REST, gRPC, GraphQL) | |
| Auth mechanism? (e.g., JWT, OAuth2/OIDC, API keys; authorization library) | |
| Path aliases? (e.g., `@domain/*`, `@app/*`) | |
| Outbox implementation? (DB collection, table, etc.) | |
