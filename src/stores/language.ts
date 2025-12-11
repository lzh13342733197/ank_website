import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { retryAll, clearRetryQueue } from '@/utils/requestManager'
import i18n from '@/locales'

export const useLanguageStore = defineStore('language', () => {
  const language = ref('en')
  const requestList = ref<Function[]>([])

  const retryRequest = () => {
    for (const request of requestList.value) {
      request()
    }
  }

  const setLanguage = (newLanguage: string) => {
    // 国际化切换语言
    i18n.global.locale.value = newLanguage
    language.value = newLanguage
    retryRequest()
  }

  const addRequest = (request: Function) => {
    requestList.value.push(request)
  }

  // 也可以监听 language 改变（自动化）
  watch(language, () => {
    retryRequest()
  })

  return {
    language,
    setLanguage,
    addRequest,
  }
})
