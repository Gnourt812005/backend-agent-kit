---
template: command
placeholders: [FeatureName, FeatureDtoName]
generates: src/applications/commands/{{featureName}}/{{featureName}}.command.ts
---

# {{FeatureName}} Command Template

Command payload class extending NestJS CQRS Command.

## Code Blueprint

```typescript
// src/applications/commands/{{featureName}}/{{featureName}}.command.ts
import { Command } from '@nestjs/cqrs';
import type { {{FeatureDtoName}} } from '@applications/dtos/{{featureName}}.dto';
import type { {{FeatureDtoName}} as {{FeatureDtoName}}Type } from '@applications/dtos/{{featureName}}.dto';

export class {{FeatureName}}Command extends Command<{{FeatureDtoName}}Type> {
  constructor(public readonly props: {{FeatureDtoName}}) {
    super();
  }
}
```

## Post-Generation Checklist
- [ ] Extends `Command<Dto>` from `@nestjs/cqrs`
- [ ] DTO imported from `@applications/dtos/`
- [ ] Uses `props` property (not `dto`)
