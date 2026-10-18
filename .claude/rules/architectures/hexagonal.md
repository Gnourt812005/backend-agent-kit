---
description: Hexagonal Architecture (Ports & Adapters) rules
paths:
  - "src/**"
---

<!-- GENERATED from .agents/rules/architectures/hexagonal.md by .agents/hooks/sync-claude-native.sh — edit the source, not this file. -->

# Hexagonal Architecture Rules

- Core domain application sits inside the hexagon.
- Primary/Driving Adapters (HTTP Controllers, CLI, Sockets) invoke application use cases.
- Secondary/Driven Adapters (Mongoose Repositories, RabbitMQ Producers, Mailers) implement ports declared in Core/Application layers.
- Depend on interfaces (ports), not concrete implementations.
