import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const ACCOUNT_ENTITY_KEY = 'entity:account';

export const Steps = {
  ACCOUNT: 'fetch-account',
  AGENT: 'fetch-agents',
  AGENT_GROUP: 'fetch-agent-groups',
  AGENT_ROLE: 'fetch-agent-roles',
  TICKET: 'fetch-tickets',
  BUILD_AGENT_TICKET_RELATIONSHIPS: 'build-agent-and-ticket-relationships',
  BUILD_AGENT_GROUP_TICKET_RELATIONSHIPS:
    'build-agent-group-and-ticket-relationships',
  BUILD_AGENT_ROLE_RELATIONSHIPS: 'build-agent-and-role-relationships',
  BUILD_AGENT_GROUP_AGENT_RELATIONSHIPS:
    'build-agent-group-and-agent-relationships',
  BUILD_ACCOUNT_AGENT_RELATIONSHIPS: 'build-account-and-agent-relationships',
};

export const Entities: Record<
  'ACCOUNT' | 'AGENT' | 'AGENT_GROUP' | 'AGENT_ROLE' | 'TICKET',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'freshservice_account',
    _class: ['Account'],
  },
  AGENT: {
    resourceName: 'Agent',
    _type: 'freshservice_agent',
    _class: ['User'],
  },
  AGENT_GROUP: {
    resourceName: 'Agent Group',
    _type: 'freshservice_agent_group',
    _class: ['Group'],
  },
  AGENT_ROLE: {
    resourceName: 'Agent Role',
    _type: 'freshservice_agent_role',
    _class: ['AccessRole'],
  },
  TICKET: {
    resourceName: 'Ticket',
    _type: 'freshservice_ticket',
    _class: ['RecordEntity'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_AGENT'
  | 'ACCOUNT_HAS_AGENT_ROLE'
  | 'ACCOUNT_HAS_AGENT_GROUP'
  | 'ACCOUNT_HAS_TICKET'
  | 'AGENT_ROLE_ASSIGNED_AGENT'
  | 'AGENT_GROUP_HAS_AGENT'
  | 'AGENT_HAS_TICKET'
  | 'AGENT_GROUP_HAS_TICKET',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_AGENT: {
    _type: 'freshservice_account_has_agent',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.AGENT._type,
  },
  ACCOUNT_HAS_AGENT_GROUP: {
    _type: 'freshservice_account_has_agent_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.AGENT_GROUP._type,
  },
  ACCOUNT_HAS_AGENT_ROLE: {
    _type: 'freshservice_account_has_agent_role',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.AGENT_ROLE._type,
  },
  ACCOUNT_HAS_TICKET: {
    _type: 'freshservice_account_has_ticket',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.TICKET._type,
  },
  AGENT_ROLE_ASSIGNED_AGENT: {
    _type: 'freshservice_agent_role_assigned_agent',
    sourceType: Entities.AGENT_ROLE._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.AGENT._type,
  },
  AGENT_GROUP_HAS_AGENT: {
    _type: 'freshservice_agent_group_has_agent',
    sourceType: Entities.AGENT_GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.AGENT._type,
  },
  AGENT_HAS_TICKET: {
    _type: 'freshservice_agent_has_ticket',
    sourceType: Entities.AGENT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.TICKET._type,
  },
  AGENT_GROUP_HAS_TICKET: {
    _type: 'freshservice_agent_group_has_ticket',
    sourceType: Entities.AGENT_GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.TICKET._type,
  },
};
