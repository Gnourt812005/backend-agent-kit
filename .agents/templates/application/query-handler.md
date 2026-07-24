---
template: query-handler
placeholders: [DomainName, FeatureName, domainName, featureName, DOMAIN_NAME]
generates: src/application/queries/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
---

# {{FeatureName}} Query Handler Template

CQRS Read-side Query Handler querying database projections directly without aggregates.

## Code Blueprint

```typescript
// src/application/queries/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { {{FeatureName}}Query } from './{{domainName}}-{{featureName}}.query';
import { I{{DomainName}}ReadService, {{DOMAIN_NAME}}_READ_SERVICE } from '../../../core/interfaces/read-services/{{domainName}}.read-service';

@QueryHandler({{FeatureName}}Query)
export class {{FeatureName}}QueryHandler implements IQueryHandler<{{FeatureName}}Query> {
  constructor(
    @Inject({{DOMAIN_NAME}}_READ_SERVICE) private readonly readService: I{{DomainName}}ReadService,
  ) {}

  async execute(query: {{FeatureName}}Query): Promise<any> {
    // WHY: Read handlers bypass domain aggregates and Unit of Work for high-performance read queries
    return this.readService.findList(query.filters);
  }
}
```
