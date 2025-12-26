<template>
  <div class="patent">
    <div class="patentTitle">{{ $t('research.patents') }}</div>

    <div class="patent-image-wrapper">
      <img
        :src="cert1"
        alt="Patent Certificate"
        class="patent-bg"
        @click="handlePreviewFormDad(cert1)"
      />
    </div>

    <!-- 专利预览组件 -->
    <Patent ref="patentRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Patent from '@/layout/components/Patent.vue'

// 专利图片
import cert1 from '@/assets/images/certificate_0.jpg'
// 子组件 ref
const patentRef = ref(null)

// 调用子组件的预览方法
const handlePreviewFormDad = (img) => {
  patentRef.value?.handlePreviewFormDad(img)
}
</script>

<style scoped>
/* ====================
   专利模块样式
   ==================== */
.patent {
  background: #f8f8f8;
  width: 100%;
}

.patentTitle {
  /* text-align: center; */
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 2;
  margin-top: 12px;
}

.patent-image-wrapper {
  width: 100%;
  text-align: center;
}

.patent-bg {
  width: 72%;
  height: auto;
  object-fit: cover;
  cursor: zoom-in;
}

/* ====================
   平板端 <= 1200px
   ==================== */
@media (max-width: 1200px) {
  .patent {
    padding: 40px 5%;
  }

  .patentTitle {
    font-size: 22px;
  }

  .patent-bg {
    width: 83%;
  }
}

/* ====================
   手机端 <= 768px
   ==================== */
@media (max-width: 768px) {
  .patent {
    padding: 30px 5%;
  }

  .patentTitle {
    font-size: 20px;
  }

  .patent-bg {
    width: 100%;
  }
}
</style>
