<template>
  <div class="mobile-navigation-container">
    <div class="navigation_top" >
      <div class="hamburger-icon" @click="drawer = true">☰</div>
      <div class="navigation_top_logo">
        <router-link to="/" target="_self" class="privacy-policy"> <img src="@/assets/images/1mii.png" alt="logo"
            style="height: 40px" />
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
      <!-- <div :class="[styles.navigationBarItemList, { expanded: isSearchExpanded }]" :style="expandedStyle">
        <div :class="styles.navigationBarItem" style="cursor: pointer" @click="jumpTo(router, '/', {})">
          <img src="@/assets/images/1mii.png" alt="logo" style="height: 40px" />
        </div>
        <div @click="handleClick(item.id)" :class="styles.navigationBarItem" v-for="item in categoryList" :key="item.id"
          class="navigation-bar-item">
          {{ item.name }}
        </div>

        <div :class="[styles.navigationBarItem, 'search-container']" @click="toggleSearch"
          style="color: black; text-shadow: -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white;">
          <SvgIcon :name="`search`" size="20" color="black" style="filter: drop-shadow(0 0 1px white); ">
          </SvgIcon>
        </div>
      </div> -->

      <SearchModal :is-visible="isSearchExpanded" @close="closeSearch" @select="handleSearchSelect"
        @open="isSearchExpanded = true" />
      <el-drawer v-model="drawer" direction="ltr" resizable size="300px" :show-close="false">
        <div class="drawer-menu">
          <ul class="menu-list">
            <li v-for="item in categoryList" :key="item.id" class="menu-item" @click="handleMenuItemClick(item.id)">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </el-drawer>
      <!-- <div style="cursor: pointer" @click="language.setLanguage('zh')">{{ '切换语言' }}</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
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
const handleClick = (id: string) => {
  if (route.path === '/pc/home') {
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
  window.scrollTo({
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

.menu-item:hover {
  color: #1890ff;
  transform: translateX(5px);
}
</style>