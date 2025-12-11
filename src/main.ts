import './assets/main.css'
import 'virtual:svg-icons-register'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueLazyload from 'vue3-lazyload'
import i18n from './locales'

const routes = router.options.routes

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(VueLazyload, {
    loading: '/loading-placeholder-gray.jpg',
    error: '/error-placeholder.webp',
  })
  app.use(createPinia())
  app.use(i18n)
})
