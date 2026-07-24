---
trigger: always_on
description: Mandatory layer dependency rules for Clean / Hexagonal Architecture
---

# Layer Dependency Rule

## Core Rule

**Infrastructure / Presentation → Application → Core**

Inner layers MUST NOT know about outer layers.

```
       ┌────────────────────────┐
       │   Presentation Layer   │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │   Application Layer    │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │       Core Layer       │
       └────────────────────────┘
                   ▲
                   │
       ┌───────────┴────────────┐
       │  Infrastructure Layer  │
       └────────────────────────┘
```

## Directives

1. **Core Layer (`src/core/`)**:
   - MUST contain pure domain logic only (Aggregates, Entities, Value Objects, Domain Events, Exceptions, Interfaces).
   - MUST NOT import NestJS, Mongoose, Express, Fastify, HTTP, or infrastructure libraries.
2. **Application Layer (`src/application/`)**:
   - MUST depend only on Core layer types and Port interfaces.
   - MUST NOT import concrete Mongoose repositories, controllers, or HTTP server libraries.
3. **Infrastructure Layer (`src/infrastructure/`)**:
   - Implements ports declared in Core layer (Repositories, Mailers, Sockets, Event Bus).
   - MUST NOT be imported directly by Core or Presentation controllers.
4. **Presentation Layer (`src/presentation/`)**:
   - Thin controllers that parse request DTOs and dispatch Commands/Queries.
   - MUST NOT bypass Application layer to execute raw database queries.
