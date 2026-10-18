---
description: CQRS rules for separating write and read paths
paths:
  - "{application}/**"
  - "{api}/**"
---

# CQRS Rules

- **Write side (commands)**
  - Change state through aggregate-root methods only.
  - Run inside one transaction / unit of work that covers the aggregate save and its outbox records.
  - Persist through a repository port and record domain events.
  - Return an identifier or nothing, never a read model.
- **Read side (queries)**
  - Read-only. No transaction, no aggregate, no events.
  - Use a read repository / projection port that returns DTOs directly.
- Dispatch both through the project's command/query mechanism (a bus, a mediator, or plain handler functions). The mechanism is a stack choice; the separation is not.
