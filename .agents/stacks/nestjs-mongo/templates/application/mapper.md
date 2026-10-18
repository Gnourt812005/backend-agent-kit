---
template: mapper
kind: code
placeholders: [DomainName, domainName]
generates: src/applications/mappers/{{domainName}}-dto.mapper.ts
---

# {{DomainName}} Mapper Template

Bidirectional mapper converting between Aggregate Roots and Application DTOs.

## Code Blueprint

```typescript
// src/applications/mappers/{{domainName}}-dto.mapper.ts
import { {{DomainName}}Root } from '@domain/aggregate-roots/{{domainName}}.root';

export class {{DomainName}}DtoMapper {
  static toDto(aggregate: {{DomainName}}Root): Record<string, unknown> {
    return {
      id: aggregate.id,
      ownerId: aggregate.ownerId,
      status: aggregate.status,
    };
  }
}
```

## Post-Generation Checklist
- [ ] Uses `@domain/` path alias
- [ ] File in `src/applications/mappers/`
- [ ] Returns `Record<string, unknown>` (not `any`)
