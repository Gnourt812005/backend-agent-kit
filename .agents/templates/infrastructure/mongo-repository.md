---
template: mongo-repository
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/infrastructure/mongo/repositories/{{domainName}}.repository.ts
---

# {{DomainName}} Mongo Repository Adapter Template

Repository implementation of `I{{DomainName}}Repository` supporting Unit of Work database sessions.

## Code Blueprint

```typescript
// src/infrastructure/mongo/repositories/{{domainName}}.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I{{DomainName}}Repository } from '../../../core/interfaces/repositories/{{domainName}}.repository';
import { {{DomainName}}Root } from '../../../core/aggregate-roots/{{domainName}}.aggregate';
import { {{DomainName}}Document, {{DomainName}}Model } from '../schemas/{{domainName}}.schema';
import { MongoUow } from '../mongo-uow';

@Injectable()
export class Mongo{{DomainName}}Repository implements I{{DomainName}}Repository {
  constructor(
    @InjectModel({{DomainName}}Model.name) private readonly model: Model<{{DomainName}}Document>,
    private readonly uow: MongoUow,
  ) {}

  async findById(id: string): Promise<{{DomainName}}Root | null> {
    const session = this.uow.getSession();
    const doc = await this.model.findById(id).session(session).exec();
    if (!doc) return null;

    // WHY: Map Mongoose document back to Aggregate Root using static instantiate()
    return {{DomainName}}Root.instantiate(doc._id, {
      ownerId: doc.ownerId,
      status: doc.status as any,
    });
  }

  async save(aggregate: {{DomainName}}Root): Promise<void> {
    const session = this.uow.getSession();
    await this.model.updateOne(
      { _id: aggregate.id },
      {
        $set: {
          owner_id: aggregate.ownerId,
          status: aggregate.status,
        },
      },
      { upsert: true, session },
    );
  }

  async delete(id: string): Promise<void> {
    const session = this.uow.getSession();
    await this.model.deleteOne({ _id: id }).session(session).exec();
  }
}
```
