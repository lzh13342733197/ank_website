<template>
  <div class="market-layout">
    <div class="market-layout-header">
      <div class="market-layout-header-title">
        {{ $t('marketLayout.title') }}
      </div>
      <img class="market-img" src="@/assets/images/whole_global.jpg" alt="">
    </div>
    <div class="market-layout-content">
      <span><strong>{{ $t('marketLayout.marketsLabel') }}</strong></span>：{{ $t('marketLayout.markets') }}
    </div>
  </div>
  <div class="market-layout-header" style="padding: 18vw; padding-top: 0;padding-bottom: 0; ">
    <img class="market-img" src="@/assets/images/general_layout.png" alt="">
  </div>

  <div>
    <div class="cardIntroductionNumber">
      <div class="cardIntroductionNumberItem" v-for="(item, index) in [
        { iconName: '地球', professosNumber: '11', professor: $t('marketLayout.stats.countries') },
        { iconName: 'voice-team', professosNumber: '300', professor: $t('marketLayout.stats.agents') },
        { iconName: '商标', professosNumber: '250', professor: $t('marketLayout.stats.patents') }
      ]" :key="index">
        <div class="cardIntroductionNumberItemContent">
          <div class="iconName">
            <SvgIcon :name="item.iconName" size="30" color="#ed9600" />
          </div>
          <div class="professorsNumber">{{ item.professosNumber }}</div>
          <div class="professor">{{ item.professor }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Patent from '@/layout/components/Patent.vue'
import SvgIcon from '@/components/SvgIcon.vue';
import { ref } from 'vue'

const cardIntroductionNumber = ref([
  {
    iconName: '地球',
    professosNumber: '11',
    professor: '个国家',
  },
  {
    iconName: 'voice-team',
    professosNumber: '300',
    professor: '多个代理',


  }, {
    iconName: '商标',
    professosNumber: '250',
    professor: '多项专利与商标',

  },
])
</script>

<style scoped>
.market-img {
  width: 100%;
}

.market-layout-header {
  width: 100vw;
  position: relative;
}

.market-layout-header-title {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-size: 3vw;
  font-weight: bold;
  color: white;
}

.market-layout-content {
  text-align: center;
  font-size: 1.5vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}



.cardIntroductionNumber {
  display: flex;
  text-align: center;
  justify-content: center;
  gap: 3vw;
  padding: 3vw;

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
</style>