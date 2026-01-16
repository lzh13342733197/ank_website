<template>
  <div>
    <SkeletonComponent :loading="loading" />

    <div v-show="!loading" class="product-detail-container">
      <div class="swiper-wrapper">
        <detailSwiper class="detail-swiper" :swiperList="productDetail.imageUrls" />
      </div>

      <div class="product-detail-info-container">
        <div class="product-title">
          {{ productDetail.name }}
        </div>

        <div class="product-buy-button-wrapper">
          <div :class="styles.operationButton" style="cursor: pointer; border-radius: 50px" @click="isInquire = true">
            {{ $t('productDetail.shopNow') }}
          </div>
        </div>
        <!-- About This Item -->
        <div class="product-detail-info-wrapper">
          <div v-if="productAttrList.length > 0">
            <div class="product-detail-info-item-title">
              {{ $t('productDetail.AboutThisItem') }}
            </div>

            <div class="specs-grid">
              <div v-for="(item, index) in productAttrList" :key="item.id || index" class="specs-item">
                <div class="specs-label">{{ item.name }} : </div>
                <div class="specs-value">{{ item.value }}</div>
              </div>
            </div>
          </div>


          <div v-if="productDetail.drivers.length > 0" class="product-detail-info-item-title section-mt">
            Product Drivers
          </div>
          <div v-if="productDetail.drivers.length > 0" class="product-detail-info-item-content download-list">
            <a v-for="item in productDetail.drivers" :key="item.fileId" :href="item.url" target="_blank"
              class="download-item">
              <SvgIcon name="download" size="22" />
              <span>{{ item.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品描述图片 -->
    <div class="product-detail-info-item-content">
      <img v-for="item in productBanner" :src="item" alt="" class="product-banner">
    </div>
    <!-- <div class="product-category-container">
      <cardPeekList :id="String(route.query.categoryId || '')" :title="String(route.query.cardName || '')"
        :card-list="productCategoryList.slice(0, 6)" />
    </div> -->

    <el-dialog v-model="isInquire" top="30px" :width="windowWidth" :close-on-click-modal="true"
      :close-on-press-escape="false" :show-close="true">
      <ContactForm :productSpuId="productDetail.id" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import detailSwiper from '@/components/detail-swiper.vue'
import SkeletonComponent from '@/components/skeleton-component.vue'
import cardPeekList from './card-peek-list.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import inquire from '@/layout/components/inquire.vue'
import ContactForm from '@/layout/components/ContactForm_singleOption.vue'

import { useFetchWithLanguage } from '@/utils/http'
import { useLanguageStore } from '@/stores/language'
import styles from '@/assets/yee-mall.module.css'

const route = useRoute()
const router = useRouter()
const language = useLanguageStore()
const isInquire = ref(false)
const loading = ref(true)
const productCategoryList = ref<any[]>([])
const windowWidth = computed(() => globalThis.innerWidth <= 700 ? '90%' : '50%')
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
const productAttrList = ref<any[]>([])
const currentId = computed(() => route.query.id as string)
const { t, locale } = useI18n()
const productBanner = ref([])
// 工具函数：拆分内容 (如果后续还需要处理字符串则保留，单纯展示AttrList可不使用)
const splitContent = (content: string) => {
  const separator = content.includes(':') ? ':' : '：'
  const parts = content.split(separator)
  if (parts.length > 1) {
    return {
      label: parts[0].trim(),
      value: parts.slice(1).join(separator).trim()
    }
  }
  return { label: '', value: content }
}

const getProductCategoryList = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuList`,
    { productCategoryId: route.query.categoryId },
  )
  productCategoryList.value = data || []
}

const productDetailInit = async () => {
  const productId = route.query.id as string
  if (!productId) return
  loading.value = true
  const data = await useFetchWithLanguage.get(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuDetail?id=${productId}`,
  )
  const dataAttr = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getProductSpuAttrList`,
    { productSpuId: productId },
  )
  productAttrList.value = dataAttr || []
  productDetail.value = data
  console.log(productDetail.value);
  if (productDetail.value.productSpuAboutList.length) {
    productBanner.value = productDetail.value.productSpuAboutList.map(item => {
      return item.imageUrls[0]
    })
    // productBanner.value= productDetail.value.productSpuAboutList[0].imageUrls[0]
  }
  console.log(productBanner.value);
  loading.value = false
  getProductCategoryList()
}

onMounted(() => {
  productDetailInit()
})

watch([locale, currentId], () => {
  productDetailInit()
})

language.addRequest(productDetailInit)

const handleInquireSubmit = (formData: any) => {
  isInquire.value = false
}
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
  width: auto;
  margin-bottom: 3vw;
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

.product-buy-button-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0 40px;
}

.product-detail-info-wrapper {
  margin: 40px 0;
}

.product-detail-info-item-content {
  text-align: center;
}

.product-banner {
  width: 100%;
  border-radius: 16px;
  margin-bottom: 10px;
}

@media screen and (min-width: 1200px) {
  .product-banner {
    max-width: 1160px;
  }
}

.product-detail-info-item-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.section-mt {
  margin-top: 40px;
}

/* ================= 一行两个参数的 Grid 布局 ================= */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* 核心：一行两列 */
  border-radius: 4px;
  overflow: hidden;
}

.specs-item {
  display: flex;
  /* border-bottom: 1px solid #ebeef5; */
}

.specs-label {
  min-width: 100px;
  white-space: nowrap;
  font-weight: 600;
  color: #333;
  font-size: 13px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.specs-value {
  flex: 1;
  padding: 7px 15px;
  color: #666;
  font-size: 13px;
  display: flex;
  align-items: center;
}

/* ================= 下载 & 适配 ================= */
.download-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.download-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4a90e2;
  font-weight: 600;
  text-decoration: none;
}

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
}

/* 移动端适配：变回一行一个参数 */
@media screen and (max-width: 900px) {
  .specs-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .specs-item {
    flex-direction: row;
  }

  .specs-label {
    width: 130px;
    border-right: none;
    /* border-bottom: 1px solid #ebeef5; */
    padding: 8px 12px;
  }

  .specs-value {
    padding: 10px 12px;
  }
  .product-banner {
  width: 100%;
  border-radius: 0;
  margin-bottom:0;
  display: block;
}
}
</style>