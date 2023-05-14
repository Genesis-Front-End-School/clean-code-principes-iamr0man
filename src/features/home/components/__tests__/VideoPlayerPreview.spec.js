import { mount, shallowMount } from '@vue/test-utils';
import { availableCourse as course, notAvailableCourse } from '@/__mocks__/course'

import VideoPlayerPreview from '@/features/home/components/VideoPlayerPreview.vue';

describe('VideoPlayerPreview', () => {
  const videoSelector = `#selected-video`;

  it('should find video tag if tag video exists', () => {
    const wrapper = mount(VideoPlayerPreview, {
      props: {
        course
      }
    });

    expect(wrapper.find(videoSelector).exists()).toBe(true)
  })

  it('should play video on mouse over trigger', async () => {
    const wrapper = mount(VideoPlayerPreview, {
      props: {
        course
      },
      attachTo: document.body
    });

    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')

    const video = wrapper.find(videoSelector)

    await video.trigger('mouseenter')

    expect(wrapper.vm.paused).toBe(false);
    expect(playStub).toHaveBeenCalled();
  });

  it('should not load source on mouse over trigger if video does not exists', async () => {
    const wrapper = shallowMount(VideoPlayerPreview, {
      props: {
        course: notAvailableCourse
      },
      attachTo: document.body
    });


    const hlsLoadSourceStub = jest
      .spyOn(wrapper.vm.hls, 'loadSource')

    const video = wrapper.find({ ref: 'activeVideo' })
    await video.trigger('mouseenter')

    expect(hlsLoadSourceStub).toBeCalledTimes(0);
  });

  it('calls the destroy lifecycle hook trigger hls destroy', () => {

    const wrapper = shallowMount(VideoPlayerPreview, {
      props: {
        course
      },
      attachTo: document.body
    });

    const hlsDestroyStub = jest
      .spyOn(wrapper.vm.hls, 'destroy')

    wrapper.unmount();

    expect(hlsDestroyStub).toHaveBeenCalled();
  });
});
