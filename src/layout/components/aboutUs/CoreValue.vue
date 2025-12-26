<template>
  <div class="content-text-body core-values">
    <div class="value-item">
      <img :src="enterpriseVisionIcon" />
      <span>{{ t('aboutUs.VisionAndMission.firstParagraph') }}</span>
    </div>
    <div class="value-item">
      <img :src="missionIcon" />
      <span>{{ t('aboutUs.VisionAndMission.secondParagraph') }}</span>
    </div>
    <div class="value-item">
      <img :src="responsibilityIcon" />
      <span>{{ t('aboutUs.CoreValue.firstParagraph') }}</span>
    </div>
    <div class="value-item">
      <img :src="qualityIcon" />
      <span>{{ t('aboutUs.CoreValue.secondParagraph') }}</span>
    </div>
    <div class="value-item">
      <img :src="teamIcon" />
      <span>{{ t('aboutUs.CoreValue.thirdParagraph') }}</span>
    </div>
    <div class="value-item">
      <img :src="serviceIcon" />
      <span>{{ t('aboutUs.CoreValue.fourthParagraph') }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import qualityIcon from '@/assets/svgs/08质量-线性.svg';
import serviceIcon from '@/assets/svgs/服务.svg';
import enterpriseVisionIcon from '@/assets/svgs/企业愿景.svg';
import missionIcon from '@/assets/svgs/使命.svg';
import teamIcon from '@/assets/svgs/团队 (2).svg';
import responsibilityIcon from '@/assets/svgs/责任.svg';

const { t } = useI18n();
</script>

<style scoped>
.core-values { display: flex; flex-direction: column; gap: 20px; padding-top: 10px; }
.value-item { display: flex; align-items: center; gap: 10px; line-height: 1.8; font-size: 16px; color: #3f3f3f; }
.value-item img { width: 25px; height: 25px; flex-shrink: 0; }
</style>