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

### A. Directory Structure (kit-asset-service)
| Question | Your Answer |
|----------|-------------|
| What are your 4 layer directory names? | `src/domain/`, `src/applications/`, `src/infrastructure/`, `src/api/` |
| Do you use any non-standard directories? | `src/shared/`, `src/api/grpc/`, `src/api/kafka/`, `src/api/mappers/`, `src/infrastructure/events/outbox/`, `src/infrastructure/elasticsearch/`, `src/infrastructure/authz/`, `src/infrastructure/cache/`, `src/infrastructure/scheduling/` |

### B. Naming Conventions (kit-asset-service)
| Question | Your Answer |
|----------|-------------|
| Aggregate Root class suffix? | `{Name}Root` (e.g., `AssetRoot`, `AssetCategoryRoot`) |
| Aggregate Root file pattern? | `{name}.root.ts` |
| Value Object suffix? | `{Name}VO` (e.g., `QuantityVO`, `QRCodeVO`) |
| Value Object file pattern? | `{name}.vo.ts` |
| Entity suffix? | `{Name}Entity` (e.g., `ImportRowEntity`) |
| Entity file pattern? | `{name}.entity.ts` |
| Repository interface suffix? | `{Name}RepositoryPort` (e.g., `AssetRepositoryPort`) |
| Repository file pattern? | `{name}.repository.port.ts` |
| Read repository suffix? | `{Name}ReadRepositoryPort` (e.g., `AssetReadRepositoryPort`) |
| Read repository file pattern? | `{name}-read.repository.port.ts` |
| DI tokens? | `Symbol('NAME_REPOSITORY')` (e.g., `Symbol('ASSET_REPOSITORY')`) |
| Exception base class? | `DomainException` in `src/domain/exceptions/domain.exception.ts` |
| Command handler suffix? | `{Feature}Handler` (e.g., `AssetCreateHandler`) |
| Command handler file pattern? | `{feature}.handler.ts` |
| Command class? | `{Feature}Command extends Command<Dto>` |
| Enum prefix? | `E{Name}` (e.g., `EAssetType`) |
| Domain Event suffix? | `{Name}Event` (e.g., `AssetCreatedEvent`) |
| Domain Event file pattern? | `{name}.event.ts` |

### C. Base Classes (kit-asset-service)
| Question | Your Answer |
|----------|-------------|
| Aggregate Root base class name & path? | `AggregateRoot` in `src/domain/base/base.entity.ts` |
| Entity base class name & path? | `Entity` in `src/domain/base/base.entity.ts` |
| Value Object base class name & path? | `BaseValueObject` in `src/domain/base/base.value-object.ts` |
| Domain Event base class name & path? | `DomainEvent` in `src/domain/events/domain-event.base.ts` |
| Unit of Work interface name & path? | `MongoTransactionRunnerPort` in `src/domain/ports/services/mongo-transaction-runner.port.ts` |
| Event Service interface name & path? | `IEventService` in `src/applications/ports/event-service.interface.ts` |

### D. Framework Patterns (kit-asset-service)
| Question | Your Answer |
|----------|-------------|
| Validation library? | `nestjs-zod` (DTOs re-export Zod schemas from `@applications/dtos/`) |
| Test framework? | `jest` |
| Swagger/OpenAPI? | Not used (gRPC + Kafka, not REST) |
| Guard stack order? | CASL-based (`@sgod-casl/library`) |
| Outbox implementation? | MongoDB collection in `src/infrastructure/events/outbox/` |
| Path aliases? | `@domain/`, `@applications/`, `@shared/`, `@api/`, `@infrastructure/`, `@app/`, `@security/` |
| Company packages? | `@sgod-casl/library`, `@sgod-elastic/library`, `@sgod-graphdb/library`, `@sgod-kafka/library`, `@sgod-mongodb/library`, `@sgod-redis/library` |
| UoW method? | `runInTransaction(fn: (session) => Promise<T>)` (not `uow.execute()`) |
| Event service method? | `publishEvents(aggregates, session?)` |
| DTO pattern? | Re-export Zod schemas from `@applications/dtos/` |
| Module pattern? | Uses `PersistenceModule`, `IntegrationsModule` imports; handlers as arrays |

