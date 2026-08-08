---
name: initialize-session-context
description: Warms up and anchors the model to a workspace's .agents/ conventions (architecture, naming, layer, security, observability rules) with minimal token output.
---

# Initialize Session Context Skill

## Purpose
Establishes the foundational constraints, architectural rules, and domain boundaries of the workspace using the local `.agents/` configuration, so the model operates under precise alignment without generating verbose or redundant output.

## Instructions
1. **Analyze**: Scan `.agents/` configuration files to extract:
   - Architecture patterns (Hexagonal, DDD, CQRS, Event-Driven)
   - Naming conventions (class/file patterns, DI tokens)
   - Coding standards (strict mode, no `any`, explicit return types)
   - Layer dependency rules (Domain → Applications → Infrastructure → API)
   - Security rules (guard stack, data masking)
   - Observability rules (structured logging, correlation IDs)
2. **Anchor**: Align internal attention weights to prioritize these project-specific guardrails over default training data for the rest of the session.
3. **Suppress**: Strictly suppress long-form explanations, summaries, or greetings in the output below.

## Output Format Constraints
Respond **only** with the following structural layout (maximum 10 comma-separated keywords total, to keep output tokens minimal yet effective):

- [Workspace Architecture]: <up to 10 comma-separated key technical/domain terms found in `.agents/`>
- [Status]: [Ready for source code ingestion]
