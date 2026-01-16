<template>
  <div style="background-color: #fff;">
    <div class="top_img">

      <img v-if="!isMobile" style="width: 100%;display: block;" :src="news1920_300" alt="">
      <img v-else style="width: 100%;display: block;" :src="news500_200" alt="">
      <img v-if="!isMobile" style="width: 100%;display: block;" :src="fairBannerPc" alt="">
      <img v-else style="width: 100%;display: block;" :src="fairBannerMobile" alt="">
    </div>
    <!-- <div class="news-list-container">
      <div class="news-header">
        <div class="page-title">{{ $t('news.title') }}</div>
      </div>

      <div class="news-list-area">
        <ul class="news-container">
          <li v-for="news in newsData" :key="news.id" class="news-card">
            <div class="news-image-layout">
              <div class="stack-wrapper" :class="{ 'is-expanded': news.isExpanded }" @click="toggleExpand(news)">
                <div v-for="(img, idx) in getImageList(news)" :key="idx" class="stack-item"
                  :style="news.isExpanded ? {} : getStackStyle(idx)" @click.stop="handlePhotoClick(img, news)">
                  <img :src="img" :alt="news.title" loading="lazy" />
                  <div v-if="!news.isExpanded && idx === 0" class="click-hint">
                    <span>Click to Expand</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="news-info-layout">
              <div class="news-meta">
                <span class="news-date-text">{{ news.date }}</span>
                <h2 class="news-item-title" v-if="locale === 'en'">{{ news.title }}</h2>
                <h2 class="news-item-title" v-else>{{ news.description }}</h2>
              </div>
            </div>
          </li>
        </ul>

        <div v-if="newsData.length === 0" class="empty-status">No news available.</div>
      </div>
    </div> -->

    <Transition name="fade">
      <div v-if="lightboxVisible" class="lightbox-overlay" @click="closeLightbox">
        <img :src="lightboxImage" class="lightbox-content" />
        <button class="lightbox-close-btn" @click.stop="closeLightbox">×</button>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

import news500_200 from '@/assets/images/Fari/500-200.jpg'
import news1920_300 from '@/assets/images/Fari/1920-300.jpg'
import fairBannerMobile from '@/assets/images/Fari/fair_banner_mobile.jpg'
import fairBannerPc from '@/assets/images/Fari/fair_banner-pc.jpg'

// --- 导入图片资源 ---
import news202401CES展1 from '@/assets/images/Fari/1-202401CES展-720-405-1.jpg'
import news202401CES展2 from '@/assets/images/Fari/1-202401CES展-720-405-2.jpg'
import news202401CES展3 from '@/assets/images/Fari/1-202401CES展-720-405-3.jpg'
import news202401CES展4 from '@/assets/images/Fari/1-202401CES展-720-405-4.jpg'
import news202401CES展5 from '@/assets/images/Fari/1-202401CES展-720-405-5.jpg'

import news202410香港展1 from '@/assets/images/Fari/2-202410香港展-720-405-1.jpg'
import news202410香港展2 from '@/assets/images/Fari/2-202410香港展-720-405-2.jpg'
import news202410香港展3 from '@/assets/images/Fari/2-202410香港展-720-405-3.jpg'
import news202410香港展4 from '@/assets/images/Fari/2-202410香港展-720-405-4.jpg'
import news202410香港展5 from '@/assets/images/Fari/2-202410香港展-720-405-5.jpg'

import news202510香港环球展1 from '@/assets/images/Fari/3-202510香港环球展-720-405-1.jpg'
import news202510香港环球展2 from '@/assets/images/Fari/3-202510香港环球展-720-405-2.jpg'
import news202510香港环球展3 from '@/assets/images/Fari/3-202510香港环球展-720-405-3.jpg'
import news202510香港环球展4 from '@/assets/images/Fari/3-202510香港环球展-720-405-4.jpg'
import news202510香港环球展7 from '@/assets/images/Fari/3-202510香港环球展-720-405-7.jpg'

