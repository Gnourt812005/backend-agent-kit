---
template: query
kind: code
placeholders: [FeatureName]
generates: src/applications/queries/{{featureName}}/{{featureName}}.query.ts
---

# {{FeatureName}} Query Template

Query payload class.

## Code Blueprint

```typescript
// src/applications/queries/{{featureName}}/{{featureName}}.query.ts
import { Query } from '@nestjs/cqrs';

export interface {{FeatureName}}Filters {
  enterpriseId: string;
  search?: string;
  limit?: number;
  cursor?: string;
}

export class {{FeatureName}}Query extends Query<unknown> {
  constructor(public readonly filters: {{FeatureName}}Filters) {
    super();
  }
}
```

## Post-Generation Checklist
- [ ] Extends `Query` from `@nestjs/cqrs`
- [ ] Filters interface defined
- [ ] File named `<feature>.query.ts`
