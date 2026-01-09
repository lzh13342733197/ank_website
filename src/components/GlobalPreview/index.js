// components/GlobalPreview/index.js
import { h, render } from 'vue'
import ImagePreview from './ImagePreview.vue'

/**
 * @param {String|Array} payload - 图片链接或图片数组
 * @param {Number} index - 初始显示的索引
 */
export function showPreview(payload, index = 0) {
  const images = Array.isArray(payload) ? payload : [payload]
  const container = document.createElement('div')
  
  const remove = () => {
    render(null, container)
    container.remove()
  }

  const vnode = h(ImagePreview, {
    images,
    index,
    remove
  })

  render(vnode, container)
  document.body.appendChild(container)
  vnode.component.exposed.show()
}