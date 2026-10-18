---
template: module
kind: structure
placeholders: [DomainName]
layer: "composition root"
---

# {{DomainName}} Wiring

Wiring: binds the domain's ports to adapters and registers its handlers and driving adapters, using the project's DI or manual wiring.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Bindings | Every port → one adapter |
| Handlers | Command and query handlers registered with the dispatch mechanism |
| Adapters | Driving adapters registered with the transport |
| Scope | The only place that references adapters by concrete type |

## Language-Neutral Sketch

```text
wire {{DomainName}}:
    bind {{DomainName}}Repository -> <Tech>{{DomainName}}Repository
    bind {{DomainName}}ReadRepository -> <Tech>{{DomainName}}ReadRepository
    register handlers, register driving adapter
```

## Post-Generation Checklist
- [ ] Each port bound exactly once
- [ ] No adapter referenced outside the composition root
