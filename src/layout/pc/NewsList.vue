<template>
  <div class="news-list-container">
    <div class="main-content-grid">
      
      <div class="sidebar">
        <div class="module-classify">
          <header 
            class="class-title classify"
            @click="toggleSidebar"
          >
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
          <li style="list-style: none;" v-for="(news, index) in newsItems" :key="news.id" :class="['news-item', 'clearfix', index % 2 === 0 ? 'odd' : 'even']">
            <a :href="news.url" target="_blank" class="clearfix">
              <div class="news-item-box">
                <div class="news-img">
                  <img :src="news.imageUrl" :alt="news.title" :title="news.title" class="t-img" loading="lazy">
                  <div class="dummy"></div>
                </div>

                <div class="news-con-wrapper">
                  <div class="news-time">
                    <time>{{ news.date }}</time>
                    <div class="news-icon"><span></span></div>
                  </div>
                  
                  <div class="news-con">
                    <p class="news-title">
                      <i class="staFun" v-if="news.isTop">顶</i>
                      <i class="staFun" v-if="news.isRecommended">荐</i>
                      {{ news.title }}
                    </p>
                    <p class="news-desc" :title="news.description">{{ news.description }}</p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- 状态和数据 ---
const newsData = [
  { id: 1, date: '06-27', title: '2022年6月深圳国际礼品展', url: '/cn/NewsDetail/3339327.html', imageUrl: '//img.wds168.cn/comdata/83627/202206/20220627102336cdc434.jpg', description: '展览会新闻详情概要...', isTop: true, isRecommended: true, categoryId: 1 },
  { id: 2, date: '10-18', title: '2021年9月深圳跨境电商展', url: '/cn/NewsDetail/2923608.html', imageUrl: '//img.wds168.cn/comdata/83627/202110/2021101814173862ad52.jpg', description: '电商展会详情概要...', isTop: true, isRecommended: false, categoryId: 1 },
  { id: 3, date: '08-09', title: '“乘风破浪，鹰击长空”--贝诗沃德团建活...', url: '/cn/NewsDetail/2773923.html', imageUrl: '//img.wds168.cn/comdata/83627/202108/2021080917382085146e.jpg', description: '公司团建活动详情...', isTop: true, isRecommended: false, categoryId: 2 },
  { id: 4, date: '02-12', title: '我们正式开工拉！', url: '/cn/NewsDetail/3135282.html', imageUrl: '//img.wds168.cn/comdata/83627/202202/202202121056260acd3c.jpg', description: '节后开工大吉...', isTop: false, isRecommended: false, categoryId: 2 },
  { id: 5, date: '07-22', title: '2021新款挂脖耳机', url: '/cn/NewsDetail/2743523.html', imageUrl: '//img.wds168.cn/comdata/83627/202107/20210722103853ff97d0.jpg', description: '新产品发布介绍...', isTop: false, isRecommended: true, categoryId: 3 },
  { id: 6, date: '04-30', title: '2021.4月广交会', url: '/cn/NewsDetail/2593608.html', imageUrl: '//img.wds168.cn/comdata/84470/202104/20210430092526c5f855.jpg', description: '参加广交会信息...', isTop: false, isRecommended: false, categoryId: 1 },
];

const categories = [
  { id: 0, name: '全部' },
  { id: 1, name: '展会活动' },
  { id: 2, name: '公司动态' },
  { id: 3, name: '产品发布' },
];

const activeCategoryId = ref(0);
const isSidebarOpen = ref(true); // 默认在大屏时展开
const isMobile = ref(false);     // 跟踪当前是否为移动视图

// --- 方法和计算属性 ---

const newsItems = computed(() => {
  if (activeCategoryId.value === 0) {
    return newsData;
  }
  return newsData.filter(news => news.categoryId === activeCategoryId.value);
});

const setActiveCategory = (id) => {
  activeCategoryId.value = id;
  // 在移动端选择分类后，自动收起侧边栏
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};

