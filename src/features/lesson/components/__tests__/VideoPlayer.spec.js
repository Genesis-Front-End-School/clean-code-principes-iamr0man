import { mount, shallowMount } from '@vue/test-utils';
import { availableCourse as course, notAvailableCourse } from '../../../../__mocks__/course'
import VideoPlayer from '@/features/lesson/components/VideoPlayer.vue';
import { nextTick } from 'vue';
import { ArrowDownKey, ArrowUpKey, MAX_RATE, MIN_RATE } from '@/shared/constants';

describe('VideoPlayer', () => {
  it('should find video ref in template', () => {
    const wrapper = mount(VideoPlayer, {
      props: {
        currentLesson: course,
      },
    });

    const videoRefSelector = { ref: 'selectedVideo' }
    const video = wrapper.find(videoRefSelector);

    expect(video.exists()).toBe(true)
  })

  it('should render PlaybackSpeedLayer when "speedChanged" is true', () => {
    const speed= 2.5;
    const speedChanged = true;

    const wrapper = mount(VideoPlayer, {
      props: {
        currentLesson: course,
        isAvailable: true
      },
      data() {
        return {
          speedChanged,
          speed,
        };
      },
      slots: {
        default: `<template #default="params"><div>speed: {{ params.speed }}, speedChanged: {{ params.speedChanged }}</div></template>`
      }
    });

    expect(wrapper.text()).toEqual(`speed: ${speed }, speedChanged: ${speedChanged}`)
  });

  it('should increase "speed" by min rate for layer component and video input', async () => {
    const wrapper = mount(VideoPlayer, {
      props: {
        isAvailable: true,
        currentLesson: course,
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
    const wrapper = mount(VideoPlayer, {
      props: {
        currentLesson: course,
        isAvailable: true
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
    const wrapper = mount(VideoPlayer, {
      props: {
        currentLesson: course,
        isAvailable: true
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
    const wrapper = mount(VideoPlayer, {
      props: {
        currentLesson: course,
        isAvailable: true
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

  it('should pause video on mouse leave trigger', async () => {
    const wrapper = mount(VideoPlayer, {
      props: {
        currentLesson: notAvailableCourse,
        isAvailable: false
      },
      attachTo: document.body
    });

    const videoRefSelector = { ref: 'selectedVideo' }
    const video = wrapper.find(videoRefSelector);

    await video.trigger('play')

    expect(video.element.readyState).toBe(0);
    expect(video.element.paused).toBe(true);
  });

  it('calls the destroy lifecycle hook trigger hls destroy', () => {

    const wrapper = shallowMount(VideoPlayer, {
      props: {
        currentLesson: course,
        isAvailable: true
      },
      attachTo: document.body
    });

    const hlsDestroyStub = jest
      .spyOn(wrapper.vm.hls, 'destroy')

    wrapper.unmount();

    expect(hlsDestroyStub).toHaveBeenCalled();
  });
})

