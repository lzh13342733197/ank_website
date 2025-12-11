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
          return { path: isMobileDevice() ? '/mobile' : '/pc', query: { s: to.query.s } }
        }
        return isMobileDevice() ? '/mobile' : '/pc'
      },
    },
    {
      path: '/mobile',
      component: () => import('../layout/h5/index.vue'),
      children: [
        {
          path: '',
          redirect: () => {
            return '/mobile/home'
          },
        },
        {
          path: 'home',
          component: () => import('../layout/h5/home.vue'),
        },
        {
          path: 'product-view',
          component: () => import('../layout/h5/product-view.vue'),
        },
        {
          path: 'product-detailInfo',
          component: () => import('../layout/h5/product-detailInfo.vue'),
        },
        {
          path: 'about-us',
          component: () => import('../layout/h5/about-us.vue'),
        },
        {
          path: 'contact-us',
          component: () => import('../layout/h5/contact-us.vue'),
        },
      ],
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
          path: 'company-profile',
          component: () => import('../layout/pc/components/company-profile.vue'),
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
