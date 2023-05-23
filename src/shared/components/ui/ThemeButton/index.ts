import type { App, Plugin } from 'vue'

import ThemeButton from './ThemeButton.vue'
export default {
  install(app: App) {
    app.component('ThemeButton', ThemeButton)
  }
} as Plugin

export {
  ThemeButton
}