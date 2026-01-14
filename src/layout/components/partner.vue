<template>
  <section class="partner-carousel-section">
    <h2 class="partner-title">{{ $t('home.partner') }}</h2>

    <div class="carousel-container">
      <div class="carousel-wrapper">
        <div class="carousel-track">
          <div class="partner-group">
            <div 
              class="partner-item" 
              v-for="item in partners" 
              :key="'orig-' + item.id"
            >
              <img :src="item.logo" :alt="item.name" class="partner-logo" />
            </div>
          </div>
          <div class="partner-group" aria-hidden="true">
            <div 
              class="partner-item" 
              v-for="item in partners" 
              :key="'copy-' + item.id"
            >
              <img :src="item.logo" :alt="item.name" class="partner-logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// 导入图片（保持原样）
import img1 from '@/assets/images/partner/图片1.png'
import img2 from '@/assets/images/partner/图片2.png'
import img3 from '@/assets/images/partner/图片3.png'
import img6 from '@/assets/images/partner/图片6.png'
import img7 from '@/assets/images/partner/图片7.png'
import img8 from '@/assets/images/partner/图片8.png'
import img11 from '@/assets/images/partner/图片11.png'
import img12 from '@/assets/images/partner/图片12.png'
import img13 from '@/assets/images/partner/图片13.png'
import img16 from '@/assets/images/partner/图片16.png'
import img17 from '@/assets/images/partner/图片17.png'
import img18 from '@/assets/images/partner/图片18.png'

const partners = ref([
  { id: 1, name: 'amazon', logo: img1 },
  { id: 2, name: 'MONDIAL', logo: img2 },
  { id: 3, name: 'aiwa', logo: img3 },
  { id: 6, name: 'Qualcomm', logo: img6 },
  { id: 7, name: 'BROADCOM', logo: img7 },
  { id: 8, name: 'AIROHA', logo: img8 },
  { id: 11, name: 'REALTEK', logo: img11 },
  { id: 12, name: 'BES', logo: img12 },
  { id: 13, name: 'Actions', logo: img13 },
  { id: 16, name: 'KTMicro', logo: img16 },
  { id: 17, name: '京东', logo: img17 },
  { id: 18, name: '百瑞互联（BARROT）', logo: img18 },
])
</script>

<style scoped>
.partner-carousel-section {
  padding: 0 0 40px 0;
  overflow: hidden;
}

.partner-title {
  text-align: center;
  font-size: 31px;
  margin-bottom: 40px;
}

.carousel-wrapper {
  display: flex;
  overflow: hidden;
  position: relative;
  /* 解决移动端闪烁的关键：强制 3D 渲染 */
  transform: translate3d(0, 0, 0);
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.carousel-track {
  display: flex;
  width: max-content;
  /* 使用 3D 变换减少闪烁 */
  animation: infinite-scroll 40s linear infinite;
  will-change: transform;
}

/* 包含一组图标的容器 */
.partner-group {
  display: flex;
  flex-shrink: 0;
}

.partner-item {
  /* PC端固定宽度，确保计算准确 */
    width: 162px;
    height: auto;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0; /* 禁止挤压 */
  background: #fff;

  border-radius: 10px;
}

.partner-logo {
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
  /* 防止图片加载前的闪烁 */
  backface-visibility: hidden;
}

/* 悬停暂停 */
.carousel-track:hover {
  animation-play-state: paused;
}

/* 核心动画：位移刚好是一组的总宽度 */
@keyframes infinite-scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    /* 这里使用 -50% 是因为两组一模一样的内容 */
    transform: translate3d(-50%, 0, 0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .partner-item {
    width: 118px; 
    margin: 0 10px;
    height: 72px;
  }
  .partner-logo {
    max-width:100px;
}
  
  .carousel-wrapper {
    /* 移动端减弱遮罩，防止小屏显示不全 */
    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  }

  .carousel-track {
    animation-duration: 20s; /* 移动端滚动速度 */
  }
  .partner-title {
  font-size: 24px;
}
}
</style>