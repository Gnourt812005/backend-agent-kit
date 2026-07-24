---
name: api-contract-design
description: Designs gRPC controller endpoints, DTO shapes, Zod validation schemas, and gRPC method metadata.
---

# API Contract Design Skill

## Instructions

1. Identify use case and target gRPC service (e.g. `AssetService.CreateAsset`).
2. Keep controllers thin: controllers extract DTO, check guards, and dispatch CommandBus or QueryBus.
3. Validate request bodies using Zod schemas (`createZodDto()`).
4. Apply NestJS decorators:
   - Auth: `@Public()`, `@CheckAbility()`
   - gRPC: `@GrpcMethod('ServiceName', 'MethodName')`
5. Refer to template `.agents/templates/api/controller.md`.
6. Document endpoint contract in `docs/domains/<domain>/api.md`.
