<template>
  <div 
    class="floating-cs-button" 
    @click="openWhatsAppChat"
    :class="{ 'is-mobile': isMobile }"
  >
     <SvgIcon name="whatsapp" size="40"    />
    <span class="cs-text">在线客服</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 适配 SSG/SSR：判断是否为客户端环境
const isClient = typeof window !== 'undefined'

// 移动端判断（优化交互）
const isMobile = ref(false)
onMounted(() => {
  if (isClient) {
    // 监听窗口大小变化，判断是否为移动端
    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 480
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    // 组件卸载时移除监听
    return () => window.removeEventListener('resize', checkMobile)
  }
})

// 防止重复点击
const isClicking = ref(false)
// 打开 WhatsApp 聊天窗口
const openWhatsAppChat = () => {
  if (!isClient || isClicking.value) return
  
  isClicking.value = true
  // 替换为你的 WhatsApp 号码（国际格式，去掉空格/横杠）
  const phoneNumber = "+8613342733197"
  // 预设欢迎语（支持多语言/换行）
  const message = "您好！我想咨询产品相关问题，麻烦您解答一下～"
  
  try {
    // 跳转 WhatsApp 聊天链接（兼容 Web/APP）
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener noreferrer' // 安全配置
    )
  } catch (e) {
    console.error('打开客服窗口失败：', e)
    // 降级方案：直接打开 WhatsApp 主页
    window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener noreferrer')
  } finally {
    // 1秒后解锁点击
    setTimeout(() => {
      isClicking.value = false
    }, 1000)
  }
}
</script>

<style scoped>
/* 悬浮客服按钮样式 - 移除圆形背景，仅保留图标 */
.floating-cs-button {
  position: fixed;
  right: 24px;
  top: 70%;
  /* 移除宽高和圆形背景，由图标尺寸决定 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999; /* 确保悬浮在最上层 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  outline: none;
  background: transparent; /* 透明背景 */
}

/* hover 增强效果 - 仅缩放图标 */
.floating-cs-button:hover {
  transform: scale(1.1); /* 仅缩放，移除位移 */
}

/* 移动端适配 - 缩小图标尺寸 */
.floating-cs-button.is-mobile {
  /* right: 16px;
  bottom: 16px; */
}
.floating-cs-button.is-mobile SvgIcon {
  width: 40px !important;
  height: 40px !important;
}

/* 文字提示 - 优化版（适配无背景的图标） */
.cs-text {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 12px;
  background-color: #ffffff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: none;
  white-space: nowrap;
  font-weight: 500;
}

/* 显示文字提示（PC端） */
.floating-cs-button:not(.is-mobile):hover .cs-text {
  display: block;
  /* 文字淡入动画 */
  animation: fadeIn 0.3s ease;
}

/* 移动端隐藏文字提示 */
.floating-cs-button.is-mobile .cs-text {
  display: none !important;
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

/* 防止点击穿透 */
.floating-cs-button:active {
  transform: scale(0.98);
}
</style>