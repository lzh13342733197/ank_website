<template>
  <div class="news-list-container">
    <div class="news-header">
      <div class="page-title">{{ $t('news.title') }}</div>
    </div>

    <div class="news-list-area">
      <ul class="news-container">
        <li v-for="news in newsData" :key="news.id" class="news-card">
          <div class="news-image-layout">
            <div class="image-grid" :class="'grid-count-' + getImageList(news).length">
              <div v-for="(img, idx) in getImageList(news)" :key="idx" class="img-item" @click="openLightbox(img)">
                <img :src="img" :alt="news.title" loading="lazy" />
                <div v-if="idx === 4 && getImageList(news).length > 5" class="more-mask">
                  +{{ getImageList(news).length - 5 }}
                </div>
              </div>
            </div>
          </div>

          <div class="news-info-layout">
            <div class="news-meta">
              <span class="news-date-text">{{ news.date }}</span>
              <h2 class="news-item-title">{{ news.title }}</h2>
            </div>
            <p class="news-item-desc">{{ news.description }}</p>
          </div>
        </li>
      </ul>

      <div v-if="newsData.length === 0" class="empty-status">No news available.</div>
    </div>
  </div>

  <Transition name="fade">
    <div v-if="lightboxVisible" class="lightbox-overlay" @click="closeLightbox">
      <img :src="lightboxImage" class="lightbox-content" />
      <button class="lightbox-close-btn" @click.stop="closeLightbox">×</button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- 导入你的图片资源 ---
import news201909 from '@/assets/images/news/201909.png'
import news201910_1 from '@/assets/images/news/201910_1.png'
import news202309_SATF from '@/assets/images/news/202309_SATF.png'
import news202309_IFA from '@/assets/images/news/202309_IFA.png'
import news202311 from '@/assets/images/news/202311.png'
import news202401_1 from '@/assets/images/news/202401_1.png'
import news202510_1 from '@/assets/images/news/202510_1.png'

// --- 新闻数据：内容保持不变，仅扩展了图片数组用于演示 ---
const newsData = ref([
  {
    id: 7,
    date: '2025.10',
    title: 'HK FAIR',
    // 这里演示复制了5张对应的图片
    imageUrls: [news202510_1, news202510_1, news202510_1, news202510_1, news202510_1],
    description: '2015年10月 环球资源香港展',
    categoryId: 1
  },
  {
    id: 6,
    date: '2024.01',
    title: 'CES FAIR',
    imageUrl: news202401_1,
    description: '2024年1月 美国拉斯维加斯消费电子展',
    categoryId: 1
  },
  {
    id: 5,
    date: '2023.11',
    title: 'BRAZIL FAIR',
    imageUrl: news202311,
    description: '2023年11月 巴西贸易展览会',
    categoryId: 3
  },
  {
    id: 4,
    date: '2023.09',
    title: 'IFA FAIR',
    imageUrl: news202309_IFA,
    description: '2023年9月 柏林国际消费电子展',
    categoryId: 2
  },
  {
    id: 3,
    date: '2023.09',
    title: 'SOUTH AFRICA TRADING FAIR',
    imageUrl: news202309_SATF,
    description: '2023年9月 南非贸易展览会',
    categoryId: 2
  },
  {
    id: 2,
    date: '2019.10',
    title: 'HK FAIR',
    imageUrl: news201910_1,
    description: '2019年9月 香港展',
    categoryId: 1
  },
  {
    id: 1,
    date: '2019.09',
    title: 'IFA FAIR',
    imageUrl: news201909,
    description: '2019年9月 柏林国际消费电子展',
    categoryId: 1
  },
]);

// --- 弹窗逻辑 ---
const lightboxVisible = ref(false);
const lightboxImage = ref('');

const getImageList = (news) => {
  if (Array.isArray(news.imageUrls)) return news.imageUrls.slice(0, 5); // 限制最多展示5张
  if (news.imageUrl) return [news.imageUrl];
  return [];
};

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
/* 核心容器 */
.news-list-container {
  max-width: 1200px;
  /* 移除了导航栏后，收窄容器让阅读更集中 */
  margin: 0 auto;
  padding: 24px 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
}

.news-header {
  text-align: left;
  margin-bottom: 28px;
  position: relative;
}

.page-title {
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  border-left: 4px solid #0095D7;
  font-weight: 700;
  padding-left: 8px;
  line-height: 1.2;
}



/* 新闻卡片 */
.news-container {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.news-card {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 40px;
}

/* --- 图片网格 (上下排布核心) --- */
.news-image-layout {
  margin-bottom: 25px;
}

.image-grid {
  display: grid;
  gap: 10px;
}

.img-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: zoom-in;
  background: #f7f7f7;
}

.img-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s;
}

.img-item:hover img {
  transform: scale(1.03);
}

/* PC端 多图网格 (1大+4小) */
.grid-count-5 {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 450px 180px;
}

.grid-count-5 .img-item:nth-child(1) {
  grid-column: span 4;
}

/* PC端 单图 */
.grid-count-1 img {
  height: auto;
  max-height: 600px;
  object-fit: contain;
  /* 单图保持原比例 */
  background: #fff;
}

/* 文字区域 */
.news-info-layout {
  padding: 0 5px;
}

.news-meta {
  margin-bottom: 15px;
}

.news-date-text {
  font-size: 24px;
  font-weight: 800;
  color: #0095D7;
  display: block;
  margin-bottom: 8px;
}

.news-item-title {
  font-size: 24px;
  color: #111;
  margin: 0;
  line-height: 1.3;
}

.news-item-desc {
  font-size: 16px;
  color: #555;
  line-height: 1.8;
  margin-top: 15px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* --- 移动端适配 --- */
@media (max-width: 768px) {
  .news-list-container {
    padding: 30px 15px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  /* 移动端 5张图 (1大+4小，2x2排布) */
  .grid-count-5 {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 250px 120px 120px;
  }

  .grid-count-5 .img-item:nth-child(1) {
    grid-column: span 2;
  }

  .news-date-text {
    font-size: 20px;
  }

  .news-item-title {
    font-size: 1.2rem;
  }

  .news-item-desc {
    font-size: 14px;
  }
}

/* 预览层动画 */
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
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox-content {
  max-width: 95%;
  max-height: 90%;
  object-fit: contain;
}

.lightbox-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
}
</style>