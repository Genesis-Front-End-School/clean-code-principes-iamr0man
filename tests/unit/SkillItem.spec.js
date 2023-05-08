import { mount } from '@vue/test-utils';
import SkillItem from '@/components/pages/course/lesson/SkillItem.vue';

describe('SkillItem', () => {
  const skillName = 'Self-improvement'
  it('should display appropriate prop name', () => {

    const wrapper = mount(SkillItem, {
      props: {
        name: skillName,
        index: 0
      },
    });

    expect(wrapper.text()).toBe(skillName)
  })

  it('should render span', () => {
    const wrapper = mount(SkillItem, {
      props: {
        name: skillName,
        index: 0
      },
    });

    expect(wrapper.find('span').exists()).toBe(true);
  })

  it('should display appropriate dynamic class', () => {
    const wrapper = mount(SkillItem, {
      props: {
        name: skillName,
        index: 0
      },
    });

    const greenIndex = [0, 5]
    const yellowIndex = [1, 6]
    const redIndex = [2, 7]
    const orangeIndex = [3, 8]
    const blueIndex = [4, 9]

    const cssMap = {
      [greenIndex]: 'bg-green-100 text-green-800',
      [yellowIndex]: 'bg-green-100 text-green-800',
      [redIndex]: 'bg-green-100 text-green-800',
      [orangeIndex]: 'bg-green-100 text-green-800',
      [blueIndex]: 'bg-green-100 text-green-800',
    }

    Object.entries(cssMap).forEach(([key, value]) => {
      wrapper.setProps({ 'index': key[0] })

      expect(wrapper.vm.dynamicClasses).toBe(value)
    })

  })
})

