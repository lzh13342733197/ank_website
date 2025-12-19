<template>
  <Transition name="search-modal">
    <div class="search-modal" v-show="isVisible">
      <div class="search-content">
        <div class="search-header">
          <h2 class="search-title">{{ $t('navigationBar.search') }}</h2>
          <button class="search-close" @click="closeSearch">
            <SvgIcon name="close" size="24" color="#666" ></SvgIcon>
          </button>
        </div>

        <div class="search-input-container">
          <!-- <SvgIcon name="search" size="20" color="black" class="search-icon"></SvgIcon> -->
            <div :class="[styles.navigationBarItem, 'search-container']"  class="search-icon"
              style="color: white; text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;">
              <SvgIcon :name="`search`" size="25" color="white" style="filter: drop-shadow(0 0 1px black); ">
              </SvgIcon>
            </div>
          <input type="text" :placeholder="$t('navigationBar.searchPlaceholder')" class="search-input" v-model="searchQuery"
            @input="handleSearch" @keydown="handleKeydown" ref="searchInputRef" />
        </div>

        <div class="search-results" v-if="searchResults.length > 0">
          <div class="results-header">
            <span class="results-count">Found {{ searchResults.length }} results</span>
          </div>
          <div class="results-list">
            <div v-for="(result, index) in searchResults" :key="result.id" class="result-item"
              :class="{ active: activeIndex === index }" @mouseenter="activeIndex = index">
              <!-- <div class="result-icon">
                <SvgIcon name="product" size="16" color="#666"></SvgIcon>
              </div> -->
              <div class="result-content" style="display: flex; align-items: center; gap: 20px">
                <img v-lazy="result.productImageUrl" alt="" style="height: 100px; content-fit: cover" />
                <div>
                  <div class="result-title" v-html="highlightText(result.productSpuName || '')"></div>
                  <!-- <div class="result-category" v-html="highlightText(result.productCategoryName || '')"></div> -->
                  <div class="result-description" v-if="result.productSpuAboutContent || ''"
                    :title="result.productSpuAboutContent || ''"
                    @mouseenter="showTooltip($event, result.productSpuAboutContent || '')"
                    v-html="truncateText(highlightText(result.productSpuAboutContent || ''))">
                  </div>
                </div>
              </div>
              <div class="result-detail" @click="selectResult(result)">{{ $t('navigationBar.showDetails') }}></div>
            </div>
          </div>
        </div>

        <div class="search-empty" v-else-if="searchQuery && !isLoading">
          <div class="empty-icon">
            <SvgIcon name="search" size="48" color="#ccc" ></SvgIcon>
          </div>
          <div class="empty-text">No results found</div>
        </div>

        <div class="search-loading" v-if="isLoading">
          <div class="loading-spinner"></div>
          <div class="loading-text">Searching...</div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- 遮罩层 -->
  <Transition name="search-overlay">
    <div class="search-overlay" v-show="isVisible" @click="closeSearch"></div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useFetchWithLanguage } from '@/utils/http'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import styles from './pc.module.less'
const route = useRoute()

onMounted(() => {
  nextTick(() => {
    if (route.query.s) {
      emit('open')
      searchQuery.value = route.query.s.toString()
      handleSearch()
    }
  })
})
interface SearchResult {
  id: string
  name: string
  category: string
  image?: string,
  [key: string]: any;
}

const props = defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  close: []
  select: [result: SearchResult],
  open: []
}>()

const searchQuery = ref('')
const searchResults = ref<SearchResult[]>([])
const isLoading = ref(false)
const activeIndex = ref(-1)
const searchInputRef = ref<HTMLInputElement>()

// 关闭搜索
const closeSearch = () => {
  emit('close')
  searchQuery.value = ''
  searchResults.value = []
  activeIndex.value = -1
}

