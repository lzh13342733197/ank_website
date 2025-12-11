<template>
  <div style="margin: 20px auto ;display: block;">
    <hr />
    <brief-introduction />
    <hr />
    <div class="copyright-statement">{{ eightLanguage.footer.copyright['en'] }}</div>
    <div class="copyright-statement">
      <!-- <a href="https://beian.miit.gov.cn/" target="_blank"
        style="text-decoration: none; color: #999">粤ICP备2024326198号-1</a> -->
      <router-link to="/privacy" target="_blank" class="privacy-policy">{{
        eightLanguage.footer.privacyPolicy['en'] }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import eightLanguage from '@/constants/language'
import briefIntroduction from './brief-introduction.vue'
</script>

<style scoped>
.copyright-statement {
  text-align: center;
  font-size: 10px;
  color: #999;
  padding: 10px;
}

hr {
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

.privacy-policy {
  margin: 0 0;
  text-decoration: none;
  color: #5f5d5d;
}

.privacy-policy:hover {
  cursor: pointer;
}
</style>
