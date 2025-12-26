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
              <h2 class="success-title">{{ $t('contact.form.submitSuccessTitle') || 'Submitted Successfully!' }}</h2>
              <p class="success-desc">{{ $t('contact.form.submitSuccessDesc') || 'Thank you for your inquiry. We will get back to you soon.' }}</p>
            </div>
          </div>
          <div class="success-footer">
            <button @click="resetForm" class="continue-btn">
              {{ $t('contact.form.continue') || 'Continue' }}
            </button>
          </div>
        </div>

        <div v-else key="form" class="form-view">
          <div class="form-title">{{ $t('contact.inquiry') }}</div>
          <form @submit.prevent="handleSubmit">
            <div class="form-item">
              <p class="form-item-label-top">{{ $t('contact.form.productLabel') || 'Select Products (Multiple)' }}</p>
              <div class="product-selection-grid">
                <div v-for="item in productList" :key="item.id" class="product-card"
                  :class="{ 'is-selected': formData.productIds.includes(item.id) }" @click="toggleProduct(item.id)">
                  <div class="card-checkbox">
                    <div class="check-inner" v-if="formData.productIds.includes(item.id)"></div>
                  </div>
                  <img :src="item.imageUrls[0]" class="card-img" alt="product" />
                  <div class="card-info">
                    <p class="card-name">{{ item.name }}</p>
                  </div>
                </div>
              </div>
              <p class="error-msg no-padding" v-if="errors.productIds">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.ContactLabel') }}</p>
                <input type="text" v-model="formData.Name" :placeholder="$t('contact.form.Contact')" class="input-field" />
              </div>
              <p class="error-msg" v-if="errors.Name">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.EmailLabel') }}</p>
                <input type="text" v-model="formData.Email" :placeholder="$t('contact.form.Email')" class="input-field" />
              </div>
              <p class="error-msg" v-if="errors.Email">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.quantityLabel') }}</p>
                <div class="input-with-unit">
                  <input type="number" v-model="formData.quantity" placeholder="0" class="input-field no-margin" min="1" />
                  <span class="unit-text">{{ $t('contact.form.pieceLabel') }}</span>
                </div>
              </div>
              <p class="error-msg" v-if="errors.quantity">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.AddressLabel') }}</p>
                <input type="text" v-model="formData.Address" :placeholder="$t('contact.form.Address')"
                  class="input-field" />
              </div>
              <p class="error-msg" v-if="errors.Address">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.messageLabel') }}</p>
                <textarea v-model="formData.message" :placeholder="$t('contact.form.message')"
                  class="textarea-field" style="height: 100px;"></textarea>
              </div>
              <p class="error-msg" v-if="errors.message">{{ $t('contact.form.required') }}</p>
            </div>

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.verificationCodeLabel') }}</p>
                <div style="display: flex; width: 100%; gap: 10px;">
                  <input type="text" v-model="formData.captcha" :placeholder="$t('contact.form.captcha')"
                    class="input-field" style="margin-bottom: 0px;" />
                  <img :src="state.captchaUrl" alt="验证码" class="captcha-image" @click="getCaptchaUrl" />
                </div>
              </div>
              <p class="error-msg" v-if="errors.captcha">{{ $t('contact.form.captchaError') }}</p>
            </div>

            <div style="text-align: right; display: flex; justify-content: flex-end; margin-top: 20px;">
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
import { ref, reactive, onMounted, watch } from 'vue';
import svgIcon from '@/components/SvgIcon.vue'
import { getUuid } from '@/utils/utils'
import { useFetchWithLanguage } from '@/utils/http'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { getCurrentLang } from '@/locales'

const { t, locale } = useI18n()
const submitSuccess = ref(false);

const formData = ref({
  productIds: [],
  Name: '',
  Email: '',
  quantity: '',
  Address: '',
  message: '',
  captcha: '',
  uuid: ''
});

const productList = ref([]);
const errors = ref({
  productIds: false, Name: false, Email: false, quantity: false, Address: false, message: false, captcha: false,
});
const state = reactive({ captchaUrl: '' });
const generalError = ref(false);

