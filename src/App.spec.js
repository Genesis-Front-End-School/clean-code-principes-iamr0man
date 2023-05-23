import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
  it('renders the root of the page', async () => {
    const wrapper = await shallowMount(App, {
      global: {
        stubs: {
          'router-view': false,
        }
      },
    });

    expect(wrapper.getComponent({ name: 'suspense' }).exists()).toBe(true);
  });
});