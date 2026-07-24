---
template: module
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/infrastructure/modules/{{domainName}}.module.ts
---

# {{DomainName}} Feature Module Template

NestJS `@Module` wiring gRPC controllers, command/query handlers, and Symbol DI tokens.

## Code Blueprint

```typescript
// src/infrastructure/modules/{{domainName}}.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '@infrastructure/persistence/persistence.module';
import { IntegrationsModule } from '@infrastructure/integrations/integrations.module';
import { {{DomainName}}GrpcController } from '@api/grpc/{{domainName}}.grpc.controller';
import { {{DomainName}}CreateHandler } from '@applications/commands/{{domainName}}-create/{{domainName}}-create.handler';
import { {{DomainName}}UpdateHandler } from '@applications/commands/{{domainName}}-update/{{domainName}}-update.handler';
import { {{DomainName}}DeleteHandler } from '@applications/commands/{{domainName}}-delete/{{domainName}}-delete.handler';
import { {{DomainName}}FindByIdHandler } from '@applications/queries/{{domainName}}-find-by-id/{{domainName}}-find-by-id.handler';
import { {{DomainName}}ListHandler } from '@applications/queries/{{domainName}}-list/{{domainName}}-list.handler';

const COMMAND_HANDLERS = [
  {{DomainName}}CreateHandler,
  {{DomainName}}UpdateHandler,
  {{DomainName}}DeleteHandler,
];

const QUERY_HANDLERS = [
  {{DomainName}}FindByIdHandler,
  {{DomainName}}ListHandler,
];

@Module({
  imports: [CqrsModule, PersistenceModule, IntegrationsModule],
  controllers: [{{DomainName}}GrpcController],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
  ],
  exports: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
  ],
})
export class {{DomainName}}Module {}
```

## Post-Generation Checklist
- [ ] Imports `CqrsModule`, `PersistenceModule`, `IntegrationsModule`
- [ ] gRPC controller listed in `controllers`
- [ ] Handlers listed as arrays in `providers` and `exports`
- [ ] Uses `@applications/`, `@api/`, `@infrastructure/` path aliases
