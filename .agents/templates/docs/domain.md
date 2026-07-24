---
domain: "{{DomainName}}"
generated-by: agent
last-updated: "{{CurrentDate}}"
status: draft # draft | reviewed | approved
---

# {{DomainName}} Domain Specification

## 1. Domain Overview

- **Purpose**: Describe business problem solved by {{DomainName}}.
- **Bounded Context**: Boundary and ownership.
- **Key Concepts**:

| Term | Definition | Ubiquitous Language Symbol |
|------|------------|----------------------------|

- **Relations**: Interactions with other domains.

## 2. Core Layer

### Aggregate Root: `{{DomainName}}Root`
- **File**: `src/core/aggregate-roots/{{domainName}}.aggregate.ts`
- **Properties**:

| Property | Type | Description |
|----------|------|-------------|

- **Factory Methods**:
  - `static create(props)` — Enforces initial invariants
  - `static instantiate(id, props)` — Reconstitutes aggregate from DB

- **Domain Methods**:
  - `updateStatus(newStatus)` — Triggers state transition and emits `{{DomainName}}StatusChangedEvent`.

### Entities
- `src/core/entities/`

### Value Objects
- `src/core/value-objects/`

### Enums
- `src/core/enums/`

### Domain Events
- `src/core/events/`

### Exceptions
- `src/core/exceptions/`

### Repository Interface Port
- `src/core/interfaces/repositories/{{domainName}}.repository.ts`
- **DI Token**: `{{DOMAIN_NAME}}_REPOSITORY`

## 3. State Machines

```
┌──────────┐     activate()      ┌──────────┐
│  DRAFT   ├────────────────────►│  ACTIVE  │
└──────────┘                     └──────────┘
```

| From Status | To Status | Method | Guard Invariants |
|-------------|-----------|--------|------------------|

## 4. Application Layer

### Commands (Write Path)
| Command | Handler | DTO | Description |
|---------|---------|-----|-------------|

### Queries (Read Path)
| Query | Handler | Read Service | Description |
|-------|---------|--------------|-------------|

## 5. Infrastructure Layer

- **Schema**: `src/infrastructure/mongo/schemas/{{domainName}}.schema.ts` (`{{domainName}}s` collection)
- **Repository Implementation**: `Mongo{{DomainName}}Repository`
- **Read Service**: `Mongo{{DomainName}}ReadService`
- **Module**: `src/infrastructure/modules/{{domainName}}.module.ts`

## 6. Presentation Layer

| Method | Path | Guards | Controller Method | Description |
|--------|------|--------|-------------------|-------------|

## 7. End-to-End Workflow Flows

### Flow 1: Create {{DomainName}}
```
Controller → Zod DTO → CommandBus → Handler (UoW) → {{DomainName}}Root.create() → Repo.save() → Outbox
```

## 8. File Map

| Layer | File Path |
|-------|-----------|
| Core | `src/core/aggregate-roots/{{domainName}}.aggregate.ts` |
| Application | `src/application/commands/` |
| Infrastructure | `src/infrastructure/mongo/schemas/{{domainName}}.schema.ts` |
| Presentation | `src/presentation/controllers/{{domainName}}/` |

## 9. Key Invariants

1. State changes MUST occur through Aggregate Root methods.
2. Database writes and outbox events MUST be executed inside Unit of Work transaction.
