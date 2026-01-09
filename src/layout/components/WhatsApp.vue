<template>
  <div>
    <transition name="fade">
      <div v-if="!isChatOpen" class="floating-cs-button" @click="toggleChatWindow" :class="{ 'is-mobile': isMobile }"
        :style="{ transform: `translateY(${buttonYOffset}px)` }">
        <SvgIcon name="whatsapp" size="40" />
        <span class="cs-text">Online Service</span>
      </div>
    </transition>

    <transition name="chat-window">
      <div class="chat-window" v-if="isChatOpen">
        <div class="chat-header">
          <div class="avatar-wrapper">
            <div class="avatar">
              <SvgIcon name="whatsapp" size="24" color="#fff" />
            </div>
            <div class="contact-info">
              <span class="contact-name">Ankbit Support</span>
              <span class="status-dot">Online</span>
            </div>
          </div>
          <button class="close-btn" @click="toggleChatWindow">×</button>
        </div>

        <div class="chat-content" ref="chatContentRef">
          <div class="message-list">
            <div v-for="(msg, index) in chatHistory" :key="index"
              :class="['msg-wrapper', msg.role === 'user' ? 'msg-user' : 'msg-bot']">
              <div class="msg-bubble animate-fade-in">
                <p>{{ msg.content }}</p>
                <span class="msg-time">{{ msg.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input-area">
          <textarea v-model="messageContent" placeholder="Type your message..." class="message-input" rows="2"
            @keyup.enter.exact.prevent="sendMessage"></textarea>
          <div class="input-footer">
            <span class="tip">Will redirect to WhatsApp</span>
            <button class="send-btn" @click="sendMessage" :disabled="!messageContent.trim() || isConnecting">
              {{ isConnecting ? 'Connecting...' : 'Send' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="chat-mask">
      <div class="chat-mask" v-if="isChatOpen" @click="toggleChatWindow"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// --- 基础状态 ---
const isClient = typeof window !== 'undefined'
const isMobile = ref(false)
const isChatOpen = ref(false)
const messageContent = ref('')
const buttonYOffset = ref(0)
const chatContentRef = ref<HTMLElement | null>(null)

// --- WebSocket & 消息状态 ---
const socket = ref<WebSocket | null>(null)
const isConnecting = ref(false)
const chatHistory = ref([
  {
    role: 'bot',
    content: "Hello! I'm your online assistant. Please leave your question and we will sync it to our support team.",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
])

// --- 核心方法：连接 WebSocket ---
const connectWebSocket = () => {
  if (!isClient || socket.value) return

  isConnecting.value = true
  // 注意：生产环境需改为 wss://yourdomain.com/chat
  socket.value = new WebSocket('ws://localhost:8080/chat')

  socket.value.onopen = () => {
    isConnecting.value = false
    console.log('WS Connected')
  }

  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    addMessage('bot', data.content)
  }

  socket.value.onclose = () => {
    isConnecting.value = false
    socket.value = null
    // 可以在此处实现简易断线重连
  }
}

// --- 核心方法：发送消息 ---
const sendMessage = () => {
  const text = messageContent.value.trim()
  if (!isClient || !text) return

  // 1. 本地展示
  addMessage('user', text)

  // 2. 通过 WebSocket 发送给 Java 后端入库
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(JSON.stringify({
      type: 'USER_INQUIRY',
      content: text,
      timestamp: Date.now()
    }))
  }

  // 3. 跳转 WhatsApp (保持你原有的逻辑)
  const phoneNumber = "+15551740096"
  const encodedMessage = encodeURIComponent(text)
  const whatsappUrl = isMobile.value
    ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`

  window.open(whatsappUrl, '_blank', 'noopener noreferrer')

  // 4. 清空输入并滚动到底部
  messageContent.value = ''
  scrollToBottom()
}

const addMessage = (role: 'user' | 'bot', content: string) => {
  chatHistory.value.push({
    role,
    content,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContentRef.value) {
    chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight
  }
}

const toggleChatWindow = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    connectWebSocket()
    scrollToBottom()
  }
}

// --- 生命周期 ---
onMounted(() => {
  if (isClient) {
    const checkMobile = () => isMobile.value = window.innerWidth <= 480
    checkMobile()
    window.addEventListener('resize', checkMobile)
  }
})

onUnmounted(() => {
  if (socket.value) socket.value.close()
})

watch(isChatOpen, (newVal) => {
  buttonYOffset.value = newVal ? -20 : 0
})
</script>

<style scoped>
/* 悬浮按钮 */
.floating-cs-button {
  position: fixed;
  right: 24px;
  top: 70%;
  display: flex;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cs-text {
  position: absolute;
  right: 100%;
  margin-right: 12px;
  background: #fff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  display: none;
}

.floating-cs-button:hover .cs-text {
  display: block;
}

/* 聊天窗口 */
.chat-window {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 380px;
  height: 550px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  z-index: 9998;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: #075e54;
  color: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 34px;
  height: 34px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-name {
  font-weight: 600;
  font-size: 15px;
}

.status-dot {
  font-size: 11px;
  opacity: 0.8;
}

.status-dot::before {
  content: '●';
  color: #25d366;
  margin-right: 4px;
}

/* 聊天内容区 */
.chat-content {
  flex: 1;
  padding: 15px;
  background: #e5ddd5;
  /* 经典 WhatsApp 背景色 */
  overflow-y: auto;
  scroll-behavior: smooth;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.msg-wrapper {
  display: flex;
  width: 100%;
}

.msg-bot {
  justify-content: flex-start;
}

.msg-user {
  justify-content: flex-end;
}

.msg-bubble {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.msg-bot .msg-bubble {
  background: white;
  color: #333;
  border-top-left-radius: 0;
}

.msg-user .msg-bubble {
  background: #dcf8c6;
  color: #333;
  border-top-right-radius: 0;
}

.msg-bubble p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-all;
}

.msg-time {
  font-size: 10px;
  color: #888;
  display: block;
  text-align: right;
  margin-top: 4px;
}

/* 输入区 */
.chat-input-area {
  padding: 10px;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
}

.message-input {
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
  resize: none;
  outline: none;
  font-size: 14px;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.tip {
  font-size: 11px;
  color: #888;
}

.send-btn {
  background: #25d366;
  color: white;
  border: none;
  padding: 6px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.send-btn:disabled {
  background: #ccc;
}

/* 动画 */
.chat-window-enter-from,
.chat-window-leave-to {
  transform: translateY(20px) scale(0.9);
  opacity: 0;
}

.chat-window-enter-active,
.chat-window-leave-active {
  transition: all 0.3s ease;
}

.chat-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9997;
}

@media (max-width: 480px) {
  .chat-window {
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
}
</style>