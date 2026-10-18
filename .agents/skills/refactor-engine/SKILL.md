---
name: refactor-engine
description: Rules and procedures for two-phase legacy refactoring (Phase 1 Architecture Alignment + Phase 2 Logic Restoration) with refactor notes and inline backlinks.
---

# Refactor Engine Skill

## Overview

This skill defines the rules for legacy refactoring when taking a messy codebase and aligning it with `.agents/` principles.

---

## Phase 1 Rules: Architecture Alignment

1. **Primary Goal**: Restructure legacy files into `.agents/` layers (`{domain}`, `{application}`, `{infrastructure}`, `{api}` from `[layout]` in `.agents/kit.toml`). Correctness of complex logic is NOT required in Phase 1.
2. **Decision Matrix for Blanking Logic**:

| Logic Type | Action |
|------------|--------|
| Pure transformation, format guard, self-evident null check | **Keep as-is** |
| Database query / ORM or driver call inside domain | **Blank out + Note** |
| External service call / HTTP request / Queue publish | **Blank out + Note** |
| Entangled complex business rule or multi-domain condition | **Blank out + Note** |

3. **Inline Backlink Rule**:
   - Every blanked code block MUST contain exactly one inline comment:
     ```text
     <line comment in the project's language> see: docs/refactor/YYYYMMDD-01-short-description.md
     ```
4. **Refactor Note Generation**:
   - Render [`templates/refactor/note.md`](../../templates/refactor/note.md) into `docs/refactor/{YYYYMMDD}-{seq}-{short-description}.md`.
   - **CRITICAL**: Include the RAW copy-paste of the original legacy code snippet inside a markdown block. Do not rely solely on line numbers.
5. **Phase 1 Definition of Done**:
   - The code compiles structurally and PASSES `.agents/hooks/after-generate.sh` boundary validations.

---

## Phase 2 Rules: Logic Restoration

1. **Primary Goal**: Re-implement blanked logic from Refactor Notes into proper `.agents/` layers.
2. **Inside-Out Restoration Order**:
   - Step 1 (**Domain**): Restore domain invariants, factory validation, and Value Objects.
   - Step 2 (**Infrastructure**): Implement repository ports, persistence models, and adapters.
   - Step 3 (**Application**): Implement command/query handlers, with commands inside the unit of work.
   - Step 4 (**API**): Implement driving adapters with input validation and authorization.
3. **Completion**:
   - Mark task items in `docs/refactor/*.md` complete.
   - Set note frontmatter `status: done`.
