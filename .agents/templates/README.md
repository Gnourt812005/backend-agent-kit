# Code & Doc Templates

Templates in `.agents/templates/` are annotated markdown blueprints that agents render into code and documentation.

## Two kinds of template

| Kind | Where | Contains |
|------|-------|----------|
| **Structure spec** (`kind: structure`) | Core: `domain/`, `application/`, `infrastructure/`, `api/` | What the artifact must contain, a language-neutral sketch, and a checklist. The agent writes it in the project's language. |
| **Code blueprint** (`kind: code`) | Stack packs: `.agents/stacks/<pack>/templates/…` | Production code in one stack with `{{placeholders}}` and `WHY:` comments. |

When a stack pack is active and has a file at the same path, the pack's code blueprint replaces the core structure spec. Docs, spec, refactor, and health templates are stack-neutral and shared.

## Frontmatter

```yaml
---
template: aggregate
kind: structure          # structure | code
placeholders: [DomainName, DOMAIN_NAME]
layer: "{domain}"        # resolved from [layout] in .agents/kit.toml
---
```

## Variable Substitutions

| Placeholder | Example (`Campaign`) | Example (`FacebookPage`) |
|-------------|----------------------|--------------------------|
| `{{DomainName}}` | `Campaign` | `FacebookPage` |
| `{{domainName}}` | `campaign` | `facebook-page` |
| `{{DOMAIN_NAME}}` | `CAMPAIGN` | `FACEBOOK_PAGE` |
| `{{propertyName}}` | `campaignName` | `facebookPage` |

Layer placeholders (`{domain}`, `{application}`, `{infrastructure}`, `{api}`, `{tests}`, `{source_root}`) come from `[layout]` in `.agents/kit.toml`.
