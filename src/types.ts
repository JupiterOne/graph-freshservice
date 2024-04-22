export type FreshserviceAccount = {
  subject: string;
};

export type FreshserviceAgent = {
  active: boolean;
  address: string;
  auto_assign_status_changed_at: string;
  auto_assign_tickets: boolean;
  background_information: string;
  can_see_all_tickets_from_associated_departments: boolean;
  created_at: string;
  department_ids: string[];
  email: string;
  external_id: string;
  first_name: string;
  has_logged_in: string;
  id: number;
  job_title: string;
  language: string;
  last_active_at: string;
  last_login_at: string;
  last_name?: string;
  location_id: string;
  mobile_phone_number: string;
  reporting_manager_id: string;
  role_idupdatedAts: string[];
  roles: {
    role_id: string;
    assignment_scope: string;
    groups: string[];
  }[];
  scopes: {
    ticket: string;
    problem: string;
    change: string;
    release: string;
    asset: string;
    solution: string;
    contract: string;
  };
  scoreboard_level_id: string;
  scoreboard_points: string;
  signature: string;
  time_format: string;
  time_zone: string;
  updated_at: string;
  vip_user: boolean;
  work_phone_number: string;
  group_ids: string[];
  member_of: string[];
  observer_of: string[];
  member_of_pending_approval: string[];
  observer_of_pending_approval: string[];
};

export type FreshserviceAgentGroup = {
  id: number;
  name: string;
  description: string;
  escalate_to: number;
  unassigned_for: string;
  business_hours_id: number;
  created_at: string;
  updated_at: string;
  auto_ticket_assign: string;
  restricted: boolean;
  approval_required: boolean;
  ocs_schedule_id: string;
  agent_ids: string[];
  members: string[];
  observers: string[];
  leaders: string[];
  members_pending_approval: string[];
  leaders_pending_approval: string[];
  observers_pending_approval: string[];
};

export type FreshserviceAgentRole = {
  id: number;
  name: string;
  description?: string;
  default: boolean;
  scopes: {
    ticket: string;
    problem: string;
    change: string;
    release: string;
    asset: string;
    solution: string;
    contract: string;
  };
  created_at: string;
  updated_at: string;
};

export type FreshserviceTicket = {
  subject: string;
  group_id: string;
  department_id: string;
  category?: string;
  sub_category: string;
  item_category: string;
  requester_id: string;
  responder_id: string;
  due_by: string;
  fr_escalated: boolean;
  deleted: boolean;
  spam: boolean;
  email_config_id: string;
  fwd_emails: string[];
  reply_cc_emails: string[];
  cc_emails: string[];
  is_escalated: boolean;
  fr_due_by: string;
  id: number;
  priority: number;
  status: number;
  source: number;
  created_at: string;
  updated_at: string;
  requested_for_id: string;
  to_emails: string;
  type: string;
  description: string;
  description_text: string;
  workspace_id: string;
};
