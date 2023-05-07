import { mount, shallowMount } from '@vue/test-utils';
import { availableCourse as course, notAvailableCourse } from './__mocks__/course'

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

    const videoSelector = `#${course.meta.slug}`
    expect(wrapper.find(videoSelector).exists()).toBe(true)
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

    const link = wrapper.findComponent({ name: 'RouterLink' });

    await link.trigger('mouseenter')

    expect(wrapper.vm.paused).toBe(false);
    expect(playStub).toHaveBeenCalled();
  });

  it('should not play video on mouse over trigger if video does not exists', async () => {
    const wrapper = mount(CourseItem, {
      props: {
        course: notAvailableCourse
      },
      global: {
        plugins: [router]
      },
      attachTo: document.body
    });

    const link = wrapper.findComponent({ name: 'RouterLink' });
    await link.trigger('mouseenter')

    expect(wrapper.vm.paused).toBe(true);
  });

  it('should pause video on mouse leave trigger', async () => {
    const wrapper = mount(CourseItem, {
      props: {
        course
      },
      global: {
        plugins: [router]
      },
      attachTo: document.body
    });

    const pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')

    const link = wrapper.findComponent({ name: 'RouterLink' });

    await link.trigger('mouseenter')
    await link.trigger('mouseleave')

    const videoSelector = `#${course.meta.slug}`

    expect(wrapper.find(videoSelector).element.currentTime).toBe(0)
    expect(wrapper.vm.paused).toBe(true);
    expect(pauseStub).toHaveBeenCalled();
  });

  it('calls the destroy lifecycle hook trigger hls destroy', () => {

    const wrapper = shallowMount(CourseItem, {
      props: {
        course
      },
      global: {
        plugins: [router]
      },
      attachTo: document.body
    });

    const hlsDestroyStub = jest
      .spyOn(wrapper.vm.hls, 'destroy')

    wrapper.unmount();

    expect(hlsDestroyStub).toHaveBeenCalled();
  });
});
