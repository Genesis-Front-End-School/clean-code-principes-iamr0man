import type { AxiosResponse } from 'axios';

export namespace IRequestService {
  export interface Model {
    request: <K, T = {}>(
      endpoint: string,
      method: string,
      payload?: T
    ) => Promise<AxiosResponse<K>>;
  }
};
