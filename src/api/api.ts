import type { AxiosError, AxiosResponse } from 'axios';
import { assert } from '@/utils/ts-utils';
import type { ApiService } from '@/api/api.types';
import type { IAuth } from '@/api/localStorage.types';
import { createRequestService } from '@/api/request';
import type { ICourse } from '@/types/ICourse.types';

type RequestService = {
  readonly request: <K, T = {}>(
    endpoint: string,
    method: string,
    payload?: T,
  ) => Promise<AxiosResponse<K>>;
};

type AxiosDetailResponse = {
  readonly detail: string;
};

function isAxiosError(_e: unknown): _e is AxiosError<AxiosDetailResponse> {
  return true;
}

export function createApiService(requestService: RequestService): ApiService {
  return {
    signIn: async () => {
      try {
        const { data } = await requestService.request<IAuth.Token>(
          '/auth/anonymous?platform=subscriptions',
          'get',
        );

        return {
          isSuccess: true,
          response: data,
        };
      } catch (e) {
        assert(isAxiosError(e));

        return {
          isSuccess: false,
          error: e.response?.data.detail ?? 'Something went wrong',
        };
      }
    },
    getCourses: async () => {
      try {
        const { data } = await requestService.request<ICourse.Response>(
          '/core/preview-courses',
          'get',
        );

        return {
          isSuccess: true,
          response: data,
        };
      } catch (e) {
        assert(isAxiosError(e));

        return {
          isSuccess: false,
          error: e.response?.data.detail ?? 'Something went wrong',
        };
      }
    },
    getCourseById: async (courseId: string) => {
      try {
        const { data } = await requestService.request<ICourse.Item>(
          `/core/preview-courses/${courseId}`,
          'get',
        );

        return {
          isSuccess: true,
          response: data,
        };
      } catch (e) {
        assert(isAxiosError(e));

        return {
          isSuccess: false,
          error: e.response?.data.detail ?? 'Something went wrong',
        };
      }
    },
  };
}

export const api = createApiService(createRequestService());
