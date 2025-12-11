<template>
  <div ref="swiperContainerRef" class="swiper-container" @touchmove.prevent>
    <div class="swiper-indicator">
      <div ref="indicatorItemsRef" v-for="(item, index) in swiperLength" :key="index" class="swiper-indicator-item"
        :class="{ active: currentIndex === index }" @click="goToSlide(index)"></div>
    </div>

    <div class="swiper-item-list" ref="swiperItemListRef" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">
      <div class="swiper-item" v-for="(item, index) in props.swiperList" :key="index">
        <!-- <div class="swiper-item-description">
          <div class="swiper-item-title-text">{{ item.title }}</div>
        </div> -->

        <div class="swiper-image-container">
          <div class="swiper-image-container">
            <img v-if="!item.isVideo" @click="jumpTo(router, '/mobile/product-detailInfo', { id: item.productSpuId })"
              v-lazy="item.imageUrl" class="swiper-image" alt="" />
            <video v-else :src="item.imageUrl" class="swiper-image" autoplay loop muted></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef, onMounted, onUnmounted } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { jumpTo } from '@/utils/utils'
import { useRouter } from 'vue-router'

const currentIndex = ref(0)
const router = useRouter()
const swiperLength = ref(0)

const props = defineProps(['swiperList'])

const swiperContainerRef = useTemplateRef('swiperContainerRef')
const swiperItemListRef = useTemplateRef('swiperItemListRef')
const indicatorItemsRef = useTemplateRef('indicatorItemsRef')
const imageWidth = ref(0)
const imageHeight = ref(0)

// 触摸相关变量
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)

// 自动播放相关
let autoPlayTimer: number | null = null
const autoPlayInterval = 3000 // 3秒自动播放

// 处理触摸开始
const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
  isDragging.value = true
  stopAutoPlay()
}

// 处理触摸移动
const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value) return
  event.preventDefault()
  touchEndX.value = event.touches[0].clientX
  stopAutoPlay()

}

// 处理触摸结束
const handleTouchEnd = () => {
  if (!isDragging.value) return

  const diff = touchStartX.value - touchEndX.value
  const threshold = 50 // 滑动阈值

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      slide('next')
    } else {
      slide('prev')
    }
  }

  isDragging.value = false
  // startAutoPlay()
}

// 滑动到指定索引
const goToSlide = (index: number) => {
  currentIndex.value = index
  updateSlidePosition()
  updateIndicators()
}

// 滑动到上一张
const slide = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : swiperLength.value - 1
  } else {
    currentIndex.value = currentIndex.value < swiperLength.value - 1 ? currentIndex.value + 1 : 0
  }

  updateSlidePosition()
  updateIndicators()
}

// 更新滑动位置
const updateSlidePosition = () => {
  if (swiperItemListRef.value) {
    const translateX = -currentIndex.value * imageWidth.value
    swiperItemListRef.value.style.transform = `translateX(${translateX}px)`
  }
}

// 更新指示器
const updateIndicators = () => {
  if (indicatorItemsRef.value) {
    indicatorItemsRef.value.forEach((item, index) => {
      if (index === currentIndex.value) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }
}

// 开始自动播放
const startAutoPlay = () => {
  if (swiperLength.value <= 1) return

  autoPlayTimer = window.setInterval(() => {
    slide('next')
  }, autoPlayInterval)
}

// 停止自动播放
const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

onMounted(() => {
  useResizeObserver(swiperContainerRef.value, (entries) => {
    imageWidth.value = entries[0].borderBoxSize[0].inlineSize
    imageHeight.value = entries[0].borderBoxSize[0].inlineSize
    if (swiperContainerRef.value) {
      swiperContainerRef.value.style.height = `${imageHeight.value}px`
    }
    updateSlidePosition()
  })

  watch(
    () => props.swiperList,
    (newList) => {
      swiperLength.value = newList.length
      currentIndex.value = 0
      // 添加isVideo判断
      newList.forEach(item => {
        item.isVideo = item.imageUrl.endsWith('.mp4') || item.imageUrl.endsWith('.webm')
      })
      console.log(newList);


      updateSlidePosition()
      updateIndicators()
      startAutoPlay()
    },
    { immediate: true },
  )
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.swiper-item-description {
  position: absolute;
  bottom: 60px;
  left: 30px;
  font-size: 30px;
  font-weight: bolder;
  color: #fff;
  z-index: 3;
}

.swiper-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.swiper-container {
  position: relative;
  width: 100%;
  height: 435px;
  border-radius: 16px;
  overflow: hidden;
}

.swiper-item-list {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.swiper-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.swiper-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  z-index: 4;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.swiper-indicator-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.swiper-indicator-item.active {
  background-color: #fff;
}

.swiper-indicator-item:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
