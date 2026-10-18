---
description: Mandatory layer dependency rules for Clean / Hexagonal Architecture
paths:
  - "src/**"
  - "test/**"
---

<!-- GENERATED from .agents/rules/global/dependency-rule.md by .agents/hooks/sync-claude-native.sh — edit the source, not this file. -->

# Layer Dependency Rule

## Core Rule

**Infrastructure / API → Applications → Domain**

Inner layers MUST NOT know about outer layers.

```
       ┌────────────────────────┐
       │       API Layer        │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │   Applications Layer   │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │     Domain Layer       │
       └────────────────────────┘
                   ▲
                   │
       ┌───────────┴────────────┐
       │  Infrastructure Layer  │
       └────────────────────────┘
```

## Directives

1. **Domain Layer (`src/domain/`)**:
   - MUST contain pure domain logic only (Aggregates, Entities, Value Objects, Domain Events, Exceptions, Ports).
   - MUST NOT import NestJS, Mongoose, Express, Fastify, HTTP, or infrastructure libraries.
2. **Applications Layer (`src/applications/`)**:
   - MUST depend only on Domain layer types and Port interfaces.
   - MUST NOT import concrete Mongoose repositories, API controllers, or HTTP server libraries.
3. **Infrastructure Layer (`src/infrastructure/`)**:
   - Implements ports declared in Domain layer (Repositories, Mailers, Sockets, Event Bus).
   - MUST NOT be imported directly by Domain or API layers.
4. **API Layer (`src/api/`)**:
   - Thin gRPC/Kafka controllers that parse request DTOs and dispatch Commands/Queries.
   - MUST NOT bypass Applications layer to execute raw database queries.
