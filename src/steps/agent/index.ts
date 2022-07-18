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
import { FreshserviceAgent, FreshserviceTicket } from '../../types';
import {
  Entities,
  Relationships,
  Steps,
  ACCOUNT_ENTITY_KEY,
} from '../constants';
import { createAgentEntity } from './converter';
import { getAgentKey } from './converter';
import { getGroupKey } from '../agent-groups/converter';
import { getRoleKey } from '../agent-roles/converter';

export async function fetchAgents({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateAgents(async (agent) => {
    const agentEntity = await jobState.addEntity(createAgentEntity(agent));

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: agentEntity,
      }),
    );
  });
}

export async function buildAgentRoleRelationships({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    {
      _type: Entities.AGENT._type,
    },
    async (agentEntity) => {
      const agent = getRawData<FreshserviceAgent>(agentEntity);
      if (!agent) {
        logger.warn(
          { _key: agentEntity._key },
          'Could not get raw data for agent entity',
        );
        return;
      }

      for (const role of agent.roles) {
        const roleEntity = await jobState.findEntity(getRoleKey(role.role_id));
        if (!roleEntity) {
          continue;
        }

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.ASSIGNED,
            from: roleEntity,
            to: agentEntity,
          }),
        );
      }
    },
  );
}

export async function buildAgentAndTicketRelationships({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.TICKET._type },
    async (ticketEntity) => {
      const ticket = getRawData<FreshserviceTicket>(ticketEntity);
      if (!ticket) {
        logger.warn(
          { _key: ticketEntity._key },
          'Could not get raw data for ticket entity',
        );
        return;
      }

      const agentEntity = await jobState.findEntity(
        getAgentKey(ticket.responder_id),
      );

      if (!agentEntity) {
        return;
      }

      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: agentEntity,
          to: ticketEntity,
        }),
      );
    },
  );
}

export async function buildAgentGroupAndTicketRelationships({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.TICKET._type },
    async (ticketEntity) => {
      const ticket = getRawData<FreshserviceTicket>(ticketEntity);
      if (!ticket) {
        logger.warn(
          { _key: ticketEntity._key },
          'Could not get raw data for ticket entity',
        );
        return;
      }

      const agentGroupEntity = await jobState.findEntity(
        getGroupKey(ticket.group_id),
      );

      if (!agentGroupEntity) {
        return;
      }

      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: agentGroupEntity,
          to: ticketEntity,
        }),
      );
    },
  );
}

export const agentSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.AGENT,
    name: 'Fetch Agents',
    entities: [Entities.AGENT],
    relationships: [Relationships.ACCOUNT_HAS_AGENT],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchAgents,
  },
  {
    id: Steps.BUILD_AGENT_ROLE_RELATIONSHIPS,
    name: 'Build Agent and Role Relationships',
    entities: [],
    relationships: [Relationships.AGENT_ROLE_ASSIGNED_AGENT],
    dependsOn: [Steps.AGENT, Steps.AGENT_ROLE],
    executionHandler: buildAgentRoleRelationships,
  },
  {
    id: Steps.BUILD_AGENT_TICKET_RELATIONSHIPS,
    name: 'Build Agent and Ticket Relationships',
    entities: [],
    relationships: [Relationships.AGENT_HAS_TICKET],
    dependsOn: [Steps.AGENT, Steps.TICKET],
    executionHandler: buildAgentAndTicketRelationships,
  },
  {
    id: Steps.BUILD_AGENT_GROUP_TICKET_RELATIONSHIPS,
    name: 'Build Agent Group and Ticket Relationships',
    entities: [],
    relationships: [Relationships.AGENT_GROUP_HAS_TICKET],
    dependsOn: [Steps.AGENT_GROUP, Steps.TICKET],
    executionHandler: buildAgentGroupAndTicketRelationships,
  },
];
