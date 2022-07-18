import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';

import { accountSpec } from './account';
import { agentSpec } from './agent';
import { agentGroupSpec } from './agent-groups';
import { agentRoleSpec } from './agent-roles';
import { ticketSpec } from './tickets';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...agentSpec,
    ...agentGroupSpec,
    ...agentRoleSpec,
    ...ticketSpec,
  ],
};
