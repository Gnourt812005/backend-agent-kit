---
template: command-handler
kind: structure
placeholders: [DomainName, FeatureName]
layer: "{application}"
---

# {{FeatureName}} Command Handler

Command handler: orchestrates one write use case inside a single unit of work, with the save and outbox records committing together.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Dependencies | Repository port, transaction runner, and event publisher, all injected as ports |
| Transaction | The whole write path runs inside `run_in_transaction` |
| Domain logic | Delegated to aggregate methods; the handler never decides business rules |
| Events | Aggregate events published through the outbox with the same transaction context |
| Return | Identifier or nothing |

## Language-Neutral Sketch

```text
handle({{FeatureName}} cmd):
    return tx_runner.run_in_transaction(tx =>
        aggregate = {{DomainName}}.create(cmd.input)   # or load + call a domain method
        repo.save(aggregate, tx)
        events.publish(aggregate, tx)                  # outbox rows, same tx
        return aggregate.id)
```

## Post-Generation Checklist
- [ ] Depends on ports only
- [ ] Save and outbox publish share one transaction
- [ ] No business rule decided in the handler
- [ ] Registered in the composition root
