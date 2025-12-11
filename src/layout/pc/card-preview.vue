<template>
  <div :class="styles.cardPreview" style="
      width: 313px;
      height: 500px;
      background-color: #fff;
      border-radius: 18px;
      position: relative;
    " @click="handleClick">
    <div style="
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
      <img v-lazy="props.detail.imageUrls[0]" alt="product"
        style="max-width: 100%; max-height: 100%; object-fit: contain" />
    </div>
    <div style="position: relative; top: 380px; width: 280px; margin: auto; text-align: center">
      <p style="
          font-size: 20px;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 48px; 
          line-height: 24px; 
          margin: 0; 
        ">
        {{ props.detail.name }}
      </p>
      <div v-if="props.detail.price" style="
          font-size: 20px;
          font-weight: 600;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
           margin-top: 8px; 
        ">
        {{ props.detail.price }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './pc.module.less'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  detail: any
  categoryId: string
  cardName: string
}>()

const handleClick = () => {
  // router.push({
  //   path: '/pc/product-detailInfo',
  //   query: { id: props.detail.id, categoryId: props.categoryId, cardName: props.cardName },
  // })
  window.open(
    `/pc/product-detailInfo?id=${props.detail.id}&categoryId=${props.categoryId}&cardName=${props.cardName}`,
    '_blank'
  );
}
</script>
