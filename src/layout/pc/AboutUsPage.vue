<template>
  <div>
    <div class="section-header-company-profile">
      <h2 class="section-title-company-profile">{{ $t('aboutUs.title') }}</h2>
      <div class="section-divider"></div>
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
                <span class="class-title-icon icon iconfont" :class="isMobileMenuOpen ? 'icon-jian' : 'icon-jia'">
                  {{ isMobileMenuOpen ? '▲' : '▼' }}
                </span>
              </header>
              <ul class="one-classify mobile-menu" :class="{ 'open': isMobileMenuOpen }">
                <li v-for="item in menuItems" :key="item.id" class="main-class-item"
                  @click="selectMenuItem(item.id);">
                  <div class="main-class-link" :class="{ 'main-class-link-active': item.id === currentId }">
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
                <div v-if="currentId === 4" class="timeline-wrapper">
                  <div v-for="(item, index) in currentContent.timelineData" :key="index" class="timeline-item">
                    <div class="timeline-line"></div>
                    <div class="timeline-dot"></div>
                    <div class="timeline-box">
                      <div class="timeline-year">{{ item.year }}</div>
                      <div class="timeline-desc">{{ item.desc }}</div>
                    </div>
                  </div>
                </div>

                <template v-else>
                  <p v-for="(paragraph, index) in contentParagraphs" :key="index" class="content-paragraph"
                    v-html="paragraph"></p>
                </template>

                <p v-if="currentContent.image" v-for="img in currentContent.image" :key="img">
                  <img :src="img" :alt="currentContent.title + ' Image'" class="content-image" />
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
import companyImg from '@/assets/images/aboutUs/company.jpg'
import companyFactoryImg from '@/assets/images/aboutUs/companyFactory.jpg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const menuTitle = ref('ABOUT US');

const menuItems = computed(() => [
  { id: 1, text: t('aboutUs.menu.CompanyProfile'), link: '#', target: '_self' },
  { id: 2, text: t('aboutUs.menu.VisionAndMission'), link: '#', target: '_self' },
  { id: 3, text: t('aboutUs.menu.CoreValue'), link: '#', target: '_self' },
  { id: 4, text: t('aboutUs.menu.DevelopmentCourse'), link: '#', target: '_self' },
  { id: 5, text: t('aboutUs.menu.RAD'), link: '/pc/company-profile', target: '_self' },
  { id: 6, text: t('aboutUs.menu.GlobalLayout'), link: '/pc/Market-layout', target: '_self' },
]);

const currentId = ref(1);

const CONTENT_DATA = computed(() => ({
  1: {
    title: t('aboutUs.companyProfile.title'),
    html: `<p>${t('aboutUs.companyProfile.firstParagraph')}</p><p>${t('aboutUs.companyProfile.secondParagraph')}</p>`,
    image: [companyImg, companyFactoryImg]
  },
  2: {
    title: t('aboutUs.VisionAndMission.title'),
    html: `<p>${t('aboutUs.VisionAndMission.firstParagraph')}</p><p>${t('aboutUs.VisionAndMission.secondParagraph')}</p>`,
    image: null,
  },
  3: {
    title: t('aboutUs.CoreValue.title'),
    html: `
      <p>${t('aboutUs.CoreValue.firstParagraph')}</p>
      <p>${t('aboutUs.CoreValue.secondParagraph')}</p>
      <p>${t('aboutUs.CoreValue.thirdParagraph')}</p>
      <p>${t('aboutUs.CoreValue.fourthParagraph')}</p>
    `,
    image: null,
  },
  4: {
    title: t('aboutUs.menu.DevelopmentCourse'),
    // 这里将原来的 HTML 改为结构化数据，方便渲染时间轴
    timelineData: [
      { year: t('aboutUs.DevelopmentCourse.firstDate'), desc: t('aboutUs.DevelopmentCourse.firstParagraph') },
      { year: t('aboutUs.DevelopmentCourse.secondDate'), desc: t('aboutUs.DevelopmentCourse.secondParagraph') },
      { year: t('aboutUs.DevelopmentCourse.thirdDate'), desc: t('aboutUs.DevelopmentCourse.thirdParagraph') },
      { year: t('aboutUs.DevelopmentCourse.fourthDate'), desc: t('aboutUs.DevelopmentCourse.fourthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.fifthDate'), desc: t('aboutUs.DevelopmentCourse.fifthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.sixthDate'), desc: t('aboutUs.DevelopmentCourse.sixthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.seventhDate'), desc: t('aboutUs.DevelopmentCourse.seventhParagraph') },
      { year: t('aboutUs.DevelopmentCourse.eighthDate'), desc: t('aboutUs.DevelopmentCourse.eighthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.ninthDate'), desc: t('aboutUs.DevelopmentCourse.ninthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.tenthDate'), desc: t('aboutUs.DevelopmentCourse.tenthParagraph') },
    ],
  }
}))

