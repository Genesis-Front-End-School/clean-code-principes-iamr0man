import { shallowMount } from '@vue/test-utils';
import Lesson from './Lessons.vue';
import LockedLayer from './VideoLayers/LockedLayer.vue';
import NotFoundLayer from './VideoLayers/NotFoundLayer.vue';
import PlaybackSpeedLayer from './VideoLayers/PlaybackSpeedLayer.vue';

describe('Video Overlays', () => {
  it('should render LockedLayer when "unlocked" is false', () => {
    const wrapper = shallowMount(Lesson, {
      computed: {
        unlocked() {
          return true;
        },
      },
    });
    expect(wrapper.findComponent(LockedLayer).exists()).toBe(true);
  });

  it('should render NotFoundLayer when "notFound" is true', () => {
    const wrapper = shallowMount(Lesson, {
      data() {
        return {
          notFound: true,
        };
      },
      components: { NotFoundLayer },
    });
    expect(wrapper.findComponent(NotFoundLayer).exists()).toBe(true);
  });

  it('should render PlaybackSpeedLayer when "speedChanged" is true', () => {
    const wrapper = shallowMount(Lesson, {
      data() {
        return {
          speedChanged: true,
          speed: 2.5,
        };
      },
      components: { PlaybackSpeedLayer },
    });
    expect(wrapper.findComponent(PlaybackSpeedLayer).exists()).toBe(true);
    expect(wrapper.findComponent(PlaybackSpeedLayer).props('speed')).toBe(2.5);
  });
});
