import type { App, Plugin } from 'vue'

import CLoader from './CLoader.vue'

export default {
  install(app: App) {
    app.component('CLoader', CLoader)
  }
} as Plugin

export {
  CLoader
}