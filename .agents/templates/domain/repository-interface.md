---
template: repository-interface
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/domain/ports/repositories/{{domainName}}.repository.port.ts
---

# {{DomainName}} Repository Port Template

Domain repository port interface + Symbol Dependency Injection Token.

## Code Blueprint

```typescript
// src/domain/ports/repositories/{{domainName}}.repository.port.ts
import { {{DomainName}}Root } from '../../aggregate-roots/{{domainName}}.root';
import type { Nullable } from '@shared/types/common.type';

export const {{DOMAIN_NAME}}_REPOSITORY = Symbol('{{DOMAIN_NAME}}_REPOSITORY');

export interface {{DomainName}}RepositoryPort {
  save(aggregate: {{DomainName}}Root, options?: { session?: unknown }): Promise<{{DomainName}}Root>;
  findById(id: string, options?: { session?: unknown }): Promise<Nullable<{{DomainName}}Root>>;
  delete(id: string): Promise<void>;
}
```

## Post-Generation Checklist
- [ ] Interface named `{Name}RepositoryPort`
- [ ] File named `<name>.repository.port.ts`
- [ ] Symbol DI token exported in `SCREAMING_SNAKE_CASE`
- [ ] `session` parameter on write methods for UoW support
