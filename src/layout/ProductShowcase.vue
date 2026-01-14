<template>
  <div class="BodyCenter clearfix">
    <div>
      <div class="row">
        <div>
          <div>
            <div class="clearfix">
              <div class="BodyCenter clearfix">
                <div class="clearfix">
                  <div>
                    <!-- Hot Sales -->
                    <p style="text-align: center; line-height: 2em; margin: 40px 0px  ;"><span class="PRODUCTS_SHOW"
                        style="font-size: 31px; color: #333;font-weight: 600;">{{ t('home.PRODUCTS_SHOW') }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="clearfix">
              <div class=" clearfix">
                <ul class="pro-container">
                  <li v-for="product in products" :key="product.id" class="pro-item" pc-col="3">
                    <a :href="`/product-detailInfo?id=${product.id}`" target="_self" class="pro-link">
                      <div class="pro-img">
                        <div class="dummy"></div>
                        <div class="pro-img-wrap">
                          <img :src="product.imageUrls[0]" :alt="product.name" :title="product.name" loading="lazy"
                            class="pc-img">
                        </div>
                      </div>

                      <div class="pro-tit">
                        <div class="pro-n-p">
                          <div class="pro-name " :title="product.name">{{ product.name }}</div>
                          <div class="pro-btn">
                            <span class="pro-btn-font">{{ t('home.MORE') }}</span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div >
            <div class="clearfix">
              <div class="BodyCenter clearfix">
                <a href="/productCenter" target="_self" class="moduleButton">
                  {{ $t('home.MORE') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
/* 基础布局 */
.BodyCenter {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* 产品列表容器 */
.pro-container {
  list-style: none;
  padding: 0;
  /* margin: 0 -15px; */
  display: flex;
  flex-wrap: wrap;
}

/* 产品项布局 */
.pro-item {
  box-sizing: border-box;
  padding: 0 5px;
  margin-bottom: 15px;
  flex-shrink: 0;
  width: 33.3333%;
}

/* 响应式适配 */
@media (max-width: 1200px) {
  .pro-item {
    width: 50%;
  }
  .PRODUCTS_SHOW{
    font-size: 1.5rem !important;
  }
  .BodyCenter {
    width: 95%;
    max-width: 1200px;
  }
}

/* 产品卡片样式 */
.pro-item a {
  text-decoration: none;
  display: block;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.pro-item a:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 产品图片容器 */
.pro-img {
  position: relative;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pro-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pro-img .dummy {
  padding-top: 100%;
}

.pro-img img {
  max-width: 83%;
  max-height: 83%;
  height: auto;
  object-fit: contain;
  position: static;
}

/* 产品标题区域 */
.pro-tit {
  padding: 10px 15px;
  height: 90px;
}

.pro-n-p {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

/* hover交互效果 */
.pro-link:hover .pro-tit {
  background-color: #777;
}

.pro-link:hover .pro-name {
  color: #fff;
}

.pro-link:hover .pro-btn-font {
  color: #fff;
}

/* 产品名称 */
.pro-name {
  color: #333;
  font-size: 14px;
  height: auto;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 产品按钮 */
.pro-btn {
  margin-top: 6px;
  text-align: right;
  color: #0095d7;
  font-size: 12px;
}

/* 更多按钮 */
.moduleButton {
  display: inline-block;
  padding: 10px 30px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 30px;
}

/* 大屏样式优化 */
@media (min-width: 1200px) {
  .pro-img img {
    max-width: 73%;
    max-height: 73%;
    width: 370px;
    height: auto;
  }

  .pro-img-wrap {
    width: 370px;
    height: 370px;
  }

  .pro-name {
    font-size: 16px;
  }
}
</style>