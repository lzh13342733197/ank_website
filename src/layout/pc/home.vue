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
  <!-- <PosterBanner /> -->
  <SwiperModule v-if="!loading" :images="slideData" class="swiperModule_" />
  <SkeletonComponent :loading="loading" />
  <div v-if="!loading">
    <ProductShowcase :products="templateData" />
    <AboutUsModule />
    <!-- <NewsSlider /> -->
    <partner />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, ref, computed, nextTick,watch } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import SkeletonComponent from '@/components/skeleton-component.vue'
import { useLanguageStore } from '@/stores/language'
import { useRoute } from 'vue-router'
import SwiperModule from '@/layout/pc/components/SwiperModule.vue'
import ProductShowcase from '@/layout/pc/ProductShowcase.vue'
import AboutUsModule from '@/layout/pc/components/AboutUsModule.vue'
import NewsSlider from '@/layout/pc/components/NewsSlider.vue'
import partner from '@/layout/pc/components/partner.vue'
import banner1 from '@/assets/images/home/banner1.png'
import banner2 from '@/assets/images/home/banner2.png'
import banner3 from '@/assets/images/home/banner3.png'
import banner4 from '@/assets/images/home/banner4.png'
import banner5 from '@/assets/images/home/banner5.png'
import { useI18n } from 'vue-i18n'
const { t,locale } = useI18n()
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

const slideData = [
  {
    src: banner1,
    url: '',
    alt: 'Slide 1'
  },
  {
    src: banner2,
    url: '',
    alt: 'Slide 2'
  },
  {
    src: banner3,
    url: '', // 没有链接
    alt: 'Slide 3'
  },
  {
    src: banner4,
    url: '', // 没有链接
    alt: 'Slide 4'
  },
  {
    src: banner5,
    url: '', // 没有链接
    alt: 'Slide 5'
  },
]
const productList = ref([
  {
    id: 1,
    name: "主动降噪蓝牙耳机 NB-1092",
    imageUrl: "//img.wds168.cn/comdata/83627/product/20241023114758D3E5F06E231A69AB_s.jpg",
    link: "/cn/ProductDetail/4875130.html"
  },
  {
    id: 2,
    name: "多媒体蓝牙耳机 BEM-1100",
    imageUrl: "//img.wds168.cn/comdata/83627/product/20210219095054AF5724D15301E86C_s.jpg",
    link: "/cn/ProductDetail/4801155.html"
  },
  {
    id: 3,
    name: "真无线蓝牙耳机 T20",
    imageUrl: "//img.wds168.cn/comdata/83627/product/20210608171919E3E5AC7C20637A1A_s.jpg",
    link: "/cn/ProductDetail/5214554.html"
  },
  {
    id: 4,
    name: "高性能麦克风 M-630",
    imageUrl: "//img.wds168.cn/comdata/83627/product/2021082310255599B1BE4B43C62E1D_s.jpg",
    link: "/cn/ProductDetail/5453615.html"
  },
  {
    id: 5,
    name: "便携式蓝牙音箱 BT-360",
    imageUrl: "//img.wds168.cn/comdata/83627/product/202110191549120165FA7100140E46_s.jpg",
    link: "/cn/ProductDetail/5292943.html"
  },
  {
    id: 6,
    name: "蓝牙运动耳机 W22",
    imageUrl: "//img.wds168.cn/comdata/83627/product/202107061038324E83B064203CD75F_s.jpg",
    link: "/cn/ProductDetail/5293033.html"
  }
]);
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
        console.log(categoryList.value[4].productSpuList);
        templateData.value = categoryList.value[4].productSpuList
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
  window.scrollTo({
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
  margin-bottom: 40px;
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
