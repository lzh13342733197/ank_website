<template>
  <div class="brief-introduction-container">
    <!-- 联系信息区块 -->
    <div class="brief-information-block">
      <div class="brief-information-block-title">
        {{ eightLanguage.footer.contactInfo['en'] }}
      </div>
      <div class="brief-information-block-content">
        <div class="brief-information-block-content-item">
          {{ eightLanguage.footer.address['en'] }}
        </div>
        <div class="brief-information-block-content-item">
          {{ eightLanguage.footer.after_sales_email['en'] }}
        </div>
        <div class="brief-information-block-content-item">
          {{ eightLanguage.footer.sales_email['en'] }}
        </div>
      </div>
    </div>

    <!-- 关注我们区块 -->
    <div class="brief-information-block">
      <div class="brief-information-block-title">
        {{ eightLanguage.footer.followUS['en'] }}
      </div>
      <div class="brief-information-block-content">
        <div class="brief-information-block-content-item">
          {{ eightLanguage.footer.follow_channel['en'] }}
        </div>
        <div class="social-links">
          <!-- <a href="https://www.facebook.com/1MiiAudioZ" target="_blank" rel="noopener noreferrer">
            <SvgIcon :name="`meta`" size="20" color="#222" />
          </a>
          <a href="https://www.pinterest.com/1mii_official/_shop/" target="_blank" rel="noopener noreferrer">
            <SvgIcon :name="`pinterest`" size="20" color="#222" />
          </a>
          <a href="https://www.youtube.com/channel/UCOGsWBOuAQ1eVXOQZQKyLmQ" target="_blank" rel="noopener noreferrer">
            <SvgIcon :name="`Youtube`" size="20" color="#222" />
          </a> -->
            <div>
            <a href="https://www.instagram.com/1mii.shop/" target="_blank">
              <!-- <SvgIcon :name="`add`" size="24" color="#222"></SvgIcon> -->
              <img v-lazy="facebook" alt="" class="iconImg">
            </a>
          </div>
            <div>
            <a href="https://www.instagram.com/1mii.shop/" target="_blank">
              <!-- <SvgIcon :name="`add`" size="24" color="#222"></SvgIcon> -->
              <img v-lazy="instagram" alt="" class="iconImg">
            </a>
          </div>
          <div>
            <a href="https://x.com/YeeMall_1Mii " target="_blank">
              <img v-lazy="newTwiter" alt="" class="iconImg" style="scale: 0.8;">
            </a>
          </div>
          <div>
            <a href="https://www.tiktok.com/@1mii.us?lang=zh-Hans" target="_blank">
              <img v-lazy="tiktok" alt="" class="iconImg">
            </a>
          </div>
          <div style="width: 20px; height: 20px;">
            <a href="https://www.youtube.com/@YeeMall.1Mii" target="_blank">
              <img v-lazy="youtube" alt="" class="iconImg">

            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import eightLanguage from '@/constants/language'
import facebook from '@/assets/images/footer/Facebook.png'
import instagram from '@/assets/images/footer/instagram.png'
import newTwiter from '@/assets/images/footer/newTwiter.png'
import tiktok from '@/assets/images/footer/Tiktok.png'
import youtube from '@/assets/images/footer/youtube.png'
</script>

<style scoped>
.brief-introduction-container {
  display: flex;
  flex-wrap: wrap; /* 移动端换行 */
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
  padding: 20px;
}

/* 单个信息区块 */
.brief-information-block {
  flex: 1 1 120px; /* 自适应宽度，最小250px */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.brief-information-block-title {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  color: #030303;
}

.brief-information-block-content {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 2;
  color: #222;
}

.brief-information-block-content-item {
  font-size: 12px;
}

.social-links {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}
.iconImg {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.iconImg:hover {
  transform: scale(1.1);
  transition: transform 0.3s;
}

/* 响应式：小于 1200px */
@media screen and (max-width: 1200px) {
  .brief-introduction-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  padding: 20px 0  0 20px ;

  }

  .brief-information-block {
    width: 100%;
    min-width: auto;
  }

  .brief-information-block-title {
    font-size: 16px;
  }

  .brief-information-block-content {
    font-size: 11px;
    line-height: 1.8;
  }

  .social-links {
    gap: 8px;
  }
}
</style>
