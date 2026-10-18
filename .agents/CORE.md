# Kit Core

Always loaded. Stack-agnostic. Keep this file under ~50 lines: every line here is paid for in every session.

## Session

- Kit status and stack print at session start (SessionStart hook). If status is `fresh`, run `/init-kit` before generating code.
- Project truth lives in `docs/architecture/service.md` and `docs/architecture/decisions/`. Read them before generating code, not before answering a question.

## Invariants (every change)

- Dependencies point inward: API / Infrastructure → Application → Domain. Domain imports no framework, ORM, transport, or HTTP library.
- Application depends only on Domain types and port interfaces. Concrete adapters are wired at the composition root.
- Never invent business rules. Ask one focused question, or record the rule in `docs/domains/<x>/domain.md` with `status: draft`.
- Every public use case gets at least one unit test and one integration path.
- Treat all external input as untrusted: requests, messages, scraped or user content, and LLM output.
- When you reject a plausible alternative, record why: cross-domain → ADR in `docs/architecture/decisions/`; single-domain → that domain's `domain.md` Decisions section.

## Where detail lives (load on demand, never upfront)

- Layer, naming, security and observability rules load automatically from `.claude/rules/` when you touch matching files.
- Procedures are commands in `.agents/commands/` (run as `/name`). Skills load by description match.
- Templates live in `.agents/templates/`. Read only the template you are rendering.
- Operating model and agent roster: `.agents/AGENT.md`. Read it when orchestrating a multi-step command, not at session start.

## Enforcement

- Boundary and import checks run automatically after every edit inside the source root (PostToolUse hook). When one reports a violation, fix it before continuing.
