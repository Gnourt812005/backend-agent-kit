/**
 * Example: Event Service Usage in Command Handler
 *
 * Shows: How to call eventService.publishEvents() after saving an aggregate.
 * The events are persisted in the same UoW transaction as the aggregate,
 * then delivered asynchronously to RabbitMQ via the outbox processor.
 *
 * See src/application/commands/ for real handler implementations.
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, type ICampaignRepository } from '@/core/interfaces/repositories';
import { UNIT_OF_WORK, type IUnitOfWork } from '@/application/interfaces/uow.interface';
import { EVENT_SERVICE, type IEventService } from '@/application/interfaces/event-service.interface';
import { CampaignRoot } from '@/core/aggregate-roots';
import { CreateCampaignCommand } from './create-campaign.command';
import { CampaignDto } from '@/application/dtos';
import { CampaignMapper } from '@/application/mappers';

@CommandHandler(CreateCampaignCommand)
export class CreateCampaignHandler implements ICommandHandler<CreateCampaignCommand, CampaignDto> {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly repository: ICampaignRepository,
    @Inject(UNIT_OF_WORK)
    private readonly uow: IUnitOfWork,
    @Inject(EVENT_SERVICE)
    private readonly eventService: IEventService,
  ) {}

  async execute(command: CreateCampaignCommand): Promise<CampaignDto> {
    // Step 1: Start UoW transaction
    return this.uow.execute(async () => {
      // Step 2: Create aggregate (domain rules enforced here)
      const campaign = CampaignRoot.create(command.input);

      // Step 3: Save aggregate (auto-joins UoW session via ALS)
      await this.repository.save(campaign);

      // Step 4: Publish domain events → outbox records
      // These are inserted in the same MongoDB transaction as the save
      await this.eventService.publishEvents(campaign);

      // Step 5: Return DTO
      return CampaignMapper.toDto(campaign);
    });
  }
}
