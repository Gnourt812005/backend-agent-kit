# Service Context

## Identity
- **Name**: {{ServiceName}}
- **Owner Team**: {{OwnerTeam}}
- **Repo / Path**: {{RepoPath}}
- **Language**: {{Language}}
- **Framework**: {{Framework}}
- **Stack pack**: {{StackPack or none}}
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
- Datastore: {{Datastore and access library}}
- Message Bus: {{Broker, or none}}
- Cache: {{Cache, or none}}
- Search: {{Search engine, or none}}
- Auth Mechanism: {{Authentication and authorization approach}}
- API: {{Transport(s): REST / gRPC / GraphQL / messaging}}

## Deployment
- Runtime Target: Docker / Kubernetes
- Config Strategy: {{e.g. environment variables via the framework's config module}}
- Secrets Strategy: K8s Secrets / Secret Manager
