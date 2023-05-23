import { mount } from '@vue/test-utils';
import { availableCourse as course } from '../../../__mocks__/course'

import Lesson from '../../pages/course/lesson/Lessons.vue';
import LockedLayer from '../../pages/course/lesson/VideoLayers/LockedLayer.vue';
import NotFoundLayer from '../../pages/course/lesson/VideoLayers/NotFoundLayer.vue';

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

