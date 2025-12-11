import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'

// 检测本地存储的语言偏好，默认为中文
const storedLang = 'en'
// const storedLang = localStorage.getItem('appLanguage') || 'en'

const i18n = createI18n({
  legacy: false, // 使用Composition API必须设置为false
  globalInjection: true, // 全局注入$t函数
  locale: storedLang,
  fallbackLocale: 'zh', // 当指定语言不存在时使用的 fallback 语言
  messages: {
    zh,
    en,
  },
})

// 保存语言设置到本地存储
export const setLanguage = (lang) => {
  if (lang === 'zh' || lang === 'en') {
    i18n.global.locale.value = lang
    // localStorage.setItem('appLanguage', lang)
  }
}

export default i18n