---

## Phase 1: Customize .agents Rules & Templates

### 1. Update `naming.md`
- Change `src/core/` → `src/domain/` for all Core layer paths
- Change `src/application/` → `src/applications/` for Application layer
- Change `src/presentation/` → `src/api/` for Presentation layer
- Change `src/core/interfaces/repositories/` → `src/domain/ports/repositories/`
- Change `src/core/interfaces/read-services/` → `src/domain/ports/repositories/read/`
- Change `src/core/interfaces/unit-of-work.interface` → `src/domain/ports/services/mongo-transaction-runner.port.ts`
- Change `src/core/interfaces/event-service.interface` → `src/applications/ports/event-service.interface.ts`
- Update class suffixes: `{Domain}Root` → `{Name}Root`, `I{Name}Repository` → `{Name}RepositoryPort`, `{Name}VO` stays
- Update file patterns: `{domain}.aggregate.ts` → `{name}.root.ts`, `{name}.repository.ts` → `{name}.repository.port.ts`
- Update DI token format: stays `Symbol('NAME_REPOSITORY')`

### 2. Update Templates
For each template in `.agents/templates/`:
- Update import paths to use `@domain/`, `@applications/`, `@shared/`, `@api/`, `@infrastructure/` aliases
- Update base class names: `BaseAggregateRoot` → `AggregateRoot`, `BaseEntity` → `Entity`, `BaseValueObject` stays
- Update repository port names: `I{Name}Repository` → `{Name}RepositoryPort`
- Update UoW: `IUnitOfWork` / `uow.execute()` → `MongoTransactionRunnerPort` / `mongoTx.runInTransaction()`
- Update event service: `IEventService` / `publishEvents(aggregate)` → `IEventService` / `publishEvents(aggregates, session)`
- Update DTO pattern: inline Zod schemas → re-export from `@applications/dtos/`
- Update module pattern: inline `MongooseModule.forFeature` → `PersistenceModule` import
- Update controller pattern: REST → gRPC (`@GrpcMethod`, proto-based)
- Update guard pattern: `RolesGuard` → CASL-based (`@sgod-casl/library`)

### 3. Update Hooks
- `validate-boundaries.sh` — Change `src/core` → `src/domain` in regex
- `validate-imports.sh` — Change `src/application` → `src/applications` in regex
- `check-health.py` — Update `CORE_FORBIDDEN` and `APP_FORBIDDEN` lists to match `@sgod-*` packages and `@domain/` aliases

### 4. Update `docs/architecture/service.md`
- Update service identity, runtime stack (gRPC + Kafka, not REST), and deployment config

---

## Phase 2: Run Two-Phase Refactoring

### Phase 1: Architecture Alignment (`refactor-align`)
1. Activate `architect` and `code-reviewer` agents
2. Run `refactor-engine` skill
3. Move messy files into `.agents/` layers:
   - Domain logic → `src/domain/`
   - Use cases → `src/applications/`
   - Schemas & Repos → `src/infrastructure/`
   - Controllers → `src/api/`
4. Apply Decision Matrix:
   - Blank out DB calls, external calls, and entangled rules
   - Insert inline backlink: `// see: docs/refactor/YYYYMMDD-seq-name.md`
5. Create Refactor Note in `docs/refactor/` with raw code snippets
6. Run `after-generate.sh` to verify boundary compliance

### Phase 2: Logic Restoration (`refactor-restore`)
1. Read pending Refactor Notes in `docs/refactor/`
2. Restore logic inside-out:
   - **Step 1 Domain**: Aggregate Root methods & VOs
   - **Step 2 Infrastructure**: Mongoose Schemas & Repository Adapters
   - **Step 3 Applications**: Command/Query Handlers + Transaction Runner
   - **Step 4 API**: gRPC Controllers & Zod DTO Validation
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
