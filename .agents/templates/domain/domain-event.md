---
template: domain-event
placeholders: [EventName, eventName]
generates: src/core/events/{{eventName}}.domain-event.ts
---

# {{EventName}} Domain Event Template

Domain Event captured during aggregate state change.

## Code Blueprint

```typescript
// src/core/events/{{eventName}}.domain-event.ts
import { DomainEvent } from '../common/base.domain-event';

export interface {{EventName}}Payload {
  aggregateId: string;
  previousStatus: string;
  newStatus: string;
}

export class {{EventName}}Event extends DomainEvent<{{EventName}}Payload> {
  constructor(payload: {{EventName}}Payload) {
    super('{{EventName}}', payload);
  }
}
```
