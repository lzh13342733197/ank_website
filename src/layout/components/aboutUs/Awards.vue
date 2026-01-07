<template>
  <div class="content-text-body awards">
    <div class="awards-section">
      <!-- 奖项图片 - 增加动画类名 -->
     <div style=" display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
       <img v-for="i in 4"
        class="awards-img animate-img" 
        src="https://picsum.photos/180/320?random=1" 
        alt="产品奖项展示"
      />
     </div>
      <div class="awards-desc">
        {{ t('aboutUs.awards.description') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
// 保留必要的导入，移除无用的导入
const { t } = useI18n();
</script>

<style scoped>
.awards { 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  padding-top: 10px; 
  margin-bottom: 300px;
}

.awards-section {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.awards-img {
  /* max-width: 800px; */
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  /* 基础样式，为动画做准备 */
  transform-origin: center center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.awards-desc {
  line-height: 1.8;
  font-size: 16px;
  color: #3f3f3f;
  text-align: justify;
}

/* 图片动画样式 */
.animate-img {
  /* 入场动画：从透明+轻微缩放状态过渡到正常状态 */
  animation: fadeInScale 0.8s ease-out forwards;
  /* 初始状态 */
  opacity: 0;
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

/* 响应式适配：小屏幕下取消悬浮放大，避免体验问题 */
@media (max-width: 768px) {
  .animate-img:hover {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>