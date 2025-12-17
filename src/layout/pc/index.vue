<template>
  <NavigationBarPC @jumpToCategory="jumpToCategory" class="NavigationBarPC" />
  <!-- <NavigationBarMobile @jumpToCategory="jumpToCategory" class="NavigationBarMobile" /> -->
  <!-- <div class="content-container" :class="{ 'full-width': $route.path !== '/pc/home' }"> -->
    <div class="content-container" :class="{ 'home-layout': $route.path === '/pc/home', 'full-width': $route.path !== '/pc/home' }">
    <router-view v-slot="{ Component }">
      <component :is="Component" ref="currentComponent" />
    </router-view>
    <Footer :class="{ 'noFull-width': $route.path !== '/pc/home' }"></Footer>
  </div>
</template>

<script setup lang="ts">
import NavigationBarPC from '@/layout/pc/navigation-bar.vue'
import NavigationBarMobile from '@/layout/pc/navigation-bar-mobile.vue'
import Footer from '@/layout/pc/footer.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, nextTick } from 'vue'
const router = useRouter()
const route = useRoute()
const currentComponent = ref<any>(null)

const jumpToCategory = async (id: string) => {
  // 如果当前不在首页，先跳转到首页

  if (route.path !== '/pc/home') {
    await router.push('/pc/home')
  }
  // 等待组件挂载完成
  await nextTick()
  // 调用首页组件的 jumpToCategory 方法
  if (currentComponent.value?.jumpToCategory) {
    currentComponent.value.jumpToCategory(id)
  }
}

</script>

<style scoped>
.content-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  /* margin-top: 10px; */
}
/* 1. 当处于首页 (.home-layout) 时，针对 router-view 渲染的第一个子元素（即轮播图）进行样式穿透 */
.content-container.home-layout :deep(> :first-child) {
  /* 强制移除 max-width，使其占满整个浏览器宽度 (100% of the viewport) */
  max-width: none !important;
  /* 移除任何可能导致的内部间距 */
  width: 100vw; /* 使用视口宽度，确保占满整个浏览器 */
  margin-left: calc(50% - 50vw); /* 抵消 max-width: 1600px 带来的居中偏移 */
  padding: 0;
}

.content-container.full-width {
  max-width: none !important;
  padding: 0;
}

::v-deep.noFull-width {
  max-width: 1600px;
  margin: 0 auto;
}


@media (min-width: 769px) {
  .NavigationBarMobile {
    display: none;
  }

  .NavigationBarPC {}
}

@media (max-width: 768px) {
 

  .NavigationBarMobile {}
}

</style>
<style>
  ::deep(.el-popup-parent--hidden) {
  width: 100%;
}
</style>