import { mount } from '@vue/test-utils';
import ErrorBoundary from '@/shared/components/ui/error/ErrorBoundary.vue';
import SkillItem from '@/features/course/components/SkillItem.vue';
import NotFound from '@/shared/components/ui/error/NotFound.vue';

describe('ErrorBoundary', () => {
  it('should render slot if error does not exists', async () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: SkillItem
      }
    });

    expect(wrapper.findComponent(SkillItem).exists()).toBe(true)
    expect(wrapper.findComponent(NotFound).exists()).toBe(false)
  })

  it('should render NotFound if error exists', async () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: SkillItem
      }
    });

    await wrapper.setData({ error: true })

    expect(wrapper.findComponent(SkillItem).exists()).toBe(false)
    expect(wrapper.findComponent(NotFound).exists()).toBe(true)
  })
})
