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

    <!-- 关于我们区块 -->
    <div class="brief-information-block">
      <div class="brief-information-block-title">
        {{ eightLanguage.footer.aboutUs['en'] }}
      </div>
      <div class="brief-information-block-content">
        <RouterLink to="/pc/company-profile" class="brief-information-block-content-item link-item" target="_blank">
          {{ eightLanguage.footer.ourValue['en'] }}
        </RouterLink>
        <RouterLink to="/pc/Patent" class="brief-information-block-content-item link-item" target="_blank">
          {{ eightLanguage.footer.R_D['en'] }}
        </RouterLink>
        <RouterLink to="/pc/Market-layout" class="brief-information-block-content-item link-item" target="_blank">
          {{ eightLanguage.footer.globalLayout['en'] }}
        </RouterLink>
      </div>
    </div>

    <!-- 联系我们区块 -->
    <div class="brief-information-block">
      <div class="brief-information-block-title">
        {{ eightLanguage.footer.contactUs['en'] }}
      </div>
      <div class="brief-information-block-content">
        <RouterLink to="/pc/Contact_us" class="brief-information-block-content-item link-item" target="_blank">
          {{ eightLanguage.footer.contactUs['en'] }}
        </RouterLink>
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
        <div style="display: flex; gap: 10px">
          <a href="https://www.facebook.com/1MiiAudioZ" target="_blank" rel="noopener noreferrer">
            <SvgIcon :name="`meta`" size="20" color="#222"></SvgIcon>
          </a>
          <a href="https://www.pinterest.com/1mii_official/_shop/" target="_blank" rel="noopener noreferrer">
            <SvgIcon :name="`pinterest`" size="20" color="#222"></SvgIcon>
          </a>
          <a href="https://www.youtube.com/channel/UCOGsWBOuAQ1eVXOQZQKyLmQ" target="_blank" rel="noopener noreferrer">
            <SvgIcon :name="`Youtube`" size="20" color="#222"></SvgIcon>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import eightLanguage from '@/constants/language'
import router from '@/router';
</script>

<style scoped>
.brief-introduction-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  font-family:
    SF Pro Text,
    SF Pro Icons,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
}

.brief-information-block {
  flex: 1;
  min-width: 0;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.brief-information-block-title {
  font-size: 18px;
  font-weight: 600;
  text-transform: UPPERCASE;
  color: #030303;
}

.brief-information-block-content {
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  font-size: 12px;
  line-height: 2.5;
  color: #222;
}

.brief-information-block-content-item {
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 12px;
}

.brief-information-block-content-item.link-item {
  color: #222;
  text-decoration: none;
  transition: color 0.3s;
  text-align: left;
  line-height: 2.5;
}

.brief-information-block-content-item.link-item:hover {
  color: #888787;
}

.popover-container {
  position: relative;
  display: inline-block;
}

.social-icon-container {
  cursor: pointer;
}

.qrcode-container {
  position: absolute;
  top: -140px;
  left: -30%;
  transform: translateX(-100%);
  padding: 10px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  z-index: 10;
}

.popover-container:hover .qrcode-container {
  opacity: 1;
  visibility: visible;
}

.qrcode-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.qrcode-text {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}
</style>
