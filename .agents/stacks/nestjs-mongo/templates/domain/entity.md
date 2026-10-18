---
template: entity
kind: code
placeholders: [DomainName, EntityName, domainName, entityName]
generates: src/domain/entities/{{domainName}}-{{entityName}}.entity.ts
---

# {{EntityName}} Entity Template

Domain entity belonging to {{DomainName}} Aggregate Root.

## Code Blueprint

```typescript
// src/domain/entities/{{domainName}}-{{entityName}}.entity.ts
import { Entity } from '../base/base.entity';

export interface {{EntityName}}EntityProps {
  id: string;
  name: string;
  active: boolean;
}

export class {{EntityName}}Entity extends Entity<{{EntityName}}EntityProps> {
  protected constructor(props: {{EntityName}}EntityProps) {
    super(props);
  }

  static create(props: Omit<{{EntityName}}EntityProps, 'id'>): {{EntityName}}Entity {
    return new {{EntityName}}Entity({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static rehydrateProps(props: {{EntityName}}EntityProps): {{EntityName}}Entity {
    return new {{EntityName}}Entity(props);
  }

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get active(): boolean { return this.props.active; }

  deactivate(): void {
    this.props.active = false;
  }
}
```

## Post-Generation Checklist
- [ ] Extends `Entity` (not `BaseEntity`)
- [ ] `protected constructor`
- [ ] `create()` and `rehydrateProps()` factory methods
- [ ] File named `<name>.entity.ts`
