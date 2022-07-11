import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const agentSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {HOSTNAME}/api/v2/agents
     * PATTERN: Fetch Entities
     */
    id: 'fetch-agents',
    name: 'Fetch Agents',
    entities: [
      {
        resourceName: 'Agent',
        _type: 'freshservice_agent',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'freshservice_account_has_agent',
        sourceType: 'freshservice_account',
        _class: RelationshipClass.HAS,
        targetType: 'freshservice_agent',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build Child Relationships
     */
    id: 'build-agent-and-ticket-relationships',
    name: 'Build Agent and Ticket Relationships',
    entities: [],
    relationships: [
      {
        _type: 'freshservice_agent_has_ticket',
        sourceType: 'freshservice_agent',
        _class: RelationshipClass.HAS,
        targetType: 'freshservice_ticket',
      },
    ],
    dependsOn: ['fetch-agents', 'fetch-tickets'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build Child Relationships
     */
    id: 'build-agent-group-and-ticket-relationships',
    name: 'Build Agent Group and Ticket Relationships',
    entities: [],
    relationships: [
      {
        _type: 'freshservice_agent_group_has_ticket',
        sourceType: 'freshservice_agent_group',
        _class: RelationshipClass.HAS,
        targetType: 'freshservice_ticket',
      },
    ],
    dependsOn: ['fetch-agent-groups', 'fetch-tickets'],
    implemented: true,
  },
];
