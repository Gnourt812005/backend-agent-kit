---
template: module
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/infrastructure/modules/{{domainName}}.module.ts
---

# {{DomainName}} Feature Module Template

NestJS `@Module` wiring controllers, command/query handlers, Mongoose models, and Symbol DI tokens.

## Code Blueprint

```typescript
// src/infrastructure/modules/{{domainName}}.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { {{DomainName}}Model, {{DomainName}}Schema } from '../mongo/schemas/{{domainName}}.schema';
import { Mongo{{DomainName}}Repository } from '../mongo/repositories/{{domainName}}.repository';
import { Mongo{{DomainName}}ReadService } from '../mongo/read-services/{{domainName}}.read-service';
import { {{DOMAIN_NAME}}_REPOSITORY } from '../../core/interfaces/repositories/{{domainName}}.repository';
import { {{DOMAIN_NAME}}_READ_SERVICE } from '../../core/interfaces/read-services/{{domainName}}.read-service';
import { {{DomainName}}AdminController } from '../../presentation/controllers/{{domainName}}/{{domainName}}-admin.controller';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: {{DomainName}}Model.name, schema: {{DomainName}}Schema },
    ]),
  ],
  controllers: [{{DomainName}}AdminController],
  providers: [
    // Symbol DI token bindings
    { provide: {{DOMAIN_NAME}}_REPOSITORY, useClass: Mongo{{DomainName}}Repository },
    { provide: {{DOMAIN_NAME}}_READ_SERVICE, useClass: Mongo{{DomainName}}ReadService },
  ],
  exports: [{{DOMAIN_NAME}}_REPOSITORY, {{DOMAIN_NAME}}_READ_SERVICE],
})
export class {{DomainName}}Module {}
```
