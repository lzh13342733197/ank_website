<template>
  <SkeletonComponent :loading="loading" />
  <div v-show="!loading" class="product-detail-container">
    <div class="swiper-wrapper">
      <detailSwiper style="width: 500px" :swiperList="productDetail.imageUrls" />
    </div>

    <div class="product-detail-info-container">
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
          {{ eightLanguage.productDetailInfo.about_this_Item['en'] }}
        </div>
        <div v-for="item in productDetail.productSpuAboutList" class="product-detail-info-item-content">
          {{ item.content }}
        </div>

        <div v-if="productDetail.manuals.length > 0" class="product-detail-info-item-title">
          {{ eightLanguage.productDetailInfo.productManual['en'] }}
        </div>
        <div v-if="productDetail.manuals.length > 0" class="product-detail-info-item-content"
          style="display: flex; flex-direction: column; gap: 5px">
          <a v-for="item in productDetail.manuals" style="
              display: inline-block;
              color: #4a90e2;
              padding: 5px;
              font-weight: 600;
              border-radius: 5px;
              text-decoration: none;
            " :href="`${item.url}`" target="_blank">
            <div style="display: flex; align-items: center; gap: 10px">
              <SvgIcon name="download" size="26" />
              {{ `${item.name}` }}
            </div>
          </a>
        </div>

        <div v-if="productDetail.drivers.length > 0" class="product-detail-info-item-title">
          {{ 'Product Drivers' }}
        </div>
        <div v-if="productDetail.drivers.length > 0" class="product-detail-info-item-content"
          style="display: flex; flex-direction: column; gap: 5px">
          <a v-for="item in productDetail.drivers" style="
              display: inline-block;
              color: #4a90e2;
              padding: 5px;
              font-weight: 600;
              border-radius: 5px;
              text-decoration: none;
            " :href="`${item.url}`" target="_blank">
            <div style="display: flex; align-items: center; gap: 10px">
              <SvgIcon name="download" size="26" />
              {{ `${item.name}` }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="product-category-container">
    <cardPeekList :id="String(route.query.categoryId || '')" :title="String(route.query.cardName || '')"
      :card-list="productCategoryList" />
  </div>
</template>

<script setup lang="ts">
import detailSwiper from '@/components/detail-swiper.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import { useRouter } from 'vue-router'
import SkeletonComponent from '@/components/skeleton-component.vue'
import cardPeekList from './card-peek-list.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useLanguageStore } from '@/stores/language'
import eightLanguage from '@/constants/language'
import { jumpTo } from '@/utils/utils'
import styles from '@/assets/yee-mall.module.css'

const language = useLanguageStore()
const productCategoryList = ref([])

const getProductCategoryList = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuList`,
    {
      productCategoryId: route.query.categoryId,
    },
  )
  productCategoryList.value = data
}

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
  manuals: [
    {
      fileId: '',
      name: '',
      url: '',
      md5: '',
    },
  ],
  drivers: [
    {
      fileId: '',
      name: '',
      url: '',
      md5: '',
    },
  ],
})

const productDetailInit = async (productId: string) => {
  loading.value = true
  const data = await useFetchWithLanguage.get(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuDetail?id=${productId}`,
  )
  productDetail.value = data
  loading.value = false
  getProductCategoryList()
}

watch(
  () => route.query.id,
  async (newVal) => {
    productDetailInit(newVal as string)
  },
  { immediate: true },
)

language.addRequest(productDetailInit)
</script>

<style scoped>
.product-detail-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  gap: 50px;
  /* position: relative; */
}

.swiper-wrapper {
  margin-bottom: 40px;
  position: sticky;
  top: 100px;
  z-index: 9;
  height: fit-content;
  display: flex;
  align-items: stretch;
}

.product-price {
  display: flex;
  justify-content: center;
  font-size: 18px;
}

.product-title {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
}

.product-buy-button-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0 40px 0;
}

.product-detail-info-wrapper {
  margin: 40px 0;
}

.product-detail-info-item-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.product-detail-info-item-content {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.product-category-container {
  margin: 40px 0;
}

.swiper-wrapper.fixed {
  position: fixed;
  top: 80px;
}

.swiper-wrapper.absolute {
  position: absolute;
  top: auto;
  bottom: 200px;
  /* 你想“解锁”的位置 */
}
</style>
