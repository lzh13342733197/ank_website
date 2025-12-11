<template>
  <div class="certification-container">
    <div class="certification-carousel">
      <button class="carousel-btn prev-btn" @click="prev">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="btn-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }" :key="currentIndex">
        <div class="carousel-item" v-for="(item, index) in images" :key="index">
          <img v-for="(img, index) in item" :src="img" alt="Certification" class="cert-img"
            @click="handlePreview(index)" />
        </div>
      </div>
      <button class="carousel-btn next-btn" @click="next">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="btn-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

  </div>
  <div v-if="showPreview" class="preview-modal">

    <button class="carousel-btn prev-btn" style="left:30vw;" @click="handlePreview(previewIndex - 1)">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="btn-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <div class="preview-content" @click.stop>
      <img :src="previewImg" alt="Preview" class="preview-img" />
      <button class="close-btn" @click="showPreview = false">×</button>
    </div>
    <button class="carousel-btn next-btn" style="right:30vw;" @click="handlePreview(previewIndex + 1)">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="btn-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import cert1 from '@/assets/images/certificate-1.jpg';
import cert2 from '@/assets/images/certificate-2.jpg';
import cert3 from '@/assets/images/certificate-3.jpg';
import cert4 from '@/assets/images/certificate-4.jpg';
import cert5 from '@/assets/images/certificate-5.jpg';
import cert6 from '@/assets/images/certificate-6.jpg';
import cert7 from '@/assets/images/certificate-7.jpg';
import cert8 from '@/assets/images/certificate-8.jpg';
import cert9 from '@/assets/images/certificate-9.jpg';
import cert10 from '@/assets/images/certificate-10.jpg';
import cert11 from '@/assets/images/certificate-11.jpg';
import cert12 from '@/assets/images/certificate-12.jpg';

const images = ref([
  [cert1, cert2, cert3, cert4],
  [cert5, cert6, cert7, cert8],
  [cert9, cert10, cert11, cert12],
]);
const currentIndex = ref(0);
// 添加预览相关变量
const showPreview = ref(false);
const previewImg = ref('');
const previewIndex = ref(0);
// 添加预览方法
const handlePreview = (idnex) => {

  if (idnex < 0 || idnex >= images.value[currentIndex.value].length) {
    if (idnex < 0) {
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
      idnex = 3;
    } else {
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
      idnex = 0;
    }
  }
  previewIndex.value = idnex;
  previewImg.value = images.value[currentIndex.value][idnex];
  showPreview.value = true;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};
const PreviewPic = (img) => {
  console.log(img);

}
</script>

<style scoped>
.certification-container {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 20px 0;
}

.certification-desc {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
}

.certification-carousel {
  position: relative;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.carousel-item {
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
}

.cert-img {
  height: 330px;
  border: none;
  border-radius: 4px;
  margin: 0 10px;
  cursor: pointer;

}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.prev-btn {
  left: 10px;
  z-index: 11;
}

.next-btn {
  right: 10px;
  z-index: 11;
}

.btn-icon {
  width: 24px;
  height: 24px;
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0%, 0%, 0%, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.preview-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.preview-img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 90vh;
  border: 4px solid white;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
}
</style>