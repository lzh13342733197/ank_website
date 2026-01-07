import { defineStore } from 'pinia'
import { ref } from 'vue'

// 环境判断：是否为客户端
const isClient = typeof window !== 'undefined'

export const useCategoryListStore = defineStore(
  'categoryList', 
  () => {
    // 初始化：客户端从 localStorage 读取，服务端初始化为空数组
    const initialValue = isClient 
      ? JSON.parse(localStorage.getItem('categoryList') || '[]') 
      : []
    const categoryList = ref(initialValue)

    const setCategoryList = (newCategoryList: any) => {
      categoryList.value = newCategoryList
      // 客户端主动同步到 localStorage（兜底，防止插件失效）
      if (isClient) {
        localStorage.setItem('categoryList', JSON.stringify(newCategoryList))
      }
    }

    return {
      categoryList,
      setCategoryList,
    }
  },
  {
    // 仅客户端启用持久化
    persist: isClient ? {
      key: 'categoryList',
      // 强制指定客户端存储（避免服务端找不到 storage）
      storage: isClient ? localStorage : undefined,
      paths: ['categoryList']
    } : false
  }
)