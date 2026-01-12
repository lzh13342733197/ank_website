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
            <div class="msg-wrapper msg-bot">
              <div class="msg-bubble animate-fade-in">
                <p>Hello! I'm your online assistant. How can I help you today?</p>
                <span class="msg-time">{{ startTime }}</span>
              </div>
            </div>

            <div v-if="!isIdentified" class="msg-wrapper msg-bot">
              <div class="msg-bubble inline-form-bubble animate-fade-in">
                <p class="form-title">To better assist you, please let us know who you are:</p>
                <div class="inline-form">
                  <input v-model="userInfo.name" type="text" placeholder="Name" class="inline-input" />
                  <input v-model="userInfo.email" type="email" placeholder="Email" class="inline-input" />
                  <button class="inline-submit-btn" :disabled="!isFormValid || isLoading" @click="submitIdentity">
                    {{ isLoading ? 'Saving...' : 'Confirm' }}
                  </button>
                </div>
              </div>
            </div>

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
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import axios from 'axios'
import SvgIcon from '@/components/SvgIcon.vue'

// --- 基础状态 ---
const isClient = typeof window !== 'undefined'
const isMobile = ref(false)
const isChatOpen = ref(false)
const isIdentified = ref(false) 
const isLoading = ref(false)
const messageContent = ref('')
const buttonYOffset = ref(0)
const chatContentRef = ref<HTMLElement | null>(null)
const startTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const userInfo = ref({ name: '', email: '' })

// --- WebSocket & 消息状态 ---
const socket = ref<WebSocket | null>(null)
const isConnecting = ref(false)
const chatHistory = ref<any[]>([])

// --- 验证逻辑 ---
const isFormValid = computed(() => {
  return userInfo.value.name.trim() !== '' && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(userInfo.value.email)
})

// --- 身份提交方法 ---
const submitIdentity = async () => {
  if (!isFormValid.value) return
  isLoading.value = true
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/contactMessage/create`, {
      name: userInfo.value.name,
      email: userInfo.value.email,
      comment: 'Online Service (Inline Form)'
    })

    if (response.data.code === 1) {
      isIdentified.value = true
      localStorage.setItem('cs_user_info', JSON.stringify(userInfo.value))
      // 提交成功后提示一下用户
      addMessage('bot', `Thank you, ${userInfo.value.name}. Your information has been synced.`)
      connectWebSocket()
    }
  } catch (error) {
    console.error('Submit identity failed:', error)
  } finally {
    isLoading.value = false
  }
}

// --- WebSocket 连接 ---
const connectWebSocket = () => {
  if (!isClient || socket.value) return
  isConnecting.value = true
  socket.value = new WebSocket(`ws://localhost:8080/chat?email=${userInfo.value.email || 'guest'}`)

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
  }
}

// --- 发送消息 ---
const sendMessage = () => {
  const text = messageContent.value.trim()
  if (!isClient || !text) return

  addMessage('user', text)

  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(JSON.stringify({
      type: 'USER_INQUIRY',
      content: text,
      timestamp: Date.now()
    }))
  }

  const phoneNumber = "+12138426868"
  const encodedMessage = encodeURIComponent(text)
  const whatsappUrl = isMobile.value
    ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`

  window.open(whatsappUrl, '_blank', 'noopener noreferrer')

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
    // 即使没填表，打开窗口也尝试连接 WS (以 guest 身份或静默连接)
    connectWebSocket()
    scrollToBottom()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('cs_user_info')
  if (saved) {
    userInfo.value = JSON.parse(saved)
    isIdentified.value = true
  }

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
/* 保持原有动画和基础布局不动 */
.floating-cs-button {
  position: fixed;
  right: 24px;
  bottom: 1%;
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

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.chat-content {
  flex: 1;
  padding: 15px;
  background: #e5ddd5;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  background: white;
  color: #333;
}

.msg-bot .msg-bubble {
  border-top-left-radius: 0;
}

.msg-user .msg-bubble {
  background: #dcf8c6;
  border-top-right-radius: 0;
}

/* 嵌入表单气泡的特殊样式 */
.inline-form-bubble {
  background: #ffffff;
  border: 1px solid #c9c3bd;
  width: 90%;
}

.form-title {
  font-weight: 600;
  margin-bottom: 10px !important;
  font-size: 13px !important;
  color: #075e54;
}

.inline-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.inline-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
}

.inline-input:focus {
  border-color: #25d366;
}

.inline-submit-btn {
  background: #25d366;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}

.inline-submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
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