const getCaptchaUrl = () => {
  formData.value.uuid = getUuid();
  state.captchaUrl = `${import.meta.env.VITE_API_URL}/captcha?uuid=${formData.value.uuid}`;
};

const resetForm = () => {
  formData.value = { productIds: [], Name: '', Email: '', quantity: '', Address: '', message: '', captcha: '', uuid: '' };
  errors.value = { productIds: false, Name: false, Email: false, quantity: false, Address: false, message: false, captcha: false };
  submitSuccess.value = false;
  getCaptchaUrl();
};

const toggleProduct = (id) => {
  const index = formData.value.productIds.indexOf(id);
  index > -1 ? formData.value.productIds.splice(index, 1) : formData.value.productIds.push(id);
};

const getProductMsg = async () => {
  try {
    const data = await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/product/getProductSpuList`, {});
    productList.value = data || [];
  } catch (error) { console.error('Failed to fetch product list:', error); }
}

const handleSubmit = async () => {
  errors.value = {
    productIds: formData.value.productIds.length === 0,
    Name: !formData.value.Name.trim(),
    Email: !formData.value.Email.trim(),
    quantity: !String(formData.value.quantity).trim(),
    Address: !formData.value.Address.trim(),
    message: !formData.value.message.trim(),
    captcha: !formData.value.captcha.trim(),
  };
  const hasError = Object.values(errors.value).some((val) => val);
  generalError.value = hasError;
  if (!hasError) {
    const submitData = {
      productSpuld: formData.value.productIds.join(','),
      name: formData.value.Name,
      email: formData.value.Email,
      address: formData.value.Address,
      comment: formData.value.message,
      captcha: formData.value.captcha,
      uuid: formData.value.uuid,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/contactMessage/create`, submitData, {
        headers: { 'Accept-Language': getCurrentLang(), 'Content-Type': 'application/json' },
      });
      if (response.data.code === 1) {
        submitSuccess.value = true;
        generalError.value = false;
      } else {
        getCaptchaUrl();
        alert(response.data.msg);
      }
    } catch (error) { alert("Submission failed."); }
  }
};

onMounted(() => { getCaptchaUrl(); getProductMsg(); });
watch(() => locale.value, () => { getProductMsg() })
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: stretch; /* 让左右两边高度对齐 */
}

.info-section {
  flex: 1 1 400px;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
}

.form-section {
  flex: 1 1 400px;
  background-color: #f8f8f8;
  padding: 40px;
  box-sizing: border-box;
  /* 关键点：设置一个合理的最小高度，防止切换时坍塌 */
  min-height: 850px; 
  display: flex;
  flex-direction: column;
}

.form-view {
  width: 100%;
}

/* 成功视图样式修正 */
.success-view {
  display: flex;
  flex-direction: column;
  flex: 1; /* 撑满父容器高度 */
}

.success-inner {
  flex: 1;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
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

/* 基础表单样式保持 */
.form-item { margin-bottom: 15px; }
.form-item-label-top { font-size: 14px; font-weight: bold; margin-bottom: 10px; }
.product-selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 10px;
  max-height: 350px;
  overflow-y: auto;
  padding: 10px;
  background: #fff;
  border: 1px solid #eee;
}

.product-card {
  border: 1px solid #eee;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
}
.product-card.is-selected { border-color: #0095d7; background: #f0faff; }
.card-img { width: 80px; height: 80px; object-fit: contain; }
.card-name { font-size: 12px; margin-top: 5px; color: #333; }

.form-item-row { display: flex; align-items: center; gap: 10px; }
.form-item-label { min-width: 100px; font-size: 14px; }
.input-field, .textarea-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.error-msg { color: #0095d7; font-size: 12px; margin-top: 5px; padding-left: 110px; }
.error-msg.no-padding { padding-left: 0; }
.captcha-image { height: 40px; width: 100px; cursor: pointer; }
.submit-btn { background: #333; color: #fff; padding: 10px 30px; border: none; cursor: pointer; }

@media (max-width: 768px) {
  .form-section { min-height: auto; }
  .form-item-row { flex-direction: column; align-items: flex-start; }
  .error-msg { padding-left: 0; }
}
</style>