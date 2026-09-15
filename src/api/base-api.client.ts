import type { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseApiClient {
  protected constructor(protected readonly request: APIRequestContext) {}

  protected get(path: string): Promise<APIResponse> {
    return this.request.get(path);
  }

  protected post(path: string, data: unknown): Promise<APIResponse> {
    return this.request.post(path, { data });
  }

  protected delete(path: string): Promise<APIResponse> {
    return this.request.delete(path);
  }
}
