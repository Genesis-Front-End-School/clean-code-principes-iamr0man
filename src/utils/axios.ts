import axiosOriginal from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getLocalAccessToken } from '@/api/auth';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/${
  import.meta.env.VITE_API_VERSION
}`;

export const axiosOptions: AxiosRequestConfig = {
  withCredentials: true,
  baseURL,
};

const axiosWithoutRequestInterceptor = axiosOriginal.create(axiosOptions);
const axios: AxiosInstance = axiosOriginal.create(axiosOptions);

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = 'Bearer ' + getLocalAccessToken();
    return config;
  },
  (error) => {
    throw new Error(error);
  },
);

axios.interceptors.response.use((response) => response);

axiosWithoutRequestInterceptor.interceptors.response.use(
  (response) => response,
);

export { axios, axiosWithoutRequestInterceptor };
