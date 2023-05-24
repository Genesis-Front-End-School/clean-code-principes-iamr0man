import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { availableCourse as course } from '@/__mocks__/course';

import LessonItem from '@/features/lesson/components/LessonItem.vue';
import VideoPlayer from '@/features/lesson/components/VideoPlayer.vue';
import Lesson from '../CourseLessons.vue';
import LockedLayer from '../VideoLayers/LockedLayer.vue';
import NotFoundLayer from '../VideoLayers/NotFoundLayer.vue';

describe('Video Overlays', () => {
  it('should render LockedLayer when "unlocked" is false', () => {
    const wrapper = mount(Lesson, {
      props: {
        course,
      },
      data() {
        return {
          lessonNumber: 2,
        };
      },
    });

    expect(wrapper.findComponent(LockedLayer).exists()).toBe(true);
  });

  it('should render NotFoundLayer when "notFound" is true', () => {
    const wrapper = mount(Lesson, {
      props: {
        course,
      },
      data() {
        return {
          notFound: true,
        };
      },
    });
    expect(wrapper.findComponent(NotFoundLayer).exists()).toBe(true);
  });
});

describe('Lessons', () => {
  const isAscending = (array) => {
    for (let i = 0; i < array.length - 1; i += 1) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
  };

  it('should lessons order sort by ascending direction', () => {
    const wrapper = mount(Lesson, {
      props: {
        course,
      },
    });

    expect(wrapper.vm.lessons.length).toEqual(course.lessons.length);
    expect(isAscending(wrapper.vm.lessons)).toBe(true);
  });

  it('should get courseLessonKey from local storage with default value 1', () => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn();

    const wrapper = mount(Lesson, {
      props: {
        course,
      },
    });

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem(wrapper.vm.courseLessonKey)).toBe(undefined);
    expect(wrapper.vm.lessonNumber).toBe(1);
  });

  it('should get courseLessonKey from local storage with pre defined value', () => {
    const lessonNumber = 2;
    const key = `${course.id}-selected-lesson`;
    const localStorageItems = { [key]: lessonNumber };

    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn().mockImplementation((itemKey) => localStorageItems[itemKey]);

    const wrapper = mount(Lesson, {
      props: {
        course,
      },
    });

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem(wrapper.vm.courseLessonKey)).toBeDefined();
    expect(wrapper.vm.lessonNumber).toBe(lessonNumber);
  });

  it('should update lessonNumber in local storage on change', async () => {
    const lessonNumber = 1;

    const key = `${course.id}-selected-lesson`;
    const localStorageItems = { [key]: lessonNumber };

    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn().mockImplementation((itemKey) => localStorageItems[itemKey]);
    Storage.prototype.setItem = jest.fn().mockImplementation((itemKey, value) => { localStorageItems[itemKey] = value; });

    const wrapper = mount(Lesson, {
      props: {
        course,
      },
    });

    const lessonItems = wrapper.findAllComponents(LessonItem);
    const secondLessonItem = lessonItems[1];
    secondLessonItem.trigger('click');

    await nextTick();

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem(wrapper.vm.courseLessonKey)).toBe(secondLessonItem.vm.lesson.order.toString());
  });

  it('should emit not found error from VideoPlayer', async () => {
    const wrapper = mount(Lesson, {
      props: {
        course,
      },
    });

    const videoPlayer = wrapper.findComponent(VideoPlayer);
    videoPlayer.vm.$emit('not-found', true);

    await nextTick();

    expect(wrapper.vm.notFound).toBe(true);
  });
});
