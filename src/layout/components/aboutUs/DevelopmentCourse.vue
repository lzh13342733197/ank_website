<template>
  <div class="content-text-body">
    <div class="timeline-wrapper">
      <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
        <div class="timeline-line"></div>
        <div class="timeline-dot"></div>
        <div class="timeline-box">
          <div class="timeline-year">{{ item.year }}</div>
          <div class="timeline-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const timelineData = computed(() => [
  { year: t('aboutUs.DevelopmentCourse.firstDate'), desc: t('aboutUs.DevelopmentCourse.firstParagraph') },
      { year: t('aboutUs.DevelopmentCourse.secondDate'), desc: t('aboutUs.DevelopmentCourse.secondParagraph') },
      { year: t('aboutUs.DevelopmentCourse.thirdDate'), desc: t('aboutUs.DevelopmentCourse.thirdParagraph') },
      { year: t('aboutUs.DevelopmentCourse.fourthDate'), desc: t('aboutUs.DevelopmentCourse.fourthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.fifthDate'), desc: t('aboutUs.DevelopmentCourse.fifthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.sixthDate'), desc: t('aboutUs.DevelopmentCourse.sixthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.seventhDate'), desc: t('aboutUs.DevelopmentCourse.seventhParagraph') },
      { year: t('aboutUs.DevelopmentCourse.eighthDate'), desc: t('aboutUs.DevelopmentCourse.eighthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.ninthDate'), desc: t('aboutUs.DevelopmentCourse.ninthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.tenthDate'), desc: t('aboutUs.DevelopmentCourse.tenthParagraph') },
      { year: t('aboutUs.DevelopmentCourse.eleventhDate'), desc: t('aboutUs.DevelopmentCourse.eleventhParagraph') },
  // ... 按需添加更多
]);
</script>

<style scoped>
.timeline-wrapper { padding: 20px 0 20px 10px; }
.timeline-item { position: relative; display: flex; padding-bottom: 40px; }
.timeline-line { position: absolute; left: 7px; top: 15px; bottom: 0; width: 1px; background-color: #e4e7ed; }
.timeline-item:last-child .timeline-line { display: none; }
.timeline-dot { position: absolute; left: 0; width: 15px; height: 15px; background-color: #fff; border: 2px solid #0095d7; border-radius: 50%; z-index: 1; }
.timeline-box { margin-left: 35px; margin-top: -3px; }
.timeline-year { font-size: 18px; font-weight: bold; color: #0095d7; line-height: 1; margin-bottom: 8px; }
.timeline-desc { font-size: 16px; color: #666; line-height: 1.6; }
</style>