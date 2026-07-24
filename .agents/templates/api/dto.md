---
template: api-dto
placeholders: [FeatureName]
generates: src/presentation/dtos/{{featureName}}.dto.ts
---

# Presentation DTO Template

Request/Response DTO for presentation API boundaries.

## Code Blueprint

```typescript
// src/presentation/dtos/{{featureName}}.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class {{FeatureName}}ResponseDto {
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @ApiProperty({ description: 'Operation status' })
  status: string;
}
```
