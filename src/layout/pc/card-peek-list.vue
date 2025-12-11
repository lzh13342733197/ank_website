<template>
  <div class="card-peek-wrapper">
    <div ref="titleRef" :class="styles.cardPeekTitle" style="white-space: nowrap;">{{ props.title }}</div>
    <div ref="wrapperRef" :class="styles.cardPeekListWrapper">
      <div class="forward-arrow" @click="handleMove('forward')" @mousedown.prevent>
        <SvgIcon name="forward" size="32" style="transform: translateX(5%)"></SvgIcon>
      </div>
      <div ref="cardPeekListRef" :class="styles.cardPeekList">
        <card-preview v-for="item in props.cardList" :key="item.id" :detail="item" :categoryId="props.id"
          :card-name="props.title" />
      </div>
      <div class="backward-arrow" @click="handleMove('backward')" @mousedown.prevent>
        <SvgIcon name="back" size="32" style="transform: translateX(-5%)"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch, ref } from 'vue'
import cardPreview from './card-preview.vue'
import styles from './pc.module.less'
import SvgIcon from '@/components/SvgIcon.vue'
import { useWindowSize } from '@vueuse/core'
import { getCardPeekListPosition } from '@/utils/utils'

const wrapperRef = useTemplateRef('wrapperRef')
const cardPeekListRef = useTemplateRef('cardPeekListRef')
const titleRef = useTemplateRef('titleRef')
let minCardDistance: number = 200
let maxCardDistance: number = 1000
let moveDistance: number = 313 + 20
let currentIndex: number = 0
let cardDistance: number = minCardDistance
const documentPosition = ref<any>(null)

const props = defineProps<{
  id: string
  title: string
  cardList: any[]
}>()

const handleMove = (direction: 'forward' | 'backward') => {
  if (cardPeekListRef.value) {
    if (direction === 'forward' && cardDistance > maxCardDistance) {
      currentIndex++
      cardDistance = -(currentIndex * moveDistance) + 200
      cardDistance = cardDistance < maxCardDistance ? maxCardDistance : cardDistance
    } else if (direction === 'backward' && cardDistance < minCardDistance) {
      currentIndex--
      cardDistance = -(currentIndex * moveDistance) + 200
      cardDistance = cardDistance > minCardDistance ? minCardDistance : cardDistance
    }
    cardPeekListRef.value.style.transform = `translateX(${cardDistance}px)`
  }
}

const { width: windowWidth } = useWindowSize()

watch([windowWidth, () => props.cardList], () => {
  if (wrapperRef.value) {
    maxCardDistance = -(
      props.cardList.length * 313 +
      (props.cardList.length - 1) * 20 +
      200 -
      wrapperRef.value.clientWidth
    )
  }
  if (titleRef.value) {
    titleRef.value.style.paddingLeft = `${minCardDistance}px`
  }
})

onMounted(() => {
  if (cardPeekListRef.value) {
    cardPeekListRef.value.style.transform = `translateX(${cardDistance}px)`
  }
  if (titleRef.value) {
    titleRef.value.style.paddingLeft = `${minCardDistance}px`
  }
  if (wrapperRef.value) {
    maxCardDistance = -(
      props.cardList.length * 313 +
      (props.cardList.length - 1) * 20 +
      200 -
      wrapperRef.value.clientWidth
    )
  }
  documentPosition.value = getCardPeekListPosition(wrapperRef)
})

defineExpose({
  documentPosition,
  id: props.id,
})
</script>

<style scoped lang="less">
.card-peek-wrapper {
  padding: 0 0 20px 0;
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
