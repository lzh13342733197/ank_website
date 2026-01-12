<template>
  <section class="factory-module">
    <!-- 模块标题 + 路由切换tab -->
    <div class="factory-header">
      <!-- <div class="factory-title">Our Factory</div> -->
      <div class="section-tab-wrapper">
        <div 
          class="section-tab-item" 
          :class="{ active: currentTab === 'production' }"
          @click="switchTab('production')"
        >
          {{ t('factory.production.subtitle') }}
        </div>
        <div 
          class="section-tab-item" 
          :class="{ active: currentTab === 'testing' }"
          @click="switchTab('testing')"
        >
          {{ t('factory.testing.subtitle') }}
        </div>
      </div>
    </div>

    <!-- 1. Production 生产流程板块 -->
    <div class="factory-section production-section" v-if="currentTab === 'production'">
      <div class="section-subtitle">{{ t('factory.production.subtitle') }}</div>
      <div class="section-desc">
        {{ t('factory.production.desc') }}
      </div>

      <!-- 生产流程步骤列表 -->
      <div class="production-steps">
        <div class="step-item" v-for="(step, index) in productionSteps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">
              {{ step.title }}
            </div>
            <div class="step-desc">
              {{ step.desc }}
              <br />
            </div>
          </div>
          <div class="step-image">
            <!-- 添加点击事件 -->
            <img 
              :src="step.image" 
              :alt="step.title" 
              loading="lazy"
              @click="openImagePreview(step.image, step.title)"
              class="clickable-image"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Testing 测试板块（路由跳转占位/直接展示） -->
    <div class="factory-section testing-section" v-if="currentTab === 'testing'">
      <div class="section-desc">
        {{ t('factory.testing.desc') || 'Testing Process & Equipment Introduction' }}
      </div>

      <!-- 测试设备展示 -->
      <div class="equipment-grid">
        <div class="equipment-item" v-for="(equipment, index) in testingEquipments" :key="index">
          <img 
            :src="equipment.image" 
            :alt="equipment.name" 
            loading="lazy"
            @click="openImagePreview(equipment.image, equipment.name)"
            class="clickable-image"
          />
          <div class="equipment-name">{{ equipment.name }}</div>
        </div>
      </div>

      <!-- 测试流程图片 -->
      <div class="section-subtitle" style="margin-top: 40px;">Testing Process</div>
      <div class="process-images">
        <div v-for="(img, index) in testingProcessImages" :key="index" class="process-img-item">
          <img 
            :src="img" 
            :alt="`Testing Process ${index + 1}`" 
            loading="lazy"
            @click="openImagePreview(img, `Testing Process ${index + 1}`)"
            class="clickable-image"
          />
        </div>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <div 
      class="image-preview-modal" 
      v-if="previewVisible"
      @click.self="closeImagePreview"
    >
      <button class="preview-close-btn" @click="closeImagePreview">×</button>
      <div class="preview-content">
        <img 
          :src="previewImageUrl" 
          :alt="previewImageAlt"
          class="preview-image"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router' // 引入路由相关API
import productionStep1 from '@/assets/images/Factory/1来料检验1280-720.jpg'
import productionStep2 from '@/assets/images/Factory/2主板测试1280-720.jpg'
import productionStep3 from '@/assets/images/Factory/3半成品组装1280-720.jpg'
import productionStep4 from '@/assets/images/Factory/4成品组装1280-720.jpg'
import productionStep5 from '@/assets/images/Factory/5测试设备1280-720.jpg'
import productionStep5RAC from '@/assets/images/Factory/5测试设备RAC耐磨1280-720.jpg'
import productionStep6 from '@/assets/images/Factory/6包装入库1280-720.jpg'
import productionStep7 from '@/assets/images/Factory/7仓库1280-720.jpg'



const { t } = useI18n();
const router = useRouter();
const route = useRoute();

// 路由Tab切换状态（优先从路由获取，实现路由联动）
const currentTab = ref<string>(
  route.path === '/Factory/Testing' ? 'testing' : 'production'
);

// 切换Tab + 路由跳转
const switchTab = (tab: 'production' | 'testing') => {
  currentTab.value = tab;
  // 根据Tab跳转对应路由
  if (tab === 'testing') {
    router.push('/Factory/Testing');
  } else {
    router.push('/Factory/Production'); // 生产板块默认跳回首页（可根据实际需求修改）
  }
};

// 监听路由变化，同步Tab状态
onMounted(() => {
  const routeWatcher = router.afterEach((to) => {
    currentTab.value = to.path === '/Factory/Testing' ? 'testing' : 'production';
  });
  
  // 组件卸载时取消监听
  onUnmounted(() => {
    routeWatcher();
  });
});

// 图片预览相关状态
const previewVisible = ref(false)
const previewImageUrl = ref('')
const previewImageAlt = ref('')

// 打开图片预览
const openImagePreview = (url: string, alt: string) => {
  previewImageUrl.value = url
  previewImageAlt.value = alt
  previewVisible.value = true
  // 禁止页面滚动
  document.body.style.overflow = 'hidden'
}

// 关闭图片预览
const closeImagePreview = () => {
  previewVisible.value = false
  // 恢复页面滚动
  document.body.style.overflow = 'auto'
}

// 监听ESC键关闭预览
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && previewVisible.value) {
    closeImagePreview()
  }
}

