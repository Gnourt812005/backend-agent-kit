---
template: mapper
kind: structure
placeholders: [DomainName, FeatureName]
layer: "{application}"
---

# {{DomainName}} Mapper

Mapper: converts between aggregates and output DTOs (and from input DTOs to domain inputs).

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Direction | Aggregate → DTO for responses; input DTO → domain input for commands |
| Purity | No I/O; deterministic |
| Location | Application layer; persistence mapping belongs to the repository adapter |

## Language-Neutral Sketch

```text
toDto({{DomainName}}) -> {{DomainName}}Dto
toCreateInput({{FeatureName}}Input) -> Create{{DomainName}}Input
```

## Post-Generation Checklist
- [ ] No persistence or transport concerns
- [ ] Pure functions, unit-tested
