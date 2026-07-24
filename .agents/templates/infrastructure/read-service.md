---
template: read-service
placeholders: [DomainName, domainName, DOMAIN_NAME]
generates: src/infrastructure/mongo/read-services/{{domainName}}.read-service.ts
---

# {{DomainName}} Read Service Template

Read Service for CQRS query projections querying Mongoose directly.

## Code Blueprint

```typescript
// src/infrastructure/mongo/read-services/{{domainName}}.read-service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { {{DomainName}}Document, {{DomainName}}Model } from '../schemas/{{domainName}}.schema';

@Injectable()
export class Mongo{{DomainName}}ReadService {
  constructor(
    @InjectModel({{DomainName}}Model.name) private readonly model: Model<{{DomainName}}Document>,
  ) {}

  async findList(filters: Record<string, any>): Promise<any[]> {
    return this.model.find(filters).lean().exec();
  }
}
```
