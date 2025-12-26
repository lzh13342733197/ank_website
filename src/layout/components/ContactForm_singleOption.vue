<template>
  <div class="contact-container">
    <div class="form-section">
      <transition name="fade" mode="out-in">
        <div v-if="submitSuccess" key="success" class="success-view">
          <div class="success-inner">
            <div class="success-content">
              <div class="success-icon">✓</div>
              <h2 class="success-title">{{ $t('contact.form.submitSuccessTitle') }}</h2>
              <p class="success-desc">{{ $t('contact.form.submitSuccessDesc')  }}</p>
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
                  <span class="unit-text">{{ $t('contact.form.pieceLabel') }}</span>
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
import { ref, reactive, onMounted, watch, defineProps } from 'vue';
import svgIcon from '@/components/SvgIcon.vue'
import { getUuid } from '@/utils/utils'
import { useFetchWithLanguage } from '@/utils/http'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { getCurrentLang } from '@/locales'

// 定义 props
const props = defineProps({
  productSpuId: {
    type: String,
    default: ''
  }
})

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
  Email: false,
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
  formData.value = { productId: '', Name: '', Email: '', quantity: '',  message: '', captcha: '', uuid: '' };
  errors.value = { Email: false, message: false, captcha: false };
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
    Email: !formData.value.Email.trim(),
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

onMounted(() => { getCaptchaUrl(); getProductMsg(); formData.value.productId = props.productSpuId; });
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
  flex: 1 1 400px;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
}

.form-section {
  flex: 1 1 400px;
  /* background-color: #f8f8f8; */
  /* padding: 40px; */
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
  text-align: center;
  margin-top: 0px;
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

.unit-text {
  padding-left: 5px;
}

@media (max-width: 768px) {

  /* 1. 容器边距微调 */
  .form-section {
    min-height: auto;
  }

  /* 2. 统一行间距：确保每一组表单项之间的距离固定 */
  .form-item {
    margin-bottom: 16px !important;
    display: flex;
    flex-direction: column;
  }

  /* 3. 强制横向排列并对齐 */
  .form-item-row {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    /* 垂直居中对齐 */
    gap: 10px;
    width: 100%;
    min-height: 40px;
    /* 设定最小统一行高 */
  }

  /* 4. 统一 Label 宽度：解决行距不一的关键是左侧对齐 */
  .form-item-label {
    min-width: 45px;
    /* 根据最长单词如 Address/Message 调整 */
    max-width: 45px;
    font-size: 13px;
    margin-bottom: 0 !important;
    /* 消除纵向排列残留的边距 */
    line-height: 1.2;
    flex-shrink: 0;
    /* 防止 Label 被压缩变窄 */
  }

  /* 5. 统一输入框高度与外观：解决 iOS 变短和高度差 */
  .input-field,
  .textarea-field {
    flex: 1;
    width: auto !important;
    min-width: 0;
    height: 40px;
    /* 强制所有输入框高度一致 */
    padding: 8px 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-appearance: none;
    /* 必加：消除 iOS 默认阴影 */
    box-sizing: border-box;
    /* 必加：防止 padding 撑开宽度 */
    display: block;
  }

  /* 文本域特殊处理，但保持宽度逻辑一致 */
  .textarea-field {
    height: 80px !important;
  }

  /* 6. 特殊组合项（数量单位、验证码）高度对齐 */
  .input-with-unit,
  .form-item-row>div[style*="display: flex"] {
    flex: 1;
    display: flex !important;
    align-items: center;
    gap: 8px;
    height: 40px;
    /* 确保验证码这行与其他行等高 */
  }

  .captcha-image {
    width: 90px;
    height: 36px;
    /* 略小于行高，居中显示更好看 */
    flex-shrink: 0;
    object-fit: contain;
  }

  /* 7. 错误信息位移：与 Label 宽度保持一致的缩进 */
  .error-msg {
    padding-left: 80px;
    /* Label 70px + Gap 10px */
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 11px;
    line-height: 1;
  }

  /* 8. 产品网格在手机端改为 2 列对齐 */
  .product-selection-grid {
    grid-template-columns: repeat(2, 1fr);
    max-height: 240px;
    gap: 8px;
  }

  /* 特殊：Select Product 这种顶部 Label 的间距也统一 */
  .form-item-label-top {
    margin-bottom: 8px;
    font-size: 14px;
  }
}
</style>