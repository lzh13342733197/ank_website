<template>
  <header class="header-container">
    <div class="header-content">

      <div class="nav-item nav-logo">
        <a href="/" class="logo-link">
          <img src="/ankbit.png" alt="Company Logo" class="logo-image">
        </a>
      </div>

      <nav class="nav-item nav-main-menu menu-pc">
        <div v-for="menu in menus" :key="menu.id" class="main-nav-group" @mouseenter="openSubMenu(menu.id)"
          @mouseleave="closeSubMenu(menu.id)">
          <a :href="menu.url" class="main-nav-link" :class="{ 'is-active': menu.isActive }">
            {{ menu.name }}
          </a>
          <ul v-if="menu.children && menu.children.length" class="sub-nav-group"
            :class="{ 'is-open': activeSubMenuId === menu.id }">
            <li v-for="sub in menu.children" :key="sub.url">
              <a v-if="sub.imageUrl" :href="sub.url" class="sub-nav-link"
                :class="{ 'is-active': isPathMatch(sub.url) }">
                <div style="display: flex; align-items: center;">
                  <img :src="sub.imageUrl" alt="Category Image" class="category-image">
                  <div style="min-width: 150px;">
                    {{ sub.name }}
                  </div>
                </div>
              </a>
              <a v-else :href="sub.url" class="sub-nav-link" :class="{ 'is-active': isPathMatch(sub.url) }">
                {{ sub.name }}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="nav-item nav-toolbar">

        <div class="tools-pc">
          <div class="lang-switch" @mouseenter="isMobileLangOpen = true" @mouseleave="isMobileLangOpen = false">
            <div class="lang-switch-border">
              {{ currentLang === 'zh' ? 'Chinese' : 'English' }}
              <span class="arrow-icon">{{ isMobileLangOpen ? '▲' : '▼' }}</span>
              <ul v-if="isMobileLangOpen" class="mobile-lang-list">
                <li @click.stop="setLang('zh')" :class="{ 'active': currentLang === 'zh' }">Chinese</li>
                <li @click.stop="setLang('en')" :class="{ 'active': currentLang === 'en' }">English</li>
              </ul>
            </div>
          </div>
          <div class="search-box" @click="isSearchExpanded = true; isMobileMenuOpen = false">
            <input type="text" :placeholder="t('navigationBar.pleaseInputKeyword')" class="search-input"
              @keydown.enter.prevent>
            <div :class="[styles.navigationBarItem, 'search-container']"
              style="color: white; text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;">
              <SvgIcon :name="`search`" size="25" color="white" style="filter: drop-shadow(0 0 1px black); ">
              </SvgIcon>
            </div>
          </div>
        </div>

        <div class="tools-mobile">
          <div class="mobile-lang-switch" @click="toggleMobileLang" @mouseleave="isMobileLangOpen = false">
            {{ currentLang === 'zh' ? 'Chinese' : 'English' }}
            <span class="arrow-icon">{{ isMobileLangOpen ? '▲' : '▼' }}</span>
            <ul v-if="isMobileLangOpen" class="mobile-lang-list">
              <li @click.stop="setLang('zh')" :class="{ 'active': currentLang === 'zh' }">Chinese</li>
              <li @click.stop="setLang('en')" :class="{ 'active': currentLang === 'en' }">English</li>
            </ul>
          </div>
          <button class="hamburger-btn" @click="toggleMobileMenu">
            <span class="hamburger-icon">☰</span>
          </button>

        </div>
      </div>
      <SearchModal :is-visible="isSearchExpanded" @close="closeSearch" @select="handleSearchSelect"
        @open="isSearchExpanded = true" />
    </div>

    <el-drawer v-model="isMobileMenuOpen" direction="rtl" size="50%" :with-header="false" class="custom-drawer">
      <div class="mobile-drawer-inner">
        <div class="drawer-logo">
          <img src="/ankbit.png" alt="Company Logo" style="height: 40px;">
        </div>

        <nav class="mobile-nav-list">
          <a v-for="menu in menus" :key="menu.id" :href="menu.url" class="mobile-nav-link"
            :class="{ 'is-active': menu.isActive }" @click="isMobileMenuOpen = false">
            {{ menu.name }}
          </a>
        </nav>

        <div class="mobile-search-box" @click="isSearchExpanded = true; isMobileMenuOpen = false">
          <input type="text" :placeholder="t('navigationBar.pleaseInputKeyword')" class="search-input"
            @keydown.enter.prevent>
          <div :class="[styles.navigationBarItem, 'search-container']" class=""
            style="color: white; text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;">
            <SvgIcon :name="`search`" size="25" color="white" style="filter: drop-shadow(0 0 1px black); ">
            </SvgIcon>
          </div>
        </div>
      </div>
    </el-drawer>

  </header>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchModal from './search-modal.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import styles from './pc.module.less'
import { setLanguage } from '@/locales'
import { useI18n } from 'vue-i18n'
import { useFetchWithLanguage } from '@/utils/http'
const { t, locale } = useI18n()

