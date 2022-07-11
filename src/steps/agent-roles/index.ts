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
import { createAgentRoleEntity } from './converter';

export async function fetchAgentRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateAgentRoles(async (agentRole) => {
    const agentRoleEntity = await jobState.addEntity(
      createAgentRoleEntity(agentRole),
    );
    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: agentRoleEntity,
      }),
    );
  });
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.AGENT_ROLE,
    name: 'Fetch Agent Roles',
    entities: [Entities.AGENT_ROLE],
    relationships: [Relationships.ACCOUNT_HAS_AGENT_ROLE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchAgentRoles,
  },
];
