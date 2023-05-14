import { axios } from '@/infra/utils/axios';
import type { IRequestService } from '@/infra/api/request.types';

export function createRequestService(): IRequestService {
  return {
    request: (endpoint, method, payload) => {
      return axios.request({
        method,
        data: payload,
        responseType: 'json',
        url: endpoint,
        withCredentials: true,
      });
    },
  };
}
