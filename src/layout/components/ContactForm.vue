<template>
  <div class="contact-wrapper">
    <div class="contact-main-card">
      
      <div class="info-section">
        <h1 class="company-title">{{ $t('contact.companyTitle') }}</h1>
        <p class="company-desc">{{ $t('contact.description') }}</p>
        
        <div class="contact-list">
          <div class="contact-item">
            <div class="icon-box">
              <svgIcon color="#fff" size="20" name="地址" />
            </div>
            <div class="info-text">
              <label class="item-label">{{ $t('contact.address') }}</label>
              <span class="item-value">{{ $t('contact.addressDetail') }}</span>
            </div>
          </div>

          <div class="contact-item">
            <div class="icon-box">
              <svgIcon color="#fff" size="20" name="邮箱" />
            </div>
            <div class="info-text">
              <label class="item-label">{{ $t('contact.email') }}</label>
              <span class="item-value">sales@ankbit.com</span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-section">
        <transition name="fade-slide" mode="out-in">
          <div v-if="submitSuccess" key="success" class="success-view">
            <div class="success-content">
              <div class="success-icon-circle">✓</div>
              <h2 class="success-title">{{ $t('contact.form.submitSuccessTitle') }}</h2>
              <p class="success-desc">{{ $t('contact.form.submitSuccessDesc') }}</p>
              <button @click="resetForm" class="continue-btn">
                {{ $t('contact.form.continue') || 'Continue' }}
              </button>
            </div>
          </div>

          <div v-else key="form" class="form-view">
            <h2 class="form-title">{{ $t('contact.inquiry') }}</h2>
            <form @submit.prevent="handleSubmit">
              
              <div class="form-group" :class="{ 'has-error': errors.Name }">
                <p class="form-label">{{ $t('contact.form.ContactLabel') }}</p>
                <input type="text" v-model="formData.Name" :placeholder="$t('contact.form.Contact')" class="input-field" />
                <p class="error-msg" v-if="errors.Name">{{ $t('contact.form.required') }}</p>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.Email }">
                <p class="form-label">{{ $t('contact.form.EmailLabel') }}</p>
                <input type="email" v-model="formData.Email" :placeholder="$t('contact.form.Email')" class="input-field" />
                <p class="error-msg" v-if="errors.Email">{{ $t('contact.form.required') }}</p>
              </div>

              <div class="form-group" :class="{ 'has-error': errors.message }">
                <p class="form-label">{{ $t('contact.form.messageLabel') }}</p>
                <textarea v-model="formData.message" :placeholder="$t('contact.form.message')" class="textarea-field"></textarea>
                <p class="error-msg" v-if="errors.message">{{ $t('contact.form.required') }}</p>
              </div>

              <div class="form-footer">
                <p class="general-error" v-if="generalError">{{ $t('contact.form.generalError') }}</p>
                <button type="submit" class="submit-btn">{{ $t('contact.form.submit') }}</button>
              </div>
            </form>
          </div>
        </transition>
      </div>
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

const formData = ref({ Name: '', Email: '', message: '' });
const errors = ref({ Name: false, Email: false, message: false });

const resetForm = () => {
  formData.value = { Name: '', Email: '', message: '' };
  errors.value = { Name: false, Email: false, message: false };
  submitSuccess.value = false;
  generalError.value = false;
};

const handleSubmit = async () => {
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
/* 响应式大容器 */
.contact-wrapper {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

/* 聚合卡片：让布局不再散乱 */
.contact-main-card {
  display: flex;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  min-height: 650px;
}

/* 左侧信息区 */
.info-section {
  flex: 1;
  background-color: #fcfcfc;
  padding: 60px 40px;
  border-right: 1px solid #eee;
}

.company-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.company-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 50px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

/* 图标容器修复：确保图标能显示 */
.icon-box {
  width: 44px;
  height: 44px;
  background-color: #0095d7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* 防止被文字挤压变小 */
}

.info-text {
  display: flex;
  flex-direction: column;
}

.item-label {
  font-size: 13px;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.item-value {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
}

/* 右侧表单区 */
.form-section {
  flex: 1;
  padding: 60px 50px;
  background-color: #fff;
}

.form-title {
  font-size: 26px;
  color: #333;
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #444;
}

.form-label::after {
  content: " *";
  color: #0095d7;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  transition: all 0.3s;
  box-sizing: border-box; /* 确保 padding 不增加总宽度 */
}

/* 修复留言高度 */
.textarea-field {
  min-height: 160px; /* 高度在这里设置 */
  resize: vertical;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #0095d7;
  box-shadow: 0 0 0 3px rgba(0, 149, 215, 0.1);
}

.error-msg {
  color: #0095d7;
  font-size: 12px;
  margin-top: 6px;
}

.form-footer {
  margin-top: 30px;
  text-align: right;
}

.submit-btn {
  background: #333;
  color: #fff;
  padding: 14px 50px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #0095d7;
  transform: translateY(-2px);
}

/* 成功视图 */
.success-view {
  text-align: center;
  padding: 40px 0;
}

.success-icon-circle {
  width: 80px;
  height: 80px;
  background-color: #0095d7;
  color: #fff;
  border-radius: 50%;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
}

.continue-btn {
  background: #333;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 30px;
}

/* 动画 */
.fade-slide-enter-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* 响应式 */
@media (max-width: 1024px) {
  .contact-main-card {
    flex-direction: column;
  }
  .info-section {
    flex: none;
    width: 100%;
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .contact-wrapper {
    margin: 20px auto;
  }
  .form-section {
    padding: 40px 20px;
  }
  .submit-btn {
    width: 100%;
  }
}
</style>