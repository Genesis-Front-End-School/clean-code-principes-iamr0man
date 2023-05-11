import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent, h, Suspense } from 'vue';
import { useRoute } from 'vue-router';
import { courseDetails } from '@/__mocks__';
import CourseView from '@/views/CourseView.vue';
import { axios } from '@/utils/axios';

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

  it('should render course details page', async () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: courseDetails.id
      }
    }))

    axios.request.mockResolvedValueOnce({
      data: courseDetails
    });

    const wrapper = await mountSuspense(CourseView)

    await flushPromises()

    expect(wrapper.vm.course).toStrictEqual(courseDetails)
  })
})