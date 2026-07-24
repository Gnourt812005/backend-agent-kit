---
template: controller
placeholders: [DomainName, domainName, FeatureName, featureName]
generates: src/presentation/controllers/{{domainName}}/{{domainName}}-admin.controller.ts
---

# {{DomainName}} Controller Template

Thin NestJS REST Controller with guard decorators, OpenAPI Swagger documentation, and CommandBus/QueryBus dispatch.

## Code Blueprint

```typescript
// src/presentation/controllers/{{domainName}}/{{domainName}}-admin.controller.ts
import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { ERole } from '../../../core/enums/role.enum';
import { {{FeatureName}}Dto } from '../../../application/commands/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.dto';
import { {{FeatureName}}Command } from '../../../application/commands/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.command';

@ApiTags('Admin / {{DomainName}}')
@ApiBearerAuth()
@Roles(ERole.ADMIN)
@Controller('api/v1/admin/{{domainName}}s')
export class {{DomainName}}AdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new {{domainName}}' })
  @ApiResponse({ status: 201, description: '{{DomainName}} successfully created' })
  async create(@Body() dto: {{FeatureName}}Dto): Promise<{ id: string }> {
    // WHY: Thin controller delegates execution directly to CommandBus
    const id = await this.commandBus.execute(new {{FeatureName}}Command(dto));
    return { id };
  }
}
```
