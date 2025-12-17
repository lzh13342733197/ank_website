<template>
  <section class="partner-section">
    <h2 class="partner-title">合作伙伴</h2>
    <div class="partner-list">
      <div class="partner-item" v-for="item in visiblePartners" :key="item.id">
        <img :src="item.logo" :alt="item.name" :title="item.name" class="partner-logo" />
      </div>
    </div>

    <div v-if="showToggleButton && !isExpanded" class="partner-toggle-wrapper">
      <button @click="toggleExpanded" class="partner-toggle-btn">
        {{ isExpanded ? 'less ▲' : 'more ▼' }}
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'


// 导入图片
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

// 默认显示的 Logo 数量 (手机端默认 3行 * 3个/行 = 9个)
const defaultVisibleCount = 7;

// 状态：是否展开全部
const isExpanded = ref(false);

// 计算属性：当前应该显示的 Logo 列表
const visiblePartners = computed(() => {
  // 只有在非展开状态下，才截取前 defaultVisibleCount 个
  if (!isExpanded.value) {
    return partners.value.slice(0, defaultVisibleCount);
  }
  // 展开状态下显示全部
  return partners.value;
});

// 方法：切换显示状态
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

// 计算属性：是否需要显示“显示更多”按钮
const showToggleButton = computed(() => {
  return partners.value.length > defaultVisibleCount;
});
</script>

<style scoped>
/* ==================================================
 默认样式 (适用于桌面端和 1200px 以上的设备)
 ================================================== */
.partner-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;
}

.partner-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
}

.partner-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}

.partner-item {
  flex: 0 0 auto;
  padding: 0.5rem;
  width: 120px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.partner-logo {
  max-width: 120px;
  height: auto;
  /* 确保 Logo 高度自适应 */
  object-fit: contain;
  cursor: pointer;
}

/* ==================================================
   新增：切换按钮的样式
   ================================================== */
.partner-toggle-wrapper {
  margin-top: 2rem;
  padding-top: 1rem;
}

.partner-toggle-btn {
  padding: 8px 15px;
  background-color: transparent;
  border: 1px solid #ccc;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.partner-toggle-btn:hover {
  border-color: #f10215;
  color: #f10215;
}


/* ==================================================
 媒体查询适配：小于等于 1200px (Tablet/Mid-size PC)
 ================================================== */
@media (max-width: 1200px) {
  .partner-section {
    padding: 2rem 1rem;
  }

  .partner-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .partner-list {
    gap: 1rem;
  }

  .partner-item {
    /* 每行大约 5 个 */
    flex-basis: calc(20% - 1.5rem);
  }

  .partner-logo {
    max-width: 100px;
  }
}


/* ==================================================
 媒体查询适配：小于等于 768px (Mobile/Small Tablet)
 ================================================== */
@media (max-width: 768px) {
  .partner-item {
    /* 每行大约 3 个 */
    flex-basis: calc(33.33% - 1rem);
  }

  .partner-logo {
    max-height: 65px;
    max-width: 80px;
  }
}

/* ==================================================
 媒体查询适配：小于等于 480px (Small Mobile)
 ================================================== */
@media (max-width: 480px) {
  .partner-item {
    /* 每行大约 2 个 */
    flex-basis: calc(50% - 0.5rem);
  }
}
</style>