<template>
  <div class="card-peek-wrapper">
    <!-- <div ref="titleRef" :class="styles.cardPeekTitle" style="white-space: nowrap;">{{ props.title }}</div> -->
    <div ref="wrapperRef" :class="styles.cardPeekListWrapper">
      <div ref="cardPeekListRef" :class="styles.cardPeekList">
        <card-preview v-for="item in props.cardList" :key="item.id" :detail="item" :categoryId="props.id"
          :card-name="props.title" />
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
const documentPosition = ref<any>(null)

const props = defineProps<{
  id: string
  title: string
  cardList: any[]
}>()


const { width: windowWidth } = useWindowSize()

watch([windowWidth, () => props.cardList], () => {

  if (titleRef.value) {
    titleRef.value.style.paddingLeft = `${minCardDistance}px`
  }
})

onMounted(() => {
  
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

</style>
