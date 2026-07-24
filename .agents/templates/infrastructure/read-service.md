---
template: read-service
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/domain/ports/repositories/read/{{domainName}}-read.repository.port.ts
---

# {{DomainName}} Read Repository Port Template

Read repository port for CQRS query projections.

## Code Blueprint

```typescript
// src/domain/ports/repositories/read/{{domainName}}-read.repository.port.ts
import { {{DomainName}}Root } from '@domain/aggregate-roots/{{domainName}}.root';
import type { Nullable } from '@shared/types/common.type';

export const {{DOMAIN_NAME}}_READ_REPOSITORY = Symbol('{{DOMAIN_NAME}}_READ_REPOSITORY');

export interface {{DomainName}}ReadRepositoryPort {
  findList(filters: Record<string, unknown>): Promise<{{DomainName}}Root[]>;
  findById(id: string): Promise<Nullable<{{DomainName}}Root>>;
}
```

## Post-Generation Checklist
- [ ] Interface named `{Name}ReadRepositoryPort`
- [ ] File named `<name>-read.repository.port.ts`
- [ ] Symbol DI token exported in `SCREAMING_SNAKE_CASE`
- [ ] Located in `src/domain/ports/repositories/read/`
