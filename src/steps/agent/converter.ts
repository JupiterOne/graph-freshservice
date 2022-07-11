import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { FreshserviceAgent } from '../../types';
import { Entities } from '../constants';

export function getAgentKey(id: string): string {
  return `freshservice_agent:${id}`;
}

export function createAgentEntity(agent: FreshserviceAgent): Entity {
  return createIntegrationEntity({
    entityData: {
      source: agent,
      assign: {
        _type: Entities.AGENT._type,
        _class: Entities.AGENT._class,
        _key: getAgentKey(agent.id.toString()),
        name: agent.first_name,
        username: agent.first_name,
        active: agent.active,
        address: agent.address,
        autoAssignStatusChangeOn: parseTimePropertyValue(
          agent.auto_assign_status_changed_at,
        ),
        autoAssignTickets: agent.auto_assign_tickets,
        backgroundInformation: agent.background_information,
        canSeeAllTicketsFromAssociatedDepartments:
          agent.can_see_all_tickets_from_associated_departments,
        createdOn: parseTimePropertyValue(agent.created_at),
        email: agent.email,
        externalId: agent.external_id,
        firstName: agent.first_name,
        hasLoggedIn: agent.has_logged_in,
        id: agent.id.toString(),
        jobTitle: agent.job_title,
        language: agent.language,
        lastActiveOn: parseTimePropertyValue(agent.last_active_at),
        lastLoginOn: parseTimePropertyValue(agent.last_login_at),
        lastName: agent.last_name?.toString(),
        locationId: agent.location_id,
        mobilePhoneNumber: agent.mobile_phone_number,
        reportingManagerId: agent.reporting_manager_id,
        scoreboardLevelId: agent.scoreboard_level_id,
        scoreboardPoints: agent.scoreboard_points,
        signature: agent.signature,
        timeFormat: agent.time_format,
        timeZone: agent.time_zone,
        updatedOn: parseTimePropertyValue(agent.updated_at),
        vipUser: agent.vip_user,
        workPhoneNumber: agent.work_phone_number,
      },
    },
  });
}
