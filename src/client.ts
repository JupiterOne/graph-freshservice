import fetch, { Response } from 'node-fetch';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import {
  FreshserviceAgent,
  FreshserviceAgentGroup,
  FreshserviceAgentRole,
  FreshserviceTicket,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}
  private baseUri = `https://${this.config.hostName}.freshservice.com/api/v2/`;
  private withBaseUri = (path: string) => `${this.baseUri}${path}`;
  private perPage = 100;
  private retryAfter = 0;

  private checkStatus = (response: Response) => {
    if (response.ok) {
      this.retryAfter = 0;
      return response;
    } else if (response.status === 429) {
      const retryAfter: string = response.headers.get('retry-after');
      if (retryAfter) {
        this.retryAfter = parseInt(retryAfter, 10);
      }
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async getRequest(endpoint: string, method: 'GET'): Promise<Response> {
    const auth =
      'Basic ' + Buffer.from(this.config.apiKey + ':').toString('base64');
    try {
      const options = {
        method,
        headers: {
          Authorization: auth,
        },
      };

      const response: Response = await fetch(endpoint, options);
      this.checkStatus(response);

      if (this.retryAfter > 0) {
        await new Promise((r) => setTimeout(r, (this.retryAfter + 3) * 1000));
        const response: Response = await fetch(endpoint, options);
        return response.json();
      }

      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: endpoint,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }
  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri(`roles`);
    try {
      await this.getRequest(uri, 'GET');
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  private async paginatedGeneralRequest<T>(
    uri: string,
    method: 'GET',
    accessor: string,
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    let numElements = 0;
    let currPage = 1;

    do {
      const response = await this.getRequest(
        `${uri}?per_page=${this.perPage}&page=${currPage}`,
        method,
      );

      for (const item of response[accessor]) {
        await iteratee(item);
      }
      currPage += 1;
      numElements = response[accessor].length;

      if (numElements < this.perPage) {
        break;
      }
    } while (numElements == this.perPage);
  }

  public async iterateAgents(
    iteratee: ResourceIteratee<FreshserviceAgent>,
  ): Promise<void> {
    await this.paginatedGeneralRequest<FreshserviceAgent>(
      this.withBaseUri('agents'),
      'GET',
      'agents',
      iteratee,
    );
  }

  public async iterateAgentGroups(
    iteratee: ResourceIteratee<FreshserviceAgentGroup>,
  ): Promise<void> {
    await this.paginatedGeneralRequest<FreshserviceAgentGroup>(
      this.withBaseUri('groups'),
      'GET',
      'groups',
      iteratee,
    );
  }

  public async iterateAgentRoles(
    iteratee: ResourceIteratee<FreshserviceAgentRole>,
  ): Promise<void> {
    await this.paginatedGeneralRequest<FreshserviceAgentRole>(
      this.withBaseUri('roles'),
      'GET',
      'roles',
      iteratee,
    );
  }

  public async iterateTickets(
    iteratee: ResourceIteratee<FreshserviceTicket>,
  ): Promise<void> {
    await this.paginatedGeneralRequest<FreshserviceTicket>(
      this.withBaseUri('tickets'),
      'GET',
      'tickets',
      iteratee,
    );
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
