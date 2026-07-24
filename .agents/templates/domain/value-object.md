---
template: value-object
placeholders: [ValueObjectName, valueObjectName]
generates: src/core/value-objects/{{valueObjectName}}.vo.ts
---

# {{ValueObjectName}} Value Object Template

Immutable Value Object compared by structural equality.

## Code Blueprint

```typescript
// src/core/value-objects/{{valueObjectName}}.vo.ts
import { BaseValueObject } from '../common';

export interface {{ValueObjectName}}Props {
  amount: number;
  currency: string;
}

export class {{ValueObjectName}}VO extends BaseValueObject<{{ValueObjectName}}Props> {
  constructor(props: {{ValueObjectName}}Props) {
    if (props.amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    super(props);
  }

  get amount(): number { return this.props.amount; }
  get currency(): string { return this.props.currency; }
}
```
