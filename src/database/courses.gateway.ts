import { axios } from '@/utils/axios';
import type { ICourse } from '@/types/ICourse.types';

const getCourses = async () => {
  const { data } = await axios.get<ICourse.Response>('/core/preview-courses');
  return data.courses;
};
const getCourseById = async (courseId: string) => {
  const { data: course, status } = await axios.get<ICourse.Item>(
    `/core/preview-courses/${courseId}`,
  );

  if (status === 200 && course) {
    return course;
  }
  return null;
};

export { getCourses, getCourseById };
