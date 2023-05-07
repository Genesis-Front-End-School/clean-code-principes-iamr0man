import { mount } from '@vue/test-utils';
import SkillItem from '@/components/pages/course/lesson/SkillItem.vue';

describe('SkillItem', () => {
  it('should display appropriate prop name', () => {
    const skillName = 'Self-improvement'

    const wrapper = mount(SkillItem, {
      props: {
        name: skillName
      },
    });

    expect(wrapper.text()).toBe(skillName)
  })
})

