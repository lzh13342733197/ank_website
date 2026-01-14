<template>
  <div class="patent1">
    <div class="patent-list-section">
      <div class="swiper-container-wrapper">
        <swiper 
          :modules="[Navigation]"
          :slides-per-view="'auto'" 
          :grab-cursor="true" 
          :navigation="{
            nextEl: '.patent-button-next',
            prevEl: '.patent-button-prev',
          }"
          class="patent-swiper"
        >
          <swiper-slide v-for="(item, index) in virtualPatents" :key="index" class="patent-slide-item">
            <div class="a4-card" @click="handlePreviewFormDad(item.img)">
              <img :src="item.img" :alt="'Patent ' + index" class="swiper-img-item" @click="showPreview(previewImages,index)" />
            </div>
          </swiper-slide>
        </swiper>

        <div class="patent-button-prev">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </div>
        <div class="patent-button-next">
          <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules' // 导入导航模块
import { showPreview } from '@/components/GlobalPreview'
// 导入 Swiper 样式
import 'swiper/css'
import 'swiper/css/navigation'
import patent1 from '@/assets/images/patents/2019-001579  锐果电子商务   日本外观专利证书_page-0001.jpg'
import patent2 from '@/assets/images/patents/185862-RT615加拿大外观专利证书Shenzhen Mafiti E-commerce Co., Ltd_page-0001.jpg'
import patent3 from '@/assets/images/patents/015026156 爱科贝 无线音频接收发射器（RT5066 ） 欧盟外观证书_page-0001.jpg'
import patent4 from '@/assets/images/patents/015026157 爱科贝  蓝牙收发一体机（RT5013 ）欧盟外观证书_page-0001.jpg'
import patent5 from '@/assets/images/patents/29756368 一魔 头戴式耳机（RT952） 美国外观证书_page-0001.jpg'
import patent6 from '@/assets/images/patents/29758244- 一魔声学 蓝牙接收器（RT936）美国外观证书_page-0001.jpg'
import patent7 from '@/assets/images/patents/2024101575404一种耳机信息展示方法、装置、系统和设备-发明专利证书-爱科贝_page-0001.jpg'
import patent8 from '@/assets/images/patents/爱科贝ISO9001证书_page-0001.jpg'
import patent9 from '@/assets/images/patents/SZ2022224192855- 一种带音频发射接收功能的条形音响-实用新型专利证书_pages-to-jpg-0001.jpg'

// import patent10 from '@/assets/images/patents/美国muse设计奖_page-0001.jpg'
// import patent11 from '@/assets/images/patents/法国巴黎设计奖_page-0001.jpg'
// import patent12 from '@/assets/images/patents/伦敦设计奖_page-0001.jpg'

import patent13 from '@/assets/images/patents/RT807英国外观专利证书_page-0001.jpg'
import patent14 from '@/assets/images/patents/锐爱转让一魔 2016211581436 新型无线音响 手续合格通知书_pages-to-jpg-0001.jpg'
import patent15 from '@/assets/images/patents/107306737台湾外观专利证书_page-0001.jpg'
const virtualPatents = ref(
  Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    name: `专利证书名称 ${i}`,
    img: [patent1, patent2,  patent5, patent6, patent7, patent8, patent3, patent4, patent9, patent13, patent14, patent15][i]
  }))
)
const previewImages = [patent1, patent2,  patent5, patent6, patent7, patent8, patent3, patent4, patent9, patent13, patent14, patent15]

const patentRef = ref(null)

const handlePreviewFormDad = (img) => {
  patentRef.value?.handlePreviewFormDad(img)
}
</script>

<style scoped>
.patent1 {
  width: 100%;
}

.swiper-container-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

/* 列表展示区域 */
.patent-list-section {
  width: 100%;
  /* padding: 0 5%; */
  box-sizing: border-box;
}

.patent-swiper {
  width: 100%;
  padding: 20px 0; /* 留出一点空间给 hover 阴影 */
}

/* 保持你原本的条目尺寸配置 */
.patent-slide-item {
  width: 18.3%;
  margin-right: 1.5vw;
}

/* A4 比例容器 */
.a4-card {
  width: 100%;
  padding-bottom: 141.4%;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: zoom-in;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.a4-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.a4-card img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.6s ease-out forwards;
  background-color: #fff;
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ====================
   新增：按钮样式
   ==================== */
.patent-button-prev,
.patent-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  fill: #333;
}

.patent-button-prev {
  left: -20px; /* 稍微超出容器边缘，增加设计感 */
}

.patent-button-next {
  right: -20px;
}

.patent-button-prev:hover,
.patent-button-next:hover {
  background: #333;
  fill: #fff;
}

/* 按钮图标尺寸 */
.patent-button-prev svg,
.patent-button-next svg {
  width: 24px;
  height: 24px;
}

/* 当滑动到头时的禁用状态 */
.swiper-button-disabled {
  opacity: 0;
  cursor: not-allowed;
  pointer-events: none;
}

/* ====================
   响应式媒体查询 (保持你的设置)
   ==================== */
@media (max-width: 1200px) {
  .patent-slide-item {
    width: 45%;
  }
}

@media (max-width: 768px) {
  .patent-slide-item {
    width: 42%;
  }
  .patent-list-section {
  }
  /* 移动端通常不需要左右按钮，依靠手势滑动 */
  .patent-button-prev,
  .patent-button-next {
    display: none;
  }
}
</style>