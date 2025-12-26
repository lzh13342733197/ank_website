<template>
  <!-- <div class="swiper-container-wrapper" @touchmove.prevent> -->
  <div class="swiper-container-wrapper" >
    <div
      style="
        width: 100%;
        height: 100%;
        border: 1px solid white;
        border-radius: 16px;
        padding: 30px;
        background-color: #fff;
      "
    >
      <div ref="swiperContainerRef" class="swiper-container">
        <div class="swiper-item-list" ref="swiperItemListRef">
          <div class="swiper-item" style="position: relative" v-for="item in swiperList">
            <!-- <div class="swiper-item-description">
                        <div class="swiper-item-title-text">{{ item.title }}</div>
                    </div> -->

            <img
              v-lazy="item"
              class="swiper-item-image"
              :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-indicator">
      <div ref="indicatorItemsRef" v-for="item in swiperLength" class="swiper-indicator-item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef, onMounted } from 'vue'
import { useResizeObserver, useSwipe } from '@vueuse/core'

const props = defineProps(['swiperList'])

const currentIndex = ref(0)

const swiperLength = ref(1)

const swiperContainerRef = useTemplateRef('swiperContainerRef')
const swiperItemListRef = useTemplateRef('swiperItemListRef')
const indicatorItemsRef = useTemplateRef('indicatorItemsRef')
const imageWidth = ref(0)
const imageHeight = ref(0)

const { direction, isSwiping } = useSwipe(swiperItemListRef)

watch(direction, (newDirection) => {
  if (isSwiping.value) {
    if (newDirection === 'left') {
      slide('prev')
    } else {
      slide('next')
    }
  }
})

const slide = (direction: 'prev' | 'next') => {
  // 获取当前 left 值，去掉 px 并转为数字
  if (direction === 'prev') {
    currentIndex.value = (currentIndex.value - 1) % swiperLength.value
    if (swiperItemListRef.value) {
      swiperItemListRef.value.style.left = `${currentIndex.value * imageWidth.value}px`
    }
  } else {
    currentIndex.value = (currentIndex.value + 1) % swiperLength.value
    if (currentIndex.value > 0) currentIndex.value = -swiperLength.value + 1
    if (swiperItemListRef.value) {
      swiperItemListRef.value.style.left = `${currentIndex.value * imageWidth.value}px`
    }
  }
}

onMounted(() => {
  useResizeObserver(swiperContainerRef.value, (entries) => {
    imageWidth.value = entries[0].contentBoxSize[0].inlineSize
    imageHeight.value = entries[0].contentBoxSize[0].inlineSize
    if (swiperContainerRef.value) {
      swiperContainerRef.value.style.height = entries[0].borderBoxSize[0].inlineSize + 'px'
    }
  })

  watch(
    () => props.swiperList,
    (newList) => {
      swiperLength.value = newList.length
    },
  )

  watch(
    () => currentIndex.value,
    (newIndex) => {
      if (indicatorItemsRef.value) {
        indicatorItemsRef.value.forEach((item, index) => {
          if (index === -newIndex) {
            item.style.backgroundColor = 'black'
          } else {
            item.style.backgroundColor = 'white'
          }
        })
      }
    },
    { immediate: true },
  )
})
</script>

<style scoped>
.swiper-container-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .swiper-item-description {
    position: absolute;
    bottom: 60px;
    left: 30px;
} */
.swiper-item-list {
  display: flex;
  position: absolute;
  transition: left 0.3s ease-in-out;
}

.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-item-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.swiper-container {
  position: relative;
  width: 100%;
  /* height: 435px; */
  border-radius: 16px;
  /* border: 1px solid white; */
  /* padding: 10px; */
  overflow: hidden;
  scroll-behavior: smooth;
}

.swiper-indicator {
  padding: 20px 0;
  display: flex;
  gap: 10px;
}

.swiper-indicator-item {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: white;
}
</style>
