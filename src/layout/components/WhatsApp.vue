<template>
  <div>
    <!-- 悬浮客服按钮 - 增加动画类 -->
    <div 
      v-if="!isChatOpen"
      class="floating-cs-button" 
      @click="toggleChatWindow"
      :class="{ 'is-mobile': isMobile }"
      :style="{ transform: `translateY(${buttonYOffset}px)` }"
    >
      <SvgIcon name="whatsapp" size="40" />
      <span class="cs-text">service</span>
    </div>

    <!-- 仿 WhatsApp 风格的站内聊天弹窗 - 增加动画容器 -->
    <transition name="chat-window">
      <div class="chat-window" v-if="isChatOpen">
        <!-- 聊天头部 -->
        <div class="chat-header">
          <div class="avatar-wrapper">
            <div class="avatar">
              <SvgIcon name="whatsapp" size="24" color="#fff" />
            </div>
            <span class="contact-name">Ankbit</span>
          </div>
          <button class="close-btn" @click="toggleChatWindow">×</button>
        </div>

        <!-- 聊天内容区 -->
        <div class="chat-content">
          <!-- 欢迎语 - 增加渐入动画 -->
          <div class="welcome-message animate-fade-in">
            <p>Hello! I'm an online customer service representative. You can leave any questions here. After clicking "Send", you will be redirected to WhatsApp to communicate with me.</p>
          </div>

          <!-- 用户输入框 -->
          <div class="chat-input-area">
            <textarea
              v-model="messageContent"
              placeholder="Please enter the question you want to consult..."
              class="message-input"
              rows="3"
            ></textarea>
            <button 
              class="send-btn"
              @click="sendMessage"
              :disabled="!messageContent.trim()"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 遮罩层 - 增加过渡动画 -->
    <transition name="chat-mask">
      <div class="chat-mask" v-if="isChatOpen" @click="toggleChatWindow"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 适配 SSG/SSR
const isClient = typeof window !== 'undefined'

// 移动端判断
const isMobile = ref(false)
onMounted(() => {
  if (isClient) {
    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 480
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }
})

// 聊天窗口状态
const isChatOpen = ref(false)
// 防止重复点击
const isClicking = ref(false)
// 消息内容
const messageContent = ref('')
// 悬浮按钮偏移量（用于动画）
const buttonYOffset = ref(0)

// 监听聊天窗口状态，控制按钮动画
watch(isChatOpen, (newVal) => {
  if (newVal) {
    // 打开聊天窗口时，按钮上移并淡出
    buttonYOffset.value = -20
  } else {
    // 关闭聊天窗口时，按钮复位
    setTimeout(() => {
      buttonYOffset.value = 0
    }, 300)
  }
})

// 切换聊天窗口
const toggleChatWindow = () => {
  if (isClicking.value) return
  
  isClicking.value = true
  isChatOpen.value = !isChatOpen.value
  setTimeout(() => {
    isClicking.value = false
  }, 500)
}

// 发送消息（跳转至 WhatsApp）
const sendMessage = () => {
  if (!isClient || !messageContent.value.trim()) return
  
  // WhatsApp 配置
  const phoneNumber = "+8613342733197" // 替换为你的号码
  const encodedMessage = encodeURIComponent(messageContent.value.trim())
  
  try {
    // 优先跳转 WhatsApp APP/网页版
    const whatsappUrl = isMobile.value 
      ? `https://wa.me/${phoneNumber}?text=${encodedMessage}` // 移动端
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}` // PC端
    
    window.open(whatsappUrl, '_blank', 'noopener noreferrer')
    
    // 发送后重置输入框 + 关闭弹窗
    messageContent.value = ''
    isChatOpen.value = false
  } catch (e) {
    console.error('发送消息失败：', e)
    alert('请手动打开 WhatsApp 联系客服：' + phoneNumber)
  }
}
</script>

<style scoped>
/* 悬浮按钮样式（增强动画） */
.floating-cs-button {
  position: fixed;
  right: 24px;
  top: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  outline: none;
  background: transparent;
  opacity: 1;
}

.floating-cs-button:hover {
  transform: scale(1.1) translateY(var(--y-offset, 0px));
}

.floating-cs-button.is-mobile SvgIcon {
  width: 40px !important;
  height: 40px !important;
}

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
  animation: fadeIn 0.3s ease;
}

.floating-cs-button:not(.is-mobile):hover .cs-text {
  display: block;
}

.floating-cs-button.is-mobile .cs-text {
  display: none !important;
}

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

.floating-cs-button:active {
  transform: scale(0.98) translateY(var(--y-offset, 0px));
}

/* 聊天窗口动画 */
.chat-window-enter-from {
  transform: translate(100%, 100%);
  opacity: 0;
}
.chat-window-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.chat-window-leave-to {
  transform: translate(100%, 100%);
  opacity: 0;
}
.chat-window-leave-active {
  transition: all 0.2s ease-in-out;
}

/* 聊天窗口样式（仿 WhatsApp） */
.chat-window {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 380px;
  height: 550px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 9998;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 聊天头部（WhatsApp 绿色主题） */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #075e54; /* WhatsApp 主色 */
  color: #fff;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.avatar-wrapper:hover .avatar {
  transform: scale(1.05);
}

.contact-name {
  font-weight: 600;
  font-size: 16px;
}

.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.close-btn:active {
  transform: scale(0.95);
}

/* 聊天内容区 */
.chat-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #e5ddd5; /* WhatsApp 背景色 */
}

/* 欢迎语 - 增加渐入动画 */
.welcome-message {
  background: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transform-origin: left center;
}

.animate-fade-in {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.welcome-message p {
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

/* 输入区域 */
.chat-input-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

.chat-input-area:focus-within {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.message-input {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s;
}

.message-input:focus {
  border-color: #25d366;
  box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.2);
}

.send-btn {
  align-self: flex-end;
  padding: 8px 16px;
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  transform-origin: right center;
}

.send-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: scale(1);
}

.send-btn:hover:not(:disabled) {
  background: #1ebe58;
  transform: scale(1.05);
}

.send-btn:active:not(:disabled) {
  background: #1a9c4c;
  transform: scale(0.98);
}

/* 遮罩层动画 */
.chat-mask-enter-from {
  opacity: 0;
}
.chat-mask-enter-active {
  transition: opacity 0.3s ease;
}
.chat-mask-leave-to {
  opacity: 0;
}
.chat-mask-leave-active {
  transition: opacity 0.2s ease;
}

/* 遮罩层 */
.chat-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9997;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .chat-window {
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
  
  .chat-window-enter-from {
    transform: translateY(100%);
    opacity: 0;
  }
  .chat-window-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>