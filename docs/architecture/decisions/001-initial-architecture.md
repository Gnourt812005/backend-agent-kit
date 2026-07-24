# Architecture Decision Record (ADR)

## Title: 001-initial-architecture

- **Status**: Accepted
- **Date**: 2026-07-24
- **Author**: Agent Kit

## Context
The agent kit needs a consistent architecture for generating backend services. The kit must support both specialized (NestJS + Hexagonal + DDD + CQRS + MongoDB + Kafka) and universal (stack-agnostic) components.

## Decision
Adopt Hexagonal Architecture (Ports & Adapters) + DDD Tactical Patterns + CQRS + Event-Driven with Transactional Outbox as the default architecture for the specialized stack. Separate universal meta-kits (spec-driven development, refactoring, health checks) from stack-specific components.

## Consequences
### Positive
- Clear separation of concerns with boundary enforcement
- Stack-agnostic universal meta-kits that travel across projects
- Comprehensive documentation-first workflow
- Git-anchored incremental health checks

### Negative / Trade-offs
- Initial learning curve for the agent kit workflow
- Requires consistent documentation maintenance
- Template customization needed per project

## Compliance
Agents and engineers must follow this ADR unless explicitly superseded by a newer ADR.
