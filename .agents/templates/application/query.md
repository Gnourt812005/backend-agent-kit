---
template: query
placeholders: [FeatureName]
generates: src/application/queries/{{featureName}}/{{featureName}}.query.ts
---

# {{FeatureName}} Query Template

Query payload class.

## Code Blueprint

```typescript
// src/application/queries/{{featureName}}/{{featureName}}.query.ts
export class {{FeatureName}}Query {
  constructor(public readonly filters: Record<string, any>) {}
}
```
