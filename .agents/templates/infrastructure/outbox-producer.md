---
template: outbox-producer
placeholders: [DomainName, EventName, domainName, eventName]
generates: src/infrastructure/events/{{domainName}}-{{eventName}}.producer.ts
---

# Outbox Event Producer Template

Maps domain events to integration events and writes to Transactional Outbox.

## Code Blueprint

```typescript
// src/infrastructure/events/{{domainName}}-{{eventName}}.producer.ts
import { Injectable } from '@nestjs/common';
import { {{EventName}}Event } from '../../core/events/{{domainName}}-{{eventName}}.domain-event';
import { MongoUow } from '../mongo/mongo-uow';
import { OutboxModel } from '../mongo/schemas/outbox.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class {{EventName}}Producer {
  constructor(
    @InjectModel(OutboxModel.name) private readonly outboxModel: Model<any>,
    private readonly uow: MongoUow,
  ) {}

  async produce(event: {{EventName}}Event): Promise<void> {
    const session = this.uow.getSession();
    await this.outboxModel.create(
      [
        {
          event_type: event.eventName,
          payload: event.payload,
          status: 'pending',
        },
      ],
      { session },
    );
  }
}
```
