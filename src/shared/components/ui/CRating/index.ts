import type { App, Plugin } from 'vue'

import CRating from './CRating.vue'

export default {
  install(app: App) {
    app.component('CRating', CRating)
  }
} as Plugin

export {
  CRating
}