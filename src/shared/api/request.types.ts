import type { AxiosResponse } from 'axios';

export type SuccessOperationResponse<T = void> = T extends void
  ? {
      readonly isSuccess: true;
    }
  : {
      readonly isSuccess: true;
      readonly response: T;
    };

export type FailedOperationResponse = {
  readonly isSuccess: false;
  readonly error: string;
};

export type Response<T = void> =
  | FailedOperationResponse
  | SuccessOperationResponse<T>;

export type AxiosDetailResponse = {
  readonly detail: string;
};

export type IRequestService = {
  readonly request: <K, T = {}>(
    endpoint: string,
    method: string,
    payload?: T,
  ) => Promise<AxiosResponse<K>>;
};
