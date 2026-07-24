---
template: command-handler
placeholders: [DomainName, FeatureName, domainName, featureName, DOMAIN_NAME]
generates: src/application/commands/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
---

# {{FeatureName}} Command Handler Template

CQRS Write-side Command Handler wrapped in Unit of Work transaction.

## Code Blueprint

```typescript
// src/application/commands/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { {{FeatureName}}Command } from './{{domainName}}-{{featureName}}.command';
import { {{DomainName}}Root } from '../../../core/aggregate-roots/{{domainName}}.aggregate';
import { I{{DomainName}}Repository, {{DOMAIN_NAME}}_REPOSITORY } from '../../../core/interfaces/repositories/{{domainName}}.repository';
import { IUnitOfWork, UNIT_OF_WORK } from '../../../core/interfaces/unit-of-work.interface';
import { IEventService, EVENT_SERVICE } from '../../../core/interfaces/event-service.interface';

@CommandHandler({{FeatureName}}Command)
export class {{FeatureName}}CommandHandler implements ICommandHandler<{{FeatureName}}Command> {
  constructor(
    @Inject({{DOMAIN_NAME}}_REPOSITORY) private readonly repo: I{{DomainName}}Repository,
    @Inject(UNIT_OF_WORK) private readonly uow: IUnitOfWork,
    @Inject(EVENT_SERVICE) private readonly eventService: IEventService,
  ) {}

  async execute(command: {{FeatureName}}Command): Promise<string> {
    // WHY: Wrap entire write path in Unit of Work to guarantee DB save + Outbox insert are atomic
    return this.uow.execute(async () => {
      // 1. Create domain aggregate (validates invariants)
      const aggregate = {{DomainName}}Root.create(command.dto);

      // 2. Persist aggregate via repository port
      await this.repo.save(aggregate);

      // 3. Publish domain events (writes to transactional outbox)
      await this.eventService.publishEvents(aggregate);

      return aggregate.id;
    });
  }
}
```

## Post-Generation Checklist
- [ ] Handler decorated with `@CommandHandler({{FeatureName}}Command)`
- [ ] Dependencies injected via Symbol tokens (`@Inject({{DOMAIN_NAME}}_REPOSITORY)`)
- [ ] Wrapped in `this.uow.execute()`
- [ ] Events published via `this.eventService.publishEvents(aggregate)`
