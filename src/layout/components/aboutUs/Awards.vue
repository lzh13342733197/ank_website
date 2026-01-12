<template>
  <div class="awards-page">
    <div class="awards-header">
      <p class="awards-desc">
        {{ t('aboutUs.awards.description') }}
      </p>
    </div>

    <div class="awards-grid">
      <div 
        v-for="(award, index) in awardList" 
        :key="index"
        class="award-card"
        :style="{ 'animation-delay': (index * 0.1) + 's' }"
        @click="handlePreview(award.img)"
      >
        <div class="award-image-wrapper">
          <img :src="award.img" :alt="award.title" class="award-img" loading="lazy" />
          <div class="award-overlay">
            <p class="award-title">{{ award.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t ,locale} = useI18n();
import awardImg1 from '@/assets/images/aboutUs/2奖项小图_01.jpg'
import awardImg2 from '@/assets/images/aboutUs/2奖项小图_03.jpg'
import awardImg3 from '@/assets/images/aboutUs/2奖项小图_05.jpg'
import awardImg4 from '@/assets/images/aboutUs/2奖项小图_07.jpg'
// C:\Users\Honjeng\Desktop\公司项目\ankbit\src\assets\images\aboutUs\2奖项小图_07.jpg
// 模拟数据：建议将数据抽离，包含标题，让SEO和用户体验更好
const awardList = ref([
  { title: 'MUSE Design Awards', img: awardImg1 },
  { title: 'DNA Paris Design Awards 2025', img: awardImg2 },
  { title: 'London Design Awards', img: awardImg3 },
  { title: 'Red Dot Design Award', img: awardImg4 },
  // { title: 'Best Quality Award', img: 'https://picsum.photos/100/100?random=5' },
  // { title: 'Top 10 Brand', img: 'https://picsum.photos/100/100?random=6' },
]);

const handlePreview = (img) => {
  // 这里可以调用你父组件或全局的预览方法
  console.log('Preview image:', img);
};
watch(locale, (newLocale) => {
  // 当语言切换时，重新加载翻译
  if(newLocale === 'en'){
    awardList.value=[
      { title: 'MUSE Design Awards', img: awardImg1 },
      { title: 'DNA Paris Design Awards 2025', img: awardImg2 },
      { title: 'London Design Awards', img: awardImg3 },
      { title: 'Red Dot Design Award', img: awardImg4 },
     ]
  }else{
    awardList.value=[
      { title: '缪斯设计奖', img: awardImg1 },
      { title: '巴黎 DNA 设计奖', img: awardImg2 },
      { title: '伦敦设计奖', img: awardImg3 },
      { title: '红点设计奖', img: awardImg4 },
     ]
  }
});
</script>

<style scoped>
.awards-page {
  padding: 20px 0;
  margin-bottom: 400px; /* 适当减少 margin */
}

.awards-header {
  margin-bottom: 40px;
}

.awards-desc {
  line-height: 1.8;
  font-size: 16px;
  color: #555;
  text-align: justify;
  /* border-left: 4px solid #0095d7; */
  padding-left: 15px;
}

/* ================= 网格系统 ================= */
.awards-grid {
  /* 使用 CSS Grid 实现自动列数 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
  align-items: start;
}

/* ================= 奖项卡片样式 ================= */
.award-card { 
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: relative;
  
  /* 入场动画 */
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.6s ease-out forwards;
}

.award-image-wrapper {
  position: relative;
  width: 100%;
  display: flex;
}

.award-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

/* 悬浮遮罩 */
.award-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 149, 215, 0.85); /* 品牌主色带透明度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.4s ease;
  padding: 20px;
  text-align: center;
  color: #fff;
}

.view-icon {
  font-size: 24px;
  margin-bottom: 10px;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.award-title {
  font-size: 16px;
  font-weight: 500;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

/* 悬浮效果交互 */
.award-card:hover .award-img {
  transform: scale(1.1);
}

.award-card:hover .award-overlay {
  opacity: 1;
}

.award-card:hover .view-icon,
.award-card:hover .award-title {
  transform: translateY(0);
}

/* ================= 关键帧动画 ================= */
@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ================= 响应式适配 ================= */
@media (max-width: 768px) {
  .awards-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
  
  /* 移动端简化：遮罩改为半透明常态显示标题，或者取消遮罩改为底部文字 */
  .award-overlay {
    background: rgba(0, 0, 0, 0.4);
    opacity: 1;
    justify-content: flex-end;
    padding: 10px;
  }
  
  .award-title {
    font-size: 12px;
    transform: translateY(0);
  }
  
  .view-icon {
    display: none;
  }
}
</style>