import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { FreshserviceAgentRole } from '../../types';
import { Entities } from '../constants';

export function getRoleKey(id: string): string {
  return `freshservice_role:${id}`;
}

export function createAgentRoleEntity(role: FreshserviceAgentRole): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _type: Entities.AGENT_ROLE._type,
        _class: Entities.AGENT_ROLE._class,
        _key: getRoleKey(role.id.toString()),
        id: role.id.toString(),
        name: role.name,
        description: role.description,
        default: role.default,
        createdOn: parseTimePropertyValue(role.created_at),
        updatedOn: parseTimePropertyValue(role.updated_at),
        'scope.ticket': role.scopes.ticket,
        'scope.problem': role.scopes.problem,
        'scope.change': role.scopes.change,
        'scope.release': role.scopes.release,
        'scope.asset': role.scopes.asset,
        'scope.solution': role.scopes.solution,
        'scope.contract': role.scopes.contract,
      },
    },
  });
}
