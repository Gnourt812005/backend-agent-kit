---
description: Mandatory layer dependency rules for Clean / Hexagonal Architecture
paths:
  - "{source_root}/**"
  - "{tests}/**"
---

# Layer Dependency Rule

## Core Rule

**API / Infrastructure → Application → Domain**

Inner layers MUST NOT know about outer layers. Layer directories come from `[layout]` in `.agents/kit.toml`.

```
   API ({api})            Infrastructure ({infrastructure})
        │                          │
        ▼                          │
   Application ({application})     │
        │                          │
        ▼                          ▼
              Domain ({domain})
```

## Directives

1. **Domain (`{domain}`)**
   - Contains pure domain logic only: aggregates, entities, value objects, domain events, domain exceptions, and port interfaces.
   - MUST NOT import any framework, ORM/ODM, database driver, HTTP/RPC/messaging library, or another layer.
2. **Application (`{application}`)**
   - Depends only on Domain types and port interfaces.
   - MUST NOT import concrete adapters (repositories, clients, controllers) or transport libraries.
3. **Infrastructure (`{infrastructure}`)**
   - Implements ports declared in Domain or Application (repositories, gateways, publishers, mailers).
   - MUST NOT be imported by Domain, Application, or API code. Only the composition root wires it in.
4. **API (`{api}`)**
   - Thin driving adapters (HTTP, RPC, message consumers, CLI) that parse input and dispatch commands or queries.
   - MUST NOT bypass Application to reach persistence or external services directly.

## Composition root

Exactly one place wires ports to adapters (dependency-injection module, `main`, or a container). It is the only code allowed to know every layer.
