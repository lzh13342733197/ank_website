<template>
  <div class="swiper-container-wrapper">
    <div class="swiper-card">
      <div ref="swiperContainerRef" class="swiper-container">
        <div class="swiper-item-list" ref="swiperItemListRef">
          <div class="swiper-item" v-for="(item, index) in swiperList" :key="index">
            <img
              v-lazy="item"
              class="swiper-item-image"
              alt="轮播图片"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 轮播指示器 - 圆形 + 可点击 -->
    <div class="swiper-indicator" v-if="swiperList.length > 1">
      <div 
        v-for="(item, index) in swiperList.length" 
        :key="index"
        class="swiper-indicator-item"
        :class="{ active: currentIndex === index }"
        @click="handleIndicatorClick(index)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef, onMounted, nextTick } from 'vue'
import { useResizeObserver, useSwipe } from '@vueuse/core'

// 1. 修复Props定义，增加类型校验
const props = defineProps({
  swiperList: {
    type: Array,
    default: () => [],
    required: true
  }
})

// 响应式数据
const currentIndex = ref(0) // 当前轮播索引
const swiperContainerRef = useTemplateRef('swiperContainerRef')
const swiperItemListRef = useTemplateRef('swiperItemListRef')
const containerWidth = ref(0) // 容器宽度

// 滑动事件监听
const { direction, isSwiping } = useSwipe(swiperContainerRef)

// 滑动处理逻辑
const handleSwipe = () => {
  if (!isSwiping.value || props.swiperList.length <= 1) return
  
  if (direction.value === 'left') {
    // 向左滑 → 下一张
    slideTo(currentIndex.value + 1)
  } else if (direction.value === 'right') {
    // 向右滑 → 上一张
    slideTo(currentIndex.value - 1)
  }
}

// 2. 修复点击指示器切换图片方法
const handleIndicatorClick = (index: number) => {
  if (index === currentIndex.value) return // 点击当前激活的指示器不处理
  currentIndex.value = index
  updateSwiperPosition()
}

// 3. 修复滑动到指定索引方法（简化逻辑，避免边界错误）
const slideTo = (index: number) => {
  const listLength = props.swiperList.length
  if (listLength <= 1) return
  
  // 边界处理：循环轮播
  if (index < 0) {
    currentIndex.value = listLength - 1
  } else if (index >= listLength) {
    currentIndex.value = 0
  } else {
    currentIndex.value = index
  }
  
  // 更新轮播列表位置
  updateSwiperPosition()
}

// 4. 修复轮播位置更新方法
const updateSwiperPosition = () => {
  if (!swiperItemListRef.value || containerWidth.value === 0) return
  // 核心：向左移动 = -索引 * 容器宽度
  swiperItemListRef.value.style.left = `-${currentIndex.value * containerWidth.value}px`
}

onMounted(() => {
  // 监听容器尺寸变化
  if (swiperContainerRef.value) {
    // 初始化容器宽度
    containerWidth.value = swiperContainerRef.value.clientWidth
    
    useResizeObserver(swiperContainerRef.value, (entries) => {
      containerWidth.value = entries[0].contentBoxSize[0].inlineSize
      // 尺寸变化后更新轮播位置
      nextTick(() => {
        updateSwiperPosition()
      })
    })
  }

  // 监听滑动方向变化
  watch(direction, handleSwipe)

  // 监听轮播列表变化
  watch(
    () => props.swiperList,
    () => {
      currentIndex.value = 0 // 列表变化重置索引
      nextTick(updateSwiperPosition)
    },
    { immediate: true }
  )
})
</script>

<style scoped>
.swiper-container-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.swiper-card {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 16px;
}

.swiper-container {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 16px;
}

.swiper-item-list {
  display: flex;
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
  transition: left 0.3s ease-in-out; /* 平滑过渡 */
  margin: 0;
  padding: 0;
}

.swiper-item {
  flex: 0 0 100%; /* 每个轮播项占满容器宽度 */
  list-style: none;
}

.swiper-item-image {
  width: 100%;
  height: auto;
  object-fit: contain; /* 保持图片比例 */
  border-radius: 8px;
}

/* 轮播指示器 - 圆形样式 + 可点击 */
.swiper-indicator {
  display: flex;
  gap: 10px;
  padding: 20px 0;
}

.swiper-indicator-item {
  width: 12px;
  height: 12px;
  border-radius: 50%; /* 强制圆形 */
  background-color: #e0e0e0; /* 默认灰色 */
  cursor: pointer; /* 鼠标悬浮显示手型 */
  transition: all 0.2s ease; /* 状态变化过渡 */
}

/* 激活状态的指示器 */
.swiper-indicator-item.active {
  background-color: #0095D7; /* 激活态蓝色 */
  transform: scale(1.2); /* 激活时轻微放大，更醒目 */
}

/* 鼠标悬浮指示器效果 */
.swiper-indicator-item:hover:not(.active) {
  background-color: #cccccc; /* 悬浮时加深灰色 */
}

/* 适配小屏幕 */
@media (max-width: 768px) {
  .swiper-card {
    /* padding: 16px; */
  }
  
  .swiper-indicator-item {
    width: 10px;
    height: 10px;
  }
  
  .swiper-indicator {
    gap: 8px;
    padding: 16px 0;
  }
}
</style>