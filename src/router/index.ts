import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory('/ank_website/'),
  routes: [
    {
      path: '/',
      component: () => import('../layout/index.vue'),
      children: [
        { path: '', redirect: 'home' }, // 根路径重定向到 /home
        { path: 'home', component: () => import('../layout/home.vue') },
        { path: 'product-detailInfo', component: () => import('../layout/product-detailInfo.vue') },
        { path: 'Contact_us', component: () => import('../layout/components/Contact_us.vue') },
        { 
          path: 'AboutUs',
          component: () => import('../layout/AboutUsPage.vue'),
          children: [
            { path: 'patent', component: () => import('../layout/components/ResearchDevelopment.vue') },
            { path: 'Credentials', component: () => import('../layout/components/Credentials.vue') },
            { path: 'CompanyProfile', component: () => import('../layout/components/aboutUs/CompanyProfile.vue') },
            { path: 'DevelopmentCourse', component: () => import('../layout/components/aboutUs/DevelopmentCourse.vue') },
            { path: 'CoreValue', component: () => import('../layout/components/aboutUs/CoreValue.vue') },
            { path: 'Awards', component: () => import('../layout/components/aboutUs/Awards.vue') },
          ]
        },
        { path: 'NewsList', component: () => import('../layout/NewsList.vue') },
        { path: 'ProductCenter', component: () => import('../layout/ProductCenter.vue') },
        { path: 'CategoryList', component: () => import('../layout/components/ProductCenter/CategoryList.vue') },
        { 
          path: 'Factory', 
          redirect: 'Factory/Production',
          children: [
            { path: 'Production', component: () => import('../layout/Factory.vue') },
            { path: 'Testing', component: () => import('../layout/Testing.vue') },
            { path: 'Overview', component: () => import('../layout/Overview.vue') }
          ]
        },
        { path: 'Blog', component: () => import('../layout/Blog.vue') },
      ],
    },
    { path: '/privacy', component: () => import('@/components/privacy.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('../views/404.vue') },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
