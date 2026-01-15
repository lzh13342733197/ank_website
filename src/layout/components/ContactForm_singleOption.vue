<template>
  <div class="contact-container">
    <div class="form-section">
      <transition name="fade" mode="out-in">
        <div v-if="submitSuccess" key="success" class="success-view">
          <div class="success-inner">
            <div class="success-content">
              <div class="success-icon">✓</div>
              <h2 class="success-title">{{ $t('contact.form.submitSuccessTitle') }}</h2>
              <p class="success-desc">{{ $t('contact.form.submitSuccessDesc') }}</p>
            </div>
          </div>
          <div class="success-footer">
            <button @click="resetForm" class="continue-btn">
              {{ $t('contact.form.continue') || 'Continue' }}
            </button>
          </div>
        </div>

        <div v-else key="form" class="form-view">
          <h1 class="form-title">{{ $t('contact.inquiry') }}</h1>
          <form @submit.prevent="handleSubmit">
            
            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.productLabel') || 'Product' }}</p>
                <select v-model="formData.productId" class="input-field select-field">
                  <option value="">{{ $t('contact.form.selectPlaceholder') || 'Please select a product' }}</option>
                  <option v-for="item in productList" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.ContactLabel') }}</p>
                <input
                  type="text"
                  v-model="formData.Name"
                  :placeholder="$t('contact.form.Contact')"
                  class="input-field"
                />
              </div>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label form-item-required">{{ $t('contact.form.EmailLabel') }}</p>
                <input
                  type="text"
                  v-model="formData.Email"
                  :placeholder="$t('contact.form.Email')"
                  class="input-field"
                />
              </div>
              <p class="error-msg" v-if="errors.Email">
                {{ $t('contact.form.required') }}
              </p>
            </div>

            <div class="form-item">
              <div class="form-item-row align-start">
                <p class="form-item-label">{{ $t('contact.form.messageLabel') }}</p>
                <textarea
                  v-model="formData.message"
                  :placeholder="$t('contact.form.message')"
                  class="textarea-field"
                ></textarea>
              </div>
            </div>

            <div class="form-footer">
              <button type="submit" class="submit-btn">
                {{ $t('contact.form.submit') }}
              </button>
            </div>

            <p class="general-error" v-if="generalError">
              {{ $t('contact.form.generalError') }}
            </p>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { getCurrentLang } from '@/locales'

const props = defineProps({
  productSpuId: {
    type: String,
    default: ''
  }
})

const { t, locale } = useI18n()
const submitSuccess = ref(false)
const generalError = ref(false)
const productList = ref([])

const formData = ref({
  productId: '',
  Name: '',
  Email: '',
  message: ''
})

/* 仅 Email 校验 */
const errors = ref({
  Email: false,
})

const getProductMsg = async () => {
  try {
    const data = await useFetchWithLanguage.post(
      `${import.meta.env.VITE_API_URL}/product/getProductSpuList`,
      {}
    )
    productList.value = data || []
  } catch (error) {
    console.error('Failed to fetch product list:', error)
  }
}

const resetForm = () => {
  formData.value = {
    productId: '',
    Name: '',
    Email: '',
    message: ''
  }
  errors.value = { Email: false }
  submitSuccess.value = false
  generalError.value = false
}

const handleSubmit = async () => {
  errors.value = {
    Email: !formData.value.Email.trim(),
  }

  generalError.value = errors.value.Email

  if (!generalError.value) {
    const submitData = {
      productSpuld: formData.value.productId,
      name: formData.value.Name,
      email: formData.value.Email,
      comment: formData.value.message,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contactMessage/create`,
        submitData,
        {
          headers: {
            'Accept-Language': getCurrentLang(),
            'Content-Type': 'application/json'
          },
        }
      )

      if (response.data.code === 1) {
        submitSuccess.value = true
        generalError.value = false
      } else {
        alert(response.data.msg)
      }
    } catch (error) {
      alert('Submission failed.')
    }
  }
}

onMounted(() => {
  getProductMsg()
  if (props.productSpuId) {
    formData.value.productId = props.productSpuId
  }
})

watch(() => locale.value, () => {
  getProductMsg()
})
</script>

<style scoped>
/* 基础 PC 样式 */
.contact-container {
  width: 100%;
}

.form-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
}

.form-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
}

.form-item {
  margin-bottom: 25px;
}

.form-item-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.form-item-row.align-start {
  align-items: flex-start;
}

.form-item-label {
  min-width: 100px;
  font-size: 15px;
  color: #333;
  font-weight: 500;
}
.form-item-required:after {
  content: '*';
  color: #f00;
  margin-left: 4px;
}
.input-field,
.textarea-field {
  flex: 1;
  width: 100%; /* 确保在 flex 下撑满 */
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background: #fff;
  box-sizing: border-box; /* 关键：防止 padding 撑破容器 */
}

.select-field {
  cursor: pointer;
  appearance: auto;
  max-width: 100%; /* 防止长内容溢出 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.textarea-field {
  height: 120px;
  resize: vertical;
}

.error-msg {
  color: #0095d7;
  font-size: 12px;
  padding-left: 115px;
  margin-top: 5px;
}

.form-footer {
  text-align: right;
  margin-top: 30px;
}

.submit-btn {
  background: #333;
  color: #fff;
  padding: 12px 60px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #0095d7;
}

/* ---------------------------------------------------
   移动端适配 (针对手机屏幕优化)
--------------------------------------------------- */
@media (max-width: 768px) {
  .form-section {
    padding: 20px 15px;
  }

  .form-title {
    font-size: 20px;
    margin-bottom: 25px;
  }

  .form-item-row {
    flex-direction: column; /* 手机端：Label 在上方，输入框在下方 */
    align-items: flex-start;
    gap: 8px;
  }

  .form-item-label {
    min-width: unset;
    font-size: 14px;
  }

  .input-field, .textarea-field {
    width: 100% !important; /* 强制占满一整行 */
    font-size: 16px; /* 移动端 16px 防止 iOS 输入时自动缩放页面 */
  }

  .error-msg {
    padding-left: 0; /* 错误信息左侧不再留出 Label 的宽度 */
    margin-top: 4px;
  }

  .submit-btn {
    width: 100%; /* 按钮在手机端占满宽度 */
    padding: 14px;
  }
}

/* 动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>