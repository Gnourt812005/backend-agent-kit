# Service Context

## Identity
- **Name**: Practical Backend Agent Kit
- **Owner Team**: Architecture
- **Repo / Path**: agent-kit
- **Language**: TypeScript
- **Framework**: NestJS
- **Architecture**: Hexagonal + DDD + CQRS + Event-Driven

## Purpose
A meta-kit for generating and refactoring backend services with clean architecture. Contains universal meta-kits (spec-driven development, refactoring, health checks) and a specialized NestJS stack foundation that can be customized per project.

## Non-Goals
- Does not contain application business logic
- Does not contain runtime service code
- Not a deployable service itself

## SLOs / Non-Functionals
- Availability: N/A (development kit)
- Latency p99: N/A
- Throughput: N/A
- Consistency Model: N/A

## Runtime Stack
- Datastore: MongoDB (Mongoose)
- Message Bus: Kafka
- Cache: Redis
- Search: Elasticsearch
- Auth Mechanism: gRPC metadata + CASL authorization
- API: gRPC + Kafka (not REST)

## Deployment
- Runtime Target: Development kit (not deployed)
- Config Strategy: N/A
- Secrets Strategy: N/A
