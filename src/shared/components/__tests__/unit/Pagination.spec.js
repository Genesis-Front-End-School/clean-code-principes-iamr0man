import { mount } from '@vue/test-utils';
import ThePagination from '@/shared/components/ui/ThePagination/ThePagination.vue';
import PreviousButton from '@/shared/components/ui/ThePagination/PreviousButton.vue';
import NextButton from '@/shared/components/ui/ThePagination/NextButton.vue';
import PageItem from '@/shared/components/ui/ThePagination/PageItem.vue';

describe('Pagination', () => {
  it('by default the previous button is disabled', () => {
    const wrapper = mount(ThePagination, {
      props: {
        perPage: 3,
        totalItems: 10,
        sliceLength: 2,
      },
    });
    const prevButton = wrapper.findComponent(PreviousButton)
    expect(prevButton.vm.$attrs.disabled).toBe(true)
  })

  it('should the next button be disabled on the last page', () => {
    const wrapper = mount(ThePagination, {
      props: {
        modelValue: 4,
        perPage: 3,
        totalItems: 10,
        sliceLength: 2,
      },
    });

    wrapper.vm.increasePage();

    const nextButton = wrapper.findComponent(NextButton)
    expect(nextButton.vm.$attrs.disabled).toBe(true)
  })

  it('should render PageItem length equivalent sliceLength * 2 + 1 size if page size greater then 1', () => {
    const wrapper = mount(ThePagination, {
      props: {
        modelValue: 1,
        perPage: 2,
        totalItems: 10,
        sliceLength: 2,
      },
    });

    expect(wrapper.findAllComponents(PageItem).length).toBe(wrapper.vm.$props.sliceLength * 2 + 1)
  })

  it('should render PageItem length equivalent totalPages size if slice length small', () => {
    const wrapper = mount(ThePagination, {
      props: {
        modelValue: 1,
        perPage: 2,
        totalItems: 6,
        sliceLength: 1,
      },
    });

    expect(wrapper.findAllComponents(PageItem).length).toBe(wrapper.vm.computedTotalPages)
  })

  it('should render PageItem length equivalent totalPages size if slice length big', () => {
    const wrapper = mount(ThePagination, {
      props: {
        modelValue: 1,
        perPage: 3,
        totalItems: 18,
        sliceLength: 5,
      },
    });

    expect(wrapper.findAllComponents(PageItem).length).toBe(wrapper.vm.computedTotalPages)
  })

  it('emitted', () => {
    const wrapper = mount(ThePagination)

    wrapper.vm.increasePage()
    wrapper.vm.decreasePage()

    expect(wrapper.emitted()).toHaveProperty(['update:modelValue'])
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(2)
  })

  it('should hide pages for tablet or navigation layout', () => {
    const wrapper = mount(ThePagination, {
      props: {
        layout: 'navigation'
      }
    })

    expect(wrapper.findAllComponents(PageItem).length).toBe(0)
  })
})

