import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { FreshserviceAgentGroup } from '../../types';
import { Entities } from '../constants';

export function getGroupKey(id: string): string {
  return `freshservice_group:${id}`;
}

export function createAgentRoleEntity(group: FreshserviceAgentGroup): Entity {
  return createIntegrationEntity({
    entityData: {
      source: group,
      assign: {
        _type: Entities.AGENT_GROUP._type,
        _class: Entities.AGENT_GROUP._class,
        _key: getGroupKey(group.id.toString()),
        id: group.id.toString(),
        name: group.name,
        displayName: group.name,
        description: group.description || undefined,
        escalateTo: group.escalate_to,
        unassignedFor: group.unassigned_for,
        businessHourdsId: group.business_hours_id,
        createdOn: parseTimePropertyValue(group.created_at),
        updatedOn: parseTimePropertyValue(group.updated_at),
        autoTicketAssign: group.auto_ticket_assign,
        restricted: group.restricted,
        approvalRequired: group.approval_required,
        ocsScheduleId: group.ocs_schedule_id,
      },
    },
  });
}
