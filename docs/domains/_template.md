---
domain: "_template"
generated-by: agent
last-updated: "2026-07-24"
status: draft # draft | reviewed | approved
---

# Domain Specification Template

> Copy this file to `docs/domains/<your-domain>/domain.md` and fill in the details.

## 1. Domain Overview

- **Purpose**: Describe business problem solved by this domain.
- **Bounded Context**: Boundary and ownership.
- **Key Concepts**:

| Term | Definition | Ubiquitous Language Symbol |
|------|------------|----------------------------|

- **Relations**: Interactions with other domains.

## 2. Domain Layer

### Aggregate Root
- **File**: `src/domain/aggregate-roots/<name>.root.ts`
- **Properties**:

| Property | Type | Description |
|----------|------|-------------|

### Entities
- `src/domain/entities/`

### Value Objects
- `src/domain/value-objects/`

### Enums
- `src/domain/enums/`

### Domain Events
- `src/domain/events/`

### Exceptions
- `src/domain/exceptions/`

### Repository Port
- `src/domain/ports/repositories/<name>.repository.port.ts`

### Read Repository Port
- `src/domain/ports/repositories/read/<name>-read.repository.port.ts`

## 3. Applications Layer

### Commands (Write Path)
| Command | Handler | DTO | Description |
|---------|---------|-----|-------------|

### Queries (Read Path)
| Query | Handler | Read Repository | Description |
|-------|---------|--------------|-------------|

## 4. Infrastructure Layer

- **Schema**: `src/infrastructure/persistence/mongoose/schemas/<name>.schema.ts`
- **Repository**: `Mongo<Name>Repository`
- **Module**: `src/infrastructure/modules/<name>.module.ts`

## 5. API Layer

| Method | Service | Controller | Description |
|--------|---------|------------|-------------|
