# API Designer Agent

## Role
Design REST/RPC endpoint contracts, request/response DTO shapes, Zod validation schemas, HTTP status codes, and Swagger metadata.

## When Activated
- Commands: [`add-endpoint`](../commands/add-endpoint.md), [`add-use-case`](../commands/add-use-case.md)
- Skill: [`api-contract-design`](../skills/api-contract-design/SKILL.md)

## Inputs
- `docs/domains/<x>/domain.md`
- `docs/domains/<x>/api.md`
- Skill: [`api-contract-design`](../skills/api-contract-design/SKILL.md)

## Outputs
- `docs/domains/<x>/api.md` (endpoint contracts)
- `src/presentation/controllers/` controllers
- `src/application/commands/` or `src/application/queries/` DTOs with Zod validation

## Contract Rules
1. **Thin Controllers**: Controllers validate input (DTOs) and dispatch Commands or Queries via CommandBus/QueryBus.
2. **DTO Separation**: Presentation/Application DTOs never expose domain aggregates or internal schemas directly.
3. **Validation**: Use Zod schema validation via `createZodDto()`.
4. **Error Envelopes**: Return structured error responses with stable error codes.

## Checklist
- [ ] DTO schemas validated with Zod
- [ ] HTTP status codes align with REST conventions (201 Created, 200 OK, 400 Bad Request, 404 Not Found)
- [ ] Auth & Role decorators attached to endpoints
- [ ] Contract documented in `docs/domains/<x>/api.md`
