---
template: repository-adapter
kind: structure
placeholders: [DomainName]
layer: "{infrastructure}"
---

# {{DomainName}} Repository Adapter

Repository adapter: implements the repository ports for the datastore, joining the active unit of work.

This is a **structure spec**: it defines what the artifact must contain, not its syntax. Write it in the project's language, following `rules/global/naming.md` and any `rules/languages/` rule. If the active stack pack has a code blueprint at this same path, use that instead.

## Required Parts

| Part | Requirement |
|------|-------------|
| Implements | `{{DomainName}}Repository` (and the read port, possibly in a separate adapter) |
| Transaction | Uses the transaction context when given |
| Mapping | record → aggregate via rehydration; aggregate → record on save, covering every field |
| Errors | Driver errors wrapped in application-level errors; concurrency conflicts surfaced explicitly |

## Language-Neutral Sketch

```text
Adapter <Tech>{{DomainName}}Repository implements {{DomainName}}Repository
    findById(id): rec = db.get(id); return rec ? {{DomainName}}.rehydrate(toState(rec)) : none
    save(agg, tx?): db.upsert(toRecord(agg), tx)   # check version
```

## Post-Generation Checklist
- [ ] Implements the port exactly
- [ ] Joins the unit of work
- [ ] Bidirectional mapping covers every field
- [ ] Integration-tested against a real datastore
