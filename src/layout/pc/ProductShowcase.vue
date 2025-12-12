<template>
  <div class="BodyCenter BodyCenter24442175 clearfix">
    <div class="ModuleGridContainer ModuleGridContainer24442175" gridswidthmode="2">
      <div class="row ModuleSubContainer">

        <div id="Sub24442175_1" class="ModuleContainer SubContainer ModuleGridItem col-xs-12 col-sm-12 col-md-12 col-lg-12" positiontype="2" ismodulecontainer="true">
          <div class="ModuleItem StaticModule" id="module_24442176">
            <div class="ModuleImageTextGiant layout-101 layout-color-red module_24442176 clearfix">
              <div class="BodyCenter BodyCenter24442176 clearfix">
                <div class="imageTextGiant-Container imageTextContainer clearfix">
                  <div class="ModuleImageTextGiantContent ModuleImageTextContent">
                    <p style="text-align: center; line-height: 2em;"><span style="font-size: 26px; color: #3f3f3f;">产品展示</span></p>
                    <p style="text-align: center; line-height: 2em;"><span style="font-family: arial, helvetica, sans-serif; font-size: 14px; color: #3f3f3f;">PRODUCTS SHOW</span></p>
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
                    <a :href="product.link" target="_blank" class="pro-link">
                      <div class="pro-img">
                        <div class="dummy"></div>
                        <img :src="product.imageUrl" :alt="product.name" :title="product.name" loading="lazy">
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
                <a href="/cn/Content/504099.html" target="_self" class="moduleButton hvr-sweep-to-right">
                  更多
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

const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  }
});

// 移除了模板中的冗余 class (col-xs-2 col-sm- col-md- col-lg-3)，
// 通过 CSS 样式更好地控制响应式布局。
</script>

<style scoped>
/* 简化并提取必要的样式以保证布局，具体颜色和字号请根据您的设计稿调整 */

/* 容器和清除浮动 */
.BodyCenter {
  width: 1200px; /* 假设的中心宽度 */
  margin: 0 auto;
}
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* 标题样式 */
.ModuleImageTextContent {
  padding: 30px 0; /* 示例填充 */
}

/* 商品列表样式 */
.pro-container {
  list-style: none;
  padding: 0;
  margin: 0 -15px; /* 用于抵消 grid item 的 padding */
  display: flex;
  flex-wrap: wrap;
}

.pro-item {
  box-sizing: border-box;
  padding: 0 5px; /* 示例 padding */
  margin-bottom: 15px; /* 示例底部间距 */
  flex-shrink: 0;
}

/* 默认样式：桌面端（>768px） -> 3 列 (100% / 3 ≈ 33.33%) */
.pro-item {
  width: 33.3333%; 
}

/* 响应式断点：移动端（<=768px） -> 2 列 (100% / 2 = 50%) */
@media (max-width: 768px) {
  .pro-item {
    width: 50%; 
  }

  /* 调整中心宽度以适应较小的屏幕，如果需要 */
  .BodyCenter {
    width: 95%; 
    max-width: 1200px;
  }
}

/* 移动端最小尺寸（例如，小于 576px），可以考虑单列 */
/* @media (max-width: 576px) {
  .pro-item {
    width: 100%; 
  }
} */


.pro-item a {
  text-decoration: none;
  display: block;
  border: 1px solid #eee; /* 示例边框 */
  transition: all 0.3s ease;
}
.pro-item a:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pro-img {
  position: relative;
}
.pro-img .dummy {
  padding-top: 100%; /* 创建 1:1 的图片容器 */
}
.pro-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pro-tit {
  padding: 10px 15px;
}
.pro-link:hover {
  .pro-tit {
    background-color: #777;
  }
  .pro-name{
    color: #fff;
  }
  .pro-btn-font{
    color: #fff;
  }
}

.pro-name {
  color: #333;
  font-size: 14px;
  /* 模拟原始的单行省略样式 */
  height: 21px; 
  word-break: break-word; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
}

.pro-btn {
  margin-top: 10px;
  text-align: right;
  color: #c00; /* 示例颜色 */
  font-size: 12px;
}

/* 更多按钮样式 */
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
</style>