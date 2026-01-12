<template>
  <transition name="preview-fade">
    <div v-if="visible" class="preview-mask" @click="close" @wheel.prevent @touchstart="handleTouchStart"
      @touchend="handleTouchEnd">
      <div class="preview-content">
        <div class="img-wrapper" @click.stop>
          <img :src="images[currentIndex]" class="preview-img" :key="currentIndex" draggable="false" />
        </div>

        <div v-if="images.length > 1" class="preview-count" @click.stop>
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>

        <template v-if="images.length > 1">
          <div class="nav-btn prev-btn" @click.stop="prev" v-show="currentIndex > 0">‹</div>
          <div class="nav-btn next-btn" @click.stop="next" v-show="currentIndex < images.length - 1">›</div>
        </template>

        <div class="close-btn" @click="close">×</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: { type: Array, default: () => [] },
  index: { type: Number, default: 0 },
  remove: { type: Function, required: true }
})

const visible = ref(false)
const currentIndex = ref(props.index)

// --- 手势处理逻辑 ---
let touchStartX = 0
let touchStartY = 0

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const dx = touchStartX - touchEndX
  const dy = touchStartY - touchEndY

  // 水平滑动判断（左右切换）
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) next()
    else prev()
  }
  // 垂直向下滑动判断（可选：下拉关闭）
  else if (dy < -100) {
    close()
  }
}

// --- 核心方法 ---
const show = () => {
  visible.value = true
  // 物理返回键适配：推入一个历史记录
  window.history.pushState({ target: 'imgPreview' }, '')
  window.addEventListener('popstate', handleBack)
}

const close = () => {
  visible.value = false
  window.removeEventListener('popstate', handleBack)
  // 如果是手动关闭，且历史记录里还有我们的标记，则回退一格
  // if (window.history.state?.target === 'imgPreview') {
  //   window.history.back()
  // }
  setTimeout(props.remove, 300)
}

const handleBack = () => {
  // 当用户按物理返回键时触发
  visible.value = false
  setTimeout(props.remove, 300)
}

const next = () => {
  if (currentIndex.value < props.images.length - 1) currentIndex.value++
}

const prev = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

// 暴露 show 方法供 index.js 调用
defineExpose({ show })

// 卸载时确保移除监听，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener('popstate', handleBack)
})
</script>

<style scoped>
.preview-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  /* 确保在最顶层 */
  touch-action: none;
  cursor: pointer;
  /* 提示背景可点击关闭 */
}

.preview-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  /* 图片区域恢复默认箭头 */
}

.img-wrapper {
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
}

.preview-count {
  position: absolute;
  bottom: 40px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  letter-spacing: 1px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.prev-btn {
  left: 30px;
}

.next-btn {
  right: 30px;
}

.close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 44px;
  height: 44px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #fff;
}

/* 动画效果：渐变淡入淡出 */
.preview-fade-enter-active,
.preview-fade-leave-active {
  transition: opacity 0.3s ease;
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .nav-btn {
    display: none;
  }

  /* 移动端靠手势，隐藏按钮 */

  .preview-img {
    max-width: 100vw;
    max-height: 80vh;
  }

  .close-btn {
    top: 20px;
    right: 20px;
  }
}
</style>