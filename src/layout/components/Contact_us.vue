<template>
  <div class="market-layout">
    <div class="market-layout-header">
    </div>
  </div>
  <ContactForm></ContactForm>
</template>

<script setup>
import { ref ,onMounted,computed,onUnmounted} from 'vue'
import ContactForm from '@/layout/components/ContactForm.vue'

// 如果超过1200px，显示pc图片

</script>

<style scoped>
.market-img {
  width: 100%;
  display: block;
}

.market-layout-header {
  width: 100%;
  position: relative;
}

.market-layout-header-title {
  position: absolute;
  top: 40%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-size: 3vw;
  font-weight: bold;
}

.market-layout-header-title-content {
  margin-top: 10px;
  font-size: 1vw;
  font-weight: 400;
  line-height: 2vw;
}

.market-layout-content {
  text-align: center;
  font-size: 1vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
