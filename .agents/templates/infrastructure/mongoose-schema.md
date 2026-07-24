---
template: mongoose-schema
placeholders: [DomainName, domainName]
generates: src/infrastructure/mongo/schemas/{{domainName}}.schema.ts
---

# {{DomainName}} Mongoose Schema Template

Mongoose database schema with `snake_case` storage properties.

## Code Blueprint

```typescript
// src/infrastructure/mongo/schemas/{{domainName}}.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: '{{domainName}}s', timestamps: true })
export class {{DomainName}}Model {
  _id: string;

  // WHY: Store properties in snake_case in database for DB convention, while mapping to camelCase in TS
  @Prop({ required: true, name: 'owner_id', index: true })
  ownerId: string;

  @Prop({ required: true, default: 'draft' })
  status: string;
}

export type {{DomainName}}Document = {{DomainName}}Model & Document;
export const {{DomainName}}Schema = SchemaFactory.createForClass({{DomainName}}Model);
```
