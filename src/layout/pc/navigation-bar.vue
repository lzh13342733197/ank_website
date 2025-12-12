<template>
  <header class="header-container">
    <div class="header-content">

      <div class="nav-item nav-logo">
        <a href="/cn/" class="logo-link">
          <img src="//img.wds168.cn/comdata/84470/202108/20210809163100fa244f.png" alt="Company Logo" class="logo-image">
        </a>
      </div>

      <nav class="nav-item nav-main-menu menu-pc">
        <div 
          v-for="menu in menus" 
          :key="menu.id" 
          class="main-nav-group"
          @mouseenter="openSubMenu(menu.id)"
          @mouseleave="closeSubMenu(menu.id)"
        >
          <a :href="menu.url" class="main-nav-link" :class="{ 'is-active': menu.isActive }">
            {{ menu.name }}
          </a>
          <ul v-if="menu.children && menu.children.length" class="sub-nav-group" :class="{ 'is-open': activeSubMenuId === menu.id }">
            <li v-for="sub in menu.children" :key="sub.url">
              <a :href="sub.url" class="sub-nav-link">{{ sub.name }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="nav-item nav-toolbar">
        
        <div class="tools-pc">
          <div class="lang-switch">
            <img src="//img.wds168.cn/comdata/84470/201905/201905151545264d908e.jpg" alt="中文" title="中文">
            <img src="//img.wds168.cn/comdata/84470/201905/2019051515452626c55d.jpg" alt="English" title="English">
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入关键字" class="search-input">
            <i class="search-icon">🔍</i>
          </div>
        </div>
        
        <div class="tools-mobile">
          <div class="mobile-lang-switch" @click="toggleMobileLang">
             {{ currentLang }} 
             <span class="arrow-icon">{{ isMobileLangOpen ? '▲' : '▼' }}</span>
             <ul v-if="isMobileLangOpen" class="mobile-lang-list">
                 <li @click.stop="setLang('中文')">中文</li>
                 <li @click.stop="setLang('English')">English</li>
             </ul>
          </div>
          <button class="hamburger-btn" @click="toggleMobileMenu">
            <span class="hamburger-icon">☰</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
      <a v-for="menu in menus" :key="menu.id" :href="menu.url" class="mobile-nav-link">
        {{ menu.name }}
      </a>
      <div class="mobile-search-box">
          <input type="text" placeholder="请输入关键字" class="search-input">
          <i class="search-icon">🔍</i>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ---------------------------
// 响应式数据
// ---------------------------

// 菜单数据 (根据你提供的 HTML 结构简化)
const menus = ref([
  { id: 1, name: '首页', url: '/cn/', isActive: true },
  { id: 2, name: '关于我们', url: 'AboutUs', isActive: false, 
    children: [
      { name: '公司简介', url: '/Content/505034.html' },
      { name: '愿景与使命', url: '/Content/505035.html' },
      // ... 更多子菜单
    ] 
  },
  { id: 3, name: '产品中心', url: '/cn/Content/504099.html', isActive: false },
  { id: 4, name: '新闻动态', url: 'NewsList', isActive: false },
  { id: 5, name: '加入我们', url: '/cn/Content/504533.html', isActive: false },
  { id: 6, name: '联系我们', url: '/Content/504101.html', isActive: false,
    children: [
      { name: '联系方式', url: '/Content/507451.html' },
      { name: '在线留言', url: '/Content/507453.html' },
    ]
  },
])

// PC 端下拉菜单状态
const activeSubMenuId = ref<number | null>(null)

// 移动端菜单展开状态 (汉堡包菜单)
const isMobileMenuOpen = ref(false)

// 移动端语言切换状态
const isMobileLangOpen = ref(false)
const currentLang = ref('中文')

// ---------------------------
// 方法
// ---------------------------

const openSubMenu = (id: number) => {
  activeSubMenuId.value = id
}

const closeSubMenu = (id: number) => {
  activeSubMenuId.value = null
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleMobileLang = () => {
  isMobileLangOpen.value = !isMobileLangOpen.value
}

const setLang = (lang: string) => {
    currentLang.value = lang
    isMobileLangOpen.value = false
    // 实际应用中：此处应执行语言切换逻辑，如修改 URL 或 Store 状态
}

</script>

<style scoped>
/* ==================================================
   全局布局与 Flex 容器
   ================================================== */
.header-container {
  /* 模拟原 CMS 导航栏的固定或浮动效果 */
  position: sticky; 
  top: 0;
  z-index: 1000;
  background-color: #fff; /* 默认白色背景 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* 模拟内容区域最大宽度 */
  margin: 0 auto;
  padding: 10px 20px;
}

.nav-item {
  /* 对应原 Bootstrap 栅格的宽度分配 */
  /* Logo: PC端约占 2份，菜单 7份，工具栏 3份 */
}

/* ==================================================
   1. Logo 样式
   ================================================== */
.nav-logo {
    flex-shrink: 0;
}
.logo-image {
  max-height: 40px; /* 调整 Logo 大小 */
}

/* ==================================================
   2. PC 端菜单样式 (.menu-pc)
   ================================================== */
.menu-pc {
  flex-grow: 1; /* 占据中间大部分空间 */
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
  display: block;
  padding: 15px 0;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.main-nav-link:hover, .main-nav-link.is-active {
  color: #f10215; /* 模拟hover/active 颜色 */
}

/* 下拉菜单 */
.sub-nav-group {
  position: absolute;
  top: 100%; /* 位于主菜单下方 */
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #eee;
  min-width: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: none; /* 默认隐藏 */
  z-index: 1010;
}
.sub-nav-group.is-open {
    display: block; /* 鼠标悬停时显示 */
}

.sub-nav-link {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #666;
}

.sub-nav-link:hover {
  background-color: #f5f5f5;
  color: #f10215;
}

/* ==================================================
   3. 工具栏样式 (.nav-toolbar)
   ================================================== */

.nav-toolbar {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

/* PC 端工具栏样式 */
.tools-pc {
    display: flex;
    align-items: center;
    gap: 10px;
}

.lang-switch img {
    height: 20px;
    cursor: pointer;
}

.search-box {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
}

.search-input {
    border: none;
    outline: none;
    width: 120px;
}

/* ==================================================
   4. 移动端菜单和工具栏 (.menu-mobile / .tools-mobile)
   ================================================== */
.tools-mobile {
  display: none; /* 默认在 PC 上隐藏 */
  align-items: center;
  gap: 15px;
}

.hamburger-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
}

.mobile-lang-switch {
    position: relative;
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.mobile-lang-list {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    list-style: none;
    padding: 5px 0;
    margin-top: 5px;
    z-index: 1020;
}
.mobile-lang-list li {
    padding: 5px 10px;
    white-space: nowrap;
}


/* 移动端展开的导航 (全屏或全宽) */
.mobile-menu-overlay {
    position: absolute;
    top: 100%; /* 紧接在 header-content 下方 */
    left: 0;
    width: 100%;
    background-color: #f9f9f9;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mobile-nav-link {
    display: block;
    width: 100%;
    padding: 10px 0;
    text-align: center;
    text-decoration: none;
    color: #333;
    border-bottom: 1px dashed #eee;
}

.mobile-search-box {
    width: 80%;
    margin-top: 15px;
    display: flex;
}
.mobile-search-box .search-input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
}
.mobile-search-box .search-icon {
    padding: 8px;
    background-color: #f10215;
    color: white;
    cursor: pointer;
}

/* ==================================================
   5. 响应式媒体查询 (切换 PC/Mobile 视图)
   ================================================== */

@media (max-width: 992px) {
  /* 在平板和移动设备上隐藏 PC 菜单和工具 */
  .menu-pc,
  .tools-pc {
    display: none !important;
  }
  
  /* 在平板和移动设备上显示移动端工具 */
  .tools-mobile {
    display: flex;
  }
}

@media (min-width: 993px) {
  /* 在 PC 屏幕上显示 PC 菜单和工具 */
  .menu-pc,
  .tools-pc {
    display: flex;
  }
  
  /* 在 PC 屏幕上隐藏移动端工具 */
  .tools-mobile {
    display: none !important;
  }
}
</style>