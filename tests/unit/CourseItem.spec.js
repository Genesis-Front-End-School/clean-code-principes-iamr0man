import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import course from './course'

import CourseItem from '@/components/courses/CourseItem.vue';
import PlaybackSpeedLayer from '@/components/lesson/VideoLayers/PlaybackSpeedLayer.vue';
describe('Course Item', () => {
  it('should play video if tag video exists', () => {
    const wrapper = mount(CourseItem, {
      props: {
        course
      },
    });

    expect(wrapper.find(`#${course.meta.slug}`).exists()).toBe(true)
  })

  it('should play video by mouse over', async () => {
    const wrapper = mount(CourseItem, {
      props: {
        course
      },
    });

    const spy = jest.fn();

    const video = wrapper.find(`#${course.meta.slug}`).element;
    video.addEventListener('play', spy);

    const link = wrapper.find(`#courseId`);

    await link.trigger('mouseover')

    await nextTick();

    // expect(wrapper.vm.paused).toBe(false);
    expect(spy).toHaveBeenCalled();
  });
});
