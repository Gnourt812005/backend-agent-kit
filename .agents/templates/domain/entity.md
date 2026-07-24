---
template: entity
placeholders: [DomainName, EntityName, domainName, entityName]
generates: src/core/entities/{{domainName}}-{{entityName}}.entity.ts
---

# {{EntityName}} Entity Template

Domain entity belonging to {{DomainName}} Aggregate Root.

## Code Blueprint

```typescript
// src/core/entities/{{domainName}}-{{entityName}}.entity.ts
import { BaseEntity } from '../common';

export interface {{EntityName}}Props {
  name: string;
  active: boolean;
}

export class {{EntityName}}Entity extends BaseEntity<{{EntityName}}Props> {
  static create(props: {{EntityName}}Props): {{EntityName}}Entity {
    return new {{EntityName}}Entity(props);
  }

  static instantiate(id: string, props: {{EntityName}}Props): {{EntityName}}Entity {
    return new {{EntityName}}Entity(props, id);
  }

  get name(): string { return this.props.name; }
  get active(): boolean { return this.props.active; }

  deactivate(): void {
    this.props.active = false;
  }
}
```
