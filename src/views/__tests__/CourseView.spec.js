import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent, h, Suspense } from 'vue';
import { useRoute } from 'vue-router';

import { courseDetails } from '@/__mocks__';
import CourseView from '@/views/CourseView.vue';
import { axios } from '@/utils/axios';

import CourseDetails from '@/components/pages/course/CourseDetails.vue';
import Lessons from '@/components/pages/course/lesson/Lessons.vue';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
}))

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      },
      request: jest.fn()
  }))
}
})

const mountSuspense =  async (component) => {
  const wrapper = mount(defineComponent({
    render() {
      return h(Suspense, null, {
        default: h(component),
        fallback: h('div', 'fallback')
      })
    }}))

  await flushPromises()

  return wrapper
}

describe('CourseView', () => {
  beforeEach(() => {
    axios.request.mockReset();
  })

  it('should render course details page with course that passed as id parameter', async () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: courseDetails.id
      }
    }))

    axios.request.mockResolvedValueOnce({
      data: courseDetails
    });

    const wrapper = await mountSuspense(CourseView)

    const courseDetailsComponent = wrapper.findComponent(CourseDetails);
    const lessonsComponent = wrapper.findComponent(Lessons);

    expect(courseDetailsComponent.props().course).toStrictEqual(courseDetails)
    expect(lessonsComponent.props().course).toStrictEqual(courseDetails)
  })

  it('should display course details text', async () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: courseDetails.id
      }
    }))

    axios.request.mockResolvedValueOnce({
      data: courseDetails
    });

    const wrapper = await mountSuspense(CourseView)

    expect(wrapper.text().includes(courseDetails.title)).toBe(true)
    expect(wrapper.text().includes(courseDetails.description)).toBe(true)

    courseDetails.meta.skills.forEach(skill => {
      expect(wrapper.text().includes(skill)).toBe(true)
    })
  })
})