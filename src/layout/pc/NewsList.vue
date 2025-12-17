<template>
  <SwiperModule :images="currentSlide" class="swiperModule_" />

  <div class="news-list-container">
    <div class="main-content-grid">

      <div class="sidebar">
        <div class="module-classify">
          <header class="class-title classify" @click="toggleSidebar">
            <span class="class-title-text">新闻动态</span>
            <!-- <span class="class-title-icon iconfont" :class="isSidebarOpen ? 'icon-up' : 'icon-down'">></span> -->
          </header>

          <!-- <Transition name="sidebar-slide">
            <ul class="one-classify" v-show="isSidebarOpen">
              <li 
                v-for="category in categories" 
                :key="category.id" 
                :class="{ 'active': category.id === activeCategoryId }" 
                @click="setActiveCategory(category.id)"
              >
                {{ category.name }}
              </li>
            </ul>
          </Transition> -->
        </div>
      </div>

      <div class="news-list-area">
        <ul class="news-container clearfix">
          <li style="list-style: none;" v-for="(news, index) in newsItems" :key="news.id"
            :class="['news-item', 'clearfix', index % 2 === 0 ? 'odd' : 'even']">
            <a  target="_blank" class="clearfix">
              <div class="news-item-box">
                <!-- 支持多图：单图保持原样，多图自动横排（大屏）/竖排（小屏） -->
                <div class="news-img" :class="{ 'has-multiple': getImageList(news).length > 1 }">
                  <!-- 单图保持原有结构 -->
                  <template v-if="getImageList(news).length === 1">
                    <img :src="getImageList(news)[0]" :alt="news.title" :title="news.title" class="t-img" loading="lazy"
                       @click.prevent="openLightbox(getImageList(news)[0])" />
                    <div class="dummy"></div>
                  </template>

                  <!-- 多图：缩略图列表 -->
                  <template v-else>
                    <div class="news-img-item" v-for="(img, idx) in getImageList(news)" :key="idx"
                      @click.prevent="openLightbox(img)">
                      <img :src="img" :alt="news.title" :title="news.title" class="t-img" loading="lazy" />
                    </div>
                  </template>
                </div>

                <div class="news-con-wrapper">
                  <div class="news-time">
                    <time>{{ news.date }}</time>
                    <div class="news-icon"><span></span></div>
                  </div>

                  <div class="news-con">
                    <p class="news-title">
                      <!-- <i class="staFun" v-if="news.isTop">顶</i>
                      <i class="staFun" v-if="news.isRecommended">荐</i> -->
                      {{ news.title }}
                    </p>
                    <p class="news-desc" :title="news.description">
                      {{ news.description }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Lightbox 预览 -->
  <div v-if="lightboxVisible" class="lightbox" @click="closeLightbox">
    <img :src="lightboxImage" alt="预览大图" class="lightbox-img" />
    <button class="lightbox-close" aria-label="关闭" @click.stop="closeLightbox">×</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SwiperModule from '@/layout/pc/components/SwiperModule.vue'
// --- 状态和数据 ---
import news201909 from '@/assets/images/news/201909.png'
import news201910_1 from '@/assets/images/news/201910_1.png'
import news201910_2 from '@/assets/images/news/201910_2.png'
import news202309_SATF from '@/assets/images/news/202309_SATF.png'
import news202309_IFA from '@/assets/images/news/202309_IFA.png'
import news202311 from '@/assets/images/news/202311.png'
import news202401_1 from '@/assets/images/news/202401_1.png'
import news202510_1 from '@/assets/images/news/202510_1.png'

// 导入轮播图
import newsBannerPC from '@/assets/images/news/newsBanner-pc.png'
import newsBannerMB from '@/assets/images/news/newsBanner-mb.png'

// 新闻数据
const newsData = [
  { id: 1, date: '2019.09', title: 'IFA FAIR', url: '', imageUrl: news201909, description: '2019年9月 柏林国际消费电子展', isTop: true, isRecommended: true, categoryId: 1 },
  { id: 2, date: '2019.10', title: 'HK FAIR', url: '', imageUrl: news201910_1, description: '2019年9月 香港展', isTop: true, isRecommended: false, categoryId: 1 },
  { id: 3, date: '2023.09', title: 'SOUTH AFRICA TRADING FAIR', url: '', imageUrl: news202309_SATF, description: '2023年9月 南非贸易展览会', isTop: true, isRecommended: false, categoryId: 2 },
  { id: 4, date: '2023.09', title: 'IFA FAIR', url: '', imageUrl: news202309_IFA, description: '2023年9月 柏林国际消费电子展', isTop: false, isRecommended: false, categoryId: 2 },
  { id: 5, date: '2023.11', title: 'BRAZIL FAIR', url: '', imageUrl: news202311, description: '2023年11月 巴西贸易展览会', isTop: false, isRecommended: true, categoryId: 3 },
  { id: 6, date: '2024.01', title: 'CES FAIR', url: '', imageUrl: news202401_1, description: '2024年1月 美国拉斯维加斯消费电子展', isTop: false, isRecommended: false, categoryId: 1 },
  { id: 7, date: '2025.10', title: 'HK FAIR', url: '', imageUrl: news202510_1, description: '2015年10月 环球资源香港展', isTop: false, isRecommended: false, categoryId: 1 },
]

// 顶部轮播图
const slideData = [
  { src: newsBannerPC, url: '', alt: '' },
  { src: newsBannerMB, url: '', alt: '' }
]
const isDesktop = ref(window.innerWidth > 1200)
const currentSlide = computed(() => {
  return isDesktop.value ? [slideData[0]] : [slideData[1]]
})

// 分类（保留原有）
const categories = [
  { id: 0, name: '全部' },
  { id: 1, name: '展会活动' },
  { id: 2, name: '公司动态' },
  { id: 3, name: '产品发布' },
];

const activeCategoryId = ref(0);
const isSidebarOpen = ref(true); // 默认在大屏时展开
const isMobile = ref(false);     // 跟踪当前是否为移动视图

// 计算属性：筛选新闻
const newsItems = computed(() => {
  if (activeCategoryId.value === 0) return newsData;
  return newsData.filter(news => news.categoryId === activeCategoryId.value);
});

// 工具方法：兼容 imageUrl 与 imageUrls
const getImageList = (news) => {
  if (Array.isArray(news.imageUrls) && news.imageUrls.length) return news.imageUrls;
  if (news.imageUrl) return [news.imageUrl];
  return [];
};

const setActiveCategory = (id) => {
  activeCategoryId.value = id;
  if (isMobile.value) isSidebarOpen.value = false;
};

const toggleSidebar = () => {
  if (isMobile.value) isSidebarOpen.value = !isSidebarOpen.value;
};

// 响应式断点
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value) {
    isSidebarOpen.value = true;
  } else if (isMobile.value && activeCategoryId.value === 0) {
    isSidebarOpen.value = false;
  }
};

