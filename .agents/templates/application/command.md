---
template: command
placeholders: [FeatureName, FeatureDtoName]
generates: src/application/commands/{{featureName}}/{{featureName}}.command.ts
---

# {{FeatureName}} Command Template

Command payload class.

## Code Blueprint

```typescript
// src/application/commands/{{featureName}}/{{featureName}}.command.ts
import { {{FeatureDtoName}} } from './{{featureName}}.dto';

export class {{FeatureName}}Command {
  constructor(public readonly dto: {{FeatureDtoName}}) {}
}
```
