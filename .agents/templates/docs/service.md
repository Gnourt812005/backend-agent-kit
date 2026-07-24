# Service Context

## Identity
- **Name**: {{ServiceName}}
- **Owner Team**: {{OwnerTeam}}
- **Repo / Path**: {{RepoPath}}
- **Language**: TypeScript
- **Framework**: NestJS
- **Architecture**: Hexagonal + DDD + CQRS + Event-Driven

## Purpose
<!-- One paragraph: what problem this service solves -->

## Non-Goals
-

## SLOs / Non-Functionals
- Availability: 99.9%
- Latency p99: < 200ms
- Throughput:
- Consistency Model: Eventual consistency across bounded contexts via Outbox

## Runtime Stack
- Datastore: MongoDB (Mongoose)
- Message Bus: RabbitMQ
- Cache: Redis
- Auth Mechanism: JWT Bearer + Role Guards

## Deployment
- Runtime Target: Docker / Kubernetes
- Config Strategy: Environment variables via `@nestjs/config`
- Secrets Strategy: Secret Manager / K8s Secrets
