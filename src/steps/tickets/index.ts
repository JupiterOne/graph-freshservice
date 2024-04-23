import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import {
  Entities,
  Relationships,
  Steps,
  ACCOUNT_ENTITY_KEY,
} from '../constants';
import { createTicketEntity } from './converter';

export async function fetchTickets({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateTickets(async (ticket) => {
    const ticketEntity = createTicketEntity(ticket);
    if (!jobState.hasKey(ticketEntity._key)) {
      await jobState.addEntity(ticketEntity);

      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: accountEntity,
          to: ticketEntity,
        }),
      );
    } else {
      logger.info({ ticketKey: ticketEntity._key }, 'Found duplicated key');
    }
  });
}

export const ticketSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.TICKET,
    name: 'Fetch Tickets',
    entities: [Entities.TICKET],
    relationships: [Relationships.ACCOUNT_HAS_TICKET],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchTickets,
  },
];
