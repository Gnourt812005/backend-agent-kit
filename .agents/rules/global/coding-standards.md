---
description: Language-agnostic coding standards for type safety and immutability
paths:
  - "{source_root}/**"
  - "{tests}/**"
---

# Coding Standards

Language-specific standards (compiler flags, linters, idioms) come from the active stack pack in `rules/languages/`.

## Directives

1. **Strong typing**: No escape-hatch types (`any`, untyped `interface{}`, bare `object`, untyped dicts) in domain or application code. Use explicit types, generics, or a top type narrowed by checks.
2. **Explicit absence**: Handle missing values (null, nil, None, optional) explicitly at every boundary.
3. **Explicit signatures**: Public functions and methods declare their parameter and return types.
4. **Immutability**: Value objects, commands, queries, and events are immutable after construction.
5. **Encapsulated state**: Domain state changes only through aggregate-root methods, never by direct field mutation from outside.