// 处理搜索输入
const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  isLoading.value = true

  // 模拟搜索延迟
  // await new Promise((resolve) => setTimeout(resolve, 300))

  const data = await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/search/search`, {
    keyword: searchQuery.value,
  })

  searchResults.value = data.items.filter(
    (item: any) =>
      (item.productSpuName || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.productCategoryName || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.productSpuAboutContent || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  isLoading.value = false
  activeIndex.value = -1
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      closeSearch()
      break
    case 'ArrowDown':
      event.preventDefault()
      if (searchResults.value.length > 0) {
        activeIndex.value = Math.min(activeIndex.value + 1, searchResults.value.length - 1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (searchResults.value.length > 0) {
        activeIndex.value = Math.max(activeIndex.value - 1, -1)
      }
      break
    // case 'Enter':
    //   event.preventDefault()
    //   if (activeIndex.value >= 0 && searchResults.value[activeIndex.value]) {
    //     selectResult(searchResults.value[activeIndex.value])
    //   }
    //   break
  }
}

const router = useRouter()
// 选择搜索结果
const selectResult = (result: SearchResult) => {
  emit('select', result)
  console.log(result)
  if (result && result.productSpuId)
    router.push(`/pc/product-detailInfo?id=${result.productSpuId}`)
  closeSearch()
}

// // 处理滚轮事件
// const handleWheel = (event: WheelEvent) => {
//   event.preventDefault()
//   event.stopPropagation()

//   const resultsContainer = event.currentTarget as HTMLElement
//   const scrollAmount = event.deltaY

//   resultsContainer.scrollTop += scrollAmount
// }

// 监听可见性变化，自动聚焦
watch(
  () => props.isVisible,
  (newVisible) => {
    if (newVisible) {
      nextTick(() => {
        searchInputRef.value?.focus()
      })
    }
  },
)


const highlightText = (text: string) => {
  if (!searchQuery.value) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}

const truncateText = (text: string) => {
  const maxLength = 50
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const showTooltip = (event: MouseEvent, content: string) => {
  if (content.length > 50) {
  }
}
</script>

<style scoped>
.search-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 0;
  min-width: 400px;
  max-width: 600px;
  max-height: 70vh;
  overflow: hidden;
}

.search-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.search-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.search-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.search-close:hover {
  background-color: #f5f5f5;
}

.search-input-container {
  position: relative;
  padding: 16px 24px;
}

.search-icon {
  position: absolute;
  left: 39px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  background: #f8f8f8;
}

.search-input:focus {
  border-color: #007aff;
  background: white;
}

.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 24px;
}

.results-header {
  padding: 16px 0 8px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 8px;
}

.results-count {
  font-size: 14px;
  color: #666;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.results-list::-webkit-scrollbar {
  width: 6px;
}

.results-list::-webkit-scrollbar-track {
  background: transparent;
}

.results-list::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.results-list::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;

  .result-detail {
    position: absolute;
    right: 10px;
    bottom: 1px;
    font-size: 14px;
    color: #007aff;
    cursor: pointer;
    z-index: 1;
  }

  .result-detail:hover {
    color: #0056b3;
  }
}
@media  (max-width: 768px)  {
  .result-item {
    padding: 12px 6px;
  }
}

.result-item:hover,
.result-item.active {
  background-color: #f5f5f5;
}

.result-icon {
  margin-right: 12px;
  opacity: 0.6;
}

.result-content {
  flex: 1;
}

.result-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.result-category {
  font-size: 14px;
  color: #666;
}

.search-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  color: #999;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-text {
  font-size: 16px;
}

.search-loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  color: #666;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f0f0f0;
  border-top: 3px solid #007aff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 16px;
}

.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1000;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 动画 */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.3s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

.search-overlay-enter-active,
.search-overlay-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-overlay-enter-from,
.search-overlay-leave-to {
  opacity: 0;
}

.result-description {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
  font-size: 13px;
}

:deep(.highlight) {
  background-color: #ffeb3b;
  color: #000;
  padding: 0 2px;
  border-radius: 2px;
}
</style>