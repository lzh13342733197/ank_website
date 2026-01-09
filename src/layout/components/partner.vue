<template>
  <section class="partner-carousel-section">
    <h2 class="partner-title">{{ $t('home.partner') }}</h2>

    <div class="carousel-container">
      <div class="carousel-wrapper">
        <div class="carousel-track">
          <div 
            class="partner-item" 
            v-for="item in partners" 
            :key="'a-' + item.id"
          >
            <img :src="item.logo" :alt="item.name" :title="item.name" class="partner-logo" />
          </div>
          <div 
            class="partner-item" 
            v-for="item in partners" 
            :key="'b-' + item.id"
          >
            <img :src="item.logo" :alt="item.name" :title="item.name" class="partner-logo" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// 导入图片
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
  padding: 40px 0;
  width: 100%;
  overflow: hidden;
}

.partner-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 40px;
  font-weight: bold;
}

.carousel-container {
  width: 100%;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  position: relative;
  /* 边缘羽化遮罩，增加高级感 */
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.carousel-track {
  display: flex;
  width: max-content;
  /* 30s 是滚动一轮的速度，图片多可以调快，图片少可以调慢 */
  animation: scroll-loop 60s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused;
}

.partner-item {
  flex: 0 0 180px; /* 固定宽度 */
  height: 100px;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 15px;
  transition: transform 0.3s;
}

.partner-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.partner-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* filter: grayscale(100%);  */
  opacity: 0.7;
  transition: all 0.3s;
}

.partner-item:hover .partner-logo {
  filter: grayscale(0%); /* 悬停恢复彩色 */
  opacity: 1;
}

/* 关键帧：移动距离刚好是总长度的一半（因为我们克隆了一份） */
@keyframes scroll-loop {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ==================================================
  媒体查询适配
================================================== */
@media (max-width: 768px) {
  .partner-title {
    font-size: 22px;
    margin-bottom: 25px;
  }
  
  .partner-item {
    flex: 0 0 140px; /* 移动端缩小尺寸 */
    height: 80px;
    margin: 0 10px;
    padding: 10px;
  }

  .carousel-track {
    animation: scroll-loop 25s linear infinite; /* 移动端路程短，调快一点点 */
  }
}
</style>