---
trigger: always_on
description: Error handling principles, domain exceptions, and HTTP error envelopes
---

# Error Handling Rules

## Directives

1. **No Silent Exception Swallowing**:
   - NEVER catch an exception and swallow it silently without logging or re-throwing.
   - Fail fast and throw explicit domain exceptions.

2. **Domain Exceptions**:
   - All domain errors inherit from a base `DomainException` or custom `{Domain}Exception`.
   - Include a machine-readable `code`, human-readable `message`, and optional `details`.

```typescript
export class CampaignException extends DomainException {
  constructor(message: string, code: string = 'CAMPAIGN_ERROR', details?: Record<string, any>) {
    super(message, code, details);
  }
}
```

3. **HTTP Exception Filters**:
   - NestJS exception filters map `DomainException` subclasses to consistent HTTP response envelopes:

```json
{
  "success": false,
  "error": {
    "code": "CAMPAIGN_INVALID_BUDGET",
    "message": "Budget must be a positive number",
    "timestamp": "2026-07-23T22:00:00.000Z"
  }
}
```
