---
template: value-object
placeholders: [ValueObjectName, valueObjectName]
generates: src/domain/value-objects/{{valueObjectName}}.vo.ts
---

# {{ValueObjectName}} Value Object Template

Immutable Value Object compared by structural equality.

## Code Blueprint

```typescript
// src/domain/value-objects/{{valueObjectName}}.vo.ts
import { BaseValueObject } from '../base/base.value-object';
import { InvalidValueObjectException } from '../exceptions/domain.exception';

export class {{ValueObjectName}}VO extends BaseValueObject<number> {
  protected constructor(_value: number) {
    super(_value);
  }

  static create(value: number): {{ValueObjectName}}VO {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new InvalidValueObjectException('{{ValueObjectName}}VO', 'must be a number');
    }
    if (value < 0) {
      throw new InvalidValueObjectException('{{ValueObjectName}}VO', 'must be ≥ 0');
    }
    return new {{ValueObjectName}}VO(value);
  }

  get value(): number { return this.props; }

  add(other: {{ValueObjectName}}VO): {{ValueObjectName}}VO {
    return {{ValueObjectName}}VO.create(this.props + other.props);
  }

  subtract(other: {{ValueObjectName}}VO): {{ValueObjectName}}VO {
    return {{ValueObjectName}}VO.create(this.props - other.props);
  }

  isZero(): boolean {
    return this.props === 0;
  }

  isGreaterThan(other: {{ValueObjectName}}VO): boolean {
    return this.props > other.props;
  }

  equals(other: {{ValueObjectName}}VO): boolean {
    return this.props === other.props;
  }

  toString(): string {
    return String(this.props);
  }
}
```

## Post-Generation Checklist
- [ ] Extends `BaseValueObject<Props>`
- [ ] `protected constructor`
- [ ] `static create()` factory with validation
- [ ] File named `<name>.vo.ts`
