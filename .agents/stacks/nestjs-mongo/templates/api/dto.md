---
template: api-dto
kind: code
placeholders: [FeatureName]
generates: src/api/grpc/{{featureName}}.grpc.dto.ts
---

# gRPC DTO Template

Request/Response DTO for gRPC API boundaries.

## Code Blueprint

```typescript
// src/api/grpc/{{featureName}}.grpc.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class {{FeatureName}}ResponseDto {
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @ApiProperty({ description: 'Operation status' })
  status: string;
}
```

## Post-Generation Checklist
- [ ] File in `src/api/grpc/`
- [ ] Uses `@nestjs/swagger` for documentation
- [ ] Response DTO only (request DTOs use Zod schemas from `@applications/dtos/`)
