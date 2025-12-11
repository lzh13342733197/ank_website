<template>
  <div class="product-card-container" @click="jumpTo(router, '/mobile/product-detailInfo', { id: product.id })">
    <div class="product-card-image">
      <img v-lazy="product.imageUrls[0]" style="
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: flex;
          align-items: center;
          justify-content: center;
        " alt="product-image" />
    </div>
    <div class="product-card-title">{{ props.product.name }}</div>
    <div v-if="props.product.price" class="product-card-price"> {{ props.product.price }}</div>
  </div>
</template>

<script setup lang="ts">
import { jumpTo } from '@/utils/utils'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['product'])
</script>

<style scoped>
.product-card-container {
  width: 40%;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.product-card-title {
  /* position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%); */
  font-size: 14px;
  font-weight: 400;
  color: #666;
  text-align: center;

  /* padding-bottom: 5px; */
}

.product-card-price {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  text-align: center;
}



.product-card-image {
  width: 80%;
  height: 80%;
  /* background-color: #f0f0f0; */
}
</style>
