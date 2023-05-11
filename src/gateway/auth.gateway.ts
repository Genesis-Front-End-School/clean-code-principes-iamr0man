import { createRequestService } from '@/api/request';
import { errorHandler } from '@/utils/response-check';
import type { IRequestService, Response } from '@/api/request.types';
import { IAuth } from '@/gateway/auth.gateway.types';
import type { LocalStorage } from '@/api/localStorage.types';
import { createLocalStorage } from '@/api/localStorage';

export interface IAuthGateway {
  setLocalAccessToken: (token: string) => void;
  getLocalAccessToken: () => string | null;
  initToken: () => Promise<void>;
  signIn: () =>  Promise<Response<IAuth.Token>>
}

export const createAuthGateway = (
  requestService: IRequestService,
  localStorage: LocalStorage,
): IAuthGateway => {
  const setLocalAccessToken = (token: string) => {
    localStorage.setItem(IAuth.Enum.Token.AccessToken, token);
  }

  const getLocalAccessToken = () => {
    return localStorage.getItem(IAuth.Enum.Token.AccessToken);
  }

  return {
    setLocalAccessToken,
    getLocalAccessToken,
    initToken: async function() {
      const loggedIn = this.getLocalAccessToken();

      if (!loggedIn) {
        const data = await this.signIn();

        if (data.isSuccess) {
          this.setLocalAccessToken(data.response.token);
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