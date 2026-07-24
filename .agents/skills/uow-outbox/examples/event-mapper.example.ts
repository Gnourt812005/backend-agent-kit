/**
 * Example: Event Mapper — Domain Events → Integration Events
 *
 * Shows: How domain events from aggregates are mapped to integration events
 * with transport metadata for reliable async delivery via outbox + RMQ.
 *
 * See src/application/mappers/event.mapper.ts for the real implementation.
 */
import { Injectable } from '@nestjs/common';
import { DomainEvent } from '@/core/common/base.domain-event';
import { IntegrationEvent } from '@/core/common/base.integration-event';
import { IDomainEventMapper } from '@/application/interfaces/domain-event-mapper.interface';

@Injectable()
export class DomainEventMapper implements IDomainEventMapper {
  mapToIntegrationEvents(domainEvents: DomainEvent[]): IntegrationEvent[] {
    return domainEvents.map(event => {
      switch (event.eventType) {
        case 'CampaignParticipantCreated':
          return new IntegrationEvent('campaign.participant.created', event.payload, {
            correlationId: event.payload.campaignParticipantId,
          }, {
            routingKey: 'campaign.participant.created',
          });

        case 'UserSignedUp':
          return new IntegrationEvent('user.signed_up', event.payload, {
            correlationId: event.payload.userId,
          }, {
            routingKey: 'user.signed_up',
          });

        case 'EntityHardDeleted':
          return new IntegrationEvent('entity.hard_deleted', event.payload, null, {
            routingKey: 'entity.hard_deleted',
          });

        default:
          // Unknown events are wrapped with a generic routing key
          return new IntegrationEvent(event.eventType, event.payload, null, {
            routingKey: 'domain.event.unknown',
          });
      }
    });
  }
}
