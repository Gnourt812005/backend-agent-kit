---
name: api-contract-design
description: Designs driving-adapter contracts (HTTP routes, RPC methods, or message handlers), request/response DTOs, input validation, and endpoint authorization. Use when exposing a use case through an API.
---

# API Contract Design Skill

## Instructions

1. Identify the use case and its transport target (route, RPC service and method, or message topic) from `docs/architecture/service.md`.
2. Keep the adapter thin: parse and validate input, resolve the actor, check authorization, dispatch one command or query, and map the result or error.
3. Validate input with the project's validation library into a typed input DTO before Application sees it.
4. Return output DTOs only. Never return aggregates or persistence models.
5. Map errors to the shared envelope with stable codes (`rules/global/error-handling.md`).
6. Render from `.agents/templates/api/controller.md` and `.agents/templates/api/dto.md`.
7. Document the contract in `docs/domains/<domain>/api.md`: input, output, errors, auth requirement, and idempotency.
