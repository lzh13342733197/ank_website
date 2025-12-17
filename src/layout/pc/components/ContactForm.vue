<template>
  <div class="contact-container">
    <!-- 左侧公司信息区域 -->
    <div class="info-section">
      <h1 class="company-title">{{ $t('contact.companyTitle') }}</h1>
      <p class="desc">{{ $t('contact.description') }}</p>
      <div class="info-item">
        <span class="icon location-icon ">
          <svgIcon color="#fff" size="20" name="地址" />
          <div class="cricleLine"></div>
        </span>
        <div class="info-text">
          <span class="label">{{ $t('contact.address') }}</span>
          <span >{{ $t('contact.addressDetail') }}</span>
        </div>
      </div>
      <!-- <div class="info-item">
        <span class="icon phone-icon ">
          <svgIcon color="#fff" size="20" name="电话" />
          <div class="cricleLine"></div>
        </span>
        <div class="info-text">
          <span class="label">{{ $t('contact.contactInfo') }}</span>
          <span>+852-27896065</span>
        </div>
      </div> -->
      <div class="info-item">
        <span class="icon email-icon ">
          <svgIcon color="#fff" size="20" name="邮箱" />
        </span>
        <div class="info-text">
          <span class="label">{{ $t('contact.email') }}</span>
          <span>sales@ankbit.com</span>
        </div>
      </div>
    </div>
    <!-- 右侧表单区域 -->
    <div class="form-section">
      <div class="form-title">INQUIRY</div>
      <form @submit.prevent="handleSubmit">
        <!-- <div class="row">
          <div class="form-item">
            <input type="text" v-model="formData.Contact" :placeholder="$t('contact.form.name')" class="input-field" />
            <p class="error-msg" v-if="errors.Contact">{{ $t('contact.form.required') }}</p>
          </div>
          <div class="form-item">
            <input type="text" v-model="formData.phone" :placeholder="$t('contact.form.phone')" class="input-field" />
            <p class="error-msg" v-if="errors.phone">{{ $t('contact.form.required') }}</p>
          </div>
          <div class="form-item">
            <input type="text" v-model="formData.email" :placeholder="$t('contact.form.email')" class="input-field" />
            <p class="error-msg" v-if="errors.email">{{ $t('contact.form.required') }}</p>
          </div>
        </div> -->
        <div class="form-item">
         <input type="text" v-model="formData.Contact" :placeholder="$t('contact.form.Contact')" class="input-field" />
            <p class="error-msg" v-if="errors.Contact">{{ $t('contact.form.required') }}</p>
        </div>
        <div class="form-item">
          <input type="text" v-model="formData.Email" :placeholder="$t('contact.form.Email')" class="input-field" />
          <p class="error-msg" v-if="errors.Email">{{ $t('contact.form.required') }}</p>
        </div>
        <div class="form-item">
          <input type="text" v-model="formData.Address" :placeholder="$t('contact.form.Address')" class="input-field" />
          <p class="error-msg" v-if="errors.Address">{{ $t('contact.form.required') }}</p>
        </div>
        <div class="form-item">
          <textarea v-model="formData.message" :placeholder="$t('contact.form.message')"
            class="textarea-field"></textarea>
        </div>
        <button type="submit" class="submit-btn">{{ $t('contact.form.submit') }}</button>
        <p class="general-error" v-if="generalError">{{ $t('contact.form.generalError') }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import svgIcon from '@/components/SvgIcon.vue'
// 表单数据
const formData = ref({
  Contact: '',
  Email: '',
  Address: '',
  message: ''
});
// 错误信息
const errors = ref({
  Contact: false,
  Email: false,
  Address: false,
});
// 整体错误提示
const generalError = ref(false);

// 表单提交处理
const handleSubmit = () => {
  // 重置错误状态
  errors.value = {
    Contact: !formData.value.Contact.trim(),
    message: !formData.value.message.trim(),
    Email: !formData.value.Email.trim(),
    Address: !formData.value.Address.trim(),
  };
  // 判断是否有错误
  const hasError = Object.values(errors.value).some((val) => val);
  generalError.value = hasError;
  if (!hasError) {
    // 这里可添加实际提交逻辑，比如调用接口，现在仅做示例
    console.log('表单数据：', formData.value);
    // 提交成功后可重置表单（可选）
    formData.value = {
      Contact: '',
      Email: '',
      Address: '',
      message: ''
    };
    generalError.value = false;
  }
};
</script>

<style scoped>
/* 容器样式 */
.contact-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

/* 左侧信息区域 */
.info-section {
  flex: 1 1 400px;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
}

.company-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.desc {
  margin-bottom: 30px;
  line-height: 1.6;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.icon {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f7b731;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-right: 15px;
  position: relative;
}

.cricleLine {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 1px;
  height: 100%;
  background: repeating-linear-gradient(to bottom,
      #ccc,
      #ccc 1px,
      transparent 2px,
      transparent 4px);
  transform: translateX(-50%);
}

.info-text {
  line-height: 1.6;

  &>span:nth-child(2) {
    color: #8d8d8d;
    font-size: 12px;
  }
}

.label {
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
}

/* 右侧表单区域 */
.form-section {
  flex: 1 1 400px;
  background-color: #f8f8f8;
  padding: 40px;
  box-sizing: border-box;
  margin-top: 10px;
}
.form-title{
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.form-item {
  flex: 1 1 calc(33.333% - 20px);
  min-width: 200px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
}

.textarea-field {
  height: 120px;
  resize: vertical;
}

.submit-btn {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #555;
}

.error-msg {
  color: #0095d7;
  margin: 0;
  font-size: 14px;
}

.general-error {
  color: #333;
  background-color: #ffe6b3;
  border: 1px solid #f7b731;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}

/* 响应式适配 */
@media (max-width: 768px) {

  .info-section,
  .form-section {
    flex: 1 1 100%;
  }
}
</style>
