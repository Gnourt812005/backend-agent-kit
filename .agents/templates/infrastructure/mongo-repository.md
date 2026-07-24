---
template: mongo-repository
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/infrastructure/persistence/mongoose/repositories/{{domainName}}.repository.ts
---

# {{DomainName}} Mongo Repository Adapter Template

Repository implementation of `{{DomainName}}RepositoryPort` supporting Transaction Runner sessions.

## Code Blueprint

```typescript
// src/infrastructure/persistence/mongoose/repositories/{{domainName}}.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { {{DomainName}}RepositoryPort } from '@domain/ports/repositories/{{domainName}}.repository.port';
import { {{DomainName}}Root } from '@domain/aggregate-roots/{{domainName}}.root';
import type { {{DomainName}}Document, {{DomainName}}Model } from '../schemas/{{domainName}}.schema';

@Injectable()
export class Mongo{{DomainName}}Repository implements {{DomainName}}RepositoryPort {
  constructor(
    @InjectModel({{DomainName}}Model.name) private readonly model: Model<{{DomainName}}Document>,
  ) {}

  async findById(id: string, options?: { session?: unknown }): Promise<{{DomainName}}Root | null> {
    const doc = await this.model
      .findById(id)
      .session(options?.session as Parameters<Model<any>['findById']>[1] | undefined)
      .exec();
    if (!doc) return null;

    // WHY: Map Mongoose document back to Aggregate Root using static rehydrateProps()
    return {{DomainName}}Root.rehydrateProps({
      id: doc._id.toString(),
      ownerId: doc.ownerId,
      status: doc.status as E{{DomainName}}Status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async save(aggregate: {{DomainName}}Root, options?: { session?: unknown }): Promise<{{DomainName}}Root> {
    await this.model.updateOne(
      { _id: aggregate.id },
      {
        $set: {
          owner_id: aggregate.ownerId,
          status: aggregate.status,
          updated_at: aggregate.updatedAt,
        },
        $setOnInsert: {
          created_at: aggregate.createdAt,
        },
      },
      { upsert: true, session: options?.session as Parameters<Model<any>['updateOne']>[2] },
    );
    return aggregate;
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id }).exec();
  }
}
```

## Post-Generation Checklist
- [ ] Implements `{Name}RepositoryPort`
- [ ] `session` parameter passed to Mongoose operations
- [ ] Uses `rehydrateProps()` for reconstitution
- [ ] Uses `@domain/`, `@applications/` path aliases
