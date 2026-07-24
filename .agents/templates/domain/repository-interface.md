---
template: repository-interface
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/core/interfaces/repositories/{{domainName}}.repository.ts
---

# {{DomainName}} Repository Interface Template

Core repository port interface + Symbol Dependency Injection Token.

## Code Blueprint

```typescript
// src/core/interfaces/repositories/{{domainName}}.repository.ts
import { {{DomainName}}Root } from '../../aggregate-roots/{{domainName}}.aggregate';

export interface I{{DomainName}}Repository {
  findById(id: string): Promise<{{DomainName}}Root | null>;
  save(aggregate: {{DomainName}}Root): Promise<void>;
  delete(id: string): Promise<void>;
}

// WHY: Export Symbol DI token in SCREAMING_SNAKE_CASE for NestJS provider binding
export const {{DOMAIN_NAME}}_REPOSITORY = Symbol('{{DOMAIN_NAME}}_REPOSITORY');
```
