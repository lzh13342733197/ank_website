<template>
  <div style="
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
  </div>
  <PosterBanner />
  <SkeletonComponent :loading="loading" />
  <div v-if="!loading" style="display: flex; gap: 20px;">
    <div class="leftOption">
      <production-option :category-list="categoryList" @changeOption="handleChangeOption"/>
    </div>
   <div>
     <div v-for="item in categoryList" :key="item.id">
      <card-peek-list ref="cardPeekListRef" v-if="item.id === activeId" :id="item.id" :title="item.name"
        :card-list="item.productSpuList" />
    </div>
   </div>
  </div>
</template>

<script setup lang="ts">
import cardPeekList from './card-peek-list.vue'
import { useTemplateRef, onMounted, ref, computed, nextTick } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import SkeletonComponent from '@/components/skeleton-component.vue'
import { useLanguageStore } from '@/stores/language'
import PosterBanner from '@/layout/pc/posterBanner_copy.vue'
import eightLanguage from '@/constants/language'
import { useRoute } from 'vue-router'
import productionOption from '@/layout/pc/components/productionOption.vue'

const route = useRoute()

const language = useLanguageStore()

const cardPeekListRef = useTemplateRef('cardPeekListRef')

const getImageUrl = (item: any) => {
  if (item.productDetail) {
    return item.productDetail.imageUrl
  }
  return `/1mii.png`
}

const loading = ref(true)
const activeId = ref('')

const handleChangeOption = (id: string) => {
  activeId.value = id
}

const categoryList = ref<any[]>([])
const isLoadingData = ref(false)
let pendingPromise: Promise<void> | null = null

const homdic = ref<any>()
const homInit = async () => {

  const res = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/siteConfig/getSiteConfig`,
    {},
  )
  homdic.value = res
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
      try {
        const data = await useFetchWithLanguage.post(
          `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
          {},
        )
        console.log(data);

        const getLeafNode = (item: any, catagoryList: any[]) => {
          if (item.children.length > 0) {
            item.children.forEach((child: any) => {
              getLeafNode(child, catagoryList)
            })
          } else {
            categoryList.value.push(item)
          }
        }

        categoryList.value = []
        data.forEach((item: any) => {
          getLeafNode(item, categoryList.value)
        })

        const fetchList = categoryList.value.map((item: any) =>
          useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/product/getProductSpuList`, {
            productCategoryId: item.id,
          }),
        )

        const result = await Promise.all(fetchList)

        result.forEach((item, index) => {
          categoryList.value[index].productSpuList = item
        })

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


onMounted(homInit)

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
  window.scrollTo({
    top: target.documentPosition.top - 150,
    behavior: 'smooth',
  })
}

defineExpose({
  jumpToCategory,
})
</script>
