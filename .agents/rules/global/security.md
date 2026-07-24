---
trigger: always_on
description: Security constraints, auth guard order, data masking, and secret handling
---

# Security Rules

## Guard Stack Execution Order

In NestJS controllers, guards execute in a strict order:
1. `ApiKeyGuard` (Header API key verification for service-to-service calls)
2. `JwtAuthGuard` (JWT Bearer token verification)
3. `RolesGuard` (Role-based access control `@Roles(ERole.ADMIN)`)
4. `UserVerifiedGuard` (Account status verification)

## Public & Webhook Exceptions

- Decorate public endpoints explicitly with `@Public()`.
- Decorate webhook callback endpoints with `@WebHook()`.
- Un-decorated endpoints MUST require authentication by default.

## Data Masking & Secret Policy

- NEVER output raw passwords, tokens, API keys, or private keys in logs, domain events, or API responses.
- Load secrets strictly via environment variables (`process.env`), never hardcoded in source code or `docs/`.
