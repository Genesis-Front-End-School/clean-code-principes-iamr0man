import { mount } from '@vue/test-utils';
import { availableCourse as course } from '../../../__mocks__/course'

import Lesson, { ArrowUpKey, ArrowDownKey, MIN_RATE, MAX_RATE } from '../../pages/course/lesson/Lessons.vue';
import LockedLayer from '../../pages/course/lesson/VideoLayers/LockedLayer.vue';
import NotFoundLayer from '../../pages/course/lesson/VideoLayers/NotFoundLayer.vue';
import PlaybackSpeedLayer from '../../pages/course/lesson/VideoLayers/PlaybackSpeedLayer.vue';
import { nextTick } from 'vue';

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

  it('should increase "speed" by min rate for layer component and video input', async () => {
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

    const videoRefSelector = { ref: 'selectedVideo' }
    const video = wrapper.find(videoRefSelector);

    const supposedValue = wrapper.vm.speed + MIN_RATE;
    await video.trigger('keydown', { key: ArrowUpKey })

    expect(video.getRootNodes()[0].playbackRate).toBe(supposedValue);
    expect(video.getRootNodes()[0].playbackRate).toBe(wrapper.vm.speed);
  });

  it('should decrease "speed" by min rate for layer component and video input', async () => {
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

    const videoRefSelector = { ref: 'selectedVideo' }
    const video = wrapper.find(videoRefSelector);

    const supposedValue = wrapper.vm.speed - MIN_RATE;
    await video.trigger('keydown', { key: ArrowDownKey })

    expect(video.getRootNodes()[0].playbackRate).toBe(supposedValue);
    expect(video.getRootNodes()[0].playbackRate).toBe(wrapper.vm.speed);
  });

  it('speed should be in min boundaries', async () => {
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

    const videoRefSelector = { ref: 'selectedVideo' }
    const video = wrapper.find(videoRefSelector);

    for (let i = 0; i < 5; i++) {
      video.trigger('keydown', { key: ArrowDownKey })
    }

    expect(wrapper.vm.speed).toBe(MIN_RATE);

    await nextTick()

    expect(video.getRootNodes()[0].playbackRate).toBe(wrapper.vm.speed);
  });

  it('speed should be in max boundaries', async () => {
    const wrapper = mount(Lesson, {
      props: {
        course
      },
      data() {
        return {
          speedChanged: false,
          speed: 4,
        };
      },
    });

    const videoRefSelector = { ref: 'selectedVideo' }
    const video = wrapper.find(videoRefSelector);

    for (let i = 0; i < 5; i++) {
      video.trigger('keydown', { key: ArrowUpKey })
    }

    expect(wrapper.vm.speed).toBe(MAX_RATE);

    await nextTick()

    expect(video.getRootNodes()[0].playbackRate).toBe(wrapper.vm.speed);
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

    const videoRefSelector = { ref: 'selectedVideo' }
    const video = wrapper.find(videoRefSelector);
    expect(video.exists()).toBe(true)
  })
})

