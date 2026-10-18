---
name: uow-outbox
description: Implements the unit-of-work (transaction runner) and transactional outbox patterns for atomic writes and reliable event delivery. Use when a write must publish events, or when wiring persistence and messaging together.
---

# Unit of Work and Transactional Outbox

Stack-specific implementations come from the active stack pack (`.agents/stacks/<pack>/skills/uow-outbox/` overrides this file).

## Unit of work (transaction runner)

A port that runs a function inside one datastore transaction and hands it a transaction context:

```
port TransactionRunner:
    run_in_transaction(work: (tx) -> T) -> T
```

Rules:
1. Every command handler runs its write path inside `run_in_transaction`.
2. The transaction context is passed explicitly to every repository `save` and to the event publisher.
3. Repositories accept the transaction context as an optional argument and join it.
4. Queries never use the transaction runner.

```
handle(PlaceOrder cmd):
    return tx_runner.run_in_transaction(tx =>
        order = Order.create(cmd.input)          # invariants enforced here
        repo.save(order, tx)
        event_publisher.publish(order, tx)       # writes outbox rows in the same tx
        return order.id)
```

## Transactional outbox

Events must never be lost or published for a write that rolled back.

### Flow

```
1. Handler saves the aggregate inside the unit of work
2. Handler calls event_publisher.publish(aggregate, tx)
3. Publisher:
   a. pulls pending domain events from the aggregate
   b. maps them to integration events
   c. inserts outbox rows in the SAME transaction
   d. signals the relay (optional, for low latency)
4. Relay (push on signal + periodic poll):
   a. claims pending rows
   b. sends them to the broker
   c. marks them done, or failed after a bounded number of retries
```

### Outbox record

| Field | Purpose |
|-------|---------|
| `id` | Unique event ID, also used by consumers for deduplication |
| `event_type` | e.g. `order.placed` |
| `event_version` | Schema version of the payload |
| `payload` | Serialized integration event |
| `routing` | Broker destination (topic, exchange, routing key), nullable |
| `correlation_id` | Propagated from the originating request |
| `status` | `pending` / `processing` / `done` / `failed` |
| `retry_count`, `max_retry` | Bounded retries |
| `created_at`, `processed_at`, `error_reason` | Operations and debugging |

### Delivery guarantees

- The relay gives **at-least-once** delivery, so every consumer must be idempotent.
- Claiming rows must be safe with several relay instances (row locking, conditional update, or a lease).

## See Also

- `.agents/rules/architectures/event-driven.md`
- `.agents/skills/repository-design/SKILL.md`
