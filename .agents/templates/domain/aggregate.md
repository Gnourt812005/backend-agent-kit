---
template: aggregate
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/core/aggregate-roots/{{domainName}}.aggregate.ts
---

# {{DomainName}} Aggregate Root Template

Aggregate Root encapsulating state transitions, business invariants, and domain events.

## Code Blueprint

```typescript
// src/core/aggregate-roots/{{domainName}}.aggregate.ts
import { BaseAggregateRoot } from '../common';
import { E{{DomainName}}Status } from '../enums/{{domainName}}-status.enum';
import { {{DomainName}}Exception } from '../exceptions/{{domainName}}.exception';
import { {{DomainName}}StatusChangedEvent } from '../events/{{domainName}}-status-changed.domain-event';

export interface {{DomainName}}Props {
  ownerId: string;
  status: E{{DomainName}}Status;
  // WHY: Props contain pure domain attributes only (no MongoDB _id or DB timestamps)
}

export class {{DomainName}}Root extends BaseAggregateRoot<{{DomainName}}Props> {
  // ---- Factory Methods ----

  // WHY: create() is used for instantiating new domain concepts. It enforces initial invariants.
  static create(props: {{DomainName}}Props): {{DomainName}}Root {
    if (!props.ownerId) {
      throw new {{DomainName}}Exception('Owner ID is required', '{{DOMAIN_NAME}}_INVALID_OWNER');
    }
    return new {{DomainName}}Root(props);
  }

  // WHY: instantiate() is used by Repositories to reconstitute existing aggregates from database storage.
  static instantiate(id: string, props: {{DomainName}}Props): {{DomainName}}Root {
    return new {{DomainName}}Root(props, id);
  }

  // ---- Getters ----

  get ownerId(): string {
    return this.props.ownerId;
  }

  get status(): E{{DomainName}}Status {
    return this.props.status;
  }

  // ---- Domain Methods ----

  updateStatus(newStatus: E{{DomainName}}Status): void {
    // WHY: Fail fast with private assertion guard
    this.assertValidStatusTransition(newStatus);
    
    const previousStatus = this.props.status;
    this.props.status = newStatus;

    // WHY: Record domain event on aggregate root for downstream side-effects
    this.addDomainEvent(
      new {{DomainName}}StatusChangedEvent({
        aggregateId: this.id,
        previousStatus,
        newStatus,
      }),
    );
  }

  // ---- Private Guard Clauses ----

  private assertValidStatusTransition(newStatus: E{{DomainName}}Status): void {
    if (this.props.status === E{{DomainName}}Status.CANCELLED) {
      throw new {{DomainName}}Exception(
        'Cannot change status of cancelled {{domainName}}',
        '{{DOMAIN_NAME}}_CANCELLED',
      );
    }
  }
}
```

## Post-Generation Checklist
- [ ] Factory methods `create()` and `instantiate()` defined
- [ ] Business invariants guarded via fail-fast exceptions
- [ ] Domain events added via `this.addDomainEvent()`
