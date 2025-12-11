<template>
  <div class="about-us-container">
    <div :class="styles.viewTitle">{{ toUpperCase('about YeeMall') }}</div>
    <div class="about-us-content">
      <div class="about-us-content-image">
        <img
          class="about-us-content-image"
          src="@/assets/images/product-display-1.png"
          alt="about-us-image"
        />
        <img
          class="about-us-content-image"
          src="@/assets/images/product-display-2.png"
          alt="about-us-image"
        />
      </div>
      <div class="about-us-content-text">
        <div v-for="content in contents" style="margin: 5px 0" :key="content">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from '@/assets/yee-mall.module.css'
import { toUpperCase } from '@/utils/utils'
const contents = [
  'YeeMall, where cutting-edge technology meets unparalleled sound quality.',
  'Our brand is dedicated to revolutionizing the way you experience audio, offering a range of premium products including innovative Bluetooth headphones and state-of-the-art audio transmitters.',
  'From immersive soundscapes to seamless connectivity, YeeMall is committed to enhancing your auditory journey like neverbefore.',
  'Elevate your listening experience with YeeMall-where passion for music meets the pinnacle of innovation.',
]
</script>

<style scoped>
.about-us-container {
  padding: 20px;
}

.about-us-content-image {
  width: 100%;
}

.about-us-content-text {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
  text-align: center;
  padding: 20px 40px;
}
</style>
