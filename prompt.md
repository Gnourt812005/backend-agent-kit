# Prompt: Adapt `.agents` Kit for a New Project

> **Purpose**: Use this prompt to customize the `.agents/` agent kit to match a **new project's** conventions, directory layout, naming patterns, and framework specifics. After customization, the kit can generate code that aligns with your project.
>
> **When to use**: You are starting a new project or adapting the kit to an existing codebase. The kit is stack-agnostic at its core (meta-kits) with a default specialization for TypeScript + NestJS + MongoDB + Outbox.

---

## How This Works

The `.agents/` kit has two layers (from `README.md`):

| Layer | What | Action |
|-------|------|--------|
| **Specialized Stack** (`AGENT.md`, `templates/`, `rules/`, stack-specific skills, `add-*` commands, `validate-*` hooks) | Framework-specific code generation | ✏️ **Customize for your project** |
| **Universal Meta-Kits** (`spec-*`, `refactor-*`, `review-architecture`, `repair-kit`) | Stack-agnostic workflow | 🔒 **Keep untouched** |

---

## Step 1: Inventory Your Project

Run these commands in your project root to gather baseline info:

```bash
# Directory structure
find src/ -type d | sort

# Source files
find src/ -type f -name "*.ts" | head -80

# Dependencies
cat package.json | grep -E '"@nestjs|"mongoose|"zod|"jest|"vitest|"@nestjs/cqrs'
```

Then fill in this table with your project's answers:

### A. Directory Structure

| Question | Your Answer |
|----------|-------------|
| What are your 4 layer directory names? (domain, application, infrastructure, api) | |
| Do you use any non-standard directories? (shared, grpc, kafka, cache, etc.) | |

### B. Naming Conventions

| Question | Your Answer |
|----------|-------------|
| Aggregate Root class suffix? (e.g., `{Name}Root`, `{Name}Aggregate`) | |
| Aggregate Root file pattern? (e.g., `{name}.root.ts`, `{name}.aggregate.ts`) | |
| Value Object suffix? (e.g., `{Name}VO`, `{Name}Value`) | |
| Value Object file pattern? (e.g., `{name}.vo.ts`, `{name}.value-object.ts`) | |
| Entity suffix? (e.g., `{Name}Entity`) | |
| Entity file pattern? (e.g., `{name}.entity.ts`) | |
| Repository interface suffix? (e.g., `{Name}RepositoryPort`, `I{Name}Repository`) | |
| Repository file pattern? (e.g., `{name}.repository.port.ts`) | |
| Read repository suffix? (e.g., `{Name}ReadRepositoryPort`) | |
| Read repository file pattern? (e.g., `{name}-read.repository.port.ts`) | |
| DI token format? (e.g., `Symbol('NAME_REPOSITORY')`) | |
| Exception base class? (e.g., `DomainException`) | |
| Command/Query handler suffix? (e.g., `{Feature}Handler`) | |
| Command/Query handler file pattern? (e.g., `{feature}.handler.ts`) | |
| Command class pattern? (e.g., `{Feature}Command extends Command<Dto>`) | |
| Enum prefix? (e.g., `E{Name}`) | |
| Domain Event suffix? (e.g., `{Name}Event`) | |
| Domain Event file pattern? (e.g., `{name}.event.ts`) | |

### C. Base Classes & Core Abstractions

| Question | Your Answer |
|----------|-------------|
| Aggregate Root base class name & path? | |
| Entity base class name & path? | |
| Value Object base class name & path? | |
| Domain Event base class name & path? | |
| Unit of Work / Transaction Runner interface name & path? | |
| Event Service interface name & path? | |

### D. Framework Patterns

| Question | Your Answer |
|----------|-------------|
| Language & version? | |
| Framework? (NestJS, Fastify, Express, etc.) | |
| Database & ODM/ORM? (Mongoose, Prisma, TypeORM, etc.) | |
| Message bus? (RabbitMQ, Kafka, SQS, etc.) | |
| Validation library? (Zod, Joi, class-validator, etc.) | |
| Test framework? (Jest, Vitest, Mocha, etc.) | |
| API style? (REST, gRPC, GraphQL) | |
| Auth mechanism? (JWT, OAuth, CASL, etc.) | |
| Path aliases? (e.g., `@domain/*`, `@app/*`) | |
| Outbox implementation? (DB collection, table, etc.) | |

---

## Step 2: Customize `.agents` Rules & Templates

Apply your inventory answers to the kit files. The README's [Customization Matrix](.agents/README.md#-customization-checklist) tells you exactly which files to touch.

### 2a. Update `AGENT.md`

Edit the `## Dedicated Technology Stack` section to match your project's language, framework, database, and messaging.

### 2b. Update `rules/global/naming.md`

Update the **Class & File Naming Matrix** table to match your project's conventions:
- Directory paths
- Class suffixes
- File patterns
- DI token formats
- Path aliases

### 2c. Update `rules/global/` (other files)

- `dependency-rule.md` — Verify layer directory names match your project
- `coding-standards.md` — Update if language-specific rules differ
- `security.md` — Update guard stack and auth patterns
- `error-handling.md` — Update exception class names

### 2d. Update Framework & Language Rules

- Replace `rules/languages/typescript.md` — If switching language (Go, Python, Rust, etc.), replace entirely
- Replace `rules/frameworks/nestjs.md` — If switching framework (Fastify, Gin, FastAPI, etc.), replace entirely

