---
template: controller
kind: structure
placeholders: [DomainName, FeatureName]
layer: "{api}"
---

# {{DomainName}} Driving Adapter

Driving adapter (HTTP route, RPC method, or message handler): turns transport input into a command or query and maps the result back.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Input | Parse and validate into the input DTO; reject invalid input with the error envelope |
| Identity | Resolve the actor from the transport (token, metadata, message header) |
| Authorization | Authenticated by default; per-use-case permission check |
| Dispatch | Exactly one command or query per operation |
| Errors | Map domain and application errors to transport errors with stable codes |

## Language-Neutral Sketch

```text
on <route | rpc method | topic>:
    input = validate({{FeatureName}}Input, request)        # 400 / INVALID_ARGUMENT on failure
    actor = authenticate(request); authorize(actor, "{{feature}}")
    result = dispatch({{FeatureName}}Command(input, actor))
    return toResponse(result)
```

## Post-Generation Checklist
- [ ] No business logic in the adapter
- [ ] Auth required unless explicitly public
- [ ] Errors use the shared envelope
- [ ] Contract documented in `docs/domains/<x>/api.md`
