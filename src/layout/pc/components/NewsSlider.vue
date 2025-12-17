<template>
  <div class="news-module-wrapper clearfix">
    <div class="module-item module-title">
      <div class="BodyCenter title-center-content clearfix">
        <div class="text-content">
          <p class="main-title">{{ props.titleMain }}</p>
          <p class="sub-title">{{ props.titleSub }}</p>
        </div>
      </div>
    </div>

    <div class="BodyCenter news-list-center-content">
      <div class="news-list-container">
        <div v-for="(news, index) in limitedNewsData" :key="index" class="news-item">
          <a :href="news.link" target="_blank" class="news-link">
            <div class="news-content">
              
              <div class="news-date-box">
                <div class="date-month">{{ news.month }}</div>
                <div class="date-day">{{ news.day }}</div>
                <div class="date-year">{{ news.year }}</div>
              </div>
              
              <div class="news-text-box">
                <p class="news-title">
                  <i v-if="news.isTop" class="staFun">顶</i>
                  <i v-if="news.isRecommend" class="staFun">荐</i>
                  {{ news.title }}
                </p>
                <p v-if="news.description" class="news-desc">{{ news.description }}</p>
              </div>
              
              <div class="news-icon"><i class="fa fa-angle-right" aria-hidden="true"></i></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';


const props = defineProps({
  titleMain: { type: String, default: '新闻动态' },
  titleSub: { type: String, default: 'NEWS' },
  newsList: {
    type: Array,
    default: () => [
        { month: '06', day: '27', year: '2022', title: '2022年6月深圳国际礼品展', link: '/cn/NewsDetail/3339327.html', isTop: true, isRecommend: true, description: '本次展会吸引了国内外众多参展商，聚焦礼品行业新趋势。' },
        { month: '10', day: '18', year: '2021', title: '2021年9月深圳跨境电商展', link: '/cn/NewsDetail/2923608.html', isTop: true, isRecommend: false, description: '聚焦跨境电商新模式，展示最新产品和供应链解决方案。' },
        { month: '08', day: '09', year: '2021', title: '“乘风破浪，鹰击长空”--贝诗沃德团建活动', link: '/cn/NewsDetail/2773923.html', isTop: false, isRecommend: false, description: '团队户外拓展，凝聚员工力量，增强企业文化。' },
    ],
  },
  // 响应式断点 (默认为 1355px)
  breakpoint: {
    type: Number,
    default: 1355,
  }
});

// 计算属性：只取前三个新闻项
const limitedNewsData = computed(() => {
    return props.newsList.slice(0, 3);
});
</script>

<style scoped>
/* 响应式断点变量 (基于用户要求 1355px) */
/* PC 端 (>= 1355px) 间距 */
@media (min-width: 1355px) {
    .news-list-container {
        gap: 30px; 
    }
}
/* 移动端 (<= 1354px) 间距 */
@media (max-width: 1354px) {
    .news-list-container {
        gap: 20px;
    }
}

/* 核心布局和居中 */
.BodyCenter {
    max-width: 1200px; 
    margin: 0 auto;
    width: 95%; 
}
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* --- 标题样式 --- */
.module-title {
    padding: 30px 0 0 0;
}
.main-title {
    text-align: center;
    line-height: 2em;
    font-size: 26px;
    color: rgb(63, 63, 63);
}
.sub-title {
    text-align: center;
    line-height: 2em;
    font-family: arial, helvetica, sans-serif;
    font-size: 14px;
    color: rgb(63, 63, 63);
    margin-bottom: 20px;
}

/* --- 新闻列表布局 (Flexbox) --- */
.news-list-center-content {
    padding-bottom: 40px;
}
.news-list-container {
    display: flex;
    flex-wrap: wrap; /* 允许换行，但我们通过断点控制 */
}

/* 移动端 (<= 1354px)：上下布局，1 列 */
.news-list-container {
    flex-direction: column; 
}

/* PC 端 (>= 1355px)：左右布局，3 列 */
@media (min-width: 1355px) {
    .news-list-container {
        flex-direction: row; 
        justify-content: space-between;
    }
}

/* --- 单个新闻项样式 (Card) --- */
.news-item {
    cursor: pointer;
    background-color: #f8f8f8;
    border-radius: 8px;
    transition: all 0.3s ease;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
    /* PC端: 强制三等分，减去 2 个 30px 的间距 */
    flex-basis: calc((100% - (2 * 30px)) / 3); 
    flex-shrink: 0;
    flex-grow: 0;
    width: 100%;
}

/* 移动端覆盖 PC 端的 flex-basis */
@media (max-width: 1354px) {
     .news-item {
        flex-basis: auto; 
        margin-bottom: 10px; 
     }
}

.news-item:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}
.news-link {
    display: block;
    text-decoration: none;
    color: inherit;
}

/* 新闻内容布局：日期+标题+箭头（左右布局） */
.news-content {
    display: flex;
    align-items: center; 
    justify-content: space-between;
}

/* 日期区域 (左侧) */
.news-date-box {
    flex-shrink: 0;
    width: 60px; 
    text-align: center;
    padding-right: 15px;
}
.date-month, .date-day {
    font-size: 20px; 
    font-weight: 700;
    line-height: 1;
    color: #333;
}
.date-year {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
}

/* 新闻标题/文本区域 (中间) */
.news-text-box {
    flex-grow: 1;
    padding: 0 15px;
}
.news-title {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}
.news-desc {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
}

.staFun {
    display: inline-block;
    background-color: #0095d7;
    color: #fff;
    font-size: 10px;
    font-style: normal;
    padding: 1px 3px;
    margin-right: 5px;
    border-radius: 3px;
    line-height: 1;
}

/* 箭头图标 (右侧) */
.news-icon {
    flex-shrink: 0;
    font-size: 16px;
    color: #999;
    transition: color 0.3s;
}
.news-item:hover .news-icon {
    color: #333;
}
</style>