// 挂载和卸载时绑定/解绑键盘事件
onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscKey)
})

// 生产流程数据
const productionSteps = computed(() => [
  {
    title: t('factory.production.steps[0].title'),
    desc: t('factory.production.steps[0].desc'),
    image: productionStep1
  },
  {
    title: t('factory.production.steps[1].title'),
    desc: t('factory.production.steps[1].desc'),  
    image: productionStep2
  },
  {
    title: t('factory.production.steps[2].title'),
    desc: t('factory.production.steps[2].desc'),
    image: productionStep3
  },
  {
    title: t('factory.production.steps[3].title'),
    desc: t('factory.production.steps[3].desc'),
    image: productionStep4
  },
  {
    title: t('factory.production.steps[4].title'),
    desc: t('factory.production.steps[4].desc'),
    image: productionStep5
  },
  {
    title: t('factory.production.steps[5].title'),
    desc: t('factory.production.steps[5].desc'),
    image: productionStep6 
  },
  {
    title: t('factory.production.steps[6].title'),
    desc: t('factory.production.steps[6].desc'),
    image: productionStep7 
  },
])

// 测试设备数据
const testingEquipments = computed(() => [
  {
    name: t('factory.testing.equipment.list[0].name') || 'Spectrum Analyzer',
    image: 'https://picsum.photos/id/1024/300/200'
  },
  {
    name: t('factory.testing.equipment.list[1].name') || 'Oscilloscope',
    image: 'https://picsum.photos/id/1035/300/200'
  },
  {
    name: t('factory.testing.equipment.list[2].name') || 'Signal Generator',
    image: 'https://picsum.photos/id/1040/300/200'
  },
  {
    name: t('factory.testing.equipment.list[3].name') || 'Thermal Chamber',
    image: 'https://picsum.photos/id/1045/300/200'
  },
  {
    name: t('factory.testing.equipment.list[4].name') || 'Shock Tester',
    image: 'https://picsum.photos/id/1050/300/200'
  },
  {
    name: t('factory.testing.equipment.list[5].name') || 'IP Rating Tester',
    image: 'https://picsum.photos/id/1060/300/200'
  }
])

// 测试流程图片
const testingProcessImages = ref([
  'https://picsum.photos/id/1065/400/300',
  'https://picsum.photos/id/1070/400/300',
  'https://picsum.photos/id/1074/400/300',
  'https://picsum.photos/id/1080/400/300'
])
</script>

<style scoped>
/* 基础样式 */
.factory-module {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
}

.factory-title {
  font-size: 32px;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 60px;
}

/* 路由Tab切换样式 */
.factory-header {
  margin-bottom: 30px;
  display: none;
}

.section-tab-wrapper {
  display: flex;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-tab-item {
  padding: 12px 30px;
  background: #f5f5f5;
  color: #666;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  white-space: nowrap;
}

.section-tab-item.active {
  background: #0095d7;
  color: #fff;
}

.section-tab-item:hover:not(.active) {
  background: #eee;
  color: #333;
}

/* 板块通用样式 */
.factory-section {
  margin-bottom: 80px;
}

.section-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  border-left: 4px solid #0095d7;
  padding-left: 12px;
  margin-bottom: 20px;
}

.section-desc {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 40px;
}

.desc-detail {
  margin-top: 16px;
  font-size: 14px;
  color: #777;
}

/* 生产流程步骤样式 */
.production-steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #0095d7;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.step-title-en {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #888;
  margin-top: 4px;
}

.step-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

.step-desc-en {
  color: #888;
  font-size: 13px;
  margin-top: 8px;
  display: block;
}

.step-image {
  width: 200px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}

.step-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 测试设备样式 */
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.equipment-item {
  text-align: center;
}

.equipment-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.equipment-name {
  font-size: 16px;
  color: #333;
}

.equipment-name-en {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

/* 测试流程图片 */
.process-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.process-img-item {
  border-radius: 4px;
  overflow: hidden;
}

.process-images img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

/* 可点击图片样式 */
.clickable-image {
  cursor: zoom-in;
  transition: transform 0.2s ease;
}

.clickable-image:hover {
  transform: scale(1.02);
}

/* 图片预览弹窗样式 */
.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.preview-close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #fff;
  font-size: 40px;
  font-weight: 300;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 10;
}

.preview-close-btn:hover {
  color: #ccc;
}

.preview-content {
  max-width: 90%;
  max-height: 90%;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .factory-header {
    display: block;
  }
  .factory-module {
    padding: 20px 10px;
  }

  .factory-title {
    font-size: 24px;
    margin-bottom: 40px;
  }

  .section-tab-item {
    padding: 10px 20px;
    font-size: 16px;
  }

  .section-subtitle {
    font-size: 20px;
  }

  .step-item {
    flex-direction: column;
    gap: 15px;
  }

  .step-image {
    width: 100%;
    height: 200px;
  }

  .equipment-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .process-images {
    grid-template-columns: repeat(2, 1fr);
  }

  .preview-close-btn {
    font-size: 30px;
    top: 15px;
    right: 20px;
  }
}

@media (max-width: 480px) {
  .section-tab-wrapper {
    width: 100%;
  }

  .section-tab-item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
  }

  .equipment-grid {
    grid-template-columns: 1fr;
  }

  .process-images {
    grid-template-columns: 1fr;
  }

  .step-image {
    height: 160px;
  }
}
</style>