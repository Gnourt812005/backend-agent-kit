---
name: uow-outbox
description: You are a Transactional Integrity & Event-Driven Architecture specialist. Your goal is to implement the Unit of Work pattern and Outbox pattern for reliable event delivery across service boundaries.
category: infrastructure
displayName: UoW & Outbox Expert
bundle: [infrastructure-persistence]
---

# Unit of Work & Outbox Pattern

This skill teaches you how to use the Unit of Work (UoW) for transactional safety and the Outbox pattern for reliable event delivery.

## Unit of Work (MongoDB Transactions)

### How It Works

The UoW uses **AsyncLocalStorage** (ALS) to propagate a MongoDB session transparently through the call chain — no need to pass `session` explicitly.

```typescript
// src/infrastructure/mongo/mongo-uow.ts (conceptual)
async execute<T>(operation: () => Promise<T>): Promise<T> {
  const existingSession = this.als.getStore();  // Check for nested call
  if (existingSession) return operation();      // Reuse existing session

  const session = await this.connection.startSession();
  session.startTransaction();
  return this.als.run(session, async () => {
    try {
      const result = await operation();
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  });
}
```

### Usage in Handlers

```typescript
@CommandHandler(CreateCampaignCommand)
export class CampaignCreateCommandHandler implements ICommandHandler<CreateCampaignCommand> {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY) private readonly repo: ICampaignRepository,
    @Inject(UNIT_OF_WORK) private readonly uow: IUnitOfWork,
    @Inject(EVENT_SERVICE) private readonly eventService: IEventService,
  ) {}

  async execute(command: CreateCampaignCommand) {
    return this.uow.execute(async () => {
      // All DB operations within this block share the same transaction
      const campaign = CampaignRoot.create(command.dto);
      await this.repo.save(campaign);          // ← auto-joins session via ALS
      await this.eventService.publishEvents(campaign);  // ← also joins session
      return campaign.id;
    });
  }
}
```

### Key Rules

1. Every write handler must use `this.uow.execute()`.
2. Nested `execute()` calls reuse the existing session (safe nesting).
3. Repositories pick up the session from ALS automatically.
4. `EventService.publishEvents()` also joins the active session.
5. Read operations (queries) do NOT use UoW.

## Outbox Pattern (Reliable Event Delivery)

The Outbox pattern ensures events are never lost: events are persisted in the same MongoDB transaction as the aggregate, then delivered asynchronously to RabbitMQ.

### Flow

```
1. Handler saves aggregate (UoW transaction)
2. Handler calls eventService.publishEvents(aggregate)
3. EventService:
   a. Extracts domain events from aggregate
   b. Maps them to integration events via DomainEventMapper
   c. Inserts outbox records into MongoDB (same transaction!)
   d. Triggers OutboxEventEmitter
4. OutboxProcessorService (push via event + pull via cron every 10s):
   a. Reads pending outbox records
   b. Dispatches to RabbitMQ
   c. Marks as DONE (or FAILED after 5 retries)
```

### Outbox Schema

```typescript
{
  event_type: string,      // e.g., 'campaign.created'
  payload: object,          // event data
  transport: {              // nullable — RMQ routing info
    routingKey: string,
    exchange?: string,
  },
  status: 'pending' | 'processing' | 'done' | 'failed',
  retry_count: number,      // max 5
  max_retry: number,        // 5
  created_at: Date,
  processed_at: Date,
  error_reason: string,
}
```

### Mapping Events

```typescript
// src/application/mappers/event.mapper.ts
export class DomainEventMapper implements IDomainEventMapper {
  mapToIntegrationEvents(domainEvents: DomainEvent[]): IntegrationEvent[] {
    return domainEvents.map(event => {
      switch (event.eventType) {
        case 'CampaignCreated':
          return new CampaignCreatedIntegrationEvent({
            payload: event.payload,
            metadata: { correlationId: uuid() },
            transport: { routingKey: 'campaign.created' },
          });
        // ...
      }
    });
  }
}
```

### Event Service

```typescript
async publishEvents(aggregate: BaseAggregateRoot<unknown> | BaseAggregateRoot<unknown>[]): Promise<void> {
  const aggregates = Array.isArray(aggregate) ? aggregate : [aggregate];
  const domainEvents = aggregates.flatMap(agg => {
    const events = [...agg.domainEvents];
    agg.clearDomainEvents();
    return events;
  });
  if (domainEvents.length === 0) return;

  const integrationEvents = this.eventMapper.mapToIntegrationEvents(domainEvents);
  if (integrationEvents.length === 0) return;

  // Insert into outbox — auto-joins UoW session via ALS
  await this.outboxModel.insertMany(outboxRows, { session: activeSession });
  this.outboxEmitter.emit(); // trigger immediate processing
}
```

## See Also

- `.agent/rules/transaction-management.md` — UoW reference
- `.agent/rules/event-driven.md` — event-driven architecture
- `.agent/skills/mongodb-repository/SKILL.md` — repository implementation