import news202601CES展1 from '@/assets/images/Fari/4-202601CES展-720-405-1.jpg'
import news202601CES展2 from '@/assets/images/Fari/4-202601CES展-720-405-2.jpg'
import news202601CES展3 from '@/assets/images/Fari/4-202601CES展-720-405-3.jpg'
import news202601CES展4 from '@/assets/images/Fari/4-202601CES展-720-405-4.jpg'
import news202601CES展5 from '@/assets/images/Fari/4-202601CES展-720-405-5.jpg'
const isMobile = computed(() => globalThis.innerWidth <= 768)
// --- 数据定义 ---
const newsData = ref([
  {
    id: 8,
    date: '2026.01',
    title: 'CES Exhibitions',
    imageUrls: [news202601CES展1, news202601CES展2, news202601CES展3, news202601CES展4, news202601CES展5],
    description: '美国拉斯维加斯消费电子展',
    isExpanded: false
  },
  {
    id: 7,
    date: '2025.10',
    title: 'HK Exhibitions',
    imageUrls: [news202510香港环球展7, news202510香港环球展2, news202510香港环球展3, news202510香港环球展4, news202510香港环球展1],
    description: '环球资源香港展',
    isExpanded: false
  },
  {
    id: 6,
    date: '2024.10',
    title: 'HK Exhibitions',
    imageUrls: [news202410香港展1, news202410香港展2, news202410香港展3, news202410香港展4, news202410香港展5],
    description: '香港展',
    isExpanded: false
  },
  {
    id: 6,
    date: '2024.01',
    title: 'HK Exhibitions',
    imageUrls: [news202401CES展1, news202401CES展2, news202401CES展3, news202401CES展4, news202401CES展5],
    description: '美国拉斯维加斯消费电子展',
    isExpanded: false
  }
]);

// --- 动画逻辑 ---

// 计算初始堆叠时的错位样式
const getStackStyle = (idx) => {
  const rotations = [-4, 3, -2, 5, 0]; // 每张图旋转角度
  const xOffsets = [-15, 10, -5, 15, 0]; // 每张图左右偏移
  const yOffsets = [-10, 5, 10, -5, 0];  // 每张图上下偏移

  return {
    transform: `rotate(${rotations[idx] || 0}deg) translate(${xOffsets[idx] || 0}px, ${yOffsets[idx] || 0}px)`,
    zIndex: 10 - idx // 让第一张图在最上面
  };
};

const toggleExpand = (news) => {
  news.isExpanded = !news.isExpanded;
};

const getImageList = (news) => {
  return news.imageUrls ? news.imageUrls.slice(0, 5) : [];
};

// 只有在展开后点击图片才打开灯箱
const handlePhotoClick = (img, news) => {
  if (news.isExpanded) {
    openLightbox(img);
  } else {
    news.isExpanded = true;
  }
};

// --- 灯箱逻辑 ---
const lightboxVisible = ref(false);
const lightboxImage = ref('');

const openLightbox = (img) => {
  lightboxImage.value = img;
  lightboxVisible.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxVisible.value = false;
  document.body.style.overflow = 'auto';
};
</script>

<style scoped>
.news-list-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 20px;
  background-color: #fff;
}

.page-title {
  font-size: 1.5rem;
  border-left: 4px solid #0095D7;
  font-weight: 700;
  padding-left: 12px;
  margin-bottom: 40px;
}

.news-container {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* --- 核心动画区域 --- */
.news-image-layout {
  perspective: 1000px;
  /* 增加3D感 */
  margin-bottom: 30px;
}

.stack-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 350px;
  margin: 0 auto;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

.stack-item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #f0f0f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 4px solid #fff;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stack-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

/* 提示文字 */
.click-hint {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 149, 215, 0.8);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.stack-wrapper:hover .click-hint {
  opacity: 1;
}

/* --- 展开后的状态 --- */
.stack-wrapper.is-expanded {
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  max-width: 100%;
}

.is-expanded .stack-item {
  position: relative;
  height: 180px;
  transform: none !important;
  /* 清除旋转错位 */
  z-index: 1 !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  cursor: zoom-in;
}

.is-expanded .stack-item:hover img {
  transform: scale(1.05);
}

/* --- 文字样式 --- */
.news-info-layout {
  text-align: left;
}

.news-date-text {
  font-size: 22px;
  font-weight: 800;
  color: #0095D7;
  display: block;
  margin-bottom: 5px;
}

.news-item-title {
  font-size: 20px;
  color: #333;
  margin: 0;
}

/* --- 移动端适配 --- */
@media (max-width: 768px) {
  .stack-wrapper {
    height: 220px;
    max-width: 90%;
  }

  .stack-wrapper.is-expanded {
    grid-template-columns: repeat(2, 1fr);
  }

  .is-expanded .stack-item {
    height: 120px;
  }
}

/* --- 灯箱效果 --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox-content {
  max-width: 90%;
  max-height: 85%;
  object-fit: contain;
  border-radius: 4px;
}

.lightbox-close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
}
</style>