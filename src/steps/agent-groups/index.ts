import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  getRawData,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { FreshserviceAgentGroup } from '../../types';
import {
  Entities,
  Relationships,
  Steps,
  ACCOUNT_ENTITY_KEY,
} from '../constants';
import { createAgentRoleEntity } from './converter';
import { getAgentKey } from '../agent/converter';

export async function fetchAgentGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateAgentGroups(async (agentGroup) => {
    const agentGroupEntity = await jobState.addEntity(
      createAgentRoleEntity(agentGroup),
    );
    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: agentGroupEntity,
      }),
    );
  });
}

export async function buildAgentGroupAndAgentRelationships({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.AGENT_GROUP._type },
    async (agentGroupEntity) => {
      const agentGroup = getRawData<FreshserviceAgentGroup>(agentGroupEntity);
      if (!agentGroup) {
        logger.warn(
          { _key: agentGroupEntity._key },
          'Could not get raw data for agent group entity',
        );
        return;
      }

      for (const member of agentGroup.members) {
        const agentEntity = await jobState.findEntity(getAgentKey(member));

        if (!agentEntity) {
          continue;
        }

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: agentGroupEntity,
            to: agentEntity,
          }),
        );
      }
    },
  );
}

export const groupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.AGENT_GROUP,
    name: 'Fetch Agent Groups',
    entities: [Entities.AGENT_GROUP],
    relationships: [Relationships.ACCOUNT_HAS_AGENT_GROUP],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchAgentGroups,
  },
  {
    id: Steps.BUILD_AGENT_GROUP_AGENT_RELATIONSHIPS,
    name: 'Build Agent Group and Agent Relationships',
    entities: [],
    relationships: [Relationships.AGENT_GROUP_HAS_AGENT],
    dependsOn: [Steps.AGENT, Steps.AGENT_GROUP],
    executionHandler: buildAgentGroupAndAgentRelationships,
  },
];
