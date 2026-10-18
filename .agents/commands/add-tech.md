---
name: add-tech
description: Integrate a new infrastructure technology (cache, broker, storage, socket gateway, external API) behind a port, documenting the decision in docs/tech/ and wiring the adapter.
---

# Command: add-tech

## Intent
Integrate a new infrastructure technology behind a port, so inner layers never depend on it.

## Preconditions
- Technology name, purpose, target module

## Steps
1. Activate [`architect`](../agents/architect.md) agent.
2. Read `docs/tech/stack.md` and `docs/architecture/service.md`.
3. Check [`dependency-rule`](../rules/global/dependency-rule.md) and any framework rules from the active stack pack in `rules/frameworks/`.
4. Record the decision and integration approach in `docs/tech/integrations.md` (and an ADR if it changes architecture).
5. Declare or reuse a port in `{domain}` or `{application}`.
6. Implement the adapter in `{infrastructure}` and bind it in the composition root.
7. Add the library to `[boundaries]` in `.agents/kit.toml` if inner layers must never import it.
8. Run [`after-generate.sh`](../hooks/after-generate.sh).

## Deliverables
- Port, adapter, and composition-root binding
- Updated `docs/tech/integrations.md`
