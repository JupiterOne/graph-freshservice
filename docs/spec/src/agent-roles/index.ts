import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const agentRoleSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {HOSTNAME}/api/v2/roles
     * PATTERN: Fetch Entities
     */
    id: 'fetch-agent-roles',
    name: 'Fetch Agent Roles',
    entities: [
      {
        resourceName: 'Agent Role',
        _type: 'freshservice_agent_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [
      {
        _type: 'freshservice_account_has_agent_role',
        sourceType: 'freshservice_account',
        _class: RelationshipClass.HAS,
        targetType: 'freshservice_agent_role',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
