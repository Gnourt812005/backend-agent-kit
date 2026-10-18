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

| Term | Definition | Code Name |
|------|------------|----------------------------|

- **Relations**: Interactions with other domains.

## 2. Domain Layer

### Aggregate Root: `{{DomainName}}Root`
- **Location**: `{domain}` (file name per `rules/global/naming.md`)
- **Properties**:

| Property | Type | Description |
|----------|------|-------------|

- **Factory Methods**:
  - Creation factory — enforces initial invariants
  - Rehydration — reconstitutes the aggregate from persisted state

- **Domain Methods**:
  - `updateStatus(newStatus)` — Triggers state transition and emits `{{DomainName}}StatusChangedEvent`.

### Entities
- `{domain}`

### Value Objects
- `{domain}`

### Enums
- `{domain}`

### Domain Events
- `{domain}`

### Exceptions
- `{domain}`

### Repository Port
- `{{DomainName}}Repository` port in `{domain}`

### Read Repository Port
- `{{DomainName}}ReadRepository` port in `{domain}` or `{application}`

## 3. State Machines

```
┌──────────┐     activate()      ┌──────────┐
│  DRAFT   ├────────────────────►│  ACTIVE  │
└──────────┘                     └──────────┘
```

| From Status | To Status | Method | Guard Invariants |
|-------------|-----------|--------|------------------|

## 4. Applications Layer

### Commands (Write Path)
| Command | Handler | DTO | Description |
|---------|---------|-----|-------------|

### Queries (Read Path)
| Query | Handler | Read Repository | Description |
|-------|---------|--------------|-------------|

## 5. Infrastructure Layer

- **Persistence model**: <table / collection name, key indexes>
- **Repository adapter**: `<Technology>{{DomainName}}Repository`
- **Read repository adapter**: `<Technology>{{DomainName}}ReadRepository`
- **Wiring**: where the ports are bound in the composition root

## 6. API Layer

| Operation | Route / Method / Topic | Auth | Adapter | Description |
|--------|------|--------|------------|-------------|

## 7. End-to-End Workflow Flows

### Flow 1: Create {{DomainName}}
```
Driving adapter → validated input DTO → Command handler (unit of work) → {{DomainName}} creation factory → Repository.save() → Outbox
```

## 8. File Map

| Layer | File Path |
|-------|-----------|
| Domain | `{domain}/…` |
| Application | `{application}/…` |
| Infrastructure | `{infrastructure}/…` |
| API | `{api}/…` |

## 9. Key Invariants

1. State changes MUST occur through Aggregate Root methods.
2. Database writes and outbox records MUST commit in the same unit of work.
3. Read queries MUST bypass Aggregate Roots and use Read Repository Ports.

## 10. Decisions
<!-- Domain-scoped choices that rejected a plausible alternative, but aren't big enough for a full ADR (those go in docs/architecture/decisions/ instead). One row per decision. -->

| Date | Decision | Rejected Alternative(s) | Why |
|------|----------|--------------------------|-----|
