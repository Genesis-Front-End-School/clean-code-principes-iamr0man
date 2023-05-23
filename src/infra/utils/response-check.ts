import { assert } from "@/infra/utils/ts-utils";
import type { FailedOperationResponse, Response, SuccessOperationResponse } from '@/infra/api/request.types';
import type { AxiosError } from 'axios/index';
import type { AxiosDetailResponse } from '@/infra/api/request.types';

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

export function errorHandler (e: unknown): FailedOperationResponse {
  assert(isAxiosError(e));

  return {
    isSuccess: false,
    error: e.response?.data.detail ?? "Something went wrong"
  };
}