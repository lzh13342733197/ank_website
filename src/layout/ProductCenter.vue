<template>
  <div class="productCenter-head" style="margin-bottom: 40px;">
    <!-- <div v-if="!loading" class="productCenter-title">{{ t('productCenter.productCenter') }}</div>
    <SwiperModule v-if="!loading" :images="slideData" class="swiperModule_" /> -->
  </div>
  <SkeletonComponent :loading="loading" />
  <div style="max-width: 1600px; margin: 0 auto;">
    <div v-if="!loading" class="card-wrap-container" style="display: flex; flex-direction: column; gap: 20px;">
      <div class="leftOption">
        <production-option :category-list="categoryList" @changeOption="handleChangeOption" />
      </div>
      <div class="rightProduction" v-loading="loading">
        <card-peek-list ref="cardPeekListRef" :id="currentId" :title="'null'" :card-list="currentData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cardPeekList from './card-peek-list.vue'
import { useTemplateRef, onMounted, ref, watch, computed } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import SkeletonComponent from '@/components/skeleton-component.vue'
import { useLanguageStore } from '@/stores/language'
import { useRoute } from 'vue-router'
import productionOption from '@/layout/components/productionOption.vue'
import SwiperModule from '@/layout/components/SwiperModule.vue'
import partner from '@/layout/components/partner.vue'
import { useI18n } from 'vue-i18n'
import product_pc from '@/assets/images/product/product_pc.png'
import product_mb from '@/assets/images/product/product_mb.png'

const { locale, t } = useI18n()
const route = useRoute()
let currentId = ref('')

const language = useLanguageStore()

const cardPeekListRef = useTemplateRef('cardPeekListRef')

const getImageUrl = (item: any) => {
  if (item.productDetail) {
    return item.productDetail.imageUrl
  }
  return `/ankbit.png`
}
const slideData = computed(() => [
  {
    src: globalThis.innerWidth > 768 ? product_pc : product_mb,
    url: '', // 没有链接
    alt: 'Slide 3'
  },

])

const loading = ref(true)
const subLoading = ref(false)
const activeId = ref('')
const currentData = ref<any>()
const handleChangeOption = (id: string) => {
  activeId.value = id
  currentId.value = id
  getItemData(id)
}

const categoryList = ref<any[]>([])
const isLoadingData = ref(false)
let pendingPromise: Promise<void> | null = null

const homdic = ref<any>()
// 原 homInit 函数（叶子节点一同请求）
// const homInit = async () => {
//   if (import.meta.env.SSR) return
//   const res = await useFetchWithLanguage.post(
//     `${import.meta.env.VITE_API_URL}/siteConfig/getSiteConfig`,
//     {},
//   )
//   homdic.value = res
//   if (pendingPromise) {
//     console.log('等待当前数据加载完成...')
//     await pendingPromise
//     return categoryList.value
//   }

//   if (isLoadingData.value) return
//   isLoadingData.value = true
//   loading.value = true

//   pendingPromise = new Promise<void>((resolve) => {
//     const fetchData = async () => {
//       if (import.meta.env.SSR) return
//       try {
//         const data = await useFetchWithLanguage.post(
//           `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
//           {},
//         )
//         console.log(data);

//         const getLeafNode = (item: any, catagoryList: any[]) => {
//           if (item.children.length > 0) {
//             item.children.forEach((child: any) => {
//               getLeafNode(child, catagoryList)
//             })
//           } else {
//             categoryList.value.push(item)
//           }
//         }

//         categoryList.value = []
//         data.forEach((item: any) => {
//           getLeafNode(item, categoryList.value)
//         })

//         const fetchList = categoryList.value.map((item: any) =>
//           useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/product/getProductSpuList`, {
//             productCategoryId: item.id,
//           }),
//         )

//         const result = await Promise.all(fetchList)

//         result.forEach((item, index) => {
//           categoryList.value[index].productSpuList = item
//         })

//         resolve()
//       } catch (error) {
//         resolve()
//       } finally {
//         isLoadingData.value = false
//         loading.value = false
//         pendingPromise = null
//       }
//     }

//     fetchData()
//   })

//   return pendingPromise.then(() => categoryList.value)
// }

const homInit = async () => {
  if (import.meta.env.SSR) return

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
      if (import.meta.env.SSR) return
      try {
        const data = await useFetchWithLanguage.post(
          `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
          {},
        )
        console.log(data);
        categoryList.value = [...data]
        currentId.value = route.query.categoryId || categoryList.value[0].id
        await getItemData(currentId.value)
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

const getItemData = async (id: string) => {
  subLoading.value = true
  try {
    const fetchList =
      await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/product/getProductSpuList`, {
        productCategoryId: id,
      }
      )
    currentData.value = await Promise.all(fetchList)

    subLoading.value = false
  } catch (error) {
    subLoading.value = false
  }
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
  if (!target) return
  globalThis.scrollTo({
    top: target.documentPosition.top - 150,
    behavior: 'smooth',
  })
}

// 监听 locale 的变化
watch([locale, route.query.categoryId], (newLang) => {
  console.log('语言已切换为:', newLang)
  homInit() // 触发重新请求
}, { immediate: true }) // immediate 确保组件加载时也会执行一次

defineExpose({
  jumpToCategory,
})
</script>


<style scoped>
.swiperModule_ {
  margin-bottom: 40px;
  z-index: -1;
}

.card-wrap-container {
  width: 100%;
}

.productCenter-title {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}

@media (max-width: 1355px) {
  .card-wrap-container {
    flex-direction: column;
  }

  .leftOption {
    display: flex;
    justify-content: center;
  }

  .productCenter-title {
    font-size: 25px;
    left: 26%;
  }

}

@media (min-width: 1355px) {
  .card-wrap-container {
    flex-direction: row;
  }

  .productCenter-title {
    font-size: 48px;
  }
  .card-wrap-container {
  padding: 0 20px;
}
}

.productCenter-head {
  position: relative;
}
</style>