const menus = computed(() => {
  const currentPath = route.path;
  const menuList = [
    { id: 1, name: t('navigationBar.Home'), url: '/home' },
    {
      id: 2, name: t('navigationBar.AboutUs'), url: '/AboutUs/CompanyProfile', children: [
        { id: 1, name: t('aboutUs.menu.CompanyProfile'), url: '/AboutUs/CompanyProfile' },
        { id: 5, name: t('aboutUs.menu.RAD'), url: '/AboutUs/patent' },
        { id: 6, name: t('aboutUs.Credentials'), url: '/AboutUs/Credentials' },
        { id: 4, name: t('aboutUs.menu.DevelopmentCourse'), url: '/AboutUs/DevelopmentCourse' },
        { id: 3, name: t('aboutUs.menu.CoreValue'), url: '/AboutUs/CoreValue' },
      ]
    },
    { id: 3, name: t('navigationBar.Products'), url: `/ProductCenter?categoryId=${categoryList.value[0]?.id}` },
    { id: 4, name: t('navigationBar.News'), url: '/NewsList' },
    { id: 6, name: t('navigationBar.Contact'), url: '/Contact_us' },
  ];

  return menuList.map(menu => {
    menu.url = menu.url.split('?')[0]
    let isMatch = menu.url === currentPath;
    if (!isMatch && menu.children) {
      isMatch = menu.children.some(child => child.url === currentPath || child.url.split('?')[0] === currentPath);
    }
    return { ...menu, isActive: isMatch };
  });
});

const isSearchExpanded = ref(false)
const closeSearch = () => { isSearchExpanded.value = false }
const handleSearchSelect = (result: any) => { console.log('Selected search result:', result) }
const activeSubMenuId = ref<number | null>(null)
const isMobileMenuOpen = ref(false)
const isMobileLangOpen = ref(false)
const currentLang = ref(import.meta.env.SSR ? null : localStorage.getItem('appLanguage') || 'Chinese')

const route = useRoute()

const openSubMenu = (id: number) => { activeSubMenuId.value = id }
const closeSubMenu = (id: number) => { activeSubMenuId.value = null }
const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }
const toggleMobileLang = () => { isMobileLangOpen.value = !isMobileLangOpen.value }

const setLang = (lang: string) => {
  currentLang.value = lang
  setLanguage(lang)
  isMobileLangOpen.value = false
}
const isPathMatch = (menuUrl: string) => { return route.fullPath === menuUrl }
const categoryList = ref<any[]>([])

onMounted(async () => {
  await getCategory()
})

const getCategory = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
    {},
  )
  categoryList.value = [...data]
  if (menus.value[2]) {
    menus.value[2].children = categoryList.value.map(item => ({
      url: `/ProductCenter?categoryId=${item.id}`,
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl
    }))
  }
}

watch(locale, () => {
  getCategory()
})
</script>

<style scoped>
.header-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.logo-image {
  height: 60px;
  width: auto;
}

.menu-pc {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;
}

.main-nav-group {
  position: relative;
  padding: 0 15px;
  cursor: pointer;
}

.main-nav-link {
  white-space: nowrap;
  display: block;
  padding: 15px 0;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.main-nav-link:hover,
.main-nav-link.is-active {
  color: #0095d7;
}

.is-active {
  color: #0095d7 !important;
}

.sub-nav-group {
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #eee;
  min-width: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1010;
}

.sub-nav-group.is-open {
  display: block;
}

.sub-nav-link {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #666;
}

.sub-nav-link:hover {
  background-color: #f5f5f5;
  color: #0095d7;
}

.category-image {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.nav-toolbar {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.tools-pc {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-switch {
  position: relative;
}

.lang-switch-border {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 9px;
  cursor: pointer;
  display: flex;
  width: 100px;
  justify-content: space-around;
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
}

.search-input {
  border: none;
  outline: none;
  width: 120px;
}

.mobile-drawer-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-logo {
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #eee;
}

.mobile-nav-list {
  margin-top: 10px;
}

.mobile-nav-link {
  display: block;
  padding: 15px 0;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #f9f9f9;
  font-size: 16px;
}

.mobile-nav-link.is-active {
  color: #0095d7;
  font-weight: bold;
}

.mobile-search-box {
  margin-top: 20px;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
  justify-content: center;
  align-items: center;
}

.mobile-search-box .search-input {
  flex: 1;
  padding: 8px;
  border: none;
}

.tools-mobile {
  display: none;
  align-items: center;
  gap: 15px;
}

.hamburger-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.mobile-lang-switch {
  position: relative;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.mobile-lang-list {
  position: absolute;
  width: 100%;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 5px 0;
  margin-top: 0; /* 贴合边框 */
  z-index: 1020;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.mobile-lang-list li {
  padding: 8px 10px;
  color: #333;
}
.active {
  background-color: #f5f5f5;
  color: #0095d7 !important;
}

.mobile-lang-list li:hover {
  background-color: #f5f5f5;
  color: #0095d7;
}

@media (max-width: 992px) {
  .menu-pc, .tools-pc { display: none !important; }
  .tools-mobile { display: flex; }
}

@media (min-width: 993px) {
  .menu-pc, .tools-pc { display: flex; }
  .tools-mobile { display: none !important; }
  .search-input { width: 80px; }
}
</style>