import { axios } from '@/utils/axios';
import { IAuth } from '@/api/auth.types';

export async function signIn() {
  const { data } = await axios.get<IAuth.Response>(
    '/auth/anonymous?platform=subscriptions',
  );
  return data.token;
}

export function setLocalAccessToken(token: string) {
  return window.localStorage.setItem(IAuth.Enum.Token.AccessToken, token);
}

export function getLocalAccessToken() {
  return window.localStorage.getItem(IAuth.Enum.Token.AccessToken);
}
