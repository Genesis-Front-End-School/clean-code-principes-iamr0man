import { ComponentPublicInstance } from 'vue';
import { ThisTypedMountOptions } from '@vue/test-utils';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '@vue/test-utils' {
  export function mount<V extends {}>(originalComponent: {
    new (...args: any[]): V;
  }, options?: ThisTypedMountOptions<V>): Wrapper<ComponentPublicInstance<V>>;

  export function shallowMount<V extends {}>(originalComponent: {
    new (...args: any[]): V;
  }, options?: ThisTypedMountOptions<V>): Wrapper<ComponentPublicInstance<V>>;
}