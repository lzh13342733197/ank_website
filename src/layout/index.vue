<template>
  <NavigationBarPC @jumpToCategory="jumpToCategory" class="NavigationBarPC" />

  <div class="content-container"
    :class="{ 'home-layout': $route.path === '/home', 'full-width': $route.path !== '/home' }">
    <router-view v-slot="{ Component }">
      <component :is="Component" ref="currentComponent" />
    </router-view>
    <Footer :class="{ 'noFull-width': $route.path !== '/home' }"></Footer>
  </div>

  <div class="floating-contact" @click="goToContact">
    <div class="contact-icon">
      <div class="search-icon"
        style="color: white; text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;">
        <SvgIcon :name="`msg`" size="25" color="white" style="filter: drop-shadow(0 0 1px black); ">
        </SvgIcon>
      </div>
    </div>
    <div class="contact-text">{{ t('productDetail.shopNow') }}</div>
  </div>
</template>

<script setup lang="ts">
import NavigationBarPC from '@/layout/navigation-bar.vue'
import NavigationBarMobile from '@/layout/navigation-bar-mobile.vue'
import Footer from '@/layout/footer.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()



const router = useRouter()
const route = useRoute()
const currentComponent = ref<any>(null)

// 新增：跳转到“联系我们”页面
const goToContact = () => {
  // 这里的路径请根据你实际的路由配置修改，通常是 /contact 或 /AboutUs?id=...
  router.push('/Contact_us')
}

const jumpToCategory = async (id: string) => {
  if (route.path !== '/home') {
    await router.push('/home')
  }
  await nextTick()
  if (currentComponent.value?.jumpToCategory) {
    currentComponent.value.jumpToCategory(id)
  }
}
</script>

<style scoped>
/* 原有样式保持不变 */
.content-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

.content-container.home-layout :deep(> :first-child) {
  max-width: none !important;
  width: 100vw;
  margin-left: calc(50% - 50vw);
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

/* --- 新增：右侧悬浮按钮样式 --- */
.floating-contact {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  background-color: var(--primary-color, #222);
  /* 使用你的主题色 */
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  /* 方圆角 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.floating-contact:hover {
  /* background-color: #007bb1; */
  /* 悬浮加深 */
  transform: translateY(-52%) scale(1.05);
}

.contact-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.contact-text {
  font-size: 12px;
  text-align: center;
  line-height: 1.2;
  padding: 0 5px;
}

/* 移动端适配：适当缩小或调整位置 */
@media (max-width: 768px) {
  .floating-contact {
    right: 10px;
    width: 50px;
    height: 50px;
  }

  .contact-text {
    font-size: 10px;
  }
}
</style>

<style>
::deep(.el-popup-parent--hidden) {
  width: 100%;
}
</style>