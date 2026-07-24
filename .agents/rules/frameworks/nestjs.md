---
description: NestJS framework rules and module wiring conventions
---

# NestJS Framework Rules

- Leverage `@nestjs/cqrs` for CommandBus and QueryBus.
- Use `createZodDto()` from `nestjs-zod` for request validation pipes.
- Wire ports and adapters using Symbol DI tokens (`@Inject(CAMPAIGN_REPOSITORY)`).
- Organize code by feature module under `src/infrastructure/modules/`.
- Use custom decorators (`@Public()`, `@Roles()`) for guard handling.
