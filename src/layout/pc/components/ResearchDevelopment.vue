<template>
  <div class="banner">
    <img src="@/assets/images/12.jpg" alt="研发与开发" class="banner-bg">
    <div class="bannerTitle">{{ $t('common.researchDevelopment') }}</div>
  </div>
  <div class="container">
    <div class="introdution">
      <div class="introdutionTitle">
        {{ $t('research.teamIntro') }}
      </div>
      <p>{{ $t('research.teamDesc1') }}</p>
      <p>{{ $t('research.teamDesc2') }}</p>
      <p>{{ $t('research.teamDesc3') }}</p>
      <p>{{ $t('research.teamDesc4') }}</p>
      <p>{{ $t('research.teamDesc5') }}</p>
    </div>
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
  </div>
  <div class="patent">
    <div class="patentTitle">{{ $t('research.patents') }}</div>
    <Patent></Patent>
  </div>
</template>

<script setup>
import Patent from '@/layout/pc/components/Patent.vue'
import SvgIcon from '@/components/SvgIcon.vue';
import { ref } from 'vue'

const cardIntroductionNumber = ref([
  {
    iconName: '设计师',
    professosNumber: '33',
    professor: '设计师',
  },
  {
    iconName: '工程师',
    professosNumber: '58',
    professor: '软硬件工程师',


  }, {
    iconName: 'icon_声学',
    professosNumber: '23',
    professor: '声学博士',

  },
  {
    iconName: '社区',
    professosNumber: '45',
    professor: '无线音频领域领头人',
  }
])


</script>

<style scoped>
.banner-bg {
  object-fit: cover;
  width: 100vw;
  position: relative;
}

.bannerTitle {
  position: absolute;
  top: 40%;
  left: 15%;
  font-size: 3vw;
  color: #fff;
}

.container {
  width: 80%;
  margin: 0 auto;

}

.introdution {
  font-size: 0.9vw;
}

.introdutionTitle {
  text-align: center;
  font-size: 2vw;
  margin-top: 50px;
  padding: 0 10%;
}

.cardIntroductionNumber {
  display: flex;
  text-align: center;
  justify-content: center;
  gap: 3vw;

}

.cardIntroductionNumberItem {
  width: 12%;
  display: flex;
  flex-direction: column;
}

.cardIntroductionNumberItem:hover {
  background-color: black;
  color: #fff;

  .iconName {
    color: #fff;

  }
}

.cardIntroductionNumberItemContent {
  padding: 1vw;
  border: 1px solid #000;
  flex: 1;

}

.professorsNumber {
  font-size: 2vw;
  margin: 10px 0;
}

.professor {
  font-size: 1vw;
}

.patent {
  background-color: #f8f8f8;
  height: 562px;
  width: 100%;
  padding: 20px 10%;

}

.patentTitle {
  text-align: center;
  padding: 20px;
}
</style>
