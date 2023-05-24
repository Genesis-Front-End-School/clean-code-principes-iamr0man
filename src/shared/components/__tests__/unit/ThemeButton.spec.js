import { shallowMount } from '@vue/test-utils';
import ThemeButton from '@/shared/components/ui/ThemeButton/ThemeButton.vue';

describe('ThemeButton', () => {
  it('should return dark theme by default', () => {
    const wrapper = shallowMount(ThemeButton);

    expect(wrapper.vm.colorTheme).toBe('dark');
  });

  it('should set local storage theme value on created', () => {
    const colorThemeKey = 'color-theme';
    const localStorageItems = { [colorThemeKey]: 'light' };

    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn().mockImplementationOnce((key) => localStorageItems[key]);

    const wrapper = shallowMount(ThemeButton);

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(wrapper.vm.colorTheme).toBe('light');
  });

  it('should toggle theme on button click', () => {
    const wrapper = shallowMount(ThemeButton);
    const toggleButton = wrapper.find('button');
    toggleButton.trigger('click');

    expect(wrapper.vm.colorTheme).toBe('light');
  });

  it('should update local storage theme value on change', () => {
    const colorThemeKey = 'color-theme';
    const localStorageItems = { [colorThemeKey]: 'light' };

    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.getItem = jest.fn().mockImplementationOnce((key) => localStorageItems[key]);

    const wrapper = shallowMount(ThemeButton);

    expect(setItem).toHaveBeenCalled();
    expect(wrapper.vm.colorTheme).toBe('light');
  });

  it('should return isDark true by default', () => {
    const wrapper = shallowMount(ThemeButton);
    expect(wrapper.vm.isDark).toBe(true);
  });

  it('should return isDark false if color theme is light', () => {
    const wrapper = shallowMount(ThemeButton);

    const toggleButton = wrapper.find('button');
    toggleButton.trigger('click');

    expect(wrapper.vm.isDark).toBe(false);
  });
});
