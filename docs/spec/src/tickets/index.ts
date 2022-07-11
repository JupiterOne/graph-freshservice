import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const ticketSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {HOSTNAME}/api/v2/tickets
     * PATTERN: Fetch Entities
     */
    id: 'fetch-tickets',
    name: 'Fetch Tickets',
    entities: [
      {
        resourceName: 'Ticket',
        _type: 'freshservice_ticket',
        _class: ['RecordEntity'],
      },
    ],
    relationships: [
      {
        _type: 'freshservice_account_has_ticket',
        sourceType: 'freshservice_account',
        _class: RelationshipClass.HAS,
        targetType: 'freshservice_ticket',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
