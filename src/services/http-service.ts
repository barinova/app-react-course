import apiClient from './api-client.ts';

interface Entity {
  id: number;
}

class HttpService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll<T>() {
    const abortController = new AbortController();
    const req = apiClient.get<T[]>(this.endpoint, {
      signal: abortController.signal,
    });
    return { req, cancel: () => abortController.abort() };
  }

  add<T>(user: T) {
    return apiClient.post(this.endpoint, user);
  }

  update<T extends Entity>(user: T) {
    return apiClient.patch(`${this.endpoint}/${user.id}`, user);
  }

  delete<T extends Entity>(user: T) {
    return apiClient.delete(`${this.endpoint}/${user.id}`);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
