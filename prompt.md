# Prompt: Customize .agents Kit for an Existing Project

> **Purpose**: Use this prompt to customize the `.agents/` agent kit to match an existing project's conventions, then run the two-phase refactoring engine to clean up messy code.
>
> **When to use**: You have an existing project that follows the same architecture (Hexagonal + DDD + CQRS + Event-Driven) and tech stack (TypeScript + NestJS + MongoDB + Outbox) but has some messy code that needs cleanup.

---

## Phase 0: Inventory Your Project

Run this command in your project root:

```bash
find src/ -type f -name "*.ts" | head -80
echo "---DIRS---"
find src/ -type d | sort
echo "---PACKAGE---"
cat package.json | grep -E '"@nestjs|"mongoose|"zod|"jest|"vitest|"@nestjs/cqrs|"@nestjs/swagger'
```

Then fill in this table:

### A. Directory Structure
| Question | Your Answer |
|----------|-------------|
| What are your 4 layer directory names? (e.g., `src/core/`, `src/application/`, `src/infrastructure/`, `src/presentation/`) | |
| Do you use any non-standard directories? (e.g., `src/shared/`, `src/common/`) | |

### B. Naming Conventions
| Question | Your Answer |
|----------|-------------|
| Aggregate Root class suffix? (e.g., `CampaignRoot`, `CampaignAggregate`) | |
| Value Object suffix? (e.g., `CampaignVO`, `CampaignValueObject`) | |
| Repository interface prefix? (e.g., `ICampaignRepository`, `CampaignRepository`) | |
| DI tokens? (e.g., `Symbol('CAMPAIGN_REPOSITORY')`, `'CAMPAIGN_REPOSITORY'`) | |
| Exception base class? (e.g., `DomainException`, `AppError`) | |
| Command handler suffix? (e.g., `CreateCampaignHandler`, `CreateCampaignCommandHandler`) | |

### C. Base Classes
| Question | Your Answer |
|----------|-------------|
| Aggregate Root base class name & path? (e.g., `BaseAggregateRoot` in `src/core/common/`) | |
| Entity base class name & path? | |
| Value Object base class name & path? | |
| Domain Event base class name & path? | |
| Unit of Work interface name & path? (e.g., `IUnitOfWork` in `src/core/interfaces/`) | |
| Event Service interface name & path? | |

### D. Framework Patterns
| Question | Your Answer |
|----------|-------------|
| Validation library? (e.g., `nestjs-zod`, `class-validator`) | |
| Test framework? (e.g., `jest`, `vitest`) | |
| Swagger/OpenAPI? (e.g., `@nestjs/swagger`) | |
| Guard stack order? (e.g., `JwtAuthGuard` → `RolesGuard`) | |
| Outbox implementation? (e.g., MongoDB collection, PostgreSQL table) | |

---

## Phase 1: Customize .agents Rules & Templates

### 1. Update `naming.md`
- Update the class/file naming matrix to match your project's actual suffixes and directory paths
- Update the Symbol DI token format
- Update the database schema field naming convention

### 2. Update Templates
For each template in `.agents/templates/`:
- Update import paths to match your base class locations
- Update class names to match your naming conventions
- Update validation patterns to match your validation library
- Update guard/decorator patterns to match your security setup

Key templates to update:
- `domain/aggregate.md` — Base class imports, factory patterns
- `domain/entity.md` — Base class imports
- `domain/value-object.md` — Base class imports
- `domain/domain-event.md` — Base class imports
- `application/command-handler.md` — UoW/EventService import paths
- `application/query-handler.md` — ReadService import paths
- `infrastructure/module.md` — Module wiring, DI token imports
- `infrastructure/mongo-repository.md` — UoW import path, session handling
- `api/controller.md` — Guard/decorator patterns, Swagger decorators

### 3. Update Hooks
- `validate-boundaries.sh` — Update regex patterns to match your directory structure
- `validate-imports.sh` — Update regex patterns to match your import paths
- `check-health.py` — Update `CORE_FORBIDDEN` and `APP_FORBIDDEN` lists to match your stack

### 4. Update `docs/architecture/service.md`
- Update the service identity, runtime stack, and deployment config to match your project

---

## Phase 2: Run Two-Phase Refactoring

### Phase 1: Architecture Alignment (`refactor-align`)
1. Activate `architect` and `code-reviewer` agents
2. Run `refactor-engine` skill
3. Move messy files into `.agents/` layers:
   - Domain logic → `src/core/`
   - Use cases → `src/application/`
   - Schemas & Repos → `src/infrastructure/`
   - Controllers → `src/presentation/`
4. Apply Decision Matrix:
   - Blank out DB calls, external calls, and entangled rules
   - Insert inline backlink: `// see: docs/refactor/YYYYMMDD-seq-name.md`
5. Create Refactor Note in `docs/refactor/` with raw code snippets
6. Run `after-generate.sh` to verify boundary compliance

### Phase 2: Logic Restoration (`refactor-restore`)
1. Read pending Refactor Notes in `docs/refactor/`
2. Restore logic inside-out:
   - **Step 1 Core**: Aggregate Root methods & VOs
   - **Step 2 Infra**: Mongoose Schemas & Repository Adapters
   - **Step 3 Application**: Command/Query Handlers + Unit of Work
   - **Step 4 Presentation**: Controllers & Zod DTO Validation
3. Run unit & E2E tests
4. Mark Refactor Notes as `done`

---

## Phase 3: Verify & Generate New Features

1. Run `after-generate.sh` to validate all boundary rules
2. Run `run-lint.sh` and `run-tests.sh`
3. Use `add-domain`, `add-use-case`, `add-endpoint` for new features
4. Run `review-architecture` for ongoing health checks

---

## Quick Command Reference

```bash
# Customize .agents to match your project
# (manual edits to naming.md, templates, hooks)

# Bootstrap docs/ if not already done
.agents/hooks/before-generate.sh  # will fail if docs/architecture/service.md doesn't exist

# Run refactoring
.agents/hooks/validate-refactor.sh  # check pending refactor notes

# Run validation
.agents/hooks/after-generate.sh     # boundary + import + contract + link validation
.agents/hooks/run-lint.sh           # lint
.agents/hooks/run-tests.sh          # tests

# Run health check (requires clean git)
.agents/hooks/check-health.sh       # full scan
.agents/hooks/check-health.sh --full  # force full scan
```

---

## What to Provide to the Agent

When asking the agent to help, provide:
1. **The completed inventory table** (from Phase 0)
2. **Your `src/` directory structure** (output of `find src/ -type d | sort`)
3. **Your `package.json` dependencies** (at minimum the NestJS/Mongoose/Zod/Jest versions)
4. **A sample of your messy code** that needs refactoring (1-2 files showing the messiness)
5. **Your desired end state** (what the clean version should look like)
