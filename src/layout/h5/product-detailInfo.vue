<template>
  <SkeletonComponent :loading="loading" />
  <div v-show="!loading" class="product-detail-container">
    <div class="swiper-wrapper">
      <detailSwiper :swiperList="productDetail.imageUrls" />
    </div>
    <div class="product-title">
      {{ productDetail.name }}
    </div>
    <div class="product-price" v-if="productDetail.price">
      {{ productDetail.price }}
    </div>
    <div class="product-color-select"></div>
    <div class="product-buy-button-wrapper">
      <div style="cursor: pointer;" :class="styles.operationButton"
        @click="jumpTo(router, productDetail.purchaseLink, {})">
        SHOP NOW
      </div>
    </div>
    <div class="product-detail-info-wrapper">
      <div v-if="productDetail.productSpuAboutList.length > 0" class="product-detail-info-item-title">
        {{ 'About this Item' }}
      </div>
      <div v-for="item in productDetail.productSpuAboutList" class="product-detail-info-item-content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import detailSwiper from '@/components/detail-swiper.vue'
import styles from '@/assets/yee-mall.module.css'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import { jumpTo } from '@/utils/utils'
import { useRouter } from 'vue-router'
import SkeletonComponent from '@/components/skeleton-component.vue'
import { useLanguageStore } from '@/stores/language'

const language = useLanguageStore()

const loading = ref(true)
const route = useRoute()
const router = useRouter()

const productDetail = ref({
  id: '',
  imageUrls: [],
  name: '',
  purchaseLink: '',
  description: '',
  price: '',
  productSpuAboutList: [
    {
      content: '',
    },
  ],
})

const fetchProductDetail = async (productId: string) => {
  loading.value = true
  const data = await useFetchWithLanguage.get(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuDetail?id=${productId}`,
  )
  productDetail.value = data
  loading.value = false
}

watch(
  () => route.query.id,
  (newVal) => {
    fetchProductDetail(newVal as string)
  },
  { immediate: true },
)

language.addRequest(fetchProductDetail)
</script>

<style scoped>
.product-detail-info-wrapper {
  margin: 40px 0 20px 0;
}

.product-detail-info-item {
  border-top: 1px solid #ccc;
  position: relative;
  padding: 1.2rem 0;
}

.product-detail-info-item-content::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: black;
}

.product-detail-info-item-title {
  font-size: 20px;
  font-weight: 600;
}

.product-detail-info-item-content {
  padding: 0px 20px;
  position: relative;
  word-wrap: break-word;
  word-break: break-all;
  margin: 1rem 0;
  font-size: 14px;
  color: #666;
}

.product-title {
  font-size: 24px;
  font-weight: 600;
  width: 70%;
  margin: 20px auto;
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
}

.product-price {
  width: 100%;
  margin-bottom: 10px;
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
}
</style>
