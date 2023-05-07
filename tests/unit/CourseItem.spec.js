import { mount } from '@vue/test-utils';
import course from './__mocks__/course'

import CourseItem from '@/components/pages/home/CourseItem.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('Course Item', () => {
  it('should play video if tag video exists', () => {
    const wrapper = mount(CourseItem, {
      props: {
        course
      }
    });

    expect(wrapper.find(`#${course.meta.slug}`).exists()).toBe(true)
  })

  it('should play video on mouse over trigger', async () => {
    const wrapper = mount(CourseItem, {
      props: {
        course
      },
      global: {
        plugins: [router]
      },
      attachTo: document.body
    });

    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {})

    const link = wrapper.findComponent({ name: 'RouterLink' });

    await link.trigger('mouseenter')

    expect(wrapper.vm.paused).toBe(false);
    expect(playStub).toHaveBeenCalled();
  });
});
