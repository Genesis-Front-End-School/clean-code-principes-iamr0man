import { shallowMount } from '@vue/test-utils';
import NotFound from '@/components/ui/error/NotFound.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('NotFound', () => {
  it('should display not found message', async () => {
    const wrapper = await shallowMount(NotFound);

    const notFoundMessage = "Sorry, the course you are looking for  cannot be found or there seems  to be an error.  Please try again, and if the error persists, please try again later.  Return back"

    expect(wrapper.text()).toContain(notFoundMessage)
  });

  it('should go router back, after button trigger', async () => {
    const wrapper = await shallowMount(NotFound, {
      global: {
        plugins: [router]
      }
    });

    const go = jest.spyOn(router, 'go')
    await wrapper.find('button').trigger('click')

    expect(go).toHaveBeenCalledTimes(1)
    expect(go).toHaveBeenCalledWith(-1)
  });
});