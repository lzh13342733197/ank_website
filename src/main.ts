import './assets/main.css'
import 'virtual:svg-icons-register'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueLazyload from 'vue3-lazyload'
import i18n from './locales'

const routes = router.options.routes
console.log(routes);

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
  app.use(i18n)
  app.use(VueLazyload, {
    loading: '/loading-placeholder-gray.jpg',
    error: '/error-placeholder.jpg',
  })
})
