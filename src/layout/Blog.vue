<template>

  <div class="top_img">
    <img v-if="!isMobile" style="width: 100%" src="@/assets/images/blog_banner_pc.jpg" alt="">
    <img v-else style="width: 100%" src="@/assets/images/blog_banner_mobile.jpg" alt="">
  </div>
  <div class="blog-container">

    <div class="blog-header">
      <div class="page-title">Blog</div>
    </div>

    <div class="blog-list">
      <div v-if="isLoading" class="loading">Loading...</div>

      <div v-else class="blog-card" v-for="post in blogPostsList" :key="post.id" @click="openDetailModal(post)">
       <div v-if="post.title && post.coverImageUrl">
         <img :src="post.coverImageUrl" :alt="post.title" class="blog-img" />
        <div class="blog-content">
          <h3 class="blog-subtitle">{{ post.title }}</h3>
          <!-- <p class="blog-desc">{{ post.title }}</p> -->
        </div>
       </div>
      </div>

      <div v-if="!isLoading && blogPostsList.length === 0" class="empty">No Blog yet.</div>
    </div>

    <div v-if="isModalOpen" class="modal-mask" @click="closeDetailModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeDetailModal" aria-label="Close">×</button>

        <div class="modal-body">
          <h2 class="modal-title">{{ currentPost?.title }}</h2>

          <div class="rich-text-wrapper">
            <div class="modal-content-html" v-html="processedContent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const isLoading = ref(false)
const isModalOpen = ref(false)
const currentPost = ref<any>(null)
const blogPostsList = ref<any[]>([])
const isMobile = computed(() => {
  return globalThis.innerWidth <= 768
})

const processedContent = computed(() => {
  if (!currentPost.value?.content) return ''
  return currentPost.value.content
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
})

const getblogDataList = async () => {
  try {
    isLoading.value = true
    const data = await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/article/pageList`, {
      page: 1,
      limit: 10
    })
    blogPostsList.value = data?.list || []
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const openDetailModal = (post: any) => {
  currentPost.value = post
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeDetailModal = () => {
  isModalOpen.value = false
  currentPost.value = null
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  getblogDataList()
})
watch(locale, () => {
  getblogDataList()
})
</script>

<style scoped>
/* --- 基础样式 --- */



.top_img {
  width: 100%;
  margin: 0px auto 20px;
}


.blog-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}



.page-title {
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  border-left: 4px solid #0095D7;
  font-weight: 700;
  padding-left: 8px;
  line-height: 1.2;
  margin-bottom: 20px;
}

.blog-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.blog-card {
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  transition: transform 0.2s;
}

.blog-card:active {
  transform: scale(0.98);
}

/* 移动端点击反馈 */

.blog-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 0 15px;
}

.blog-subtitle {
  font-size: 1.1rem;
  margin-bottom: 8px;
  line-height: 1.4;
}

.blog-desc {
  color: #666;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* --- 弹窗样式 (PC默认) --- */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 9999;
  overflow-y: auto;
  padding: 40px 20px;
  /* PC端留白 */
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  position: relative;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #f0f0f0;
  border: none;
  font-size: 24px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  line-height: 1.3;
  color: #111;
  padding-right: 40px;
}

/* --- 富文本换行修复 --- */
.modal-content-html {
  line-height: 1.7;
  color: #333;
  font-size: 16px;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
}

.modal-content-html :deep(*) {
  word-break: keep-all !important;
  overflow-wrap: break-word !important;
  max-width: 100% !important;
}

.modal-content-html :deep(p) {
  margin-bottom: 1.2em;
}

.modal-content-html :deep(img),
.modal-content-html :deep(video) {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 8px;
  margin: 10px 0;
}

/* --- 移动端适配 (重点) --- */
@media (max-width: 768px) {
  .blog-container {
    padding: 15px;
  }

  .blog-title {
    font-size: 1.6rem;
  }

  .blog-list {
    grid-template-columns: 1fr;
  }

  /* 移动端一行一个 */

  .modal-mask {
    padding: 0;
    /* 移动端取消外部间距 */
  }

  .modal-content {
    min-height: 100%;
    /* 撑满屏幕高度 */
    border-radius: 0;
    /* 移动端全屏不需要圆角 */
    padding: 60px 20px 30px;
    /* 顶部留出位置给关闭按钮 */
  }

  .modal-close {
    position: fixed;
    /* 滚动时关闭按钮固定在顶部 */
    top: 15px;
    right: 15px;
    width: 40px;
    /* 稍微加大方便点击 */
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
  }

  .modal-title {
    font-size: 1.4rem;
    padding-right: 0;
  }

  .modal-content-html {
    font-size: 15px;
    /* 移动端字号稍微缩小一点更精致 */
  }
}

.empty {
  height: 60vh;
}
</style>