<template>
  <div class="home-container">
    <swiper :swiperList="swiperList" v-if="swiperList.length > 0" />
    <product-view />
    <brief-introduction />
  </div>
</template>

<script setup lang="ts">
import Swiper from '@/components/swiper.vue'
import ProductView from '@/layout/h5/product-view.vue'
import BriefIntroduction from '@/layout/h5/brief-introduction.vue'
import { onMounted, ref } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import { useLanguageStore } from '@/stores/language'

const language = useLanguageStore()
const swiperList = ref([])

const fetchSwiperList = async () => {
  const data = await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/banner/list`, { type: 'mobile' })
  swiperList.value = data
}

onMounted(fetchSwiperList)

language.addRequest(fetchSwiperList)
</script>

<style scoped></style>
