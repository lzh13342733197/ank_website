<template>
  <div v-show="props.loading" class="skeleton-container">
    <div class="skeleton-content">
      <!-- 图片骨架 -->
      <div class="skeleton-image"></div>

      <!-- 标题骨架 -->
      <div class="skeleton-title"></div>

      <!-- 按钮骨架 -->
      <!-- <div class="skeleton-button"></div> -->

      <!-- 内容骨架 -->
      <div class="skeleton-text-container">
        <div v-for="i in 10" :key="i" class="skeleton-text"></div>
        <!-- <div class="skeleton-text"></div>
                <div class="skeleton-text"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.skeleton-container {
  width: 80%;
  padding: 20px;
  margin: auto;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skeleton-image {
  width: 100%;
  height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

.skeleton-title {
  width: 70%;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin: 0 auto;
}

.skeleton-button {
  width: 120px;
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 20px;
  margin: 0 auto;
}

.skeleton-text-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.skeleton-text {
  width: 100%;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
