import type { App, Plugin } from 'vue'

import Loader from './Loader.vue'
export default {
  install(app: App) {
    app.component('Loader', Loader)
  }
} as Plugin

export {
  Loader
}