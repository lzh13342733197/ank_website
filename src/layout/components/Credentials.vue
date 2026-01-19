<template>
  <div class="patent">

   
    <!-- 专利预览组件 -->
    <div class="patentTitle">{{ $t('research.patents1') }}</div>

    <Patent ref="patentRef" />

    <div class="patentTitle">{{ $t('research.patents') }}</div>

    <!-- 专利列表组件 -->
    <PatentSwiper ref="patentSwiperRef" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Patent from '@/layout/components/Patent.vue'
import PatentSwiper from '@/layout/components/aboutUs/PatentSwiper.vue'
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
  width: 100%;
}

.patentTitle {
  /* text-align: center; */
  font-size: 16px;
  line-height: 2;
  margin: 20px 0;
  padding: 20px 0 20px 15px;

}

.patent-image-wrapper {
  width: 100%;
  text-align: center;
  padding: 20px 0 20px 15px;
}

.patent-bg {
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: zoom-in;
  border-radius: 15px;
  /* 入场动画 */
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.6s ease-out forwards;
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    padding: 0px 5% 30px;
  }

  .patentTitle {
    font-size: 20px;
  }

  .patent-bg {
    width: 100%;
  }
}
</style>
