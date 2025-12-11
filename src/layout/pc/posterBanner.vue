<template>
  <div class="poster-banner" v-if="bannerList.length > 0">
    <div class="poster-banner-middle">
      <div class="slider-container">
        <transition-group name="slide" tag="div" class="slider-wrapper">
          <img v-for="(item, index) in bannerList" v-show="currentIndex === index && !item.isVideo" :key="index"
            :src="item.image" style="object-fit: cover;" alt="1Mii" class="poster-image">
          <video v-for="(item, index) in bannerList" v-show="currentIndex === index && item.isVideo"
            :key="'video' + index" :src="item.image" autoplay loop muted class="poster-image"></video>
        </transition-group>
      </div>

      <!-- 左右切换按钮 -->
      <button v-if="bannerList.length > 1" class="nav-button prev" @click="prevSlide" style="margin-left: 200px;">
        <SvgIcon name="back" size="32" style="transform: translateX(-5%)"></SvgIcon>
      </button>
      <button v-if="bannerList.length > 1" class="nav-button next" @click="nextSlide">

        <SvgIcon name="forward" size="32" style="transform: translateX(5%)"></SvgIcon>
      </button>

      <!-- 自定义指示点 -->
      <div v-if="bannerList.length > 1" class="dots-container">
        <span v-for="(item, index) in bannerList" :key="index" :class="{ active: currentIndex === index }"
          @click="switchTo(index)"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { onMounted, watch, ref, nextTick, onUnmounted } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'

const bannerList = ref<any[]>([])
const currentIndex = ref(0)
let carouselInterval: number

onMounted(() => {
  homInit()
})

const homInit = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/banner/list`,
    { type: 'pc' },
  )
  bannerList.value = data.map((item: any) => {
    return {
      ...item,
      image: item.imageUrl,
      isVideo: item.imageUrl.endsWith('.mp4')
    }
  })

  if (bannerList.value.length > 0) {
    startCarousel()
  }
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + bannerList.value.length) % bannerList.value.length
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % bannerList.value.length
}

const switchTo = (index: number) => {
  currentIndex.value = index
}

const startCarousel = () => {
  // 清除可能存在的旧定时器（避免多次调用时定时器叠加）
  stopCarousel()
  // 设置新定时器，直接更新 currentIndex
  carouselInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % bannerList.value.length
  }, 3000) // 3秒切换一次
}

const stopCarousel = () => {
  clearInterval(carouselInterval)
}

onUnmounted(() => {
  stopCarousel()
})
</script>

<style scoped lang="less">
.poster-banner {
  width: 100%;
  margin: 20px 0;
  position: relative;
}

.poster-banner-middle {
  width: 100%;
  height: auto;
  padding-left: 200px;
  transform: translateX(-20px);
  position: relative;
}

.poster-image {
  width: 1400px;
  height: 787px;
  border-radius: 40px;
  overflow: hidden;
}

.play-button,
.pause-button {
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button:hover,
.pause-button:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* 轮播容器 */
.slider-container {
  position: relative;
  width: 100%;
  height: 788px;
  border-radius: 40px;
  overflow: hidden;
}

.poster-banner-middle:hover .nav-button {
  opacity: 1;
}


.slider-wrapper {
  overflow: hidden;
}

/* 轮播动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* 导航按钮样式 */
.nav-button {
  .arrow();
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  opacity: 0;

}

.nav-button {
  opacity: 0;
  transition: opacity 0.3s ease;
}


.nav-button.prev {
  left: 20px;
}

.nav-button.next {
  right: 20px;
}

/* 指示点样式 */
.dots-container {
  position: absolute;
  bottom: 20px;
  left: 55%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dots-container span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s;
}

.dots-container span.active {
  background: white;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 60px;
  height: 60px;
  background: rgba(200, 200, 200, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  z-index: 9;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.forward-arrow {
  .arrow();
  right: 40px;
}

.forward-arrow:hover {
  transform: translateY(-50%) scale(1.2);
}

.backward-arrow {
  .arrow();
  left: 40px;
}

.backward-arrow:hover {
  transform: translateY(-50%) scale(1.2);
}
</style>