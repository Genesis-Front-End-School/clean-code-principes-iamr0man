import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent, h, Suspense } from 'vue';
import { courses } from '@/__mocks__';
import { axios } from '@/infra/utils/axios';
import HomeView from '@/features/home/view/HomeView.vue';
import ThePagination from '@/shared/components/ui/ThePagination/ThePagination.vue';
import CourseItem from '@/features/home/components/CourseItem.vue';
import { MAX_ITEMS_PER_PAGE, SLICE_LENGTH } from '@/shared/constants';
import Loader from '@/shared/components/ui/CLoader/CLoader.vue';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    request: jest.fn(),
  })),
}));

const mountSuspense = async (component) => {
  const wrapper = mount(defineComponent({
    render() {
      return h(Suspense, null, {
        default: h(component),
        fallback: h('div', 'fallback'),
      });
    },
  }));

  await flushPromises();

  return wrapper;
};

describe('HomeView', () => {
  beforeEach(() => {
    axios.request.mockReset();
  });

  it('should render courses with appropriate constant value', async () => {
    axios.request.mockResolvedValueOnce({
      data: {
        courses,
      },
    });

    const wrapper = await mountSuspense(HomeView);

    const paginationComponent = wrapper.findComponent(ThePagination);
    const courseItemComponents = wrapper.findAllComponents(CourseItem);

    expect(paginationComponent.props().totalItems).toBe(courses.length);
    expect(courseItemComponents.length).toBe(MAX_ITEMS_PER_PAGE);
  });

  it('should display loader if courses are loading', async () => {
    const wrapper = await mount(HomeView);

    const loaderComponent = wrapper.findComponent(Loader);

    expect(loaderComponent.exists()).toBe(true);
  });

  it('should not display loader if courses are loading', async () => {
    axios.request.mockResolvedValueOnce({
      data: {
        courses,
      },
    });

    const wrapper = await mountSuspense(HomeView);

    const loaderComponent = wrapper.findComponent(Loader);
    const courseItemComponents = wrapper.findAllComponents(CourseItem);

    expect(loaderComponent.exists()).toBe(false);
    expect(courseItemComponents.length).toBe(MAX_ITEMS_PER_PAGE);
  });

  it('should display lesson details text', async () => {
    axios.request.mockResolvedValueOnce({
      data: {
        courses,
      },
    });

    const wrapper = await mountSuspense(HomeView);

    const slicePagesSize = SLICE_LENGTH * 2 + 1;
    const pagesArray = Array.from({ length: slicePagesSize }, (_, i) => i + 1);

    expect(wrapper.text().includes(pagesArray.join(''))).toBe(true);
  });
});
