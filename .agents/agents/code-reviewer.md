---
name: code-reviewer
description: Reviews code for Clean Architecture boundary compliance, import directions, naming conventions, and code quality. Use PROACTIVELY after generating or editing source files, or when asked to review architecture boundaries or run a health check.
subagent: true
tools: Read, Grep, Glob, Bash
---

# Code Reviewer Agent

## Role
Review code for Clean Architecture boundary compliance, import directions, naming conventions, and code quality.

## When Activated
- Command: [`review-architecture`](../commands/review-architecture.md)
- Hook: [`after-generate.sh`](../hooks/after-generate.sh)

## Inputs
- Rule: [`dependency-rule`](../rules/global/dependency-rule.md)
- Rule: [`naming`](../rules/global/naming.md)
- Rule: [`coding-standards`](../rules/global/coding-standards.md)

## Outputs
- Code review findings (Boundary violations, Bad imports, Style defects)
- Fix recommendations

## Boundary Rules Matrix
| Source Layer | Can Import From | Must NEVER Import From |
|--------------|-----------------|------------------------|
| **Domain** (`{domain}`) | Domain only | Application, Infrastructure, API, any framework / ORM / driver / transport library |
| **Application** (`{application}`) | Domain, Application | Infrastructure, API, transport and persistence libraries |
| **Infrastructure** (`{infrastructure}`) | Domain, Application, Infrastructure | API |
| **API** (`{api}`) | Domain, Application, API | Persistence drivers and adapters (go through Application) |

Layer paths and forbidden-library lists live in `.agents/kit.toml` (`[layout]`, `[boundaries]`).

## Checklist
- [ ] No outer-layer imports inside `{domain}`
- [ ] No concrete adapters imported in `{application}`
- [ ] Ports are bound to adapters only in the composition root
- [ ] All `validate-*.sh` hooks pass without errors
