import { useFetch } from '@vueuse/core'
import { useLanguageStore } from '@/stores/language'
import { isServer } from '@/utils/env' // 新增：判断是否为服务端环境

const languageStore = useLanguageStore()

// 新增：SSG环境下的模拟数据生成函数
const getMockData = (url: string) => {
  // 根据不同接口返回对应结构的模拟数据
  if (url.includes('product')) {
    return { code: 1, data: [] }
  }
  if (url.includes('detail')) {
    return { code: 1, data: {} }
  }
  return { code: 1, data: null }
}
import { getCurrentLang } from '@/locales'

const _request = async (url: string, method: 'post' | 'get', params?: any) => {
  try {
    // SSG服务端环境直接返回模拟数据
    if (isServer) {
      const mockData = getMockData(url)
      if (mockData.code === 1) {
        return mockData.data
      } else {
        throw new Error('Mock request failed')
      }
    }

    // 客户端环境正常请求
    const { data, error } = await useFetch(url, {
      headers: {
        'Accept-Language': getCurrentLang(),
        'Content-Type': 'application/json',
      },
    })
      [method](params ? params : undefined)
      .json()

    // 处理请求错误
    if (error.value) {
      throw new Error(`Network error: ${error.value.message}`)
    }

    // 处理空响应和状态码判断
    if (!data.value) {
      throw new Error('Empty response from server')
    }

    if (data.value.code === 1) {
      return data.value.data
    } else {
      throw new Error(`Server error: ${data.value.message || 'Unknown error'}`)
    }
  } catch (error) {
    console.error(`[${method.toUpperCase()}] ${url} failed:`, error)
    // 返回安全的默认值而非undefined，避免后续报错
    return method === 'get' ? null : false
  }
}

export const useFetchWithLanguage = {
  post: async (url: string, params: any) => {
    return await _request(url, 'post', params)
  },
  get: async (url: string) => {
    return await _request(url, 'get')
  },
}
