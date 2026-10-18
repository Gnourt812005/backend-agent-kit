---
template: query-handler
kind: structure
placeholders: [FeatureName]
layer: "{application}"
---

# {{FeatureName}} Query Handler

Query handler: returns DTOs from a read repository or projection, with no aggregate, transaction, or events.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Dependencies | Read-repository port only |
| Access | Authorization applied to the actor before or within the read |
| Return | DTO, list, or page of DTOs |

## Language-Neutral Sketch

```text
handle({{FeatureName}} q):
    return readRepo.list(q.filter, q.page)
```

## Post-Generation Checklist
- [ ] No aggregate rehydration
- [ ] No transaction and no events
- [ ] Returns DTOs only
