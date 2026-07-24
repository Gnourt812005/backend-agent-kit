---
description: NestJS framework rules and module wiring conventions
---

# NestJS Framework Rules

- Leverage `@nestjs/cqrs` for CommandBus and QueryBus.
- Use `createZodDto()` from `nestjs-zod` for request validation pipes.
- Wire ports and adapters using Symbol DI tokens (`@Inject(ASSET_REPOSITORY)`).
- Organize code by feature module under `src/infrastructure/modules/`.
- Use `@GrpcMethod` for gRPC endpoint exposure.
- Use CASL-based authorization (`@sgod-casl/library`) for access control.
- Use `@nestjs/config` for environment variable configuration.
