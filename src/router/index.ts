import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { isMobileDevice } from '@/utils/utils'
const isServer = typeof window === 'undefined'
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
          return { path:  '/pc' , query: { s: to.query.s } }
        }
        return  '/pc' 
      },
    },
    {
      path: '/pc',
      component: () => import('../layout/pc/index.vue'),
      children: [
        {
          path: '',
          redirect: () => {
            return '/pc/home'
          },
        },
        {
          path: 'home',
          component: () => import('../layout/pc/home.vue'),
        },
        {
          path: 'product-detailInfo',
          component: () => import('../layout/pc/product-detailInfo.vue'),
        },
        {
          path: 'patent',
          component: () => import('../layout/pc/components/ResearchDevelopment.vue'),
        },

        {
          path: 'Market-layout',
          component: () => import('../layout/pc/components/Market-layout.vue'),
        },

        {
          path: 'Contact_us',
          component: () => import('../layout/pc/components/Contact_us.vue'),
        },
        {
          path: 'AboutUs',
          component: () => import('../layout/pc/AboutUsPage.vue'),
        },
        {
          path: 'NewsList',
          component: () => import('../layout/pc/NewsList.vue'),
        },
        {
          path: 'ProductCenter',
          component: () => import('../layout/pc/ProductCenter.vue'),
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
