---
template: aggregate
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/domain/aggregate-roots/{{domainName}}.root.ts
---

# {{DomainName}} Aggregate Root Template

Aggregate Root encapsulating state transitions, business invariants, and domain events.

## Code Blueprint

```typescript
// src/domain/aggregate-roots/{{domainName}}.root.ts
import { AggregateRoot } from '../base/base.entity';
import { E{{DomainName}}Status } from '../enums/{{domainName}}-status.enum';
import { {{DomainName}}Exception } from '../exceptions/{{domainName}}.exception';
import { {{DomainName}}StatusChangedEvent } from '../events/{{domainName}}-status-changed.event';

export interface {{DomainName}}RootProps {
  id: string;
  ownerId: string;
  status: E{{DomainName}}Status;
  // WHY: Props contain pure domain attributes only (no MongoDB _id or DB timestamps)
}

export interface Create{{DomainName}}Input {
  ownerId: string;
  // WHY: Factory input validates initial invariants
}

export class {{DomainName}}Root extends AggregateRoot<{{DomainName}}RootProps> {
  protected constructor(props: {{DomainName}}RootProps) {
    super(props);
  }

  // ---- Factory Methods ----

  // WHY: create() is used for instantiating new domain concepts. It enforces initial invariants.
  static create(input: Create{{DomainName}}Input): {{DomainName}}Root {
    if (!input.ownerId) {
      throw new {{DomainName}}Exception('Owner ID is required', '{{DOMAIN_NAME}}_INVALID_OWNER');
    }
    const now = new Date();
    return new {{DomainName}}Root({
      id: crypto.randomUUID(),
      ownerId: input.ownerId,
      status: E{{DomainName}}Status.DRAFT,
      createdAt: now,
      updatedAt: now,
    });
  }

  // WHY: rehydrateProps() is used by Repositories to reconstitute existing aggregates from database storage.
  static rehydrateProps(props: {{DomainName}}RootProps): {{DomainName}}Root {
    return new {{DomainName}}Root(props);
  }

  // ---- Getters ----

  get id(): string {
    return this.props.id;
  }

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
    this.props.updatedAt = new Date();

    // WHY: Record domain event on aggregate root for downstream side-effects
    this.addDomainEvent(
      new {{DomainName}}StatusChangedEvent(
        this.props.id,
        previousStatus,
        newStatus,
      ),
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
- [ ] Factory methods `create()` and `rehydrateProps()` defined
- [ ] Business invariants guarded via fail-fast exceptions
- [ ] Domain events added via `this.addDomainEvent()`
- [ ] `protected constructor` (not public)
