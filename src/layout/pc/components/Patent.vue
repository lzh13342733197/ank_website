<template>
  <div class="certification-container">
    <div class="certification-carousel">

      <!-- 轮播区域 -->
      <div class="carousel-wrapper" :style="{
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: enableTransition ? 'transform 0.3s ease' : 'none'
      }">
        <div class="carousel-item" v-for="(group, gIndex) in images" :key="gIndex">
          <img v-for="(img, index) in group" :key="index" :src="img" loading="lazy" class="cert-img"
            @click="handlePreview(index)" />
        </div>
      </div>

    </div>
  </div>

  <!-- 预览弹窗 -->
  <div v-if="showPreview" class="preview-modal" @click="showPreview = false">
    <div class="preview-content" @click.stop>
      <img :src="previewImg" class="preview-img" />
      <button class="close-btn" @click="showPreview = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

import cert1 from '@/assets/images/certificate_1.png'
import cert2 from '@/assets/images/certificate_2.png'
import cert3 from '@/assets/images/certificate_3.png'

const enableTransition = ref(true)

/**
 * 0: 假头（最后一页）
 * 1~3: 真页
 * 4: 假尾（第一页）
 */
const images = ref([
  [cert1, cert2, cert3],
])

const currentIndex = ref(0)

/* =====================
   真·无感 NEXT
   ===================== */
const next = async () => {
  // 如果下一步会进入假尾页
  if (currentIndex.value === images.value.length - 2) {
    // ① 正常动画到“最后一个真页”
    currentIndex.value++

    // ② 动画结束后，立刻无动画跳回第一页
    await nextTick()
    enableTransition.value = false
    currentIndex.value = 1
    await nextTick()
    enableTransition.value = true
  } else {
    currentIndex.value++
  }
}

/* =====================
   真·无感 PREV
   ===================== */
const prev = async () => {
  // 如果下一步会进入假头页
  if (currentIndex.value === 1) {
    currentIndex.value--

    await nextTick()
    enableTransition.value = false
    currentIndex.value = images.value.length - 2
    await nextTick()
    enableTransition.value = true
  } else {
    currentIndex.value--
  }
}

/* ===== 预览逻辑保持不变 ===== */
const showPreview = ref(false)
const previewImg = ref('')
const previewIndex = ref(0)

const handlePreview = (index) => {
  const group = images.value[currentIndex.value]

  if (index < 0) {
    prev()
    index = group.length - 1
  } else if (index >= group.length) {
    next()
    index = 0
  }

  previewIndex.value = index
  previewImg.value = images.value[currentIndex.value][index]
  console.log(previewImg.value );
  
  showPreview.value = true
}
const handlePreviewFormDad = (img) => {
  console.log(img);
  
  previewImg.value = img
  showPreview.value = true
}
defineExpose({
  handlePreviewFormDad
})
</script>


<style scoped>
/* 基础布局 */
.certification-container {
  width: 100%;
  padding: 20px 0;
}

.certification-carousel {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  /* transition: transform 0.5s ease; */
}

.carousel-item {
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

/* 图片 */
.cert-img {
  width: calc(25% - 20px);
  margin: 10px;
  border-radius: 6px;
  cursor: pointer;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.cert-img:hover {
  transform: scale(1.03);
}

/* 按钮 */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.45);
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.carousel-btn svg {
  width: 24px;
  height: 24px;
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}

/* 预览 */
.preview-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.preview-content {
  position: relative;
}

.preview-img {
  max-width: 90vw;
  max-height: 85vh;
  border: 4px solid #fff;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  font-size: 30px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

.preview-btn.prev-btn {
  left: 30vw;
}

.preview-btn.next-btn {
  right: 30vw;
}

/* ===========================
   响应式（1200px 分割）
   =========================== */
@media (max-width: 1200px) {
  .cert-img {
    width: 40%;
  }
}

/* 手机 */
@media (max-width: 768px) {
  .cert-img {
    width: 40%;
  }

  .carousel-btn svg {
    width: 20px;
    height: 20px;
  }

  .preview-btn.prev-btn {
    left: 10px;
  }

  .preview-btn.next-btn {
    right: 10px;
  }
}
</style>
