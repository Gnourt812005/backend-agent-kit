---
description: Hexagonal (Ports and Adapters) architecture rules
paths:
  - "{source_root}/**"
---

# Hexagonal Architecture Rules

- The domain and application sit inside the hexagon and know nothing about delivery or storage technology.
- Driving (primary) adapters, such as HTTP or RPC handlers, message consumers, CLI and schedulers, call application use cases.
- Driven (secondary) adapters, such as repositories, message publishers, mailers and external API clients, implement ports declared inside the hexagon.
- Depend on ports, not adapters. Swapping an adapter must not change domain or application code.
