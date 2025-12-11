import { emitter } from './event-bus'

/**
 * 将字符串转换为大写
 * @param str 字符串
 * @returns 大写字符串
 */
export const toUpperCase = (str: string): string => {
  return str.toUpperCase()
}

/**
 * 跳转页面
 * @param path 路径
 */
export const jumpTo = (router: any, path: string, query: any) => {
  if (path.startsWith('http') || path.startsWith('https')) {
    window.open(path, '_self')
  } else {
    router.push({
      path: path,
      query: query,
    })
  }
  emitter.emit('jump-event')
}

export const transferFormatCollapse = (data: any, jumpLink: string) => {
  return {
    id: data.id,
    title: data.name,
    jumpLink: jumpLink,
    isExpand: false,
    children: data.children.map((item: any) => transferFormatCollapse(item, jumpLink)),
  }
}

/**
 * 遍历树
 * @param data 树
 * @param callback 回调
 */
export const traverseTree = (data: any, callback: (item: any) => void) => {
  data.forEach((item: any) => {
    callback(item)
    if (item.children) {
      traverseTree(item.children, callback)
    }
  })
}

/**
 * 将字符串中的首字母和&后面的单词首字母大写（考虑&后可能有空格）
 * @param str 输入字符串
 * @returns 处理后的字符串
 */
export const capitalizeWithAnd = (str: string): string => {
  if (!str) return str

  return (
    str
      .toLowerCase()
      // 匹配以下情况：
      // 1. 字符串开头 (^)
      // 2. & 后面跟着任意数量空格 (&\s*)
      // 后面的字母需要大写
      .replace(/(^|&\s*)([a-z])/g, (match, p1, p2) => {
        return p1 + p2.toUpperCase()
      })
  )
}

/**
 * 返回元素在页面中的位置信息
 * @param wrapperRef
 * @returns
 */
export const getCardPeekListPosition = (wrapperRef: any) => {
  if (wrapperRef.value) {
    const rect = wrapperRef.value.getBoundingClientRect()
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    }
  }
  return null
}

/**
 * 检测是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
export function isMobileDevice() {
  // 服务端直接返回 false 或 true（根据需求）
  if (import.meta.env.SSR) {
    return false // 或 true，服务端默认假设
  }
  // 客户端正常判断
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
