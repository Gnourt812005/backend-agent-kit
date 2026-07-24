---
template: command-handler
placeholders: [DomainName, FeatureName, domainName, featureName, DOMAIN_NAME]
generates: src/applications/commands/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
---

# {{FeatureName}} Command Handler Template

CQRS Write-side Command Handler wrapped in Transaction Runner.

## Code Blueprint

```typescript
// src/applications/commands/{{domainName}}-{{featureName}}/{{domainName}}-{{featureName}}.handler.ts
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { {{FeatureName}}Command } from './{{domainName}}-{{featureName}}.command';
import { {{DomainName}}Root } from '@domain/aggregate-roots/{{domainName}}.root';
import { {{DOMAIN_NAME}}_REPOSITORY } from '@domain/ports/repositories/{{domainName}}.repository.port';
import type { {{DomainName}}RepositoryPort } from '@domain/ports/repositories/{{domainName}}.repository.port';
import { MONGO_TRANSACTION_RUNNER } from '@domain/ports/services/mongo-transaction-runner.port';
import type { MongoTransactionRunnerPort } from '@domain/ports/services/mongo-transaction-runner.port';
import { EVENT_SERVICE } from '@applications/ports/event-service.interface';
import type { IEventService } from '@applications/ports/event-service.interface';

@CommandHandler({{FeatureName}}Command)
export class {{FeatureName}}Handler implements ICommandHandler<{{FeatureName}}Command> {
  constructor(
    @Inject({{DOMAIN_NAME}}_REPOSITORY) private readonly repo: {{DomainName}}RepositoryPort,
    @Inject(MONGO_TRANSACTION_RUNNER) private readonly mongoTx: MongoTransactionRunnerPort,
    @Inject(EVENT_SERVICE) private readonly eventService: IEventService,
  ) {}

  async execute(command: {{FeatureName}}Command): Promise<string> {
    // WHY: Wrap entire write path in Transaction Runner to guarantee DB save + Outbox insert are atomic
    return this.mongoTx.runInTransaction(async (session) => {
      // 1. Create domain aggregate (validates invariants)
      const aggregate = {{DomainName}}Root.create(command.props);

      // 2. Persist aggregate via repository port
      const saved = await this.repo.save(aggregate, { session });

      // 3. Publish domain events (writes to transactional outbox)
      await this.eventService.publishEvents(saved, session);

      return saved.id;
    });
  }
}
```

## Post-Generation Checklist
- [ ] Handler decorated with `@CommandHandler({{FeatureName}}Command)`
- [ ] Dependencies injected via Symbol tokens (`@Inject({{DOMAIN_NAME}}_REPOSITORY)`)
- [ ] Wrapped in `this.mongoTx.runInTransaction()`
- [ ] Events published via `this.eventService.publishEvents(aggregate, session)`
- [ ] Uses `@domain/`, `@applications/` path aliases
