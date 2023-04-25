import { IAuth } from '@/api/localStorage.types';

export function setLocalAccessToken(token: string) {
  return window.localStorage.setItem(IAuth.Enum.Token.AccessToken, token);
}

export function getLocalAccessToken() {
  return window.localStorage.getItem(IAuth.Enum.Token.AccessToken);
}
