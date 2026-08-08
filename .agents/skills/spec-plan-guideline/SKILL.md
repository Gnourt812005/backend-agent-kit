---
name: spec-plan-guideline
description: Executes architectural planning for a feature, generating specs/NNN-<name>/plan.md and creating the specs/NNN-<name>/ref.md link graph for full traceability.
---

# Spec Plan Skill

## Instructions

1. Read `specs/NNN-<name>/spec.md` and project truth in `docs/architecture/service.md`.
2. Render [`templates/spec/plan.md`](../../templates/spec/plan.md) into `specs/NNN-<name>/plan.md`:
   - Map impact across Core, Application, Infrastructure, and Presentation layers.
3. Render [`templates/spec/ref.md`](../../templates/spec/ref.md) into `specs/NNN-<name>/ref.md`:
   - **Traceability Link Graph**: Add explicit relative markdown links to all touched domain specifications (`../../docs/domains/<domain>/domain.md`), ADRs (`../../docs/architecture/decisions/`), and tech stack files.
4. Set `plan.md` frontmatter `status: proposed`.
