import type { App, Plugin } from 'vue'

import Container from './Container.vue'

export default {
  install(app: App) {
    app.component('Container', Container)
  }
} as Plugin

export {
  Container
}