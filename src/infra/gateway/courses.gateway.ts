import { errorHandler } from '@/infra/utils/response-check';
import type { ICourse } from '@/infra/types/ICourse.types';
import { createRequestService } from '@/infra/api/request';
import type { IRequestService, Response } from '@/infra/api/request.types';

export const createCoursesGateway = (requestService: IRequestService) => {
  return {
    getCourses: async (): Promise<Response<ICourse.Response>> => {
      try {
        const { data } = await requestService.request<ICourse.Response>('/core/preview-courses', "get");

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    },
    getCourseById: async (courseId: string): Promise<Response<ICourse.Item>> => {
      try {
        const { data } = await requestService.request<ICourse.Item>(`/core/preview-courses/${courseId}`, 'get');

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    }
  }
}

export const courseGateway = createCoursesGateway(createRequestService())