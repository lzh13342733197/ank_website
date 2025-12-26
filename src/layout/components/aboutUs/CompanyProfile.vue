<template>
  <div class="content-text-body">
    <p class="content-paragraph">{{ t('aboutUs.companyProfile.thirdParagraph') }}</p>
    <p class="content-paragraph">{{ t('aboutUs.companyProfile.secondParagraph') }}</p>
    <img v-lazy="companyImg" class="content-image" />
    <img v-lazy="companyFactoryImg" class="content-image" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import companyImg from '@/assets/images/aboutUs/company.jpg';
import companyFactoryImg from '@/assets/images/aboutUs/companyFactory.jpg';
const { t } = useI18n();
</script>

<style scoped>
.content-paragraph { line-height: 1.8; font-size: 16px; color: #3f3f3f; margin-bottom: 1.5em; }
.content-image { max-width: 100%; height: auto; display: block; margin: 20px 0; }
</style>