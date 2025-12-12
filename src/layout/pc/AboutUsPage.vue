<template>
  <div>
    <div style="width: 100%; display: flex; justify-content: center;">
      <img src="http://img.wds168.cn/comdata/83627/202410/20241023113633996389.jpg" alt="Content Image"
        class="top-banner-image" />
    </div>

    <div class="page-container BodyCenter clearfix">
      <div class="module-grid-container">
        <div class="row module-sub-container">

          <div class="sidebar-container">

            <div class="sidebar-pc">
              <header class="class-title">
                <span class="class-title-text">{{ menuTitle }}</span>
                <span class="class-title-icon iconfont icon-jiantou1">></span>
              </header>
              <ul class="one-classify">
                <li v-for="item in menuItems" :key="item.id" class="main-class-item"
                  :class="{ 'active': item.id === currentId }" @click="selectMenuItem(item.id)">
                  <div class="main-class-link">
                    <span class="main-class-text">{{ item.text }}</span>
                    <span class="main-class-icon iconfont icon-jiantou1">></span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="sidebar-mobile">
              <header class="class-title mobile-header" :class="{ 'expanded': isMobileMenuOpen }"
                @click="toggleMobileMenu">
                <span class="main-class-text">{{ currentTitle }}</span>
                <span class="class-title-icon icon iconfont" :class="isMobileMenuOpen ? 'icon-jian' : 'icon-jia'">{{
                  isMobileMenuOpen ? '⋁' : '⋀' }}</span>
              </header>
              <ul class="one-classify mobile-menu" :class="{ 'open': isMobileMenuOpen }">
                <li v-for="item in menuItems" :key="item.id" class="main-class-item"
                  @click="selectMenuItem(item.id);">
                  <div class="main-class-link">
                    <span class="main-class-text">{{ item.text }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="content-container">

            <div class="module-item content-header">
              <div class="content-main-title">{{ currentContent.title }}</div>
            </div>

            <div class="module-item content-body">
              <div class="content-text-body">
                <p v-for="(paragraph, index) in contentParagraphs" :key="index" class="content-paragraph"
                  v-html="paragraph"></p>

                <p v-if="currentContent.image">
                  <img :src="currentContent.image" :alt="currentContent.title + ' Image'" class="content-image" />
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- 1. 内部状态管理 ---
// 导航标题
const menuTitle = ref('ABOUT US');

// 导航菜单项 (MenuItems)
const menuItems = ref([
  { id: 1, text: 'Company Profile', link: '#', target: '_self' },
  { id: 2, text: 'Vision and Mission', link: '#', target: '_self' },
  { id: 3, text: 'Core Value', link: '#', target: '_self' },
  { id: 4, text: 'Development Course ', link: '#', target: '_self' },
]);

// 当前激活的菜单项 ID (内部 ref)
const currentId = ref(1);


// --- 2. 内部数据定义：所有内容的映射表 ---
const CONTENT_DATA = {
  1: { // Company Profile
    title: 'COMPANY PROFILE',
    html: `
      <p>SHENZHEN BASSWORLD TECHNOLOGY (KO-STAR) is a leading noise cancelling technology expert and professional audio manufacturer. With 16 years experience in headphones and speakers, our product lines include: high performance wireless noise cancelling headphones, ture wireless headphones, Bluetooth headphones.</p>
      <p>The total factory area is 6000 square meters and there are more than 200 skilled workers. We are ISO9001:2015 certificated, BSCI and WAL-MART audit approved.</p>
    `,
    image: '//img.wds168.cn/comdata/84470/201906/20190624101343a29116.jpg',
  },
  2: { // Vision and Mission
    title: 'VISION AND MISSION',
    html: `
      <p>Our Vision: To be the world's most trusted partner in professional audio solutions.</p>
      <p>Our Mission: To deliver exceptional sound quality and innovation, enriching the auditory experience for every user.</p>
    `,
    image: null,
  },
  3: { // Core Value
    title: 'CORE VALUE',
    html: `
      <p>1. Quality First: Uncompromising standards in manufacturing and design.</p>
      <p>2. Innovation Driven: Continuous investment in R&D, obtaining 32 patents by 2017.</p>
      <p>3. Customer Trust: Building long-term relationships through integrity and reliable service.</p>
    `,
    image: null,
  },
  4: { // Development Course
    title: 'DEVELOPMENT COURSE',
    html: `
      <p>• 2005: Company founded, focusing on OEM audio solutions.</p>
      <p>• 2010: Expanded factory size and introduced in-house driver development.</p>
      <p>• 2015: Achieved ISO9001 certification and secured major international brand partnerships.</p>
      <p>• 2024: Launched next-generation ANC (Active Noise Cancelling) technology products.</p>
    `,
    image: '//img.wds168.cn/comdata/84470/202410/20241023113633996389.jpg',
  }
};

// --- 3. 计算属性：根据 currentId 动态获取内容 ---
const currentContent = computed(() => {
  // 根据 currentId.value 查找数据，如果找不到则返回默认的 id=1 内容
  const id = currentId.value;
  return CONTENT_DATA[id] || CONTENT_DATA[1];
});


// 4. 计算属性：将 HTML 内容按段落分割 (使用 currentContent.html)
const contentParagraphs = computed(() => {
  // 注意：这里使用 currentContent.value.html
  return currentContent.value.html.split(/<\/p>\s*<p>/i)
    .map(p => p.replace(/<p>|<\/p>|<br>/gi, '').trim())
    .filter(p => p.length > 0);
});

// 5. 状态更新方法
const selectMenuItem = (id) => {
  currentId.value = id; // 直接更新内部状态
};

// 移动端菜单状态
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 计算当前激活的标题，用于移动端头部展示
const currentTitle = computed(() => {
  const activeItem = menuItems.value.find(item => item.id === currentId.value);
  return activeItem ? activeItem.text : menuTitle.value;
});
</script>

<style scoped>
/* 样式保持不变，确保了响应式布局和视觉效果 */

.page-container {
  margin-top: 10px;
}

.top-banner-image {
  max-width: 100%;
  height: auto;
}

/* PC/Mobile 断点定义为纯 CSS 值 */
.BodyCenter {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
  margin-top: 30px;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* --- 整体布局 (Flexbox) --- */
.module-sub-container {
  display: flex;
  flex-wrap: wrap;
}

/* PC 布局 (>= 768px): 侧边栏(25%) + 内容(75%) */
@media (min-width: 768px) {
  .sidebar-container {
    flex-basis: 25%;
    max-width: 25%;
    padding-right: 20px;
  }

  .content-container {
    flex-basis: 75%;
    max-width: 75%;
    padding-left: 20px;
  }

  .sidebar-mobile {
    display: none;
  }
}

/* 移动端布局 (<= 767px): 侧边栏(100%) + 内容(100%) */
@media (max-width: 767px) {

  .sidebar-container,
  .content-container {
    flex-basis: 100%;
    max-width: 100%;
    padding-right: 0;
    padding-left: 0;
  }

  .sidebar-pc {
    display: none;
  }
}

/* --- 侧边栏通用样式 --- */
.class-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding: 10px 0;
  border-bottom: 2px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.one-classify {
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-class-item {
  border-bottom: 1px dashed #eee;
  cursor: pointer;
  /* 添加指针，表示可点击 */
}

/* 链接/点击区域样式调整，使用 div.main-class-link 替代原始的 a 标签 */
.main-class-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  text-decoration: none;
  color: #666;
  transition: color 0.3s, padding-left 0.3s;
}

.main-class-item:hover .main-class-link,
.main-class-item.active .main-class-link {
  color: #e74c3c;
  padding-left: 10px;
}

.main-class-icon {
  font-weight: bold;
  color: #ccc;
  font-size: 12px;
}

.main-class-item.active .main-class-icon {
  color: #e74c3c;
}

/* --- 移动端折叠菜单样式 --- */
.sidebar-mobile {
  margin-bottom: 20px;
}

.mobile-header {
  cursor: pointer;
  background-color: #f7f7f7;
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 0;
  border-bottom: none;
}

.mobile-header .class-title-text {
  flex-grow: 1;
}

.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  border: 1px solid #eee;
  border-top: none;
}

.mobile-menu.open {
  max-height: 500px;
}

.mobile-menu .main-class-item .main-class-link {
  padding: 10px 15px;
  background-color: #fff;
}

/* 替换移动端图标为 + / - */
.mobile-header .class-title-icon {
  font-size: 20px;
  font-weight: 900;
}

/* --- 主内容区样式 --- */
.content-header {
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.content-main-title {
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.content-text-body {
  padding-top: 10px;
  min-height: 500px;
}

.content-paragraph {
  line-height: 1.8;
  font-size: 14px;
  color: rgb(63, 63, 63);
  margin-bottom: 1.5em;
}

.content-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px 0;
}
</style>