<template>
  <div class="page-container BodyCenter clearfix">
    <div class="module-grid-container">
      <div class="row module-sub-container">
        <div class="sidebar-container">
          <div class="sidebar-pc">
            <header class="class-title">
              <span class="class-title-text">{{ t('navigationBar.AboutUs') }}</span>
              <span class="class-title-icon iconfont icon-jiantou1">></span>
            </header>
            <ul class="one-classify">
              <li v-for="item in menuItems" :key="item.id" class="main-class-item"
                :class="{ 'active': isPathActive(item) }" @click="goTo(item)">
                <div class="main-class-link">
                  <span class="main-class-text">{{ item.text }}</span>
                  <span class="main-class-icon iconfont icon-jiantou1">></span>
                </div>
              </li>
            </ul>
          </div>

          <div class="sidebar-mobile">
            <header class="class-title mobile-header" :class="{ 'expanded': isMobileMenuOpen }"
              @click="isMobileMenuOpen = !isMobileMenuOpen">
              <span class="main-class-text">{{ currentTitle }}</span>
              <span class="class-title-icon icon iconfont">
                {{ isMobileMenuOpen ? '▲' : '▼' }}
              </span>
            </header>
            <ul class="one-classify mobile-menu" :class="{ 'open': isMobileMenuOpen }">
              <li v-for="item in menuItems" :key="item.id" class="main-class-item" @click="goTo(item)">
                <div class="main-class-link" :class="{ 'main-class-link-active': isPathActive(item) }">
                  <span class="main-class-text">{{ item.text }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="content-container">
          <div class="module-item content-header">
            <div class="content-main-title">{{ currentTitle }}</div>
          </div>
          <div  style="width: 100%;">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const isMobileMenuOpen = ref(false);

const menuItems = computed(() => [
  { id: 1, text: t('aboutUs.menu.CompanyProfile'), path: '/AboutUs/CompanyProfile' },
  { id: 5, text: t('aboutUs.menu.RAD'), path: '/AboutUs/patent' },
  { id: 3, text: t('aboutUs.menu.Awards'), path: '/AboutUs/Awards' },
  { id: 6, text: t('aboutUs.Credentials'), path: '/AboutUs/Credentials' },
  { id: 4, text: t('aboutUs.menu.DevelopmentCourse'), path: '/AboutUs/DevelopmentCourse' },
  // { id: 3, text: t('aboutUs.menu.CoreValue'), path: '/AboutUs/CoreValue' },
]);

const currentTitle = computed(() => {
  const activeItem = menuItems.value.find(item => route.path.includes(item.path));
  return activeItem ? activeItem.text : '';
});

const isPathActive = (item) => route.path.includes(item.path);

const goTo = (item) => {
  router.push(item.path);
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
/* 引用你提供的全部公共 CSS 样式 */
.page-container {
  margin-top: 10px;
}

.BodyCenter {
  max-width: 1200px;
  margin: 30px auto;
  width: 95%;
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

.main-class-item {
  border-bottom: 1px dashed #eee;
  cursor: pointer;
}

.main-class-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  text-decoration: none;
  color: #666;
  transition: all 0.3s;
}

.main-class-item:hover .main-class-link,
.active .main-class-link {
  color: #0095d7;
  padding-left: 10px;
}

.main-class-link-active {
  color: #0095d7 !important;
  padding-left: 10px;
}

@media (min-width: 768px) {
  .sidebar-container {
    flex-basis: 25%;
    padding-right: 20px;
  }

  .content-container {
    flex-basis: 75%;
    padding-left: 20px;
  }

  .sidebar-mobile {
    display: none;
  }
}

@media (max-width: 767px) {

  .sidebar-container,
  .content-container {
    flex-basis: 100%;
  }

  .sidebar-pc,
  .content-header {
    display: none;
  }

  .mobile-header {
    background-color: #f7f7f7;
    padding: 15px;
    border: 1px solid #eee;
  }

  .mobile-menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
    border: 1px solid #eee;
    border-top: none;
  }

  .mobile-menu.open {
    max-height: 500px;
  }
}

.content-main-title {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
</style>