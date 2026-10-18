---
description: Structured logging and correlation rules
paths:
  - "{source_root}/**"
---

# Observability Rules

## Structured logging

- Log structured records (JSON in production), never free-form strings only.
- Every record includes: timestamp (ISO 8601), level, correlation/trace ID, and the module or bounded context.
- Log at adapter boundaries and on failure paths. Domain code does not log; it raises domain errors or records events.

## Correlation

- Accept or create a correlation ID at every entry point (request, message, job).
- Propagate it through use cases, outbox records, outgoing messages, and outgoing calls.
