import type { IAuth } from '@/api/localStorage.types';
import { createRequestService, type RequestService } from '@/api/request';
import { errorHandler } from '@/utils/response-check';

const createAuthGateway = (requestService: RequestService) => {
  return {
    signIn: async () => {
      try {
        const { data } = await requestService.request<IAuth.Token>("/auth/anonymous?platform=subscriptions", "get");

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        errorHandler(e);
      }
    },
  }
}

export const authGateway = createAuthGateway(createRequestService())