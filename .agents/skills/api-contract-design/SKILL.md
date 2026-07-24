---
name: api-contract-design
description: Designs REST controller endpoints, DTO shapes, Zod validation schemas, Swagger documentation, and HTTP status codes.
---

# API Contract Design Skill

## Instructions

1. Identify use case and target endpoint path (e.g. `POST /api/v1/client/campaigns`).
2. Keep controllers thin: controllers extract DTO, check guards, and dispatch CommandBus or QueryBus.
3. Validate request bodies using Zod schemas (`createZodDto()`).
4. Apply NestJS decorators:
   - Auth: `@Public()`, `@Roles(...)`
   - Swagger: `@ApiOperation(...)`, `@ApiResponse(...)`
5. Refer to template `.agents/templates/api/controller.md`.
6. Document endpoint contract in `docs/domains/<domain>/api.md`.
