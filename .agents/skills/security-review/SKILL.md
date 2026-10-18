---
name: security-review
description: Audits endpoints, authentication and authorization, data masking, injection risks, and secrets handling.
---

# Security Review Skill

## Instructions

1. Verify authentication and authorization:
   - Every entry point is authenticated by default; public and webhook endpoints are opted out explicitly.
   - Authorization is checked per use case.
2. Check input handling:
   - Every input is validated into a typed DTO at the adapter.
   - External content (requests, messages, files, scraped data, LLM output) is treated as untrusted; check for injection into queries, shells, templates, and prompts.
3. Check data exposure:
   - Passwords, tokens, keys, and PII are masked or omitted in logs, events, and responses.
4. Verify secrets handling:
   - No credentials in source, tests, fixtures, or `docs/`; all come from the environment or a secret manager.
