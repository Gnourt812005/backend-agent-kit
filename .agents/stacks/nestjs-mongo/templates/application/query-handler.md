---
template: query-handler
kind: code
placeholders: [DomainName, FeatureName, domainName, featureName, DOMAIN_NAME]
generates: src/applications/queries/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
---

# {{FeatureName}} Query Handler Template

CQRS Read-side Query Handler querying database projections directly without aggregates.

## Code Blueprint

```typescript
// src/applications/queries/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { {{FeatureName}}Query } from './{{domainName}}-{{featureName}}.query';
import { {{DOMAIN_NAME}}_READ_REPOSITORY } from '@domain/ports/repositories/read/{{domainName}}-read.repository.port';
import type { {{DomainName}}ReadRepositoryPort } from '@domain/ports/repositories/read/{{domainName}}-read.repository.port';

@QueryHandler({{FeatureName}}Query)
export class {{FeatureName}}Handler implements IQueryHandler<{{FeatureName}}Query> {
  constructor(
    @Inject({{DOMAIN_NAME}}_READ_REPOSITORY) private readonly readRepo: {{DomainName}}ReadRepositoryPort,
  ) {}

  async execute(query: {{FeatureName}}Query): Promise<{{DomainName}}ReadResult> {
    // WHY: Read handlers bypass domain aggregates and Transaction Runner for high-performance read queries
    return this.readRepo.findList(query.filters);
  }
}
```

## Post-Generation Checklist
- [ ] Uses `ReadRepositoryPort` (not `ReadService`)
- [ ] No `TransactionRunner` or `EventService` injection
- [ ] Uses `@domain/` path aliases
- [ ] Handler named `{Feature}Handler` (not `{Feature}QueryHandler`)