const currentContent = computed(() => {
  const id = currentId.value;
  return CONTENT_DATA.value[id] || CONTENT_DATA.value[1];
});

const contentParagraphs = computed(() => {
  if (!currentContent.value.html) return [];
  return currentContent.value.html.split(/<\/p>\s*<p>/i)
    .map(p => p.replace(/<p>|<\/p>|<br>/gi, '').trim())
    .filter(p => p.length > 0);
});

const selectMenuItem = (id) => {
  if (id === 5) { window.location.href = '/pc/company-profile'; return; }
  if (id === 6) { window.location.href = '/pc/Market-layout'; return; }
  currentId.value = id;
  isMobileMenuOpen.value = false;
};

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value; };

const currentTitle = computed(() => {
  const activeItem = menuItems.value.find(item => item.id === currentId.value);
  return activeItem ? activeItem.text : menuTitle.value;
});
</script>

<style scoped>
/* --- 新增：发展历程时间轴样式 --- */
.timeline-wrapper {
  padding: 20px 0 20px 10px;
}

.timeline-item {
  position: relative;
  display: flex;
  padding-bottom: 40px;
}

.timeline-line {
  position: absolute;
  left: 7px;
  top: 15px;
  bottom: 0;
  width: 1px;
  background-color: #e4e7ed;
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-dot {
  position: absolute;
  left: 0;
  width: 15px;
  height: 15px;
  background-color: #fff;
  border: 2px solid #0095d7;
  border-radius: 50%;
  z-index: 1;
}

.timeline-box {
  margin-left: 35px;
  margin-top: -3px;
}

.timeline-year {
  font-size: 18px;
  font-weight: bold;
  color: #0095d7;
  line-height: 1;
  margin-bottom: 8px;
}

.timeline-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* --- 原有样式保持不变 --- */
.section-header-company-profile {
  text-align: left;
  margin-bottom: 30px;
  background-image: url('@/assets/images/公司简介.jpg');
  background-size: cover;
  background-position: center center;
  padding: 100px 100px;
  box-sizing: border-box;
  max-width: 100% !important;
  color: white;
}
.section-divider {
  width: 80px;
  background-color: var(--primary-color);
  margin: 0 auto;
}
@media (max-width: 768px) {
  .section-header-company-profile {
    height: 200px;
    padding: 60px 20px;
    background-position: center 30%;
  }
  .section-title-company-profile {
    font-size: 2rem;
  }
}
.page-container {
  margin-top: 10px;
}
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
.module-sub-container {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 768px) {
  .sidebar-container { flex-basis: 25%; max-width: 25%; padding-right: 20px; }
  .content-container { flex-basis: 75%; max-width: 75%; padding-left: 20px; }
  .sidebar-mobile { display: none; }
}
@media (max-width: 767px) {
  .sidebar-container, .content-container { flex-basis: 100%; max-width: 100%; padding-right: 0; padding-left: 0; }
  .sidebar-pc { display: none; }
}
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
.one-classify { list-style: none; padding: 0; margin: 0; }
.main-class-item { border-bottom: 1px dashed #eee; cursor: pointer; }
.main-class-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  text-decoration: none;
  color: #666;
  transition: color 0.3s, padding-left 0.3s;
}
.main-class-link-active { color: #0095d7; padding-left: 10px; }
.main-class-item:hover .main-class-link,
.main-class-item.active .main-class-link { color: #0095d7; padding-left: 10px; }
.main-class-icon { font-weight: bold; color: #ccc; font-size: 12px; }
.main-class-item.active .main-class-icon { color: #0095d7; }
.sidebar-mobile { margin-bottom: 20px; }
.mobile-header {
  cursor: pointer;
  background-color: #f7f7f7;
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 0;
  border-bottom: none;
}
.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  border: 1px solid #eee;
  border-top: none;
}
.mobile-menu.open { max-height: 500px; }
.mobile-menu .main-class-item .main-class-link { padding: 10px 15px; background-color: #fff; }
.mobile-header .class-title-icon { font-size: 20px; font-weight: 900; }
.content-header { padding-bottom: 15px; border-bottom: 1px solid #eee; }
.content-main-title { font-size: 24px; color: #333; font-weight: 600; }
.content-text-body { padding-top: 10px; min-height: 500px; }
.content-paragraph { line-height: 1.8; font-size: 14px; color: rgb(63, 63, 63); margin-bottom: 1.5em; }
.content-image { max-width: 100%; height: auto; display: block; margin: 20px 0; }
</style>