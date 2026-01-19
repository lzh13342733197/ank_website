<template>
  <!-- <div style="
      margin: 60px 200px;
      transform: translateX(-20px);
      display: flex;
      flex-direction: column;
      gap: 20px;
    ">
    <div style="font-size: 38px; font-weight: 600; line-height: 1.125;white-space: nowrap;">{{ homdic?.homeTitle
      || eightLanguage.websiteTitle.title['en'] }}</div>
    <div style="font-size: 32px; color: #6e6e73; font-weight: 600; line-height: 1.125 ;white-space: nowrap;">{{
      homdic?.homeSubTitle ||
      eightLanguage.websiteTitle.subTitle['en'] }}</div>
    <div style="display: flex; gap: 60px; margin: 40px 0">
      <div v-for="item in categoryList" @click="jumpToCategory(item.id)" :key="item.id" style="
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 10px;
          cursor: pointer;
          /* border: 1px solid #e5e5e5; */
        ">
        <img :src="item.imageUrl" alt="logo" style="width: 140px; height: 140px; border-radius: 14px" />
        <div style="
            font-size: 14px;
            color: #1d1d20;
            font-weight: 600;   
            line-height: 1;
            text-align: center;
            width: 140px;
          ">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div> -->
  <SwiperModule v-if="!loading" :images="swiperList" class="swiperModule_" />
  <SkeletonComponent :loading="loading" />
  <div v-if="!loading">
    <SocialMediaVideo style="margin: 0 auto" />
    <ProductShowcase :products="templateData" />
    <!-- <NewsSlider /> -->
    <PatentsAwards />
    <partner />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, ref, computed, nextTick, watch } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import SkeletonComponent from '@/components/skeleton-component.vue'
import { useLanguageStore } from '@/stores/language'
import { useRoute } from 'vue-router'
import SwiperModule from '@/layout/components/SwiperModule.vue'
import ProductShowcase from '@/layout/ProductShowcase.vue'
import NewsSlider from '@/layout/components/NewsSlider.vue'
import partner from '@/layout/components/partner.vue'
import SocialMediaVideo from '@/layout/components/SocialMediaVideo.vue'
import PatentsAwards from '@/layout/components/PatentsAwards.vue'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const route = useRoute()

const language = useLanguageStore()

const cardPeekListRef = useTemplateRef('cardPeekListRef')
const templateData = ref([])
const getImageUrl = (item: any) => {
  if (item.productDetail) {
    return item.productDetail.imageUrl
  }
  return `/ankbit.png`
}


const loading = ref(true)
const activeId = ref('')

const swiperList = ref<any[]>([])
const categoryList = ref<any[]>([])
const isLoadingData = ref(false)
let pendingPromise: Promise<void> | null = null

// const homdic = ref<any>()
const homInit = async () => {
  if (import.meta.env.SSR) return
  // 加载项目配置
  // const res = await useFetchWithLanguage.post(
  //   `${import.meta.env.VITE_API_URL}/siteConfig/getSiteConfig`,
  //   {},
  // )
  // homdic.value = res
  if (pendingPromise) {
    console.log('等待当前数据加载完成...')
    await pendingPromise
    return categoryList.value // 返回已加载的数据
  }

  if (isLoadingData.value) return
  isLoadingData.value = true
  loading.value = true

  pendingPromise = new Promise<void>((resolve) => {
    const fetchData = async () => {
      if (import.meta.env.SSR) return
      try {
        const res = await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/product/show`, {})
        console.log(res);
        templateData.value = res
        resolve()
      } catch (error) {
        resolve()
      } finally {
        isLoadingData.value = false
        loading.value = false
        pendingPromise = null
      }
    }
    fetchData()
  })

  return pendingPromise.then(() => categoryList.value)
}

const fetchSwiperList = async () => {
  const data = await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/banner/list`, { type: window.innerWidth > 768 ? 'pc' : 'mobile' })
  // swiperList.value = data
  swiperList.value = data.map((item: any) => {
    item.src = item.imageUrl
    item.url = item.linkUrl
    item.alt = item.title
    return item
  })
  console.log(swiperList.value)
}


onMounted(() => {
  fetchSwiperList()
  homInit()
})

watch(() => locale.value, (newLocale) => {
  homInit()
})
language.addRequest(homInit)

const jumpToCategory = async (id: string) => {
  console.log(id)
  if (!cardPeekListRef.value) {
    await homInit()
  }
  const refs = Array.isArray(cardPeekListRef.value)
    ? cardPeekListRef.value
    : [cardPeekListRef.value]
  const target = refs.find((item: any) => item.id === id)
  console.log(target)
  if (!target) return
  globalThis.scrollTo({
    top: target.documentPosition.top - 150,
    behavior: 'smooth',
  })
}

defineExpose({
  jumpToCategory,
})
</script>


<style scoped>
.swiperModule_ {
  /* margin-bottom: 40px; */
}

.card-wrap-container {
  width: 100%;
}

@media (max-width: 1355px) {
  .card-wrap-container {
    flex-direction: column;
  }

  .leftOption {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 1355px) {
  .card-wrap-container {
    flex-direction: row;
  }
}
</style>
