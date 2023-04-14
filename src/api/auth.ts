import { axios } from '@/utils/axios';

interface AuthResponse {
  token: string;
}

export async function signIn () {
  const { data } = await axios.get<AuthResponse>('/auth/anonymous?platform=subscriptions');
  return data.token
}

export function setLocalAccessToken (token: string) {
  return window.localStorage.setItem("accessToken", token);
}

export function getLocalAccessToken () {
  return window.localStorage.getItem('accessToken');
}
