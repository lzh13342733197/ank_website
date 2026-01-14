<template>
  <div class="content-text-body">
    <p class="content-paragraph" v-html="t('home.homeAboutUs')"></p>
    <img v-lazy="companyImg" class="content-image animate-img" />
    <p class="content-paragraph" v-html="t('aboutUs.companyProfile.firstParagraph')"></p>

    <img v-lazy="companyFactoryImg" class="content-image animate-img" />

    <p class="content-paragraph">{{ t('aboutUs.companyProfile.secondParagraph') }}</p>
    <p class="content-paragraph">{{ t('aboutUs.companyProfile.thirdParagraph') }}</p>
    <!-- 为图片添加动画类名 -->
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import companyImg from '@/assets/images/aboutUs/company.jpg';
import companyFactoryImg from '@/assets/images/aboutUs/companyFactory.jpg';
const { t } = useI18n();
</script>

<style scoped>
  .content-text-body{
    padding: 0 0 20px 15px;
    margin: 20px 0;
  }
.content-paragraph { 
  line-height: 1.8; 
  font-size: 16px; 
  color: #3f3f3f; 
  margin-bottom: 1.5em; 
}

.content-image { 
  max-width: 100%; 
  height: auto; 
  display: block; 
  margin: 20px 0; 
  /* 基础样式，为动画做准备 */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform-origin: center center;
  /* 因为用了v-lazy，初始隐藏避免闪烁 */
  opacity: 0;
}

/* 图片动画样式 - 适配懒加载 */
.animate-img {
  /* 入场动画：淡入+轻微缩放 */
  animation: fadeInScale 0.8s ease-out forwards;
  /* 初始状态 */
  transform: scale(0.95);
}

/* 悬浮交互动画 */
.animate-img:hover {
  transition: all 0.3s ease;
  transform: scale(1.02); /* 轻微放大 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* 增强阴影 */
}

/* 定义入场动画关键帧 */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式适配：小屏幕取消悬浮放大 */
@media (max-width: 768px) {
  .animate-img:hover {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>