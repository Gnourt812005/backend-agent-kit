---
template: plan
placeholders: [FeatureName, FeatureNumber]
generates: specs/{{FeatureNumber}}-{{featureName}}/plan.md
---

# Architecture Implementation Plan: {{FeatureName}}

**Feature**: `specs/{{FeatureNumber}}-{{featureName}}`  
**Status**: proposed # proposed | approved  

## 1. Technical Strategy & Architecture Impact
- Selected patterns: Clean Architecture, Hexagonal, CQRS, Event-Driven
- Target layer impact: Core, Application, Infrastructure, Presentation

## 2. Component Design Breakdown

### Core Layer
- Aggregate Roots / Entities / VOs affected or created

### Application Layer
- Commands and Queries to implement

### Infrastructure Layer
- Database schemas, repository ports/adapters, outbox events

### Presentation Layer
- Controllers and endpoint routes

## 3. Security & Safety Review
- Auth guards, roles, input validation (Zod DTOs)
