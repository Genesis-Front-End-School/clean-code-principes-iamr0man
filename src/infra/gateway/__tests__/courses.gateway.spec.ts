import { axios } from '@/infra/utils/axios'
import { createCoursesGateway } from '@/infra/gateway/courses.gateway';
import { createRequestService } from '@/infra/api/request';
import { courses, courseDetails } from '@/__mocks__'

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      },
      request: jest.mocked(jest.fn() as jest.MockedFunction<typeof axios.request>)
    }))
  }
})

describe('CoursesGateway', () => {
  beforeEach(() => {
    (axios.request as jest.MockedFunction<typeof axios.request>).mockReset();
  })

  const mockCoursesService = createCoursesGateway(createRequestService())

  it('makes a GET request to fetch the courses', async () => {
    (axios.request as jest.MockedFunction<typeof axios.request>).mockResolvedValueOnce({
      data: {
        courses
      }
    });

    const data = await mockCoursesService.getCourses();

    if (data.isSuccess) {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(data.response.courses.length).toEqual(courses.length);
    }
  });

  it('should return network error', async () => {
    (axios.request as jest.MockedFunction<typeof axios.request>).mockRejectedValueOnce(new Error('Network error'));

    const response= await mockCoursesService.getCourses();

    if (!response.isSuccess) {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(response.error.length).toBeGreaterThan(0);
    }
  });

  it('should return single course', async () => {
    (axios.request as jest.MockedFunction<typeof axios.request>).mockResolvedValueOnce({
      data: courseDetails
    });

    const data = await mockCoursesService.getCourseById(courseDetails.id);

    if (data.isSuccess) {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(data.response.id).toStrictEqual(courseDetails.id);
    }
  });

  it('should return error if course is not found', async () => {
    const response= await mockCoursesService.getCourseById('unknown');

    if (!response.isSuccess) {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(response.error.length).toBeGreaterThan(0);
    }
  });

  it('should return network error if error exists', async () => {
    (axios.request as jest.MockedFunction<typeof axios.request>).mockRejectedValueOnce(new Error('Network error'));

    const response= await mockCoursesService.getCourseById(courseDetails.id);

    if (!response.isSuccess) {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(response.error.length).toBeGreaterThan(0);
    }
  });
});