<template>
  <section class="partner-carousel-section">
    <div class="carousel-container">
      <div class="carousel-wrapper">
        <div class="carousel-track">
          <div class="partner-item" v-for="(item, index) in loopPartners" :key="index">
            <div class="img-box">
              <img v-lazy="item.logo" :alt="item.name" @click="showPreview(loopPreviewImgs, index % basePartners.length)"
                class="partner-logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showPreview } from '@/components/GlobalPreview'


// 图片导入 (保持原样)
import patent1 from '@/assets/images/patents/2019-001579  锐果电子商务   日本外观专利证书_page-0001.jpg'
import patent2 from '@/assets/images/patents/185862-RT615加拿大外观专利证书Shenzhen Mafiti E-commerce Co., Ltd_page-0001.jpg'
import patent3 from '@/assets/images/patents/015026156 爱科贝 无线音频接收发射器（RT5066 ） 欧盟外观证书_page-0001.jpg'
import patent4 from '@/assets/images/patents/015026157 爱科贝  蓝牙收发一体机（RT5013 ）欧盟外观证书_page-0001.jpg'
import patent5 from '@/assets/images/patents/29756368 一魔 头戴式耳机（RT952） 美国外观证书_page-0001.jpg'
import patent6 from '@/assets/images/patents/29758244- 一魔声学 蓝牙接收器（RT936）美国外观证书_page-0001.jpg'
import patent7 from '@/assets/images/patents/2024101575404一种耳机信息展示方法、装置、系统和设备-发明专利证书-爱科贝_page-0001.jpg'
import patent8 from '@/assets/images/patents/爱科贝ISO9001证书_page-0001.jpg'
import patent9 from '@/assets/images/patents/SZ2022224192855- 一种带音频发射接收功能的条形音响-实用新型专利证书_pages-to-jpg-0001.jpg'
import patent10 from '@/assets/images/patents/美国muse设计奖_page-0001.jpg'
import patent11 from '@/assets/images/patents/法国巴黎设计奖_page-0001.jpg'
import patent12 from '@/assets/images/patents/伦敦设计奖_page-0001.jpg'
import patent13 from '@/assets/images/patents/RT807英国外观专利证书_page-0001.jpg'
import patent14 from '@/assets/images/patents/锐爱转让一魔 2016211581436 新型无线音响 手续合格通知书_pages-to-jpg-0001.jpg'
const basePartners = [
  { id: 1, logo: patent1 },
  { id: 2, logo: patent2 },
  { id: 3, logo: patent3 },
  { id: 12, logo: patent4 },
  { id: 13, logo: patent5 },
  { id: 6, logo: patent6 },
  { id: 7, logo: patent7 },
  { id: 8, logo: patent8 },
  { id: 11, logo: patent9 },
  { id: 14, logo: patent10 },
  { id: 15, logo: patent11 },
  { id: 16, logo: patent12 },
  { id: 17, logo: patent13 },
  { id: 18, logo: patent14 },
]

// 组合出 3 组数据，确保在大屏或快速滚动下绝对无缝
const loopPartners = computed(() => [...basePartners, ...basePartners, ...basePartners])

const loopPreviewImgs = [patent1, patent2, patent3, patent4, patent5, patent6, patent7, patent8, patent9, patent10, patent11, patent12, patent13, patent14]
</script>

<style scoped>
.partner-carousel-section {
  padding: 40px 0;
  width: 100%;
  overflow: hidden;
}

.partner-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  /* 可选：补充 mask-mode 确保遮罩模式一致（部分浏览器需要） */
  -webkit-mask-mode: alpha;
  mask-mode: alpha;
}

/* 轨道优化 */
.carousel-track {
  display: flex;
  width: max-content;
  /* 使用更稳定的动画方案 */
  animation: infinite-scroll 60s linear infinite;
  will-change: transform;
}

.partner-item {
  /* 必须使用固定宽度，确保 CSS 计算 transform百分比时绝对精确 */
  width: 200px;
  margin: 0 15px;
  flex-shrink: 0;
}

.img-box {
  background: #fff;
  height: 280px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.partner-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.carousel-track:hover {
  animation-play-state: paused;
}

/* 核心无缝滚动动画 */
@keyframes infinite-scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    /* 因为有三组，移动到 1/3 的位置即为完整的一轮循环 */
    transform: translate3d(calc(-100% / 3), 0, 0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .partner-item {
    width: 140px;
    margin: 0 8px;
  }

  .img-box {
    height: 200px;
  }
}
</style>