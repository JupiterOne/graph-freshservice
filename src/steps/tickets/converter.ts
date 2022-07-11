import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { FreshserviceTicket } from '../../types';
import { Entities } from '../constants';

export function getTicketKey(id: string): string {
  return `freshservice_ticket:${id}`;
}

export function createTicketEntity(ticket: FreshserviceTicket): Entity {
  return createIntegrationEntity({
    entityData: {
      source: ticket,
      assign: {
        _type: Entities.TICKET._type,
        _class: Entities.TICKET._class,
        _key: getTicketKey(ticket.id.toString()),
        name: ticket.id.toString(),
        displayName: ticket.id.toString(),
        subject: ticket.subject,
        groupId: ticket.group_id,
        departmentId: ticket.department_id,
        category: ticket.category?.toString(),
        subCategory: ticket.sub_category,
        itemCategory: ticket.item_category,
        requesterId: ticket.requester_id,
        responderId: ticket.responder_id,
        dueBy: parseTimePropertyValue(ticket.due_by),
        frEscalated: ticket.fr_escalated,
        deleted: ticket.deleted,
        spam: ticket.spam,
        emailConfigId: ticket.email_config_id,
        isEscalated: ticket.is_escalated,
        frDueBy: parseTimePropertyValue(ticket.fr_due_by),
        id: ticket.id.toString(),
        priority: ticket.priority,
        status: ticket.status,
        source: ticket.source,
        createdOn: parseTimePropertyValue(ticket.created_at),
        updatedOn: parseTimePropertyValue(ticket.updated_at),
        requestedForId: ticket.requested_for_id,
        toEmails: ticket.to_emails,
        type: ticket.type,
        description: ticket.description,
        descriptionText: ticket.description_text,
      },
    },
  });
}