const handleResize = () => {
  isDesktop.value = window.innerWidth > 1200;
  checkMobile();
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Lightbox
const lightboxVisible = ref(false);
const lightboxImage = ref('');
const openLightbox = (img) => {
  lightboxImage.value = img;
  lightboxVisible.value = true;
};
const closeLightbox = () => {
  lightboxVisible.value = false;
  lightboxImage.value = '';
};
</script>

<style scoped>
/* 容器和布局 */
.news-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-content-grid {
  display: flex;
  gap: 30px;
}

/* 侧边栏（大屏默认样式） */
.sidebar {
  flex: 0 0 250px;
  transition: all 0.3s ease-in-out;
}

.sidebar .class-title {
  cursor: default;
  /* 大屏时标题不可点 */
}

.sidebar .class-title-icon {
  display: none;
  /* 大屏时隐藏箭头 */
}

.module-classify {
  border: 1px solid #eee;
  padding: 15px;
}

/* 右侧新闻列表（大屏默认样式） */
.news-list-area {
  flex: 1;
}

.news-container {
  padding: 0;
}

.news-item a {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s;
}

.news-item-box {
  display: flex;
  /* 大屏：内容和图片左右排列 */
  align-items: center;
  gap: 20px;
}

.news-con-wrapper {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.news-img {
  width: 150px;
  height: 100px;
  overflow: hidden;
  flex-shrink: 0;
  order: 2;
  /* 大屏时图片在右侧 (默认) */
  display: flex;
  justify-content: center;
}

.news-img.has-multiple {
  /* 多图时改为自适应横排缩略图容器 */
  width: auto;
  height: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.news-img.has-multiple .news-img-item {
  width: 150px;
  height: 100px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
}

.news-img.has-multiple .news-img-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.news-item a:hover .news-img.has-multiple .news-img-item img {
  transform: scale(1.05);
}

.news-con-wrapper .news-time {
  flex-shrink: 0;
  /* 时间区域不压缩 */
  width: 80px;
  text-align: center;
  margin-right: 20px;
  order: 1;
  /* 大屏时时间在内容左侧 */
}

.news-con {
  flex: 1;
}

/* 其他内容和排版样式（与原版本一致） */
.class-title {
  border-bottom: 2px solid #0056b3;
  padding-bottom: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.class-title-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.one-classify li {
  list-style: none;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px dashed #eee;
  color: #666;
  transition: color 0.3s;
}

.one-classify li:hover,
.one-classify li.active {
  color: #0056b3;
  font-weight: bold;
}

.news-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.news-time time {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #0056b3;
}

.news-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
}

.news-desc {
  font-size: 14px;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
}

.staFun {
  display: inline-block;
  font-style: normal;
  font-size: 12px;
  color: #fff;
  background-color: #ff4500;
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 8px;
  line-height: 1;
}

.news-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.3s;
}

.news-item a:hover .news-img img {
  transform: scale(1.05);
}

/* Lightbox 预览样式 */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 24px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
}

.t-img {
  width: 80%;
}

/* --- 移动端优化 (Media Query) --- */
@media (max-width: 768px) {
  .main-content-grid {
    flex-direction: column;
    gap: 15px;
  }

  .t-img {
    width: 50% !important;
  }

  /* 侧边栏收缩逻辑 */
  .sidebar {
    width: 100%;
    flex: none;
  }

  .sidebar .class-title {
    cursor: pointer;
    margin-bottom: 0;
  }

  .sidebar .class-title-icon {
    display: block;
    transition: transform 0.3s ease;
    /* 为箭头添加旋转动画 */
    transform: rotate(90deg);
    /* 默认箭头向右 (icon-down) */
  }

  /* 箭头方向切换 */
  .sidebar .class-title-icon.icon-up {
    transform: rotate(-90deg);
  }

  /* 图片位置调整逻辑 */
  .news-item-box {
    flex-direction: column;
    align-items: flex-start;
  }

  .news-img {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
    order: 1;
    /* 图片在上方 */
  }

  .news-img.has-multiple {
    flex-direction: column;
    gap: 12px;
  }

  .news-img.has-multiple .news-img-item {
    width: 100%;
    height: 150px;
  }

  .news-con-wrapper {
    order: 2;
    /* 内容在下方 */
    width: 100%;
    display: flex;
    /* 时间和内容左右排列 */
    align-items: flex-start;
    gap: 15px;
  }

  .news-con-wrapper .news-time {
    margin-right: 0;
  }

  /* --- 侧边栏下拉动画 (使用 max-height) --- */
  .sidebar-slide-enter-active,
  .sidebar-slide-leave-active {
    transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
    overflow: hidden;
  }

  .sidebar-slide-enter-from {
    max-height: 0;
    opacity: 0;
  }

  .sidebar-slide-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .sidebar-slide-enter-to,
  .sidebar-slide-leave-from {
    max-height: 300px;
    opacity: 1;
  }
}
</style>
