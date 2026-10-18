---
name: cqrs-generator
description: Implements write-side commands and read-side queries with strict separation, validated input DTOs, unit-of-work transactions, and read projections. Use when creating a use case or when an ADR selects CQRS.
---

# CQRS Generator Skill

## Instructions

1. Determine the operation type:
   - **Command (write)**: changes state through an aggregate, runs inside a unit of work, saves through a repository port, records domain events, and publishes them through the outbox in the same transaction.
   - **Query (read)**: reads through a read-repository port, returns DTOs, uses no aggregate, no transaction, and no events.
2. Render the matching templates:
   - Commands → `.agents/templates/application/command-handler.md`
   - Queries → `.agents/templates/application/query-handler.md`
3. Validate the input DTO before the handler runs.
4. Register the handler with the project's dispatch mechanism (bus, mediator, or plain functions) in the composition root.

## Command Rules

| Aspect | Rule |
|--------|------|
| Transaction | Always run inside one unit of work covering the save and its outbox records |
| Domain logic | Delegate to aggregate methods; the handler orchestrates, never decides |
| Persistence | Repository port only |
| Events | Publish the aggregate's pending events through the outbox, inside the same transaction |
| Return | Identifier or nothing |

## Query Rules

| Aspect | Rule |
|--------|------|
| Transaction | Never |
| Data access | Read-repository / projection port only, no aggregates |
| Events | Never |
| Return | DTO or list of DTOs |
