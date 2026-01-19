<template>
  <section class="partner-section">
    <h2 class="partner-title">{{ $t('home.partner') }}</h2>

    <div class="partner-list">
      <div
        class="partner-item"
        v-for="item in partners"
        :key="item.id"
      >
        <img
          v-lazy="item.logo"
          :alt="item.name"
          class="partner-logo"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

import img1 from '@/assets/images/partner/图片1.png'
import img2 from '@/assets/images/partner/图片2.png'
import img3 from '@/assets/images/partner/图片3.png'
import img6 from '@/assets/images/partner/图片6.png'
import img7 from '@/assets/images/partner/图片7.png'
import img8 from '@/assets/images/partner/图片8.png'
import img11 from '@/assets/images/partner/图片11.png'
import img12 from '@/assets/images/partner/图片12.png'
import img13 from '@/assets/images/partner/图片13.png'
import img16 from '@/assets/images/partner/图片16.png'
import img17 from '@/assets/images/partner/图片17.png'
import img18 from '@/assets/images/partner/图片18.png'

const partners = ref([
  { id: 1, name: 'amazon', logo: img1 },
  { id: 2, name: 'MONDIAL', logo: img2 },
  { id: 3, name: 'aiwa', logo: img3 },
  { id: 6, name: 'Qualcomm', logo: img6 },
  { id: 7, name: 'BROADCOM', logo: img7 },
  { id: 8, name: 'AIROHA', logo: img8 },
  { id: 11, name: 'REALTEK', logo: img11 },
  { id: 12, name: 'BES', logo: img12 },
  { id: 13, name: 'Actions', logo: img13 },
  { id: 16, name: 'KTMicro', logo: img16 },
  { id: 17, name: '京东', logo: img17 },
  { id: 18, name: '百瑞互联（BARROT）', logo: img18 },
])
</script>

<style scoped>
.partner-section {
  padding: 0 0 40px;
}

.partner-title {
  text-align: center;
  font-size: 31px;
  margin-bottom: 40px;
}

/* ========== PC：单行，宽度完全一致 ========== */
.partner-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 0 40px;
  flex-wrap: nowrap;
}

.partner-item {
  flex: 0 0 100px; /* 关键：固定宽度，不拉伸、不压缩 */
  height: 70px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo {
  max-width: 80px;
  max-height: 60px;
  object-fit: contain;
}

/* ========== 移动端：2–3 行，宽度仍然一致 ========== */
@media (max-width: 1200px) {
  .partner-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .partner-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    justify-content: center;
    gap: 20px 16px;
    padding: 0 16px;
  }

  .partner-item {
    width: 120px; /* 与 grid 列宽完全一致 */
    height: 72px;
  }

  .partner-logo {
    max-width: 100px;
    max-height: 48px;
  }
}
</style>
