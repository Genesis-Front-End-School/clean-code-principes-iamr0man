import type { App, Plugin } from 'vue'

import Rating from './Rating.vue'

export default {
  install(app: App) {
    app.component('Rating', Rating)
  }
} as Plugin

export {
  Rating
}