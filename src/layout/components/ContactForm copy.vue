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
              <p class="form-item-label-top">{{ $t('contact.form.productLabel') || 'Select Product' }}</p>
              <div class="product-selection-grid">
                <div v-for="item in productList" :key="item.id" class="product-card"
                  :class="{ 'is-selected': formData.productId === item.id }" @click="selectProduct(item.id)">
                  <div class="card-checkbox radio-mode">
                    <div class="radio-inner" v-if="formData.productId === item.id"></div>
                  </div>
                  <img :src="item.imageUrls[0]" class="card-img" alt="product" />
                  <div class="card-info">
                    <p class="card-name">{{ item.name }}</p>
                  </div>
                </div>
              </div>
              <p class="error-msg no-padding" v-if="errors.productId">{{ $t('contact.form.required') }}</p>
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
                <p class="form-item-label">{{ $t('contact.form.ContactLabel') }}</p>
                <input type="text" v-model="formData.Name" :placeholder="$t('contact.form.Contact')"
                  class="input-field" />
              </div>
              <p class="error-msg" v-if="errors.Name">{{ $t('contact.form.required') }}</p>
            </div>



            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.quantityLabel') }}</p>
                <div class="input-with-unit">
                  <input type="number" v-model="formData.quantity" placeholder="0" class="input-field no-margin"
                    min="1" />
                  <span class="unit-text" style="padding-left: 5px;">{{ $t('contact.form.pieceLabel') }}</span>
                </div>
              </div>
              <p class="error-msg" v-if="errors.quantity">{{ $t('contact.form.required') }}</p>
            </div>

            <!-- <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.AddressLabel') }}</p>
                <input type="text" v-model="formData.Address" :placeholder="$t('contact.form.Address')"
                  class="input-field" />
              </div>
              <p class="error-msg" v-if="errors.Address">{{ $t('contact.form.required') }}</p>
            </div> -->

            <div class="form-item">
              <div class="form-item-row">
                <p class="form-item-label">{{ $t('contact.form.messageLabel') }}</p>
                <textarea v-model="formData.message" :placeholder="$t('contact.form.message')" class="textarea-field"
                  style="height: 100px;"></textarea>
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
  productId: '', // 修改为单选字符串
  Name: '',
  Email: '',
  quantity: '',
  // Address: '',
  message: '',
  captcha: '',
  uuid: ''
});

const productList = ref([]);
const errors = ref({
  // 改为单选校验
  // Name: false,
  Email: false,
  // quantity: false,
  // Address: false,
  message: false,
  captcha: false,
});
const state = reactive({ captchaUrl: '' });
const generalError = ref(false);

const getCaptchaUrl = () => {
  formData.value.uuid = getUuid();
  state.captchaUrl = `${import.meta.env.VITE_API_URL}/captcha?uuid=${formData.value.uuid}`;
};

const resetForm = () => {
  formData.value = {  Name: '', Email: '', quantity: '', message: '', captcha: '', uuid: '' };
  errors.value = { productId: false,  Email: false, message: false, captcha: false };
  submitSuccess.value = false;
  getCaptchaUrl();
};

// 修改：单选点击逻辑
const selectProduct = (id) => {
  // 如果点击已选中的，则取消选中；如果点击新的，则替换
  formData.value.productId = formData.value.productId === id ? '' : id;
};

const getProductMsg = async () => {
  try {
    const data = await useFetchWithLanguage.post(`${import.meta.env.VITE_API_URL}/product/getProductSpuList`, {});
    productList.value = data || [];
  } catch (error) { console.error('Failed to fetch product list:', error); }
}

const handleSubmit = async () => {
  // 修改：校验单选 ID
  errors.value = {
    // productId: !formData.value.productId,
    // Name: !formData.value.Name.trim(),
    Email: !formData.value.Email.trim(),
    // quantity: !String(formData.value.quantity).trim(),
    // Address: !formData.value.Address.trim(),
    message: !formData.value.message.trim(),
    captcha: !formData.value.captcha.trim(),
  };

  const hasError = Object.values(errors.value).some((val) => val);
  generalError.value = hasError;

  if (!hasError) {
    const submitData = {
      productSpuld: formData.value.productId, // 直接传 ID
      name: formData.value.Name,
      email: formData.value.Email,
      // address: formData.value.Address,
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
/* 原有布局样式保持不变 */
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
  flex: 1 ;
  background-color: #f8f8f8;
  padding: 40px;
  box-sizing: border-box;
  min-height: 850px;
  display: flex;
  flex-direction: column;
}

/* 成功页与过渡动画样式保持不变 */
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
  margin-bottom: 30px;
  text-align: center;
}

/* 单选产品卡片样式修改 */
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
  position: relative;
  transition: all 0.2s ease;
}

.product-card.is-selected {
  border-color: #0095d7;
  background: #f0faff;
}

/* Radio 风格的小圆圈 */
.card-checkbox.radio-mode {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 50%;
  /* 圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.is-selected .card-checkbox.radio-mode {
  border-color: #0095d7;
}

.radio-inner {
  width: 10px;
  height: 10px;
  background-color: #0095d7;
  border-radius: 50%;
}

.card-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.card-name {
  font-size: 12px;
  margin-top: 5px;
  color: #333;
}

/* 基础表单样式保持不变 */
.form-item-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-item-label {
  min-width: 100px;
  font-size: 14px;
}

.input-field,
.textarea-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-msg {
  color: #0095d7;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 110px;
}

.error-msg.no-padding {
  padding-left: 0;
}

.captcha-image {
  height: 40px;
  width: 100px;
  cursor: pointer;
}

.submit-btn {
  background: #333;
  color: #fff;
  padding: 10px 30px;
  border: none;
  cursor: pointer;
}
@media (max-width: 1200px){
  .info-section{
    width: 100% !important;
  }
}

@media (max-width: 768px) {

  .form-section {
    width: 100%;
    min-height: auto;
    padding: 20px 10px;
    /* 适当减少容器内边距，给输入框腾位置 */
  }

  .form-item-row {
    flex-direction: column;
    align-items: stretch;
    /* 关键：让子元素自动撑开到父容器宽度 */
  }

  .input-field,
  .textarea-field {
    /* 1. 移除 iOS 默认内阴影和样式 */
    -webkit-appearance: none;

    /* 2. 强制宽度，改用 100% 配合 box-sizing */
    width: 100% !important;
    box-sizing: border-box;
    /* 确保 padding 不会撑大宽度导致溢出 */

    /* 3. 防止字体自动放大 */
    font-size: 16px;

    margin-bottom: 0px;
    display: block;
  }

  /* 针对验证码和数量这种特殊组合，确保它们依然在一行排列但占满宽度 */
  .input-with-unit,
  .form-item-row>div[style*="display: flex"] {
    width: 100%;
    display: flex !important;
    align-items: center;
  }

  .error-msg {
    padding-left: 0;
  }

  .product-selection-grid {
    max-height: 250px;
    grid-template-columns: repeat(2, 1fr);
    /* 手机端每行两个 */
  }
}
</style>