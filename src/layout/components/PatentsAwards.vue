<template>
  <div class="partner-section">
    <h2 class="partner-title">{{ $t('home.PatentsAwards') }}</h2>

    <!-- 专利合作方组件 -->
    <Patent_home />
    <!-- 图片放大预览层 -->
    <div
      v-if="previewVisible"
      class="image-preview-mask"
      @click="closePreview"
    >
      <img
        class="image-preview"
        :src="previewImage"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Patent_home from '@/layout/components/Patent_home.vue'
const { t } = useI18n()



// 导入图片
import img1 from '@/assets/images/certificate_0.jpg'

// 放大预览状态
const previewVisible = ref(false)
const previewImage = ref('')

const openPreview = (img) => {
  previewImage.value = img
  previewVisible.value = true
}

const closePreview = () => {
  previewVisible.value = false
}
</script>

<style scoped>
/* ==================================================
 默认样式 (适用于桌面端和 1200px 以上的设备)
 ================================================== */
.partner-section {
  display: block;
  margin: 0 auto;
  padding: 3rem 0rem;
  text-align: center;
}

.partner-title {
  font-size: 24px;
  color: #333;
}


/* ==================================================
 图片放大预览
 ================================================== */
.image-preview-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview {
  object-fit: contain;
}
 .partner-logo {
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.partner-logo:hover {
  transform: scale(1.001);
}
/* ==================================================
 媒体查询适配：小于等于 1200px
 ================================================== */
@media (max-width: 1200px) {
  .partner-section {
    padding: 2rem 0rem;
  }

  .partner-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .partner-list {
    gap: 1rem;
  }

  .partner-logo {
  }
}
</style>
