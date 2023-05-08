import { createRequestService } from '@/api/request';
import { errorHandler } from '@/utils/response-check';
import type { IRequestService, Response } from '@/api/request.types';
import { IAuth } from '@/gateway/auth.gateway.types';
import type { LocalStorage } from '@/api/localStorage.types';
import { createLocalStorage } from '@/api/localStorage';

const createAuthGateway = (
  requestService: IRequestService,
  localStorage: LocalStorage,
) => {
  const setLocalAccessToken = (token: string) => {
    localStorage.setItem(IAuth.Enum.Token.AccessToken, token);
  }

  const getLocalAccessToken = () => {
    return localStorage.getItem(IAuth.Enum.Token.AccessToken);
  }

  return {
    getLocalAccessToken,
    initToken: async function() {
      const loggedIn = getLocalAccessToken();

      if (!loggedIn) {
        const data = await this.signIn();

        if (data.isSuccess) {
          setLocalAccessToken(data.response.token);
        }
      }
    },
    signIn: async function (): Promise<Response<IAuth.Token>> {
      try {
        const { data } = await requestService.request<IAuth.Token>("/auth/anonymous?platform=subscriptions", "get");

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e);
      }
    },
  }
}

export const authGateway = createAuthGateway(createRequestService(), createLocalStorage())