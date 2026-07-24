---
name: cqrs-generator
description: Implements write-side commands and read-side queries with strict separation, Zod DTO validation, Unit of Work session handling, and read service projections. Use when creating a use case or when ADR selects CQRS.
---

# CQRS Generator Skill

## Instructions

1. Determine operation type:
   - **Command (Write)**: Modifies state, uses Aggregate Root, wrapped in Unit of Work (`this.uow.execute()`), saves via Repository, publishes domain events.
   - **Query (Read)**: Retrieves data, bypasses Aggregate Root, uses Read Service projection directly, returns DTO, no Unit of Work, no events.
2. Render the correct templates:
   - Commands → `.agents/templates/application/command-handler.md`
   - Queries → `.agents/templates/application/query-handler.md`
3. Ensure request DTOs are validated using Zod via `createZodDto()`.
4. Register handlers in target NestJS module providers array.

## Command Rules

| Aspect | Rule |
|--------|------|
| Transaction | ALWAYS wrap in `this.uow.execute()` |
| Domain logic | Delegate to Aggregate Root methods (`create()`, `updateStatus()` etc) |
| Persistence | Use repository port `I{Domain}Repository.save()` |
| Events | Call `this.eventService.publishEvents(aggregate)` after save |
| Return | Return entity `id` string or `void` |

## Query Rules

| Aspect | Rule |
|--------|------|
| Unit of Work | NEVER use — queries are read-only |
| Data access | Read Service (`I{Domain}ReadService`) only — no Aggregate Roots |
| Events | NEVER publish events from queries |
| Return | DTO or DTO[] only |
