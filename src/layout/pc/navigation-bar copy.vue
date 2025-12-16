<template>
  <div :class="styles.navigationBarWrapper">
    <div :class="[styles.navigationBarItemList, { expanded: isSearchExpanded }]" :style="expandedStyle">
      <!-- <div class="navigation-bar-icon" style="cursor: pointer" @click="handleClick('home')"> -->
      <div :class="styles.navigationBarItem" style="cursor: pointer" @click="jumpTo(router, '/', {})">
        <img src="@/assets/images/ankbit.png" alt="logo" style="height: 40px" />
      </div>
      <div @click="handleClick(item.id)" :class="styles.navigationBarItem" v-for="item in categoryList" :key="item.id"
        class="navigation-bar-item">
        {{ item.name }}
      </div>
      <!-- <div class="navigation-bar-item" @click="$router.push('/pc/company-profile')" style="cursor: pointer;">brand
        Introduction</div>
      <div class="navigation-bar-item" @click="$router.push('/pc/Contact_us')" style="cursor: pointer;">contact us</div> -->
      <div :class="[styles.navigationBarItem, 'search-container']" @click="toggleSearch"
        style="color: white; text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;">
        <SvgIcon :name="`search`" size="25" color="white" style="filter: drop-shadow(0 0 1px black); ">
        </SvgIcon>
      </div>
    </div>

    <!-- 使用新的搜索组件 -->
    <SearchModal :is-visible="isSearchExpanded" @close="closeSearch" @select="handleSearchSelect"
      @open="isSearchExpanded = true" />

    <!-- <div style="cursor: pointer" @click="language.setLanguage('zh')">{{ '切换语言' }}</div> -->
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
</style>




