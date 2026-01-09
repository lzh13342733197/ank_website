<template>
  <div class="contact-container">
    <div class="info-section">
      <h1 class="company-title">{{ $t('contact.companyTitle') }}</h1>
      <p class="desc">{{ $t('contact.description') }}</p>
      
      <div class="info-item">
        <span class="icon location-icon">
          <svgIcon color="#fff" size="20" name="地址" />
          <div class="cricleLine"></div>
        </span>
        <div class="info-text">
          <span class="label">{{ $t('contact.address') }}</span>
          <span>{{ $t('contact.addressDetail') }}</span>
        </div>
      </div>

      <div class="info-item">
        <span class="icon email-icon">
          <svgIcon color="#fff" size="20" name="邮箱" />
        </span>
        <div class="info-text">
          <span class="label">{{ $t('contact.email') }}</span>
          <span>sales@ankbit.com</span>
        </div>
      </div>
    </div>

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
                <p class="form-item-label">{{ $t('contact.form.ContactLabel') }}</p>
                <input type="text" v-model="formData.Name" :placeholder="$t('contact.form.Contact')"
                  class="input-field" />
              </div>
              <p class="error-msg" v-if="errors.Name">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.EmailLabel') }}</p>
                <input type="text" v-model="formData.Email" :placeholder="$t('contact.form.Email')"
                  class="input-field" />
              </div>
              <p class="error-msg" v-if="errors.Email">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.messageLabel') }}</p>
                <textarea v-model="formData.message" :placeholder="$t('contact.form.message')" class="textarea-field"
                  style="height: 150px;"></textarea>
              </div>
              <p class="error-msg" v-if="errors.message">{{ $t('contact.form.required') }}</p>
            </div>

            <div style="text-align: right; display: flex; justify-content: flex-end; margin-top: 30px;">
              <button type="submit" class="submit-btn">{{ $t('contact.form.submit') }}</button>
            </div>
            
            <p class="general-error" v-if="generalError">{{ $t('contact.form.generalError') }}</p>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import svgIcon from '@/components/SvgIcon.vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { getCurrentLang } from '@/locales'

const { t } = useI18n()
const submitSuccess = ref(false);
const generalError = ref(false);

const formData = ref({
  Name: '',
  Email: '',
  message: '',
});

const errors = ref({
  Name: false,
  Email: false,
  message: false,
});

const resetForm = () => {
  formData.value = { Name: '', Email: '', message: '' };
  errors.value = { Name: false, Email: false, message: false };
  submitSuccess.value = false;
  generalError.value = false;
};

const handleSubmit = async () => {
  // 基础非空校验
  errors.value = {
    Name: !formData.value.Name.trim(),
    Email: !formData.value.Email.trim(),
    message: !formData.value.message.trim(),
  };

  const hasError = Object.values(errors.value).some((val) => val);
  generalError.value = hasError;

  if (!hasError) {
    const submitData = {
      name: formData.value.Name,
      email: formData.value.Email,
      comment: formData.value.message,
    };
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/contactMessage/create`, submitData, {
        headers: { 
          'Accept-Language': getCurrentLang(), 
          'Content-Type': 'application/json' 
        },
      });
      
      if (response.data.code === 1) {
        submitSuccess.value = true;
        generalError.value = false;
      } else {
        alert(response.data.msg || "Submission failed.");
      }
    } catch (error) {
      alert("Submission failed. Please try again later.");
    }
  }
};
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: stretch;
}

.info-section {
  width: 650px;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
}

.form-section {
  flex: 1;
  background-color: #f8f8f8;
  padding: 40px;
  box-sizing: border-box;
  min-height: 600px; /* 去掉验证码后高度可适当减小 */
  display: flex;
  flex-direction: column;
}

/* 成功页样式 */
.success-view {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.success-inner {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-content {
  text-align: center;
}

.success-icon {
  width: 70px;
  height: 70px;
  background-color: #0095d7;
  color: white;
  border-radius: 50%;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
}

.success-title {
  font-size: 26px;
  color: #333;
  margin-bottom: 15px;
}

.success-desc {
  font-size: 16px;
  color: #666;
  max-width: 300px;
  margin: 0 auto;
  line-height: 1.6;
}

.success-footer {
  text-align: right;
  margin-top: 20px;
}

.continue-btn {
  background-color: #333;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.continue-btn:hover {
  background-color: #0095d7;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.form-title {
  font-size: 26px;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
}

/* 表单元素布局 */
.form-item {
  margin-bottom: 20px;
}

.form-item-row {
  display: flex;
  align-items: center; /* 改为对齐顶部，适配textarea */
  gap: 10px;
}

.form-item-label {
  min-width: 100px;
  font-size: 14px;
}

.input-field,
.textarea-field {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #0095d7;
}

.error-msg {
  color: #0095d7;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 110px;
}

.general-error {
  color: #0095d7;
  font-size: 14px;
  text-align: right;
  margin-top: 10px;
}

.submit-btn {
  background: #333;
  color: #fff;
  padding: 12px 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #0095d7;
}

/* 响应式适配 */
@media (max-width: 1200px) {
  .info-section {
    width: 100% !important;
  }
}

@media (max-width: 768px) {
  .form-section {
    width: 100%;
    min-height: auto;
    padding: 30px 15px;
  }

  .form-item-row {
    flex-direction: column;
    align-items: stretch;
    gap: 5px;
  }

  .form-item-label {
    min-width: auto;
    padding-top: 0;
    margin-bottom: 5px;
  }

  .input-field,
  .textarea-field {
    -webkit-appearance: none;
    width: 100% !important;
    box-sizing: border-box;
    font-size: 16px; /* 防止 iOS 缩放 */
  }

  .error-msg {
    padding-left: 0;
  }

  .form-title {
    font-size: 22px;
    margin-bottom: 25px;
  }
}
</style>