<template>
  <div class="market-layout">
    <div class="market-layout-header">
      <!-- <div class="market-layout-header-title">
        {{ $t('common.contactUs') }}
        <div class="market-layout-header-title-content">
          <div>{{ $t('contact.header.description1') }}</div>
          <div>{{ $t('contact.header.description2') }}</div>
        </div>
      </div> -->
      <img class="market-img" v-lazy="isPC" alt="contact us banner">
    </div>
  </div>
  <ContactForm></ContactForm>
</template>

<script setup>
import { ref ,onMounted,computed,onUnmounted} from 'vue'
import ContactForm from '@/layout/pc/components/ContactForm.vue'
import contact_mb from '@/assets/images/contact_us_mb.png'
import contact_pc from '@/assets/images/contact_us_pc.png'
// 如果超过1200px，显示pc图片
const isPC = computed(() => {
   return window.innerWidth > 1200 ? contact_pc : contact_mb
})

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
