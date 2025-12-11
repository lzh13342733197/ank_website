<template>
  <div v-if="bannerList.length > 0" class="zoumaden" style="width: 100%;
  margin: 20px 0;">
    <el-carousel height="auto" style="text-align: center; border-radius: 40px;" autoplay>
      <el-carousel-item style="height: auto;" class="carousel-item" v-for="(item, index) in bannerList" :key="item.id">
        <img v-if="!item.isVideo" :key="index" :src="item.image" style="object-fit: cover;" alt="1Mii"
          class="poster-image">
        <video v-if="item.isVideo" :key="'video' + index" :src="item.image" autoplay loop muted
          class="poster-image"></video>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
const bannerList = ref<any[]>([])

onMounted(() => {
  homInit()
})

const homInit = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/banner/list`,
    { type: 'pc' },
  )
  bannerList.value = data.map((item: any) => {
    return {
      ...item,
      image: item.imageUrl,
      isVideo: item.imageUrl.endsWith('.mp4')
    }
  })
  console.log(bannerList.value);
}

</script>

<style scoped>
.zoumaden {
  width: 100%;
  height: auto;
  padding-left: 200px;
  transform: translateX(-20px);
  position: relative;
}

.carousel-item {
  width: 100%;
  border-radius: 40px;
  overflow: hidden;
}

.poster-image {
  border-radius: 40px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
