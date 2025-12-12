<template>
  <section class="partner-section">
    <h2 class="partner-title">合作伙伴</h2>
    <div class="partner-list">
      <div class="partner-item" v-for="item in partners" :key="item.id">
        <img :src="item.logo" :alt="item.name" class="partner-logo" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// 合作伙伴数据（实际项目中可替换为接口请求）
const partners = ref([
  { id: 1, name: '华硕', logo: 'https://picsum.photos/seed/pioneer/120/40' }, // 示例logo地址，可替换为实际图片链接
  { id: 2, name: 'Midland', logo: 'https://picsum.photos/seed/midland/120/40' },
  { id: 3, name: 'PDP', logo: 'https://picsum.photos/seed/pdp/120/40' },
  { id: 4, name: '华米科技', logo: 'https://picsum.photos/seed/huami/120/40' },
  { id: 5, name: '先锋', logo: 'https://picsum.photos/seed/pioneer/120/40' }
])
</script>

<style scoped>
.partner-section {
  padding: 2rem;
  text-align: center;
}

.partner-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.partner-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}

.partner-item {
  padding: 0.5rem;
}

.partner-logo {
  height: 40px; /* 统一logo高度 */
  object-fit: contain;
}
</style>