---
name: add-endpoint
description: Expose an existing use case as a gRPC method on the API layer controller with auth guards and DTO validation.
---

# Command: add-endpoint

## Intent
Expose a use case via a gRPC method in the API layer.

## Preconditions
- Domain name, gRPC service name, method name, use case to dispatch

## Steps
1. Activate [`api-designer`](../agents/api-designer.md) agent.
2. Read `docs/domains/<domain>/api.md`.
3. Run skill [`api-contract-design`](../skills/api-contract-design/SKILL.md).
4. Generate from template [`templates/api/controller.md`](../templates/api/controller.md) or update existing controller in `src/api/grpc/`.
5. Attach auth & CASL guards.
6. Update `docs/domains/<domain>/api.md` contract.
7. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- gRPC Controller method dispatches Command/Query via `CommandBus`/`QueryBus`
- Updated `docs/domains/<domain>/api.md`
