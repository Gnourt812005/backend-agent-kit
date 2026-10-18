---
name: add-endpoint
description: Expose an existing use case through a driving adapter (HTTP route, RPC method, or message handler) with authentication, authorization, and input validation.
---

# Command: add-endpoint

## Intent
Expose a use case through the project's transport in `{api}`.

## Preconditions
- Domain name, transport target (route, RPC service and method, or topic), use case to dispatch

## Steps
1. Activate [`api-designer`](../agents/api-designer.md) agent.
2. Read `docs/domains/<domain>/api.md`.
3. Run skill [`api-contract-design`](../skills/api-contract-design/SKILL.md).
4. Generate from [`templates/api/controller.md`](../templates/api/controller.md) and [`templates/api/dto.md`](../templates/api/dto.md), or extend the existing adapter.
5. Attach authentication and authorization, or mark the endpoint explicitly public.
6. Update `docs/domains/<domain>/api.md`.
7. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- Driving adapter that validates input and dispatches the command or query
- Updated `docs/domains/<domain>/api.md`
