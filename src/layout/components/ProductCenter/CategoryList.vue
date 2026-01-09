<template>
  <!-- 产品分类列表容器 -->
  <div class="category-container">
    <h1 class="category-title">产品分类</h1>
    <!-- 分类列表 - 改为纵向列表布局 -->
    <div class="category-list">
      <div class="category-item" v-for="category in categoryList" :key="category.id"
        @click="handleClickCategory(category)">
        <!-- <div class="category-text-wrapper">
          <div class="category-name">{{ category.name }}</div>
          <div class="category-desc">
            {{ category.description }}
          </div>
          <div class="category-divider"></div>
        </div>
         -->
        <!-- 右侧图片区域 -->
        <div class="category-image-wrapper">
          <img :src="isMobile ? category.imageMobileUrl : category.imagePCUrl" :alt="category.name"
            class="category-image" loading="lazy" @error="handleImageError($event)">
          <!-- 悬浮装饰元素 -->
          <div class="category-hover-decoration"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFetchWithLanguage } from '@/utils/http'

const { t, locale } = useI18n()
const isMobile = computed(() => window.innerWidth <= 768)

// 类型定义保持不变
const categoryList = ref<Array<{
  id: string | number
  name: string
  imageUrl: string
  pid?: string
  children?: any[]
  description?: string
  imageMobileUrl?: string,
  imagePCUrl?: string,
}>>([])

// 获取分类列表，增加异常处理
const getCategoryList = async () => {
  try {
    const data = await useFetchWithLanguage.post(
      `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
      {},
    )
    categoryList.value = data || []
  } catch (error) {
    console.error('获取分类列表失败:', error)
    categoryList.value = []
  }
}

// 图片加载失败处理
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  // 替换为默认占位图（可根据实际需求修改）
  img.src = 'https://via.placeholder.com/400x180?text=暂无图片'
}

// 分类点击事件
const handleClickCategory = (category: any) => {
  window.location.href = '/ProductCenter?categoryId=' + category.id
}

onMounted(() => {
  getCategoryList()
})

// 监听语言切换
watch(locale, () => {
  getCategoryList()
})
</script>

<style scoped>
/* 基础容器样式 */
.category-container {
  width: 100%;
  padding: 24px 16px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Microsoft Yahei", "PingFang SC", sans-serif;
}

/* 分类标题样式 */
.category-title {
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  border-left: 4px solid #0095D7;
  font-weight: 700;
  padding-left: 8px;
  line-height: 1.2;
}



/* 分类列表 - 改为纵向列表 */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
}

/* 分类项 - 左右布局核心样式 */
.category-item {
  display: flex;
  align-items: stretch;
  /* 让子元素高度撑满 */
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #fff;
  justify-content: space-around;
}

/* 悬浮效果 */
.category-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

/* 左侧文字区域 - 占比60% */
.category-text-wrapper {
  flex: 0 0 60%;
  height: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
}

/* 分类名称 */
.category-name {
  color: #222;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 8px;
}

/* 分类描述 */
.category-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  max-width: 90%;
}

/* 文字区域装饰线 */
.category-divider {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #0095D7 0%, #0095D7 100%);
  border-radius: 2px;
  margin-top: 16px;
}

/* 右侧图片区域 - 占比40% */
.category-image-wrapper {
  /* flex: 0 0 25%; */
  width: 1168px;
  height: 180px;
  /* height: 100%; */
  position: relative;
  overflow: hidden;
}

/* 分类图片 */
.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 保持图片比例，裁剪多余部分 */
  transition: transform 0.4s ease;
}

/* 悬浮时图片缩放效果 */
.category-item:hover .category-image {
  transform: scale(1.05);
}

/* 悬浮装饰元素 */
.category-hover-decoration {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(44, 82, 237, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  opacity: 0;
  transition: all 0.4s ease;
}

/* 装饰元素内的箭头（伪元素实现） */
.category-hover-decoration::after {
  content: '';
  width: 12px;
  height: 12px;
  border-right: 2px solid #0095D7;
  border-top: 2px solid #0095D7;
  transform: rotate(45deg);
}

.category-item:hover .category-hover-decoration {
  opacity: 1;
  right: 16px;
}

/* 移动端适配 */
@media (max-width: 768px) {

  .category-image-wrapper {
    width: 414px;
    height: 234px;
  }

  .category-container {
    padding: 16px 8px;
  }

  .category-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  /* 移动端改为上下布局 */
  .category-item {
    flex-direction: column;
    height: auto;
  }

  .category-text-wrapper {
    flex: none;
    width: 100%;
    padding: 20px 24px;
  }

  .category-image-wrapper {
    flex: none;
    width: 100%;
    height: 180px;
  }

  .category-name {
    font-size: 18px;
  }

  .category-desc {
    font-size: 13px;
  }
}

/* 小屏移动端优化 */
@media (max-width: 480px) {
  .category-text-wrapper {
    padding: 16px 20px;
  }

  .category-image-wrapper {
    /* height: 150px; */
    display: flex;
    justify-content: center;
  }
}
</style>