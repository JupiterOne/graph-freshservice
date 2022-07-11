import { accountSteps } from './account';
import { agentSteps } from './agent';
import { groupSteps } from './agent-groups';
import { roleSteps } from './agent-roles';
import { ticketSteps } from './tickets';
const integrationSteps = [
  ...accountSteps,
  ...agentSteps,
  ...groupSteps,
  ...roleSteps,
  ...ticketSteps,
];

export { integrationSteps };
