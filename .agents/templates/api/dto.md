---
template: api-dto
kind: structure
placeholders: [FeatureName]
layer: "{api}"
---

# {{FeatureName}} Transport Contract

Transport contract: the wire shape for an endpoint (request/response body, RPC message, or event payload) and its mapping to application DTOs.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Wire shape | Matches the transport definition (OpenAPI, proto, or schema registry) |
| Versioning | Breaking changes go to a new version |
| Mapping | Wire ↔ application DTO in the adapter |

## Language-Neutral Sketch

```text
{{FeatureName}}Request  -> {{FeatureName}}Input
{{FeatureName}}Output -> {{FeatureName}}Response
```

## Post-Generation Checklist
- [ ] Contract defined in the transport's schema format
- [ ] Backward-compatible or versioned
