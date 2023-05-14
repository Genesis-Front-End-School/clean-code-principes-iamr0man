import { axios } from '@/shared/utils/axios';
import type { IRequestService } from '@/shared/api/request.types';

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
