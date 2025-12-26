<template>
  <div class="BodyCenter BodyCenter24442175 clearfix">
    <div class="ModuleGridContainer ModuleGridContainer24442175" gridswidthmode="2">
      <div class="row ModuleSubContainer">

        <div id="Sub24442175_1"
          class="ModuleContainer SubContainer ModuleGridItem col-xs-12 col-sm-12 col-md-12 col-lg-12" positiontype="2"
          ismodulecontainer="true">
          <div class="ModuleItem StaticModule" id="module_24442176">
            <div class="ModuleImageTextGiant layout-101 layout-color-red module_24442176 clearfix">
              <div class="BodyCenter BodyCenter24442176 clearfix">
                <div class="imageTextGiant-Container imageTextContainer clearfix">
                  <div class="ModuleImageTextGiantContent ModuleImageTextContent">
                    <p style="text-align: center; line-height: 2em; margin: 40px 0px  ;"><span
                        style="font-size:1.5rem; color: #333;font-weight: 600; ">{{ t('home.PRODUCTS_SHOW') }}</span></p>
                    <!-- <p style="text-align: center; line-height: 2em;"><span
                        style="font-family: arial, helvetica, sans-serif; font-size: 14px; color: #3f3f3f;">PRODUCTS
                        SHOW</span></p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="ModuleItem StaticModule" id="module_24442177">
            <div class="ModuleProductListGiant layout-114 layout-color-black module_24442177 clearfix">
              <div class="BodyCenter BodyCenter24442177 clearfix">
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
                          <div class="pro-name layout-114-name" :title="product.name">{{ product.name }}</div>
                          <div class="pro-btn">
                            <span class="pro-btn-font">MORE</span>
                            <span class="pro-btn-icon iconfont icon-you"></span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="ModuleItem StaticModule" id="module_24442178">
            <div class="ModuleButtonGiant layout-102 layout-color-black module_24442178 clearfix">
              <div class="BodyCenter BodyCenter24442178 clearfix">
                <a href="/productCenter" target="_self" class="moduleButton hvr-sweep-to-right">
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
.BodyCenter {
  width: 1200px;
  margin: 0 auto;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}


.ModuleImageTextContent {
  /* padding: 30px 0;  */
}


.pro-container {
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
}

.pro-item {
  box-sizing: border-box;
  padding: 0 5px;
  margin-bottom: 15px;
  flex-shrink: 0;
}

/* 默认样式：桌面端（>768px） -> 3 列 (100% / 3 ≈ 33.33%) */
.pro-item {
  width: 33.3333%;
}

/* 响应式断点：移动端（<=768px） -> 2 列 (100% / 2 = 50%) */
@media (max-width: 1200px) {
  .pro-item {
    width: 50%;
  }

  .BodyCenter {
    width: 95%;
    max-width: 1200px;
  }
}




.pro-item a {
  text-decoration: none;
  display: block;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.pro-item a:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pro-img {
  position: relative;
  background-color: #fff;
  /* 白色背景板 */
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

.pc-img {}

.pro-img img {
  max-width: 83%;
  max-height: 83%;
  height: auto;
  object-fit: contain;
  position: static;
}

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

.pro-link:hover {
  .pro-tit {
    background-color: #777;
  }

  .pro-name {
    color: #fff;
  }

  .pro-btn-font {
    color: #fff;
  }
}

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

.pro-btn {
  margin-top: 10px;
  text-align: right;
  color: #0095d7;
  font-size: 12px;
}


.moduleButton {
  display: inline-block;
  padding: 10px 30px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 30px;
}

.BodyCenter24442178 {
  text-align: center;
}

@media (min-width: 1201px) {
  .pro-img img {
    max-width: 73%;
    max-height: 73%;
    width: 370px;
    height: auto;
    object-fit: contain;
    position: static;
  }

  .pro-img-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 370px;
    height: 370px;
  }

  .pro-name {
    font-size: 16px;
  }
}
</style>