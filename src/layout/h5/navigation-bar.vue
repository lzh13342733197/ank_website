<template>
  <div :class="styles.navigationBar">
    <div :class="styles.navigationBarItem"></div>
    <div :class="styles.navigationBarItem" @click="jumpTo(router, '/', {})">
      <img src="/ankbit.png" style="width: 80px; transform: translateX(46px)" alt="logo" />
    </div>
    <div :class="styles.navigationBarItem">
      <SvgIcon name="search" size="28" @click="toggleSearch" />
      <SvgIcon name="more" size="28" @click="isShowCollapsePopover = !isShowCollapsePopover" />
    </div>

    <div v-if="showSearch" class="search-modal" @click.self="showSearch = false">
      <div class="search-modal-content">
        <div class="close-btn" @click="showSearch = false">
          <SvgIcon name="close" size="15" style="cursor: pointer; color: black;" />
        </div>
        <div class="searchTitle">Search</div>
        <input v-model="searchQuery" @input="handleInput" placeholder="搜索产品..." class="search-input"></input>
        <div class="search-results">
          <div class="results-length">
            Found {{ searchResults.length }} results
          </div>
          <div v-if="isLoading">
            <div class="loading-container">
              <div class="loading-spinner"></div>
            </div>
          </div>
          <div v-else-if="searchResults.length > 0">
            <div v-for="(item, index) in searchResults" :key="index" class="search-result-item">
              <div class="search-result-item-content">
                <img :src="item.productImageUrl" alt="product" style="width: 57px; height: 57px; margin-right: 10px;" />
                <div style="flex: 1; margin-left: 10px;">
                  <div style="font-size: 14px; font-weight: 500;" v-html="highlightText(item.productSpuName)"></div>
                  <div v-if="item.productSpuAboutContent"
                    style=" font-size: 12px; color: #999; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;"
                    v-html="highlightText(item.productSpuAboutContent)">
                  </div>
                </div>
              </div>
              <div class="result-detail"
                @click="jumpTo(router, '/mobile/product-detailInfo', { id: item.productSpuId }), showSearch = false">
                Show Details ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="isShowCollapsePopover" class="collapse-popover">
    <collapse :mockData="mockData" @item-click="() => { }" />
  </div>

  <div v-if="isShowCollapsePopover" class="collapse-popover-mask" @touchmove.prevent
    @click="isShowCollapsePopover = false"></div>
</template>

<script setup lang="ts">
import styles from '@/assets/yee-mall.module.css'
import SvgIcon from '@/components/SvgIcon.vue'
import collapse from '@/components/collapse.vue'
import { ref, onMounted, nextTick } from 'vue'

import { useFetchWithLanguage } from '@/utils/http'
import { transferFormatCollapse, jumpTo, traverseTree } from '@/utils/utils'
import { useRouter, useRoute } from 'vue-router'
import { emitter } from '@/utils/event-bus'
import { useLanguageStore } from '@/stores/language'

const language = useLanguageStore()

const router = useRouter()
const route = useRoute()
const showSearch = ref(false)
const searchQuery = ref('')

const toggleSearch = () => {
  if (isShowCollapsePopover.value) {
    isShowCollapsePopover.value = false
  }
  showSearch.value = !showSearch.value
}
type SearchResult = {
  productSpuId: string
  productCategoryName: string
  productSpuName: string
  productImageUrl?: string,
  [key: string]: any;
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/mobile/product-view',
      query: { s: searchQuery.value }
    })
    showSearch.value = false
    searchQuery.value = ''
  }
}

const mockData = ref([])

const isShowCollapsePopover = ref(false)

const fetchCategoryList = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
    {},
  )
  mockData.value = data.map((item: any) => transferFormatCollapse(item, '/mobile/product-view'))

}

onMounted(() => {
  fetchCategoryList()
  nextTick(() => {
    if (route.query.s) {
      showSearch.value = true
      searchQuery.value = route.query.s.toString()
      handleInput()
    }
  })
})

language.addRequest(fetchCategoryList)

emitter.on('jump-event', () => {
  traverseTree(mockData.value, (item: any) => {
    item.isExpand = false
  })
  isShowCollapsePopover.value = false
  console.log('fuck')
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const searchResults = ref<SearchResult[]>([])
const searchTimer = ref()

const handleInput = () => {
  clearTimeout(searchTimer.value)
  if (searchQuery.value.trim()) {
    searchTimer.value = setTimeout(() => {
      fetchSearchResults()
    }, 500)
  } else {
    searchResults.value = []
  }
}

const isLoading = ref(false)

const fetchSearchResults = async () => {
  try {
    isLoading.value = true
    const data = await useFetchWithLanguage.post(
      `${import.meta.env.VITE_API_URL}/search/search`,
      { keyword: searchQuery.value }
    )
    searchResults.value = data.items
  } catch (error) {
    console.error('搜索失败:', error)
  } finally {
    isLoading.value = false
  }
}

const highlightText = (text: string) => {
  if (!text || !searchQuery.value) return text || '';
  const escapedQuery = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

const goToResult = (item: any) => {
  router.push(item.link)
  showSearch.value = false
  searchQuery.value = ''
  searchResults.value = []
}
</script>
<style scoped>
:deep(.highlight) {
  background-color: #ffeb3b;
  color: #000;
  padding: 0 2px;
  border-radius: 2px;
}

.collapse-popover-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  /* 半透明黑色 */
  z-index: 999;
  /* 要比 collapse-popover 小一点 */
}

.collapse-popover {
  background-color: #fff;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100vw;
  padding: 0 20px;
  z-index: 1000;
}

.collapse-popover {
  position: fixed;
  transition: all 0.3s ease-in-out;
  transform-origin: top;
  animation: slideDown 0.3s ease-in-out;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

@keyframes slideDown {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }

  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

.collapse-popover-leave-active {
  animation: slideUp 0.3s ease-in-out;
}

@keyframes slideUp {
  0% {
    transform: scaleY(1);
    opacity: 1;
  }

  100% {
    transform: scaleY(0);
    opacity: 0;
  }
}

.search-container {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  padding: 10px;
  background: white;
  z-index: 1000;
  display: flex;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
}

.search-modal-content {
  position: relative;
  background: white;
  top: 30%;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
  }
}

.searchTitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.search-results {
  margin-top: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.search-result-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;

  .result-detail {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 10px;
    color: #007aff;
    cursor: pointer;
    z-index: 1;
  }
}

.search-result-item-content {
  display: flex;
  align-items: center;

}

.search-result-item:hover {
  background: #f5f5f5;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>