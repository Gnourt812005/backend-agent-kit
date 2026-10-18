# Practical Backend Agent Kit (`.agents/`)

A reusable, **stack-neutral** agent kit for backend services. The core encodes architecture and workflow; a project plugs in its stack through `kit.toml` and an optional **stack pack**.

---

## 📌 Table of Contents

- [1. How the kit is layered](#-1-how-the-kit-is-layered)
- [2. Universal Workflow Kits](#-2-universal-workflow-kits)
  - [A. Spec-Driven Development Kit](#a--spec-driven-development-kit-specs)
  - [B. Legacy Refactoring Kit](#b--universal-legacy-refactoring-kit-docsrefactor)
  - [C. Architecture Health Check Kit](#c--universal-architecture-health-check-kit-docshealth)
  - [D. Kit Link Self-Repair Engine](#d-️-universal-kit-link-self-repair-engine)
- [3. Adopting the kit in a project](#️-3-adopting-the-kit-in-a-project)

---

## 🧱 1. How the kit is layered

| Layer | Location | Who edits it | Contains |
|-------|----------|--------------|----------|
| **Core** | `.agents/` (everything except `kit.toml` and `stacks/`) | Kit maintainers only | Architecture (Hexagonal + DDD + CQRS + Outbox), neutral rules, structure-spec templates, agents, commands, skills, hooks |
| **Stack pack** | `.agents/stacks/<pack>/` | Shared per stack | Overlay files that override core files at the same path: code blueprints, language and framework rules, stack-specific skills |
| **Project config** | `.agents/kit.toml`, `docs/` | Each project | Project identity, chosen pack, layer directories, forbidden imports, project truth |

Because projects never edit the core, a core upgrade is a plain file replacement.

* **Entry points**: [`CORE.md`](CORE.md) (always loaded), [`AGENT.md`](AGENT.md) (operating model and roster)
* **Specialist agents**: [`architect`](agents/architect.md), [`domain-modeler`](agents/domain-modeler.md), [`api-designer`](agents/api-designer.md), [`database-engineer`](agents/database-engineer.md), [`event-designer`](agents/event-designer.md), [`security-reviewer`](agents/security-reviewer.md), [`test-engineer`](agents/test-engineer.md), [`code-reviewer`](agents/code-reviewer.md), [`implementer`](agents/implementer.md)
* **Building commands**: [`add-domain`](commands/add-domain.md), [`add-use-case`](commands/add-use-case.md), [`add-endpoint`](commands/add-endpoint.md), [`add-event`](commands/add-event.md), [`add-tech`](commands/add-tech.md), [`add-migration`](commands/add-migration.md), [`create-tests`](commands/create-tests.md)
* **Architecture skills**: [`cqrs-generator`](skills/cqrs-generator/SKILL.md), [`repository-design`](skills/repository-design/SKILL.md), [`uow-outbox`](skills/uow-outbox/SKILL.md), [`api-contract-design`](skills/api-contract-design/SKILL.md), [`event-contract-design`](skills/event-contract-design/SKILL.md), [`domain-modeling`](skills/domain-modeling/SKILL.md), [`security-review`](skills/security-review/SKILL.md), [`testing-strategy`](skills/testing-strategy/SKILL.md)
* **Structure-spec templates**: [`templates/domain/`](templates/domain/aggregate.md), [`templates/application/`](templates/application/command-handler.md), [`templates/infrastructure/`](templates/infrastructure/repository-adapter.md), [`templates/api/`](templates/api/controller.md)
* **Stack packs**: [`stacks/nestjs-mongo/`](stacks/nestjs-mongo/README.md), an example pack (TypeScript, NestJS, MongoDB, gRPC, Outbox)
* **Boundary hooks**: [`boundaries.py`](hooks/boundaries.py) checks layer direction plus the forbidden imports in `kit.toml`. [`validate-boundaries.sh`](hooks/validate-boundaries.sh) and [`validate-imports.sh`](hooks/validate-imports.sh) wrap it, and [`after-generate.sh`](hooks/after-generate.sh) runs every validator.

---

## ♻️ 2. Universal Workflow Kits

These handle specification, refactoring, and health checks. Their commands, skills, and templates are stack-neutral and work identically in every project.

### A. 📋 Spec-Driven Development Kit (`specs/`)
Handles complex multi-step feature development with granular task tracking and a traceability graph (`ref.md`).

* **Commands**:
  * [`spec-specify`](commands/spec-specify.md) — Create feature specification at `specs/NNN-<name>/spec.md`
  * [`spec-clarify`](commands/spec-clarify.md) — Audit requirements and ask up to 3 targeted questions
  * [`spec-plan`](commands/spec-plan.md) — Generate architectural plan & `ref.md` link graph
  * [`spec-tasks`](commands/spec-tasks.md) — Generate dependency-ordered granular task checklist
  * [`spec-implement`](commands/spec-implement.md) — Execute tasks with real-time `[x]` task updates
  * [`spec-converge`](commands/spec-converge.md) — Sync architectural changes back to `docs/` and lock spec
* **Skills**:
  * [`spec-specify-guideline`](skills/spec-specify-guideline/SKILL.md), [`spec-clarify-guideline`](skills/spec-clarify-guideline/SKILL.md), [`spec-plan-guideline`](skills/spec-plan-guideline/SKILL.md), [`spec-tasks-guideline`](skills/spec-tasks-guideline/SKILL.md), [`spec-implement-guideline`](skills/spec-implement-guideline/SKILL.md), [`spec-converge-guideline`](skills/spec-converge-guideline/SKILL.md)
* **Templates**:
  * [`spec.md`](templates/spec/spec.md), [`plan.md`](templates/spec/plan.md), [`ref.md`](templates/spec/ref.md), [`tasks.md`](templates/spec/tasks.md)

---

### B. 🔄 Universal Legacy Refactoring Kit (`docs/refactor/`)
Refactors messy legacy codebases into clean layer structures without losing business logic.

* **Commands**:
  * [`refactor-align`](commands/refactor-align.md) — **Phase 1**: Restructure layers, blank tangled logic, insert backlinks (`// see: docs/refactor/...`), write Refactor Notes
  * [`refactor-restore`](commands/refactor-restore.md) — **Phase 2**: Re-implement blanked logic inside-out into correct layers & run tests
* **Skills**:
  * [`refactor-engine`](skills/refactor-engine/SKILL.md) — Decision rules matrix for blanking & inside-out restoration
* **Templates**:
  * [`refactor-note`](templates/refactor/note.md) — Refactor note blueprint preserving raw legacy code snippets
* **Hooks**:
  * [`validate-refactor.sh`](hooks/validate-refactor.sh) — Audits open refactor notes in `docs/refactor/`

---

### C. 📊 Universal Architecture Health Check Kit (`docs/health/`)
On-demand Git-anchored incremental health audits detecting architectural drift.

* **Commands**:
  * [`review-architecture`](commands/review-architecture.md) — Run Git-anchored health check (Bootstrap or Incremental mode)
* **Templates**:
  * [`health-report`](templates/health/report.md) — Baseline health report (`docs/health/{YYYYMMDD}-{short_hash}.md`)
* **Hooks**:
  * [`check-health.py`](hooks/check-health.py) — Core diff scanner classifying NEW, PERSISTING, and RESOLVED violations
  * [`check-health.sh`](hooks/check-health.sh) — Clean Git precondition wrapper

---

### D. 🛠️ Universal Kit Link Self-Repair Engine
* **Commands**:
  * [`repair-kit`](commands/repair-kit.md) — Verify and auto-repair broken markdown relative links across `.agents/`
* **Hooks**:
  * [`validate-links.py`](hooks/validate-links.py) & [`validate-links.sh`](hooks/validate-links.sh) — Universal markdown relative link repair engine

---

## 🛠️ 3. Adopting the kit in a project

1. Copy `.agents/`, `AGENTS.md` and `.claude/settings.json` into the project.
2. Run [`init-kit`](commands/init-kit.md). It chooses or creates a stack pack, fills `kit.toml`, and writes `docs/`. It never edits core files.
3. Run `.agents/hooks/sync-claude-native.sh` to generate `.claude/` (commands, skills, agents, rules with real paths, and pack overrides).

### Adding a stack pack

A pack is a directory that mirrors core paths. Start from the closest existing pack, or from empty, and add only what differs:

| Pack path | Typical content |
|-----------|-----------------|
| `README.md` | What the pack targets, plus the `kit.toml` values to use |
| `rules/languages/<lang>.md`, `rules/frameworks/<fw>.md` | Language and framework standards (with `paths:` frontmatter) |
| `rules/global/naming.md` | Concrete file and type naming for the language |
| `templates/{domain,application,infrastructure,api}/…` | Code blueprints (`kind: code`) overriding the structure specs |
| `skills/<name>/SKILL.md` | Stack-specific versions of skills such as `uow-outbox` and `repository-design`, or new tooling skills |
| `agents/`, `commands/` | Only if a persona or procedure differs for the stack |

### Upgrading the core

Replace every core path (all of `.agents/` except `kit.toml` and `stacks/`), keep your `kit.toml`, `docs/` and packs, then rerun the sync script and:

```bash
.agents/hooks/validate-links.sh --fix
```
