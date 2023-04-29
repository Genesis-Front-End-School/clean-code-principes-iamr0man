import { axios } from '@/utils/axios';
import type { IRequestService } from '@/api/request.types';

export function createRequestService(): IRequestService.Model {
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
