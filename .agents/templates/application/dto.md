---
template: dto
placeholders: [FeatureName, featureName]
generates: src/application/commands/{{featureName}}/{{featureName}}.dto.ts
---

# {{FeatureName}} DTO Template

DTO schema validated with Zod via `nestjs-zod`.

## Code Blueprint

```typescript
// src/application/commands/{{featureName}}/{{featureName}}.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const {{FeatureName}}Schema = z.object({
  ownerId: z.string().min(1, 'Owner ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().max(1000).optional(),
});

export class {{FeatureName}}Dto extends createZodDto({{FeatureName}}Schema) {}
```
