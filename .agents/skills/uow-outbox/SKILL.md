---
name: uow-outbox
description: You are a Transactional Integrity & Event-Driven Architecture specialist. Your goal is to implement the Transaction Runner pattern and Outbox pattern for reliable event delivery across service boundaries.
category: infrastructure
displayName: UoW & Outbox Expert
bundle: [infrastructure-persistence]
---

# Transaction Runner & Outbox Pattern

This skill teaches you how to use the `MongoTransactionRunnerPort` for transactional safety and the Outbox pattern for reliable event delivery.

## Transaction Runner (MongoDB Transactions)

### How It Works

The `MongoTransactionRunnerPort` wraps operations in a MongoDB session with explicit transaction management. Sessions are passed explicitly to repository methods.

```typescript
// src/domain/ports/services/mongo-transaction-runner.port.ts
export const MONGO_TRANSACTION_RUNNER = Symbol('MONGO_TRANSACTION_RUNNER');

export interface MongoTransactionRunnerPort {
  runInTransaction<T>(fn: (session: unknown) => Promise<T>): Promise<T>;
}
```

### Usage in Handlers

```typescript
@CommandHandler(AssetCreateCommand)
export class AssetCreateHandler implements ICommandHandler<AssetCreateCommand> {
  constructor(
    @Inject(ASSET_REPOSITORY) private readonly repo: AssetRepositoryPort,
    @Inject(MONGO_TRANSACTION_RUNNER) private readonly mongoTx: MongoTransactionRunnerPort,
    @Inject(EVENT_SERVICE) private readonly eventService: IEventService,
  ) {}

  async execute(command: AssetCreateCommand): Promise<AssetDto> {
    return this.mongoTx.runInTransaction(async (session) => {
      // All DB operations within this block share the same transaction
      const aggregate = AssetRoot.create(command.props);
      const saved = await this.repo.save(aggregate, { session });
      await this.eventService.publishEvents(saved, session);
      return saved.id;
    });
  }
}
```

### Key Rules

1. Every write handler must use `this.mongoTx.runInTransaction()`.
2. The `session` is passed explicitly to repository `save()` and `publishEvents()` calls.
3. Repositories accept `session` via `options?: { session?: unknown }`.
4. `EventService.publishEvents()` accepts `session` as second argument.
5. Read operations (queries) do NOT use Transaction Runner.

## Outbox Pattern (Reliable Event Delivery)

The Outbox pattern ensures events are never lost: events are persisted in the same MongoDB transaction as the aggregate, then delivered asynchronously to Kafka.

### Flow

```
1. Handler saves aggregate (Transaction Runner)
2. Handler calls eventService.publishEvents(aggregate, session)
3. EventService:
   a. Extracts domain events from aggregate
   b. Maps them to integration events via DomainEventMapper
   c. Inserts outbox records into MongoDB (same transaction!)
   d. Triggers OutboxEventEmitter
4. OutboxProcessorService (push via event + pull via cron every 10s):
   a. Reads pending outbox records
   b. Dispatches to Kafka
   c. Marks as DONE (or FAILED after 5 retries)
```

### Outbox Schema

```typescript
{
  event_type: string,      // e.g., 'asset.created'
  payload: object,          // event data
  transport: {              // nullable — Kafka routing info
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

### Event Service

```typescript
async publishEvents(
  aggregate: AggregateRoot<unknown> | AggregateRoot<unknown>[],
  session?: unknown,
): Promise<void> {
  const aggregates = Array.isArray(aggregate) ? aggregate : [aggregate];
  const domainEvents = aggregates.flatMap(agg => {
    const events = [...agg.pullDomainEvents()];
    return events;
  });
  if (domainEvents.length === 0) return;

  const integrationEvents = this.eventMapper.mapToIntegrationEvents(domainEvents);
  if (integrationEvents.length === 0) return;

  // Insert into outbox — joins active Transaction Runner session
  await this.outboxModel.insertMany(outboxRows, { session });
  this.outboxEmitter.emit(); // trigger immediate processing
}
```

## See Also

- `.agents/rules/architectures/event-driven.md` — event-driven architecture
- `.agents/skills/repository-design/SKILL.md` — repository implementation