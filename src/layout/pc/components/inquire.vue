<template>
  <div class="consult-form-container">
    <form @keyup.enter.prevent="handleSubmit">
      <h2 class="form-title">{{ $t('productDetail.inquireForm') }}</h2>

      <!-- 联系人 -->
      <div class="form-item">
        <label class="form-label">{{ $t('productDetail.contact') }}:</label>
        <input
          v-model.trim="formData.contact"
          type="text"
          class="form-input"
          :class="{ error: errors.contact }"
          :placeholder="$t('productDetail.contactInfo')"
          autofocus
          @input="errors.contact = ''"
        />
        <p v-if="errors.contact" class="error-text">{{ errors.contact }}</p>
      </div>

      <!-- 电话 / 邮箱 -->
      <div class="form-item">
        <label class="form-label">{{ $t('productDetail.email') }}:</label>
        <input
          v-model.trim="formData.contactInfo"
          type="text"
          class="form-input"
          :class="{ error: errors.contactInfo }"
          :placeholder="$t('productDetail.emailInfo')"
          @input="errors.contactInfo = ''"
        />
        <p v-if="errors.contactInfo" class="error-text">{{ errors.contactInfo }}</p>
      </div>

      <!-- 咨询内容 -->
      <div class="form-item">
        <label class="form-label">{{ $t('productDetail.requirements') }}:</label>
        <textarea
          v-model="formData.content"
          class="form-textarea"
          :class="{ error: errors.content }"
          :placeholder="$t('productDetail.requirementsInfo')"
          maxlength="250"
          @input="errors.content = ''"
          @keyup.enter.stop
        ></textarea>
        <p v-if="errors.content" class="error-text">{{ errors.content }}</p>
      </div>

      <!-- 验证码 -->
      <div class="form-item captcha-group">
        <label class="form-label">{{ $t('productDetail.verificationCode') }}:</label>
        <div class="captcha-wrap">
          <img :src="state.captchaUrl" alt="验证码" class="captcha-image" @click="getCaptchaUrl" />
          <input
            v-model.trim="formData.captcha"
            type="text"
            class="form-input captcha-input"
            :class="{ error: errors.captcha }"
            :placeholder="$t('productDetail.verificationCode')"
            @input="errors.captcha = ''"
          />
        </div>
        <p v-if="errors.captcha" class="error-text">{{ errors.captcha }}</p>
      </div>

      <!-- 提交按钮 -->
      <button type="button" class="submit-btn" @click="handleSubmit">
        {{ $t('productDetail.submit') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive ,onMounted} from 'vue'
import { useI18n } from 'vue-i18n'
import { getUuid } from '@/utils/utils'
const { t } = useI18n()

/** 向父组件抛出提交事件 */
const emit = defineEmits(['formSubmit'])
const state = reactive({
  captchaUrl: ''
})
/** 表单数据 */
const formData = reactive({
  contact: '',
  contactInfo: '',
  content: '',
  captcha: ''
})

/** 错误信息 */
const errors = reactive({
  contact: '',
  contactInfo: '',
  content: '',
  captcha: ''
})
const getCaptchaUrl = () => {
  formData.uuid = getUuid();
  state.captchaUrl = `https://boss.yeemall.com:9080/ym/captcha?uuid=${formData.uuid}`;
};
/** 提交处理 */
const handleSubmit = () => {
  let valid = true

  // 清空历史错误
  Object.keys(errors).forEach(key => (errors[key] = ''))

  if (!formData.contact) {
    errors.contact = t('productDetail.contactInfo')
    valid = false
  }

  if (!formData.contactInfo) {
    errors.contactInfo = t('productDetail.emailInfo')
    valid = false
  }

  if (!formData.content) {
    errors.content = t('productDetail.requirementsInfo')
    valid = false
  }

  if (formData.captcha !== '2612') {
    errors.captcha = t('productDetail.verificationCodeInfo')
    valid = false
  }

  if (!valid) return

  emit('formSubmit', { ...formData })

  // 重置表单
  Object.keys(formData).forEach(key => (formData[key] = ''))
}
onMounted(() => {
  getCaptchaUrl();
});
</script>

<style scoped>
.consult-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.consult-form-container form {
  padding: 0 30px 30px 30px;
  background: #fff;
  border-radius: 12px;
  /* box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08); */
}

.form-title {
  text-align: center;
  color: #2196f3;
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 600;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
  font-weight: 500;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #ef4444;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;
}

.captcha-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}
.captcha-image {
  width: 120px;
  height: 40px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.captcha-image:hover {
  opacity: 0.8;
}

.captcha-code {
  min-width: 80px;
  padding: 12px 15px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  color: #2196f3;
  user-select: none;
}

.captcha-input {
  flex: 1;
}

.error-text {
  margin-top: 6px;
  font-size: 12px;
  color: #ef4444;
  line-height: 1.4;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #1976d2;
}

.submit-btn:active {
  background-color: #1565c0;
}

@media (max-width: 768px) {
  .consult-form-container form {
    padding: 0 20px 20px 20px;
  }

  .form-title {
    font-size: 20px;
  }
}
</style>
