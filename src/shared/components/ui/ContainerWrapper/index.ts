import type { App, Plugin } from 'vue'

import ContainerWrapper from './ContainerWrapper.vue'

export default {
  install(app: App) {
    app.component('ContainerWrapper', ContainerWrapper)
  }
} as Plugin

export {
  ContainerWrapper
}