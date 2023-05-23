import type { App, Plugin } from 'vue'

import IconArrow from './IconArrow.vue'
import IconPlus from './IconPlus.vue'
import IconMinus from './IconMinus.vue'
import IconStar from './IconStar.vue'

export default {
  install(app: App) {
    app.component('IconArrow', IconArrow)
    app.component('IconPlus', IconPlus)
    app.component('IconMinus', IconMinus)
    app.component('IconStar', IconStar)
  }
} as Plugin

export {
  IconArrow,
  IconPlus,
  IconMinus,
  IconStar,
}