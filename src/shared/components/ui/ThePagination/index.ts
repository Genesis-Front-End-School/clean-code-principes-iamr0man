import type { App, Plugin } from 'vue'

import ThePagination from './ThePagination.vue'
export default {
  install(app: App) {
    app.component('ThePagination', ThePagination)
  }
} as Plugin

export {
  ThePagination
}