const toggleSidebar = () => {
  // 只有在移动端时才允许切换收缩状态
  if (isMobile.value) {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
};

// 检查屏幕大小，判断是否为移动端
const checkMobile = () => {
  // 假设 768px 是移动端的断点
  isMobile.value = window.innerWidth <= 768;
  // 调整侧边栏的默认状态：大屏展开，小屏收起
  if (!isMobile.value) {
    isSidebarOpen.value = true;
  } else if (isMobile.value && activeCategoryId.value === 0) {
    // 首次进入移动端时收起
    isSidebarOpen.value = false;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
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
  cursor: default; /* 大屏时标题不可点 */
}
.sidebar .class-title-icon {
  display: none; /* 大屏时隐藏箭头 */
}
.module-classify {
  border: 1px solid #eee;
  padding: 15px;
}

/* 右侧新闻列表（大屏默认样式） */
.news-list-area {
  flex: 1;
}
.news-container{
  padding: 0;
}

.news-item a {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s;
}

.news-item-box {
  display: flex; /* 大屏：内容和图片左右排列 */
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
  order: 2; /* 大屏时图片在右侧 (默认) */
}

.news-con-wrapper .news-time {
  flex-shrink: 0; /* 时间区域不压缩 */
  width: 80px;
  text-align: center;
  margin-right: 20px;
  order: 1; /* 大屏时时间在内容左侧 */
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
.class-title-text { font-size: 18px; font-weight: bold; color: #333; }
.one-classify li { list-style: none; padding: 10px 0; cursor: pointer; border-bottom: 1px dashed #eee; color: #666; transition: color 0.3s; }
.one-classify li:hover, .one-classify li.active { color: #0056b3; font-weight: bold; }
.news-item { border-bottom: 1px solid #eee; padding: 20px 0; }
.news-time time { display: block; font-size: 24px; font-weight: bold; color: #0056b3; }
.news-title { font-size: 16px; font-weight: bold; color: #333; margin: 0 0 5px 0; display: flex; align-items: center; }
.news-desc { font-size: 14px; color: #666; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; height: 40px; }
.staFun { display: inline-block; font-style: normal; font-size: 12px; color: #fff; background-color: #ff4500; padding: 2px 5px; border-radius: 3px; margin-right: 8px; line-height: 1; }
.news-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
.news-item a:hover .news-img img { transform: scale(1.05); }

/* --- 移动端优化 (Media Query) --- */
@media (max-width: 768px) {
  .main-content-grid {
    flex-direction: column; 
    gap: 15px;
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
    transition: transform 0.3s ease; /* 为箭头添加旋转动画 */
    transform: rotate(90deg); /* 默认箭头向右 (icon-down) */
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
    height: 150px;
    margin-bottom: 15px;
    order: 1; /* 图片在上方 */
  }
  .news-con-wrapper {
    order: 2; /* 内容在下方 */
    width: 100%;
    display: flex; /* 时间和内容左右排列 */
    align-items: flex-start;
    gap: 15px;
  }
  .news-con-wrapper .news-time {
    margin-right: 0;
  }
  
  /* --- 侧边栏下拉动画 (使用 max-height) --- */
  /* 正在进入/离开过渡期间（应用过渡效果） */
  .sidebar-slide-enter-active,
  .sidebar-slide-leave-active {
    transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
    overflow: hidden;
  }

  /* 动画开始时的状态 (隐藏/收缩) */
  .sidebar-slide-enter-from {
    max-height: 0;
    opacity: 0;
  }

  /* 动画结束时的状态 (隐藏/收缩) */
  .sidebar-slide-leave-to {
    max-height: 0;
    opacity: 0;
  }

  /* 动画进入的结束状态/离开的初始状态 (展开) */
  /* 必须设置一个足够大的值来适应内容高度 */
  .sidebar-slide-enter-to,
  .sidebar-slide-leave-from {
    max-height: 300px; /* 假设分类列表最大高度不会超过 300px */
    opacity: 1;
  }
}
</style>