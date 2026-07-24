---
template: domain-event
placeholders: [EventName, eventName]
generates: src/domain/events/{{eventName}}.event.ts
---

# {{EventName}} Domain Event Template

Domain Event captured during aggregate state change.

## Code Blueprint

```typescript
// src/domain/events/{{eventName}}.event.ts
import { EAggregateType } from '../enums/aggregate-type.enum';
import { DomainEvent } from './domain-event.base';

export interface {{EventName}}Payload {
  previousStatus: string;
  newStatus: string;
}

export class {{EventName}}Event extends DomainEvent<{{EventName}}Payload> {
  readonly eventType = '{{eventName}}';
  readonly aggregateType = EAggregateType.{{AGGREGATE_TYPE}};

  constructor(assetId: string, previousStatus: string, newStatus: string) {
    super(assetId, { previousStatus, newStatus });
  }
}
```

## Post-Generation Checklist
- [ ] Extends `DomainEvent<Payload>`
- [ ] `eventType` and `aggregateType` readonly properties
- [ ] File named `<name>.event.ts`
- [ ] Import from `./domain-event.base`
