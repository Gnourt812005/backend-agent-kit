---
template: dto
placeholders: [FeatureName, featureName]
generates: src/applications/dtos/{{featureName}}.dto.ts
---

# {{FeatureName}} DTO Template

DTO schema validated with Zod via `nestjs-zod`. Re-exported from `@applications/dtos/`.

## Code Blueprint

```typescript
// src/applications/dtos/{{featureName}}.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const {{FeatureName}}Schema = z.object({
  ownerId: z.string().min(1, 'Owner ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().max(1000).optional(),
});

export class {{FeatureName}}Dto extends createZodDto({{FeatureName}}Schema) {}

export type {{FeatureName}} = z.infer<typeof {{FeatureName}}Schema>;
```

## Post-Generation Checklist
- [ ] Zod schema defined and exported
- [ ] DTO class extends `createZodDto(Schema)`
- [ ] Type export for inferred type
- [ ] File placed in `src/applications/dtos/`
