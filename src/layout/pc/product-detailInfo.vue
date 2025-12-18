<template>
  <SkeletonComponent :loading="loading" />

  <div v-show="!loading" class="product-detail-container">
    <!-- 左侧 / 顶部 Swiper -->
    <div class="swiper-wrapper">
      <detailSwiper
        class="detail-swiper"
        :swiperList="productDetail.imageUrls"
      />
    </div>

    <!-- 右侧 / 底部 信息 -->
    <div class="product-detail-info-container">
      <div class="product-title">
        {{ productDetail.name }}
      </div>

      <!-- <div class="product-price" v-if="productDetail.price">
        {{ productDetail.price }}
      </div> -->

      <div class="product-buy-button-wrapper">
        <div
          :class="styles.operationButton"
          style="cursor: pointer"
          @click="jumpTo(router, productDetail.purchaseLink, {})"
        >
          {{ $t('productDetail.shopNow') }}
        </div>
      </div>

      <div class="product-detail-info-wrapper">
        <!-- About -->
        <div
          v-if="productDetail.productSpuAboutList.length > 0"
          class="product-detail-info-item-title"
        >
          {{ $t('productDetail.AboutThisItem') }}
        </div>
        <div
          v-for="(item, index) in productDetail.productSpuAboutList"
          :key="index"
          class="product-detail-info-item-content"
        >
          {{ item.content }}
        </div>

        <!-- Manuals -->
        <div
          v-if="productDetail.manuals.length > 0"
          class="product-detail-info-item-title"
        >
          {{ $t('productDetail.ProductManual') }}
        </div>
        <div
          v-if="productDetail.manuals.length > 0"
          class="product-detail-info-item-content download-list"
        >
          <a
            v-for="item in productDetail.manuals"
            :key="item.fileId"
            :href="item.url"
            target="_blank"
            class="download-item"
          >
            <SvgIcon name="download" size="22" />
            <span>{{ item.name }}</span>
          </a>
        </div>

        <!-- Drivers -->
        <div
          v-if="productDetail.drivers.length > 0"
          class="product-detail-info-item-title"
        >
          Product Drivers
        </div>
        <div
          v-if="productDetail.drivers.length > 0"
          class="product-detail-info-item-content download-list"
        >
          <a
            v-for="item in productDetail.drivers"
            :key="item.fileId"
            :href="item.url"
            target="_blank"
            class="download-item"
          >
            <SvgIcon name="download" size="22" />
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- 底部分类推荐 -->
  <div class="product-category-container">
    <cardPeekList
      :id="String(route.query.categoryId || '')"
      :title="String(route.query.cardName || '')"
      :card-list="productCategoryList.slice(0,6)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import detailSwiper from '@/components/detail-swiper.vue'
import SkeletonComponent from '@/components/skeleton-component.vue'
import cardPeekList from './card-peek-list.vue'
import SvgIcon from '@/components/SvgIcon.vue'

import { useFetchWithLanguage } from '@/utils/http'
import { jumpTo } from '@/utils/utils'
import { useLanguageStore } from '@/stores/language'
import eightLanguage from '@/constants/language'
import styles from '@/assets/yee-mall.module.css'

const route = useRoute()
const router = useRouter()
const language = useLanguageStore()

const loading = ref(true)
const productCategoryList = ref<any[]>([])

const productDetail = ref<any>({
  id: '',
  imageUrls: [],
  name: '',
  purchaseLink: '',
  description: '',
  price: '',
  productSpuAboutList: [],
  manuals: [],
  drivers: [],
})

const getProductCategoryList = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuList`,
    {
      productCategoryId: route.query.categoryId,
    },
  )
  productCategoryList.value = data || []
}

const productDetailInit = async (productId: string) => {
  if (!productId) return
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
  (val) => {
    productDetailInit(val as string)
  },
  { immediate: true },
)

language.addRequest(productDetailInit)
</script>

<style scoped>
/* ================= 基础布局 ================= */
.product-detail-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  gap: 50px;
}

.swiper-wrapper {
  position: sticky;
  top: 100px;
  z-index: 9;
  height: fit-content;
}

.detail-swiper {
  width: 500px;
}

.product-detail-info-container {
  flex: 1;
}

.product-title {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
}

.product-price {
  text-align: center;
  font-size: 18px;
}

.product-buy-button-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0 40px;
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

.download-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.download-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4a90e2;
  font-weight: 600;
  text-decoration: none;
}

.product-category-container {
  margin: 40px 0;
}

/* ================= 移动端适配（≤1200px） ================= */
@media screen and (max-width: 1200px) {
  .product-detail-container {
    flex-direction: column;
    padding: 15px;
    gap: 30px;
  }

  .swiper-wrapper {
    position: relative;
    top: auto;
  }

  .detail-swiper {
    width: 100%;
  }

  .product-title {
    font-size: 22px;
    margin-bottom: 15px;
  }

  .product-price {
    font-size: 16px;
  }

  .product-buy-button-wrapper > div {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }

  .product-detail-info-item-title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .product-detail-info-item-content {
    font-size: 14px;
    margin-bottom: 15px;
  }

  .product-category-container {
    margin: 20px 0;
  }
}

/* ================= 小屏手机（≤768px） ================= */
@media screen and (max-width: 768px) {
  .product-title {
    font-size: 20px;
  }

  .product-detail-info-item-title {
    font-size: 16px;
  }

  .product-detail-info-item-content {
    font-size: 13px;
  }
}
</style>
