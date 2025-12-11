<template>
  <NavigationBar @jumpToCategory="jumpToCategory" />
  <div class="content-container" :class="{ 'full-width': $route.path !== '/pc/home' }">
    <router-view v-slot="{ Component }">
      <component :is="Component" ref="currentComponent" />
    </router-view>
    <Footer :class="{ 'noFull-width': $route.path !== '/pc/home' }"></Footer>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/layout/pc/navigation-bar.vue'
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
  margin-top: 100px;
}

.content-container.full-width {
  max-width: none !important;
  padding: 0;
}

::v-deep.noFull-width {
  max-width: 1600px;
  margin: 0 auto;
}
</style>
