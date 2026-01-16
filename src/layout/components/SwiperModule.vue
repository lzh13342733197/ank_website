<template>
  <div class="swiper-module-container">
    <swiper :slides-per-view="1" :space-between="0" :loop="true" :autoplay="swiperOptions.autoplay"
      :pagination="swiperOptions.pagination" :navigation="swiperOptions.navigation" :modules="modules"
      :speed="swiperOptions.speed" class="mySwiper">
      <swiper-slide v-for="(slide, index) in images" :key="index">
        <!-- <a :href="slide.productSpuId ? `/product-detailInfo?id=${slide.productSpuId}` : 'javascript:void(0)'" :target="slide.target || '_self'" class="slide-link"> -->
        <a :href="slide.linkUrl || 'javascript:void(0)'" :target="slide.target || '_self'" class="slide-link">
          <div class="slide-image-wrapper">
            <img :src="slide.src" :alt="slide.alt || 'Slide Image'" class="swiper-image" loading="lazy" />
          </div>
        </a>
      </swiper-slide>
    </swiper>

    <div class="swiper-slideshow-1-next">
      <i class="arrow-icon"> > </i>
    </div>
    <div class="swiper-slideshow-1-prev">
      <i class="arrow-icon">
        < </i>
    </div>

    <div class="swiper-pagination"></div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue' // 移除了未使用的 computed

// 导入 Swiper 核心组件、模块和样式
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// 导入 Swiper 样式
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// 注册 Swiper 模块
const modules = [Autoplay, Pagination, Navigation]

// 定义 Slide 的数据结构
interface Slide {
  src: string; // 图片地址
  url?: string; // 点击链接
  alt?: string;
  productSpuId?: string;
  linkUrl?: string;
  target?: string;
}

// 定义 Props
const props = defineProps<{
  images: Slide[]
}>()

// 轮播图配置选项
const swiperOptions = {
  // === 核心调整：增加过渡速度，动画更柔和 ===
  speed: 1500, // 切换时间设置为 800 毫秒
  // ===================================

  autoplay: {
    delay: 4000, // 3秒自动播放
    disableOnInteraction: true,
  },
  pagination: {
    clickable: true,
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-slideshow-1-next',
    prevEl: '.swiper-slideshow-1-prev',
  },
}
</script>

<style scoped>
/* ==================================================
   基础容器和响应式尺寸控制
   ================================================== */
.swiper-module-container {
  margin: 0 auto;
  height: auto;
  position: relative;
  overflow: hidden;
  /* PC/默认: 使用 aspect-ratio 确保高度跟随宽度变化，这里设为 16:5 的宽幅比例 */
  /* aspect-ratio: 16 / 5; */
}

.mySwiper {
  width: 100%;
  height: auto;
  /* 继承自父容器的 aspect-ratio 计算高度 */
}

/* ==================================================
   图片和链接样式
   ================================================== */
.slide-link,
.slide-image-wrapper {
  display: block;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.swiper-image {
  width: 100%;
  object-fit: cover;
  height: auto;
  /* 确保图片填充整个容器，可能会裁剪边缘，保证轮播图没有黑边 */
  display: block;
}

/* ==================================================
   导航箭头样式 (自定义)
   ================================================== */
.swiper-slideshow-1-next,
.swiper-slideshow-1-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  cursor: pointer;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 20px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.swiper-slideshow-1-next:hover,
.swiper-slideshow-1-prev:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.swiper-slideshow-1-next {
  right: 20px;
}

.swiper-slideshow-1-prev {
  left: 20px;
}

.arrow-icon {
  font-style: normal;
  /* 移除 i 标签的斜体效果 */
  display: inline-block;
}

/* ==================================================
   响应式媒体查询 (针对移动端/小屏幕)
   ================================================== */

@media (max-width: 768px) {

  /* 移动端使用更高的宽高比，例如 16:9，使图片在手机上更高 */
  .swiper-module-container {
    /* aspect-ratio: 16 / 9; */
  }

  /* 缩小移动端箭头的大小 */
  .swiper-slideshow-1-next,
  .swiper-slideshow-1-prev {
    display: none;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    top: 55%;
    /* 稍微下移，避免遮挡顶部内容 */
  }

  .swiper-slideshow-1-next {
    right: 10px;
  }

  .swiper-slideshow-1-prev {
    left: 10px;
  }
}
</style>