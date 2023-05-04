import { IAuth } from '@/api/localStorage.types';
import { ICourse } from '@/types/ICourse.types';

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

export type ApiService = {
	readonly signIn: () => Promise<Response<IAuth.Token>>;

	readonly getCourses: () => Promise<Response<ICourse.Response>>;
	readonly getCourseById: (courseId: string) => Promise<Response<ICourse.Item>>;
};

export type Response<T = void> = FailedOperationResponse | SuccessOperationResponse<T>;

export function isFailedOperationResult<T>(result: Response<T>): result is FailedOperationResponse {
	return !result.isSuccess;
}

export function isSuccessOperationResult<T = unknown>(
	result: Response<T>
): result is SuccessOperationResponse<T> {
	return result.isSuccess;
}