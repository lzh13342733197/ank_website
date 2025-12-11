<template>
  <div class="company-profile">
    <!-- 公司简介部分 -->
    <div class="about-section">
      <div class="section-header-company-profile">
        <h2 class="section-title-company-profile">{{ $t('company.profile.title') }}</h2>
        <div class="section-divider"></div>
      </div>
      <div class="container">
        <div class="about-content" style="background-color: white; padding: 2rem;">
          <el-card style="width: 100%;">
            <div class="about-text">
              <p>
                <strong style="font-weight: bold; font-size: 24px;">{{ $t('company.profile.founding') }}</strong>
                <br>
                {{ $t('company.profile.products') }}{{ $t('company.profile.brands') }}
              </p>
              <p>{{ $t('company.profile.brandAnkbit') }}</p>
              <p>{{ $t('company.profile.brandLavaudio') }}</p>
              <p>{{ $t('company.profile.brand1Mii') }}</p>
              <p>{{ $t('company.profile.motto') }}</p>
            </div>
          </el-card>
        </div>

        <!-- 公司文化部分 -->
        <div class="about-content" style="margin-top: 30px; padding: 0; display: flex; align-items: stretch ;">
          <div class="about-text">
            <div style="padding: 2rem; background-color: white; font-size: 1.1rem;">
              <h2 style="font-size: 2rem; font-weight: 500;">{{ $t('company.culture.title') }}</h2>
              <h3 style="margin-top: 1rem;">{{ $t('company.culture.philosophy') }}</h3>
              <h4 style="margin-top: 1rem;">{{ $t('company.culture.respectHeaven') }}</h4>
              {{ $t('company.culture.respectHeavenDesc') }}
              <h4 style="margin-top: 1rem;">{{ $t('company.culture.lovePeople') }}</h4>
              {{ $t('company.culture.lovePeopleDesc') }}<br><br>
              {{ $t('company.culture.principles') }}
            </div>
          </div>
          <div class="about-image">
            <img src="@/assets/images/公司图片.jpg" alt="1Mii团队在办公室协作" style="height: 340px; object-fit: cover;">
          </div>
        </div>
      </div>

      <!-- 视觉图片部分 -->
      <div>
        <div class="cosmic-hero-zone">
          <div class="stellar-background-container">
            <div class="nebula-overlay-shield"></div>
          </div>
          <div class="lunar-content-holder">
            <div class="quantum-content-wrapper">
            </div>
          </div>
        </div>
      </div>


      <!-- 企业核心价值部分 -->
      <div>
        <div class="container">
          <div class="template-page content av-content-full alpha units">
            <div class="post-entry post-entry-type-page post-entry-3681">
              <div class="entry-content-wrapper clearfix">
                <!-- 左侧列 -->
                <div
                  class="flex_column av_one_half av-animated-generic top-to-bottom flex_column_div av-zero-column-padding first avia-builder-el-11 el_before_av_one_half avia-builder-el-first avia_start_animation avia_start_delayed_animation"
                  style="border-radius: 0px;">
                  <div class="avia-icon-list-container avia-builder-el-12 avia-builder-el-no-sibling">
                    <ul
                      class="avia-icon-list avia-icon-list-left av-iconlist-big avia_animate_when_almost_visible avia_start_animation">
                      <li class="avia_start_animation" v-for="(item, index) in [
                        { title: $t('company.values.duty'), desc: $t('company.values.dutyDesc'), icon: '点赞' },
                        { title: $t('company.values.quality'), desc: $t('company.values.qualityDesc'), icon: '眼睛' },
                        { title: $t('company.values.innovation'), desc: $t('company.values.innovationDesc'), icon: '团队' }
                      ]" :key="index">
                        <div style="background-color: #efb939;" class="iconlist_icon avia-font-entypo-fontello">
                          <SvgIcon class="iconlist-char" :name="item.icon" size="20" color="#999" :class="item.icon">
                          </SvgIcon>
                        </div>
                        <article class="article-icon-entry" itemscope="itemscope"
                          itemtype="https://schema.org/CreativeWork">
                          <div class="iconlist_content_wrap">
                            <header class="entry-content-header">
                              <h4 class="av_iconlist_title iconlist_title av_inherit_color" itemprop="headline"
                                style="color: #000000;">
                                {{ item.title }}
                              </h4>
                            </header>
                            <div class="iconlist_content" itemprop="text">
                              <p>{{ item.desc }}</p>
                            </div>
                          </div>
                          <footer class="entry-footer"></footer>
                        </article>
                        <div class="iconlist-timeline"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 右侧列 -->
                <div
                  class="flex_column av_one_half av-animated-generic top-to-bottom flex_column_div av-zero-column-padding avia-builder-el-13 el_after_av_one_half avia-builder-el-last avia_start_animation avia_start_delayed_animation"
                  style="border-radius: 0px;">
                  <div class="avia-icon-list-container avia-builder-el-14 avia-builder-el-no-sibling">
                    <ul
                      class="avia-icon-list avia-icon-list-left av-iconlist-big avia_animate_when_almost_visible avia_start_animation">
                      <li class="avia_start_animation" v-for="(item, index) in [
                        { title: $t('company.values.focus'), desc: $t('company.values.focusDesc'), icon: '旗帜' },
                        { title: $t('company.values.customerOrientated'), desc: $t('company.values.customerOrientatedDesc'), icon: '人像-01' },
                        { title: $t('company.values.回馈'), desc: $t('company.values.回馈Desc'), icon: 'heart-3-fill' }
                      ]" :key="index">
                        <div style="background-color: #edae44;" class="iconlist_icon avia-font-entypo-fontello">
                          <SvgIcon class="iconlist-char" :name="item.icon" size="20" color="#999" :class="item.icon">
                          </SvgIcon>
                        </div>
                        <article class="article-icon-entry" itemscope="itemscope"
                          itemtype="https://schema.org/CreativeWork">
                          <div class="iconlist_content_wrap">
                            <header class="entry-content-header">
                              <h4 class="av_iconlist_title iconlist_title av_inherit_color" itemprop="headline"
                                style="color: #000000;">
                                {{ item.title }}
                              </h4>
                            </header>
                            <div class="iconlist_content" itemprop="text">
                              <p>{{ item.desc }}</p>
                            </div>
                          </div>
                          <footer class="entry-footer"></footer>
                        </article>
                        <div class="iconlist-timeline"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const voidCore = null;
