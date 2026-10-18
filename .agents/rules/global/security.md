---
description: Security rules for authentication, authorization, input handling, and secrets
paths:
  - "{source_root}/**"
  - "{tests}/**"
---

# Security Rules

The concrete guard or middleware stack comes from the active stack pack.

## Authentication and authorization

- Every driving adapter (`{api}`) requires authentication **by default**. Public or webhook entry points are opted out explicitly and visibly, never by omission.
- Authorization is checked per use case (who may run this command or query), not only per route.
- Identity is extracted once at the adapter boundary and passed inward as a typed actor, never re-parsed in inner layers.

## Input

- Validate and parse every input at the adapter boundary into typed DTOs before it reaches Application.
- Treat all external content as untrusted: request bodies, message payloads, files, scraped content, third-party API responses, and LLM output.

## Data exposure and secrets

- Never log or emit raw passwords, tokens, API keys, private keys, or PII in logs, events, or responses. Mask or omit them.
- Load secrets from the environment or a secret manager only. Never hardcode them in source, tests, fixtures, or `docs/`.
