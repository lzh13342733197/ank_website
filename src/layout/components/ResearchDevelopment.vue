<template>
  <div class="banner">
    <img src="@/assets/images/aboutUs/1研发图1280-720.jpg" alt="研发与开发" class="banner-bg">
    <div class="bannerTitle">{{ $t('common.researchDevelopment') }}</div>
  </div>

  <div class="container">

    <div class="cardIntroductionNumber">
      <div class="cardIntroductionNumberItem" v-for="(item, index) in [
        { iconName: '设计师', professosNumber: '33', professor: $t('research.stats.designers') },
        { iconName: '工程师', professosNumber: '58', professor: $t('research.stats.engineers') },
        { iconName: 'icon_声学', professosNumber: '23', professor: $t('research.stats.acousticPhDs') },
        { iconName: '社区', professosNumber: '45', professor: $t('research.stats.leaders') }
      ]" :key="index">
        <div class="cardIntroductionNumberItemContent">
          <div class="iconName">
            <SvgIcon :name="item.iconName" size="30" />
          </div>
          <div class="professorsNumber">{{ item.professosNumber }}</div>
          <div class="professor">{{ item.professor }}</div>
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="@/assets/images/aboutUs/4研发图1280-720.jpg" alt="研发与开发" class="banner-bg">
    </div>
    <div class="introdution">
      <!-- <div class="introdutionTitle">{{ $t('research.teamIntro') }}</div> -->
      <p>{{ $t('research.teamDesc1') }}</p>
      <p>{{ $t('research.teamDesc2') }}</p>
    <div class="banner">
      <img src="@/assets/images/aboutUs/5研发图1280-720.jpg" alt="研发与开发" class="banner-bg">
    </div>
      <p>{{ $t('research.teamDesc3') }}</p>
      <p>{{ $t('research.teamDesc4') }}</p>
      <!-- <p>{{ $t('research.teamDesc5') }}</p> -->
    </div>


  </div>

  <!-- <div class="patent">
    <div class="patentTitle">{{ $t('research.patents') }}</div>
    <div style="width: 100%; text-align: center;">
      <img :src='cert1' alt="" class="patent-bg" @click="handlePreviewFormDad(cert1)"></img>
    </div>
    <Patent ref="patentRef" />
  </div> -->
</template>

<script setup>
import Patent from '@/layout/components/Patent.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { onMounted, ref } from 'vue'

const patentRef = ref(null)
const cert1 = '@/assets/images/certificate_0.jpg'

const handlePreviewFormDad = (cert1) => {
  patentRef.value.handlePreviewFormDad(cert1)
}



</script>

<style scoped>
/* ====================
   PC 基础样式
   ==================== */
.banner {
  position: relative;
}

.banner-bg {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.6s ease-out forwards;
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.bannerTitle {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3vw;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.container {
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.6s ease-out forwards;
}

.introdution {
  font-size: 0.9vw;
  line-height: 2;
  color: #333;
  margin-bottom: 50px;
}

.introdutionTitle {
  text-align: center;
  font-size: 2vw;
  font-weight: 600;
  margin-bottom: 20px;
  padding: 0 10%;
}

.introdution p {
  font-size: 16px;
  margin: 12px 0;
}

.cardIntroductionNumber {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3vw;
  margin: 40px 0;
}

.cardIntroductionNumberItem {
  width: 36%;
}

.cardIntroductionNumberItemContent {
  padding: 2vw 1.2vw;
  border: 1px solid #000;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  background-color: #fff;
  height: 100%;
}

.cardIntroductionNumberItem:hover .cardIntroductionNumberItemContent {
  background: #000;
  color: #fff;
}

.professorsNumber {
  font-size: 2vw;
  margin: 10px 0;
  font-weight: 600;
}

.professor {
  font-size: 1vw;
}

.patent {
  background: #f8f8f8;
  width: 100%;
  padding: 50px 10%;
}

.patentTitle {
  text-align: center;
  font-size: 1.6vw;
  font-weight: 600;
  margin: 20px 0;
  padding: 20px 0 20px 15px;
}

.patent-bg {
  width: 72%;
  height: auto;
  object-fit: cover;
}

/* ====================
   平板端 <= 1200px
   ==================== */
@media (max-width: 1200px) {
  .bannerTitle {
    font-size: 32px;
    white-space: nowrap;
  }

  .container {
    width: 90%;
    padding: 30px 0;
  }

  .introdution {
    font-size: 16px;
  }

  .introdutionTitle {
    font-size: 24px;
    padding: 0 5%;
  }

  .cardIntroductionNumberItem {
    width: 45%;
  }

  .professorsNumber {
    font-size: 24px;
  }

  .professor {
    font-size: 14px;
  }

  .patent {
    padding: 40px 5%;
  }

  .patentTitle {
    font-size: 22px;
  }

  .cardIntroductionNumberItemContent {
    padding: 2vw 1.2vw;
  }

  .patent-bg {
    width: 83%;
  }
}

/* ====================
   手机端 <= 768px
   ==================== */
@media (max-width: 768px) {
  .bannerTitle {
    font-size: 22px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .container {
    width: 92%;
    padding: 20px 0;
  }

  .introdutionTitle {
    font-size: 20px;
  }

  .introdution p {
    font-size: 16px;
    line-height: 1.6;
  }

  .cardIntroductionNumberItem {
    width: 40%;
    margin-bottom: 20px;
  }

  .professorsNumber {
    font-size: 20px;
  }

  .professor {
    font-size: 13px;
  }

  .patent {
    padding: 30px 5%;
  }

  .patentTitle {
    font-size: 20px;
  }
}
</style>
