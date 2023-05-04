import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import course from './course'

import Lesson from '../../src/components/lesson/Lessons.vue';
import LockedLayer from '../../src/components/lesson/VideoLayers/LockedLayer.vue';
import NotFoundLayer from '../../src/components/lesson/VideoLayers/NotFoundLayer.vue';
import PlaybackSpeedLayer from '../../src/components/lesson/VideoLayers/PlaybackSpeedLayer.vue';

describe('Video Overlays', () => {
  it('should render LockedLayer when "unlocked" is false', () => {
    const wrapper = mount(Lesson, {
      props: {
        course
      },
      data() {
        return {
          lessonNumber: 2,
        }
      },
    });

    expect(wrapper.findComponent(LockedLayer).exists()).toBe(true);
  });

  it('should render NotFoundLayer when "notFound" is true', () => {
    const wrapper = mount(Lesson, {
      props: {
        course
      },
      data() {
        return {
          notFound: true,
        };
      },
    });
    expect(wrapper.findComponent(NotFoundLayer).exists()).toBe(true);
  });

  it('should render PlaybackSpeedLayer when "speedChanged" is true', () => {
    const wrapper = mount(Lesson, {
      props: {
        course
      },
      data() {
        return {
          speedChanged: true,
          speed: 2.5,
        };
      },
    });
    expect(wrapper.findComponent(PlaybackSpeedLayer).exists()).toBe(true);
    expect(wrapper.findComponent(PlaybackSpeedLayer).props('speed')).toBe(2.5);
  });

  it('should increase "speedChanged" by min rate for layer component and video input', async () => {
    const wrapper = mount(Lesson, {
      props: {
        course
      },
      data() {
        return {
          speedChanged: false,
          speed: 1,
        };
      },
    });

    await nextTick();

    const input = wrapper.find({ ref: 'selectedVideo' });
    await input.trigger('keydown', { key: 'ArrowUp' })

    expect(input.getRootNodes()[0].playbackRate).toBe(wrapper.vm.speed);

    expect(wrapper.findComponent(PlaybackSpeedLayer).exists()).toBe(wrapper.vm.speedChanged);
    expect(wrapper.findComponent(PlaybackSpeedLayer).props('speed')).toBe(wrapper.vm.speed);
  });
})

describe('Lessons', () => {
  const isAscending = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
  }

  it('should lessons order sort by ascending direction', () => {
    const wrapper = mount(Lesson, {
      props: {
        course
      },
    })

    expect(wrapper.vm.lessons.length).toEqual(course.lessons.length)
    expect(isAscending(wrapper.vm.lessons)).toBe(true)
  })
})

describe('Video', () => {
  it('should find video ref in template', () => {
    const wrapper = mount(Lesson, {
      props: {
        course
      },
    });

    expect(wrapper.find({ ref: 'selectedVideo' }).exists()).toBe(true)
  })
})