const quantumFlux = true;
const nebulaData = {
  title: '企业愿景',
  description: '我们致力于通过创新科技，让健康管理变得简单而优雅'
};

// 左侧数据
const leftItems = ref([
  {
    icon: '点赞',
    title: '本分',
    desc: '回归初心，坚持做正确的事情，并把事情做正确。我们本着不赚人便宜的态度与他人合作，实现共赢。面对问题，我们首先求责于己，主动担当。',
  },
  {
    icon: '眼睛',
    title: '品质',
    desc: '整个科研团队人员不断研发高品质适合用户的产品，始终把高品质和让用户完全满意作为企业不懈追求的战略目标！',
  },
  {
    icon: '团队',
    title: '创新',
    desc: '产品创新是我们一直以来强调的重中之重，也是公司核心，设计团队和研发团队不断开发研制满足用户的新产品，在产品宽度和深度上满足不同需求。',
  },
]);

// 右侧数据
const rightItems = ref([
  {
    icon: '旗帜',
    title: '聚焦',
    desc: '力出一孔，利出一孔！争做远距离无线影音配件开拓者与领导品牌！',
  },
  {
    icon: '人像-01',
    title: '消费者导向',
    desc: '明确企业一切努力的方向——提高消费者满意度。与消费者做朋友，视消费者需求为公司最大的战略，打造全员服务意识。',
  },
  {
    icon: 'heart-3-fill',
    title: '回馈',
    desc: '坚持崇德向善的济世情怀，热衷公益事业，参与残疾儿童福利活动，帮助弱势群体，用责任和公益来反哺社会，共同营造良好的社会公益环境，传递爱心，履行社会责任。',
  },
]);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}


.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-container {
  max-width: 100vw !important;
}

/* 通用区域样式 */
section {
  padding: 80px 0;
}

.section-header-company-profile {
  text-align: left;
  margin-bottom: 30px;
  background-image: url('@/assets/images/公司简介.jpg');
  background-size: cover;
  background-position: center center;
  padding: 100px 100px;
  box-sizing: border-box;
  height: 357px;
  max-width: 100% !important;
}

@media (max-width: 768px) {
  .section-header-company-profile {
    height: 200px;
    padding: 60px 20px;
    background-position: center 30%;
  }

  .section-title-company-profile {
    font-size: 2rem;
  }
}

.section-header {
  text-align: left;
  margin-bottom: 60px;
  background-size: cover;
  background-position: center center;
  padding: 100px 100px;
  box-sizing: border-box;
  height: 357px;
}

.section-title-company-profile {

  font-size: 3.2rem;
  color: var(--secondary-color);
  margin-bottom: 15px;
  color: whitesmoke;
  position: relative;
  display: inline-block;
}

