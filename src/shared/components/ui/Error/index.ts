import type { App, Plugin } from 'vue'

import ErrorBoundary from './ErrorBoundary.vue'
import NotFound from './NotFound.vue'

export default {
  install(app: App) {
    app.component('ErrorBoundary', ErrorBoundary)
    app.component('NotFound', NotFound)
  }
} as Plugin

export {
  ErrorBoundary,
  NotFound
}