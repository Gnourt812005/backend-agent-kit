---
template: controller
kind: code
placeholders: [DomainName, domainName, FeatureName, featureName]
generates: src/api/grpc/{{domainName}}.grpc.controller.ts
---

# {{DomainName}} gRPC Controller Template

Thin NestJS gRPC Controller dispatching Commands/Queries via CommandBus/QueryBus.

## Code Blueprint

```typescript
// src/api/grpc/{{domainName}}.grpc.controller.ts
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { {{FeatureName}}Dto } from '@applications/dtos/{{domainName}}-{{featureName}}.dto';
import { {{FeatureName}}Command } from '@applications/commands/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.command';

@Controller()
export class {{DomainName}}GrpcController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('{{DomainName}}Service', 'Create{{DomainName}}')
  async create(dto: {{FeatureName}}Dto): Promise<{ id: string }> {
    // WHY: Thin controller delegates execution directly to CommandBus
    const id = await this.commandBus.execute(new {{FeatureName}}Command(dto));
    return { id };
  }
}
```

## Post-Generation Checklist
- [ ] Uses `@GrpcMethod` decorator (not `@Post`)
- [ ] Uses `@nestjs/microservices` for gRPC
- [ ] DTOs from `@applications/dtos/`
- [ ] Commands from `@applications/commands/`
- [ ] Uses `@applications/`, `@domain/` path aliases
