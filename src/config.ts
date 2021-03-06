import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  hostName: {
    type: 'string',
  },
  apiKey: {
    type: 'string',
    mask: true,
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  hostName: string;
  apiKey: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.hostName || !config.apiKey) {
    throw new IntegrationValidationError(
      'Config requires all of {hostName, apiKey}',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