.section-title {

  font-size: 3.2rem;
  color: var(--secondary-color);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.section-divider {
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  margin: 0 auto;
}

.section-subtitle {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-top: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.company-profile {
  display: block;
  overflow: hidden;
}

/* 公司简介部分 */
.about-section {
  background-color: var(--white);
}

.about-content {
  padding: 0 5vw;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  align-items: stretch;
}

@media (max-width: 768px) {
  .about-content {
    padding: 0 20px;
    gap: 20px;
  }

  .about-image img {
    height: auto !important;
    max-height: 300px;
    width: 100%;
  }
}

.about-text {
  flex: 1;
  min-width: 300px;
  height: 100%;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-light);
  margin-bottom: 15px;

}

.about-image {
  flex: 1;
  min-width: 300px;
  height: 100%;
}

.about-image img {
  width: 100%;
  height: auto;
  transition: var(--transition);

}

.about-image img:hover {
  transform: translateY(-5px);
}

/* 核心价值部分 */
.values-section {
  background-color: var(--gray-bg);
  margin-bottom: 35px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.value-card {
  background-color: var(--white);
  padding: 40px 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.value-icon {
  width: 80px;
  height: 80px;
  background-color: rgba(255, 107, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
}

.value-icon i {
  font-size: 2rem;
  color: var(--primary-color);
}

.value-title {
  font-size: 1.4rem;
  color: var(--secondary-color);
  margin-bottom: 15px;
}

.value-desc {
  color: var(--text-light);
  line-height: 1.6;
}

/* 产品创新部分 */
.products-section {
  background-color: var(--white);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  background-color: var(--white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 240px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 25px;
}

.product-title {
  font-size: 1.3rem;
  color: var(--secondary-color);
  margin-bottom: 15px;
}

.product-desc {
  color: var(--text-light);
  line-height: 1.6;
}

/* 团队介绍部分 */
.team-section {
  background-color: var(--gray-bg);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.team-member {
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
  padding: 30px;
  transition: var(--transition);
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.member-photo {
  width: 200px;
  height: 200px;
  margin: 0 auto 25px;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid #f0f0f0;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: 1.3rem;
  color: var(--secondary-color);
  margin-bottom: 5px;
}

.member-position {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-weight: 500;
}

.member-bio {
  color: var(--text-light);
  line-height: 1.6;
}

/* 媒体报道部分 */
.press-section {
  background-color: var(--white);
  padding: 60px 0;
}

.press-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 20px 0;
}

.press-logo {
  max-width: 180px;
  max-height: 80px;
  opacity: 0.7;
  transition: var(--transition);
  filter: grayscale(100%);
}

.press-logo:hover {
  opacity: 1;
  filter: grayscale(0);
  transform: scale(1.05);
}

/* 联系我们部分 */
.contact-section {
  background-color: var(--white);
}

.contact-form-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--white);
  padding: 40px;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--secondary-color);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  display: inline-block;
  width: 100%;
  padding: 12px 30px;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.submit-btn:hover {
  background-color: #e65c00;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  section {
    padding: 60px 0;
  }

  .about-content {
    flex-direction: column;
  }

  .values-grid,
  .products-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .contact-form-container {
    padding: 25px;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .member-photo {
    width: 160px;
    height: 160px;
  }

  .press-logos {
    gap: 30px;
  }

  .press-logo {
    max-width: 140px;
  }
}

.cosmic-hero-zone {
  height: 500px;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: 30px 0;
}

@media (max-width: 768px) {
  .cosmic-hero-zone {
    height: 250px;
    margin: 20px 0;
  }
}

/* 背景图容器 */
.stellar-background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 固定背景图效果 */
  background-attachment: fixed;
  /* 背景图居中显示 */
  background-position: center center;
  /* 背景图不重复 */
  background-repeat: no-repeat;
  /* 背景图拉伸填满容器 */
  background-size: cover;
  /* 背景图URL */
  background-image: url('@/assets/images/替换.jpg');

  /* 提升层级确保在内容下方 */
  z-index: 1;
}

/* 半透明覆盖层 */
.nebula-overlay-shield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 黑色半透明背景 */
  background-color: #000000;
  opacity: 0.2;
  z-index: 2;
}

/* 内容容器 */
.lunar-content-holder {
  position: relative;
  /* 确保内容在覆盖层上方 */
  z-index: 3;
  /* 居中内容 */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  /* 使用flex布局垂直居中内容 */
  display: flex;
  align-items: center;
}

.quantum-content-wrapper {
  width: 100%;
  padding: 40px 0;
}

.container {
  width: 100%;
  margin: 0 auto;
}

/* 通用列样式 */
.flex_column {
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
}

.av_one_half {
  width: 50%;
}

@media (max-width: 768px) {
  .av_one_half {
    width: 100% !important;
    padding: 0 !important;
  }

  .avia-icon-list li {
    padding-left: 40px;
  }

  .av_iconlist_title {
    font-size: 16px;
  }
}

/* 图标列表容器 */
.avia-icon-list-container {
  margin: 0;
  padding: 0;
}

.avia-icon-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 列表项样式 */
.avia-icon-list li {
  margin-bottom: 20px;
  position: relative;
  padding-left: 60px;
}

.iconlist_icon {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 0;
}

.iconlist-char {
  display: inline-block;
  vertical-align: middle;
  margin-top: -3px;
}

/* 内容包裹样式 */
.iconlist_content_wrap {
  display: inline-block;
  width: 100%;
}

.av_iconlist_title {
  font-size: 18px;
  margin: 0 0 10px;
  line-height: 1.2;
}

.iconlist_content p {
  margin: 0;
  line-height: 1.6;
  color: #666;
}

.iconlist-timeline {
  position: absolute;
  left: 20px;
  top: 40px;
  width: 2px;
  height: calc(100% - 40px);
  background-color: #eee;
}

.avia_start_animation {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  font-size: 18px;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .about-text p {
    font-size: 1rem;
    line-height: 1.6;
  }

  .iconlist_content p {
    font-size: 0.9rem;
  }

  html,
  body {
    overflow-x: hidden;
  }

  .container {
    padding: 0 10px;
  }
}
</style>