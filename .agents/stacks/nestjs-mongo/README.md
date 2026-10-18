# Stack pack: nestjs-mongo

An example stack pack, extracted from an earlier production project. It is reusable for TypeScript services built on:

- **Framework**: NestJS with `@nestjs/cqrs` (CommandBus / QueryBus)
- **Persistence**: MongoDB via Mongoose, session-aware repositories, a transaction runner
- **API**: gRPC controllers, Zod DTO validation (`nestjs-zod`), CASL authorization
- **Messaging**: Transactional Outbox → message broker
- **Tooling**: Jest, ESLint (plus the `eslint-optimizer` skill)

Review before adopting. Some choices reflect that one project, for example the broker (both Kafka and RabbitMQ appear in different files), the guard stack, and directory names. Fix them for your project the same way you would edit any stack pack.

## How a pack works

A pack is an **overlay** on the stack-neutral core in `.agents/`. Every file here mirrors a core path:

- A pack file at the same relative path as a core file **overrides** it, for example `templates/domain/aggregate.md`.
- A pack file with no core counterpart **adds** to the kit, for example `templates/infrastructure/mongoose-schema.md` and `skills/eslint-optimizer/`.
- A link inside a pack file that has no pack target resolves against the core, for example `../skills/write-domain-doc/SKILL.md`.

The core is never edited to adopt a pack, so a project can upgrade the core without merge conflicts.

## Activate

1. In `.agents/kit.toml`, set the pack and the values below.
2. Run `.agents/hooks/sync-claude-native.sh` so `.claude/` points at the pack overrides.

```toml
[stack]
pack = "nestjs-mongo"

[project]
language = "typescript"
framework = "nestjs"

[layout]
source_root = "src"
domain = "src/domain"
application = "src/applications"
infrastructure = "src/infrastructure"
api = "src/api"
tests = "test"
source_extensions = [".ts"]

[boundaries]
domain_forbidden = ["@nestjs/", "mongoose", "express", "fastify", "typeorm", "prisma", "axios", "node-fetch"]
application_forbidden = ["@nestjs/microservices", "mongoose"]
api_forbidden = ["mongoose", "@nestjs/mongoose"]

[commands]
lint = "npm run lint"
test = "npm test"
```

## Stronger enforcement

The kit's built-in boundary check is a line-level heuristic. For this stack, add a real dependency checker such as `dependency-cruiser` or `eslint-plugin-boundaries`, and run it from `run-lint.sh`.
