<template>
  <div class="mobile-navigation-container">
    <div class="navigation_top" >
      <div class="hamburger-icon" @click="drawer = true">☰</div>
      <div class="navigation_top_logo">
        <router-link to="/" target="_self" class="privacy-policy"> <img src="/ankbit.png" alt="logo"
            style="height: 50px" />
        </router-link>
      </div>
      <div>
        <div :class="[styles.navigationBarItem, 'search-container']" @click="toggleSearch"
          style="color: black; text-shadow: -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white;">
          <SvgIcon :name="`search`" size="23" color="white"  style="filter: drop-shadow(0 0 1px black); " >
          </SvgIcon>
        </div>
      </div>
    </div>
    <div :class="styles.navigationBarWrapper" style="width: 100%;">
      <SearchModal :is-visible="isSearchExpanded" @close="closeSearch" @select="handleSearchSelect"
        @open="isSearchExpanded = true" />
      <el-drawer v-model="drawer" direction="ltr" resizable size="300px" :show-close="false">
        <div class="drawer-menu">
          <ul class="menu-list">
            <li v-for="item in menus" :key="item.id" class="menu-item" @click="handleMenuItemClick(item.id)">
               <router-link :to="item.url" class="main-nav-link" :class="{ 'is-active': item.isActive }">
            {{ item.name }}
           </router-link>
            </li>
          </ul>
        </div>
      </el-drawer>
      <!-- <div style="cursor: pointer" @click="language.setLanguage('zh')">{{ '切换语言' }}</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import styles from './pc.module.less'
import SvgIcon from '@/components/SvgIcon.vue'
import SearchModal from './search-modal.vue'
import { useLanguageStore } from '@/stores/language'
import { useRoute } from 'vue-router'
import { jumpTo } from '@/utils/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)

const route = useRoute()
const isSearchVisible = ref(false)

const language = useLanguageStore()
const categoryList = ref<any[]>([])
const isSearchExpanded = ref(false)

const emit = defineEmits(['jumpToCategory'])


const menus = ref([
  { id: 1, name: 'Home', url: '/home', isActive: true },
  { id: 2, name: 'About us', url: '/AboutUs/CompanyProfile', isActive: false, 
    // children: [
    //   { name: '公司简介', url: '/AboutUs' },
    //   { name: '愿景与使命', url: '/Content/505035.html' },
    // ] 
  },
  { id: 3, name: 'Products', url: '/ProductCenter', isActive: false },
  { id: 4, name: 'Fair', url: '/NewsList', isActive: false },
  { id: 6, name: 'Contact', url: '/Contact_us', isActive: false,
  },
])

const handleClick = (id: string) => {
  if (route.path === '/home') {
    emit('jumpToCategory', id)
    return
  } else {
    // 使用路由跳转回调替代setTimeout
    router.push({ path: 'home' }).then(() => {
      emit('jumpToCategory', id)
    })
  }
}

const handleMenuItemClick = (id: string) => {
  drawer.value = false // 关闭侧边栏
  handleClick(id) // 调用现有的点击处理函数
}
const toBottom = () => {
  globalThis.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}

const expandedStyle = computed(() => {
  if (isSearchExpanded.value) {
    return {
      background: 'white',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '20px',
      padding: '0 40px',
      zIndex: '1005',
      height: '60px',
      transition: 'all 0.3s ease',
    }
  }
  return {
    transition: 'all 0.3s ease',
  }
})

const toggleSearch = () => {
  isSearchExpanded.value = !isSearchExpanded.value
}

const closeSearch = () => {
  isSearchExpanded.value = false
}

const handleSearchSelect = (result: any) => {
  console.log('Selected search result:', result)
  // 这里可以处理搜索结果的选择
  // 比如跳转到产品详情页
}

const fetchCategoryList = async () => {
  if (import.meta.env.SSR) return
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
    {},
  )

  const getLeafNode = (item: any, catagoryList: any[]) => {
    if (item.children.length > 0) {
      item.children.forEach((child: any) => {
        getLeafNode(child, catagoryList)
      })
    } else {
      categoryList.value.push(item)
    }
  }

  categoryList.value = []
  data.forEach((item: any) => {
    getLeafNode(item, categoryList.value)
  })
}

onMounted(fetchCategoryList)

language.addRequest(fetchCategoryList)

const updateMenuActivation = (currentPath: string) => {
    // 遍历所有一级菜单
    menus.value.forEach(menu => {
        // 核心逻辑：判断菜单的 url 是否与当前路由路径匹配
        // 注意：这里需要根据你实际的路由配置和菜单 URL 结构进行调整
        // 例如：使用 startsWith() 来匹配嵌套路由，或者进行精确匹配

        // 示例：精确匹配 (对于首页或没有子菜单的页面)
        let isMatch = menu.url === currentPath;

        // 示例：包含子菜单的情况，需要检查子菜单的 URL
        if (!isMatch && menu.children) {
            // 检查子菜单的 URL 是否与当前路径匹配
            isMatch = menu.children.some(child => child.url === currentPath);
        }
        
        // 示例：如果你的菜单 URL 只是一个前缀（如 /ProductCenter），而实际路由是 /ProductCenter/detail/123
        // 你可能需要使用 currentPath.startsWith(menu.url)
        // 但根据你提供的菜单URL，这里使用精确匹配或子菜单匹配更合适。

        menu.isActive = isMatch;
    })
}

// 1. 首次加载时调用
updateMenuActivation(route.path)

// 2. 监听路由变化，动态更新状态
// 当路由对象发生变化时，重新调用激活函数
watch(
    () => route.path,
    (newPath) => {
        updateMenuActivation(newPath);
    },
    { immediate: true } // 确保组件初始化时也会执行一次
)

</script>

<style scoped>
  .mobile-navigation-container {
  position: sticky; 
  top: 0;
  z-index: 1000;
  background-color: #fff; /* 默认白色背景 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.search-container {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-container:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.navigation-bar-item {
  color: black;
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
}

.navigation_top {
  height: 50px;
  background-color: black;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 100;
}

.hamburger-icon {
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.navigation_top_logo {
  display: inline-block;
}

/* 侧边栏菜单样式 */
.drawer-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.menu-header h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.close-btn {
  font-size: 28px;
  cursor: pointer;
  padding: 0 10px;
}

.close-btn:hover {
  background-color: #f0f0f0;
  border-radius: 50%;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  
}
.main-nav-link {
  white-space: nowrap;
  display: block;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.main-nav-link:hover, .main-nav-link.is-active {
  color: #0095d7; /* 模拟hover/active 颜色 */
}


.menu-item:hover {
  color: #1890ff;
  transform: translateX(5px);
}


</style>
<style>
.el-popup-parent--hidden {
    padding-right: 0px !important;
    overflow: hidden !important;
}
</style>