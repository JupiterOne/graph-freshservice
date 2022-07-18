import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const agentGroupSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {HOSTNAME}/api/v2/groups
     * PATTERN: Fetch Entities
     */
    id: 'fetch-agent-groups',
    name: 'Fetch Agent Groups',
    entities: [
      {
        resourceName: 'Agent Group',
        _type: 'freshservice_agent_group',
        _class: ['Group'],
      },
    ],
    relationships: [
      {
        _type: 'freshservice_account_has_agent_group',
        sourceType: 'freshservice_account',
        _class: RelationshipClass.HAS,
        targetType: 'freshservice_agent_group',
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
    id: 'build-agent-group-and-agent-relationships',
    name: 'Build Agent Group and Agent Relationships',
    entities: [],
    relationships: [
      {
        _type: 'freshservice_agent_group_has_agent',
        sourceType: 'freshservice_agent_group',
        _class: RelationshipClass.HAS,
        targetType: 'freshservice_agent',
      },
    ],
    dependsOn: ['fetch-agents', 'fetch-agent-groups'],
    implemented: true,
  },
];
