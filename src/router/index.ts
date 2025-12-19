import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { isMobileDevice } from '@/utils/utils'
const isServer = import.meta.env.SSR
const history = isServer
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      redirect: (to?: any) => {
        if (to.query.s) {
          // 处理搜索参数
          return { path:  '/home' , query: { s: to.query.s } }
        }
        return  '/home' 
      },
    },
    {
      path: '/',
      component: () => import('../layout/index.vue'),
      children: [
        {
          path: '',
          redirect: () => {
            return '/home'
          },
        },
        {
          path: 'home',
          component: () => import('../layout/home.vue'),
        },
        {
          path: 'product-detailInfo',
          component: () => import('../layout/product-detailInfo.vue'),
        },
        {
          path: 'patent',
          component: () => import('../layout/components/ResearchDevelopment.vue'),
        },

        {
          path: 'Market-layout',
          component: () => import('../layout/components/Market-layout.vue'),
        },

        {
          path: 'Contact_us',
          component: () => import('../layout/components/Contact_us.vue'),
        },
        {
          path: 'AboutUs',
          component: () => import('../layout/AboutUsPage.vue'),
        },
        {
          path: 'NewsList',
          component: () => import('../layout/NewsList.vue'),
        },
        {
          path: 'ProductCenter',
          component: () => import('../layout/ProductCenter.vue'),
        },
      ],
    },
    {
      path: '/privacy',
      component: () => import('@/components/privacy.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
