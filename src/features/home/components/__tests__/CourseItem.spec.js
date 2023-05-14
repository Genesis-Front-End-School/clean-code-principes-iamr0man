import { mount } from '@vue/test-utils';
import { availableCourse as course } from '@/shared/__mocks__/course'

import { createRouter, createWebHistory } from 'vue-router';
import CourseItem from '@/features/home/components/CourseItem.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('Course Item', () => {
  it('Course item contains all provided text', () => {
    const wrapper = mount(CourseItem, {
      props: {
        course
      },
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text().includes(course.title)).toBe(true)
    expect(wrapper.text().includes(course.description)).toBe(true)
    expect(wrapper.text().includes(course.rating)).toBe(true)
    expect(wrapper.text().includes(course.tags.join(', '))).toBe(true)
  })
});
