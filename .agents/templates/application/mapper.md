---
template: mapper
placeholders: [DomainName, domainName]
generates: src/application/mappers/{{domainName}}.mapper.ts
---

# {{DomainName}} Mapper Template

Bidirectional mapper converting between Aggregate Roots and Application DTOs.

## Code Blueprint

```typescript
// src/application/mappers/{{domainName}}.mapper.ts
import { {{DomainName}}Root } from '../../core/aggregate-roots/{{domainName}}.aggregate';

export class {{DomainName}}Mapper {
  static toDto(aggregate: {{DomainName}}Root): Record<string, any> {
    return {
      id: aggregate.id,
      ownerId: aggregate.ownerId,
      status: aggregate.status,
    };
  }
}
```
