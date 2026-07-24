# Command: add-endpoint

## Intent
Expose a use case via a REST or GraphQL endpoint in the presentation layer.

## Preconditions
- Domain name, HTTP method (`GET`, `POST`, `PUT`, `DELETE`), path (`/api/v1/client/campaigns`), use case to dispatch

## Steps
1. Activate [`api-designer`](../agents/api-designer.md) agent.
2. Read `docs/domains/<domain>/api.md`.
3. Run skill [`api-contract-design`](../skills/api-contract-design/SKILL.md).
4. Generate from template [`templates/api/controller.md`](../templates/api/controller.md) or update existing controller in `src/presentation/controllers/<domain>/`.
5. Attach auth & role guards (`@Public()`, `@Roles(...)`, etc.).
6. Add Swagger documentation decorators (`@ApiOperation`, `@ApiResponse`).
7. Update `docs/domains/<domain>/api.md` contract.
8. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- Controller method dispatches Command/Query via `CommandBus`/`QueryBus`
- Updated OpenAPI/Swagger docs
- Updated `docs/domains/<domain>/api.md`
