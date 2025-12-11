<template>
  <SkeletonComponent :loading="loading" />
  <div v-show="!loading" class="product-view-container">
    <div :class="styles.viewTitle">
      {{ toUpperCase((route.query.name as string) || 'product') }}
    </div>
    <!-- 采用网格布局，每行两个 -->
    <div class="product-view-grid">
      <ProductCard v-for="(item, index) in productList" :key="index" :product="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from '@/assets/yee-mall.module.css'
import ProductCard from '@/components/product-card.vue'
import { toUpperCase } from '@/utils/utils'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchWithLanguage } from '@/utils/http'
import SkeletonComponent from '@/components/skeleton-component.vue'
import { useLanguageStore } from '@/stores/language'

const language = useLanguageStore()

const route = useRoute()

const productList = ref([])
const loading = ref(true)

const fetchProductList = async (productCategoryId: string) => {
  loading.value = true
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuList`,
    {
      productCategoryId,
    },
  )
  productList.value = data
  loading.value = false
}

watch(
  () => route.query.id,
  async (newVal) => {
    fetchProductList(newVal as string)
  },
  { immediate: true },
)

language.addRequest(fetchProductList)
</script>

<style scoped>
.product-view-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.product-view-grid {
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.product-view-grid>* {
  width: 100%;
}
</style>
