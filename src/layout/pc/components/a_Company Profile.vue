<template>
  <div class="page-container BodyCenter clearfix">
    <div class="module-grid-container">
      <div class="row module-sub-container">

        <div class="sidebar-container">

          <div class="sidebar-pc">
            <header class="class-title">
              <span class="class-title-text">{{ props.menuTitle }}</span>
              <span class="class-title-icon iconfont icon-jiantou1">></span>
            </header>
            <ul class="one-classify">
              <li v-for="item in props.menuItems" :key="item.id" class="sidebar-item"
                :class="['main-class-item', { 'active': item.id === props.currentId }]">
                <a class="main-class-text" :href="item.link" :target="item.target">{{ item.text }}</a>
                <span class="main-class-icon iconfont icon-jiantou1">></span>
              </li>
            </ul>
          </div>

          <div class="sidebar-mobile" @click="toggleMobileMenu">
            <header class="class-title mobile-header" :class="{ 'expanded': isMobileMenuOpen }">
              <span class="main-class-text">{{ currentTitle }}</span>
              <span class="class-title-icon icon iconfont" :class="isMobileMenuOpen ? 'icon-jian' : 'icon-jia'">{{
                isMobileMenuOpen ? '-' : '+' }}</span>
            </header>
            <ul class="one-classify mobile-menu" :class="{ 'open': isMobileMenuOpen }">
              <li v-for="item in props.menuItems" :key="item.id" class="main-class-item">
                <a :dataid="item.id" :href="item.link" :target="item.target">
                  <span class="main-class-text">{{ item.text }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="content-container">

          <div class="module-item content-header">
            <p class="content-main-title">{{ props.contentTitle }}</p>
          </div>

          <div class="module-item content-body">
            <div class="content-text-body">
              <p v-for="(paragraph, index) in contentParagraphs" :key="index" class="content-paragraph"
                v-html="paragraph"></p>

              <p v-if="props.contentImage">
                <img :src="props.contentImage" alt="Content Image" class="content-image" />
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  // 导航数据
  menuTitle: { type: String, default: 'ABOUT US' },
  menuItems: {
    type: Array,
    default: () =>
      [
        { id: 1, text: 'Company Profile', link: '/Content/504098.html', target: '_self' },
        { id: 2, text: 'Vision and Mission', link: '/Content/505035.html', target: '_self' },
        { id: 3, text: 'Core Value', link: '/Content/505036.html', target: '_self' },
        { id: 4, text: 'Development Course ', link: '/Content/885465.html', target: '_self' },
      ]
  },
  currentId: { type: [Number, String], default: 1 }, // 当前激活的菜单项 ID

  // 内容数据
  contentTitle: { type: String, default: 'COMPANY OVERVIEW' },
  contentHtml: {
    type: String, default:
      `
<p>SHENZHEN BASSWORLD TECHNOLOGY (KO-STAR) is a leading noise cancelling technology expert and professional audio manufacturer. With 16 years experience in headphones and speakers, our product lines include: high performance wieless noise cancelling headphones, ture wireless headphones, Bluetooth headphones. We have in-house design, tooling, injection, moulding, dynamic drivers development and manufacture, assembling and advanced quality assurance testing. The total factory area is 6000 square meters and there are more than 200 skilled workers.</p>
<p>Being a partner of world famous brands, our talented designers and 6 experienced engineers develop 7-9 new models every year, most of them are trend-setting and selected by famous brands. We obtained 32 patents for our invention by 2017.</p>
<p>Our factory is ISO9001:2015 certificated. And it is BSCI and WAL-MART audit approved. Our products are CE, ROHS, PAH, LFGB, SCCP, FCC, CED CA65 compliant for different markets. With standard modern quality control system and no-compromise-on-quality attitude, we enjoy good reputation in world market for KO-STAR quality and competitive price.</p>
`
  },
  contentImage: { type: String, default: '//img.wds168.cn/comdata/84470/201906/20190624101343a29116.jpg' },
});

// 计算属性：将 HTML 内容按段落分割，以便 V-for 渲染
const contentParagraphs = computed(() => {
  return props.contentHtml.split(/<\/p>\s*<p>/i)
    .map(p => p.replace(/<p>|<\/p>|<br>/gi, '').trim())
    .filter(p => p.length > 0);
});

// 移动端菜单状态
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 计算当前激活的标题，用于移动端头部展示
const currentTitle = computed(() => {
  const activeItem = props.menuItems.find(item => item.id === props.currentId);
  return activeItem ? activeItem.text : props.menuTitle;
});
</script>

<style scoped>
.page-container {
  margin-top: 10px;
}

/* PC/Mobile 断点定义为纯 CSS 值 */
/* 768px 是常见的平板/PC分界线 */
.BodyCenter {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
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

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-class-item {
  border-bottom: 1px dashed #eee;
}

.main-class-item a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  text-decoration: none;
  color: #666;
  transition: color 0.3s, padding-left 0.3s;
}

.main-class-item:hover a,
.main-class-item.active a {
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

.mobile-menu .main-class-item a {
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
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.content-main-title {
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.content-text-body {
  padding-top: 10px;
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