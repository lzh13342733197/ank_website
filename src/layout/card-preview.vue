<template>
  <div :class="[styles.cardPreview, 'card-preview-container']" @click="handleClick">
    <div class="card-image-wrapper">
      <img v-lazy="props.detail.imageUrls[0]" alt="product" class="card-image" />
    </div>

    <div class="card-preview-item">
      <p class="card-title-text">
        {{ props.detail.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './pc.module.less' // 假设这个导入的 styles 包含 cardPreview 类
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  detail: any
  categoryId: string
  cardName: string
}>()

const handleClick = () => {
  globalThis.open(
    `/product-detailInfo?id=${props.detail.id}&categoryId=${props.categoryId}&cardName=${props.cardName}`,
    '_blank'
  )
}
</script>

<style scoped>
/* =================================
   1. 容器样式 (原内联样式)
   ================================= */
.card-preview-container {

  background-color: #fff;
  border-radius: 18px;
  position: relative;
}

/* =================================
   2. 图片 Wrapper 样式 (原内联样式)
   ================================= */
.card-image-wrapper {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 200px; */
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* =================================
   3. 图片 样式 (原内联样式)
   ================================= */
.card-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* =================================
   4. 标题文本样式 (原内联样式)
   ================================= */
.card-title-text {
  font-size: 20px;
  font-weight: 400;

  /* 文本截断（省略号）样式 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* 限制 2 行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 行高和高度控制 */
  height: 48px;
  /* 2行 * 24px line-height */
  line-height: 24px;
  margin: 0;
}

/* =================================
   5. 文本区域 (card-preview-item) 样式
   ================================= */
.card-preview-item {
  position: relative;
  top: 380px;
  /* 231px; */
  width: 231px;
  /* PC 默认宽度 */
  margin: auto;
  text-align: center;
}

/* PC 端样式 (min-width: 768px) - 保持原样 */
@media (min-width: 768px) {

  /* * 由于我们已经设置了 .card-preview-item 的默认 width: 280px; 
   * 这一块可以省略，除非你想设置不同的 PC 宽度。
   */
  /* .card-preview-item {
    width: 280px;
  } */
  .card-image-wrapper {
    width: 200px;
  }

  .card-preview-item {
    top: 310px;
  }

  .card-preview-container {
    height: 410px;
  }
}

/* 移动端样式 (max-width: 768px) - 保持原样 */
@media (max-width: 768px) {
  .card-preview-item {
    width: calc((100vw - 100px) / 2);
    top: 231px;
  }

  .card-image-wrapper {
    width: 160px;
  }

  .card-title-text {
    font-size: 16px;
  }

  .card-preview-container {
    height: 310px;
  }
}
</style>