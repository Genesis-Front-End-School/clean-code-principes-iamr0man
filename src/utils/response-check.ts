import { assert } from "@/utils/ts-utils";
import type { FailedOperationResponse, Response, SuccessOperationResponse } from '@/api/api.types';
import type { AxiosError } from 'axios/index';
import type { AxiosDetailResponse } from '@/api/api.types';

export function isFailedOperationResult<T>(result: Response<T>): result is FailedOperationResponse {
  return !result.isSuccess;
}

export function isSuccessOperationResult<T = unknown>(
  result: Response<T>
): result is SuccessOperationResponse<T> {
  return result.isSuccess;
}

function isAxiosError(_e: unknown): _e is AxiosError<AxiosDetailResponse> {
  return true;
}

export function errorHandler (e: unknown) {
  assert(isAxiosError(e));

  return {
    isSuccess: false,
    error: e.response?.data.detail ?? "Something went wrong"
  };
}