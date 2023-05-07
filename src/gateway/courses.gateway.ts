import type { RequestService } from '@/api/request';
import { errorHandler } from '@/utils/response-check';
import type { ICourse } from '@/types/ICourse.types';

export const createCoursesGateway = (requestService: RequestService) => {
  return {
    getCourses: async () => {
      try {
        const { data } = await requestService.request<ICourse.Response>('/core/preview-courses', "get");

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        errorHandler(e)
      }
    },
    getCourseById: async (courseId: string) => {
      try {
        const { data } = await requestService.request<ICourse.Item>(`/core/preview-courses/${courseId}`, 'get');

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        errorHandler(e)
      }
    }
  }
}