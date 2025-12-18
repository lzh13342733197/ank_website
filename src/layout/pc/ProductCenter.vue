<template>
  <SwiperModule :images="slideData" class="swiperModule_" />
  <SkeletonComponent :loading="loading" />
  <div style="max-width: 1600px; margin: 0 auto;">
      <div v-if="!loading" class="card-wrap-container" style="display: flex; gap: 40px;">
    <div class="leftOption">
      <production-option :category-list="categoryList" @changeOption="handleChangeOption"/>
    </div>
   <div class="rightProduction">
     <div v-for="item in categoryList" :key="item.id">
      <card-peek-list ref="cardPeekListRef" v-if="item.id === activeId" :id="item.id" :title="item.name"
        :card-list="item.productSpuList" />
    </div>
   </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import cardPeekList from './card-peek-list.vue'
import { useTemplateRef, onMounted, ref,watch} from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import SkeletonComponent from '@/components/skeleton-component.vue'
import { useLanguageStore } from '@/stores/language'
import { useRoute } from 'vue-router'
import productionOption from '@/layout/pc/components/productionOption.vue'
import SwiperModule from '@/layout/pc/components/SwiperModule.vue'
import partner from '@/layout/pc/components/partner.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const route = useRoute()

const language = useLanguageStore()

const cardPeekListRef = useTemplateRef('cardPeekListRef')

const getImageUrl = (item: any) => {
  if (item.productDetail) {
    return item.productDetail.imageUrl
  }
  return `/1mii.png`
}
const slideData = [
  { 
    src: '//img.wds168.cn/comdata/83627/202212/202212311105406851b3.jpg', 
    url: '', // 没有链接
    alt: 'Slide 3' 
  },
  
]

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
    return categoryList.value 
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
// 监听 locale 的变化
watch(locale, (newLang) => {
  console.log('语言已切换为:', newLang)
  homInit() // 触发重新请求
}, { immediate: true }) // immediate 确保组件加载时也会执行一次
defineExpose({
  jumpToCategory,
})
</script>


<style scoped>
  .swiperModule_{
    margin-bottom: 40px;
  }
.card-wrap-container {
  width: 100%;
}
@media (max-width: 1355px) {
  .card-wrap-container {
    flex-direction: column;
  }
  .leftOption{
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