### 2e. Update Architecture Rules

Verify `rules/architectures/` files reference the correct directory names and patterns for your project.

### 2f. Update Templates

For each template in `.agents/templates/`, apply your project's conventions:

| Template Directory | What to Update |
|-------------------|----------------|
| `templates/domain/*` | Import paths, base class names, file suffixes |
| `templates/application/*` | Import paths, command/query patterns, DTO style |
| `templates/infrastructure/*` | ORM/ODM schemas, repository patterns, module wiring |
| `templates/api/*` | Controller patterns, validation library, auth decorators |
| `templates/docs/*` | Service identity, runtime stack, glossary format |

### 2g. Update Hooks

| Hook | What to Update |
|------|----------------|
| `hooks/validate-boundaries.sh` | Regex patterns for your framework packages and directory structure |
| `hooks/validate-imports.sh` | Regex patterns for your application layer import rules |
| `hooks/validate-contracts.sh` | Required doc file names if different |
| `hooks/check-health.py` | `CORE_FORBIDDEN` and `APP_FORBIDDEN` package lists |

### 2h. Update Stack-Specific Skills

Replace specialized skills with equivalents for your stack:

- `cqrs-generator` → Your CQRS implementation
- `repository-design` → Your ORM/ODM repository patterns
- `uow-outbox` → Your Unit of Work + Outbox implementation
- `api-contract-design` → Your API framework patterns
- `event-contract-design` → Your event/messaging patterns
- `domain-modeling` — May be mostly universal, but update TypeScript-specific examples
- `testing-strategy` → Your test framework patterns
- `security-review` → Your auth/guard patterns

### 2i. Update Stack-Specific Commands

Update `add-domain.md`, `add-use-case.md`, `add-endpoint.md`, `add-event.md`, `add-tech.md`, `add-migration.md`, `create-tests.md` to reference:
- Your template paths
- Your directory structure
- Your file naming patterns
- Your agent names

---

## Step 3: Verify Kit Health

After customization, validate the kit itself is consistent:

```bash
# 1. Auto-repair broken markdown links
.agents/hooks/validate-links.sh --fix

# 2. Run full after-generate validation
.agents/hooks/after-generate.sh

# 3. Run lint if available
.agents/hooks/run-lint.sh
```

> **Note**: `validate-boundaries.sh` and `validate-imports.sh` may fail if your `src/` doesn't match yet — that's expected until you run the refactoring phase.

---

## Step 4: (Optional) Refactor Existing Messy Code

If you have an existing codebase with tangled layers, use the two-phase refactoring engine. **Only do this after Step 2-3 are complete.**

### Phase 1: Architecture Alignment (`refactor-align`)

1. Activate [`architect`](.agents/agents/architect.md) and [`code-reviewer`](.agents/agents/code-reviewer.md) agents
2. Run [`refactor-engine`](.agents/skills/refactor-engine/SKILL.md) skill
3. Move messy files into the correct layers:
   - Domain logic → `src/domain/`
   - Use cases → `src/applications/`
   - Schemas & Repos → `src/infrastructure/`
   - Controllers → `src/api/`
4. Apply the Decision Matrix:
   - Blank out DB calls, external calls, and entangled rules
   - Insert inline backlink: `// see: docs/refactor/YYYYMMDD-seq-name.md`
5. Create Refactor Note in `docs/refactor/` with raw code snippets
6. Run `after-generate.sh` to verify boundary compliance

### Phase 2: Logic Restoration (`refactor-restore`)

1. Read pending Refactor Notes in `docs/refactor/`
2. Restore logic inside-out:
   - **Step 1 Domain**: Aggregate Root methods & VOs
   - **Step 2 Infrastructure**: Schemas & Repository Adapters
   - **Step 3 Applications**: Command/Query Handlers + Transaction Runner
   - **Step 4 API**: Controllers & DTO Validation
3. Run unit & E2E tests
4. Mark Refactor Notes as `done`

---

## Step 5: Verify & Generate New Features

1. Run `after-generate.sh` to validate all boundary rules
2. Run `run-lint.sh` and `run-tests.sh`
3. Use `add-domain`, `add-use-case`, `add-endpoint` for new features
4. Run `review-architecture` for ongoing health checks

---

## Quick Command Reference

```bash
# Bootstrap docs/ if not already done
.agents/commands/init-kit

# Run validation
.agents/hooks/after-generate.sh     # boundary + import + contract + link validation
.agents/hooks/run-lint.sh           # lint
.agents/hooks/run-tests.sh          # tests

# Run refactoring
.agents/hooks/validate-refactor.sh  # check pending refactor notes

# Run health check (requires clean git)
.agents/hooks/check-health.sh       # incremental scan
.agents/hooks/check-health.sh --full  # force full scan

# Repair kit links
.agents/hooks/validate-links.sh --fix
```

---

## What to Provide to the Agent

When asking the agent to help, provide:

1. **The completed inventory table** (from Step 1)
2. **Your `src/` directory structure** (`find src/ -type d | sort`)
3. **Your `package.json` dependencies** (or equivalent for your language)
4. **A sample of your messy code** that needs refactoring (1-2 files)
5. **Your desired end state** — what clean architecture looks like for your project
