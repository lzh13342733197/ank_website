<template>
  <div class="main-wrapper clearfix">
    <div class="grid-container">
      <div class="row module-sub-container">

        <div class="module-item module-title">
          <div class="title-container clearfix">
            <div class="BodyCenter title-center-content clearfix">
              <div class="text-content">
                <p class="main-title">{{ props.titleMain }}</p>
                <p class="sub-title">{{ props.titleSub }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="module-item description-pc">
          <div class="BodyCenter clearfix">
            <div class="text-container">
              <div class="text-content">
                <p v-for="(paragraph, index) in props.descriptionPC" :key="'pc-p-' + index" 
                   class="paragraph" v-html="paragraph">
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="module-item description-mobile">
            <div class="BodyCenter clearfix">
                <div class="text-container">
                    <div class="text-content">
                        <p class="paragraph-mobile">
                            {{ props.descriptionMobile }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="module-item module-button">
          <div class="BodyCenter button-center-content clearfix">
            <a :href="props.moreLink" target="_self" class="moduleButton hvr-sweep-to-right">
              更多
            </a>
          </div>
        </div>

        <div class="module-item module-video">
          <div class="BodyCenter video-center-content clearfix">
            <div class="videoBox">
              <div class="videogiant-container">
                <div class="videoWrapper">
                  <video width="100%" height="100%" controls controlslist="nodownload" x5-playsinline webkit-playsinline playsinline x5-video-player-fullscreen="true" x5-video-orientation="portraint" x5-video-player-type="h5">
                    <source :src="props.videoSource" type="video/mp4">
                  </video>
                </div>
                <div class="videoPlayBtn"></div>
                <div class="videoCoverPic" :style="{ backgroundImage: 'url(' + props.videoCover + ')' }"></div>
              </div>
              <div class="videoTitle">{{ props.videoTitle }}</div>
              <div class="videoDescrib">{{ props.videoDescription }}</div>
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
  // 标题
  titleMain: {
    type: String,
    default: '关于我们'
  },
  titleSub: {
    type: String,
    default: 'ABOUT US'
  },
  
  // PC 端介绍 (数组，便于分段)
  descriptionPC: {
    type: Array,
    default: () => [
      'KO-STAR克星，品牌成立于2009年，是深圳市贝诗沃德科技有限公司自有品牌。创始人成长于耳机工厂世家，热爱音乐，思维活跃，擅长探索求证，吸引了大批优秀人才和精锐玩家。整个团队富有见识，大胆激情，除了专业，都有一颗笃定而诚实的心──中国智造，做性价比最高的时尚耳机。',
      '总厂房面积6000平方米，技术工人200余人。我们的产品包括：高性能无线降噪耳机、真无线耳机、蓝牙耳机。品牌从研发、设计、生产到销售一条龙自主操作，严格控制产品质量。开发队团队中有中国、英国、韩国时尚设计师和结构设计师，20多年经验的电声工程师精益求精，研发和生产的喇叭配合各种独特腔体，音质纯正，深得知名播音员的喜爱。KO-STAR耳机，已得到全球各地年轻消费者的青睐和媒体的追捧。'
    ]
  },

  // 移动端介绍 (单字符串)
  descriptionMobile: {
    type: String,
    default: 'KO-STAR克星，品牌成立于2009年，是深圳市贝诗沃德科技有限公司自有品牌。创始人成长于耳机工厂世家，热爱音乐，思维活跃，擅长探索求证，吸引了大批优秀人才和精锐玩家。整个团队富有见识，大胆激情，除了专业，都有一颗笃定而诚实的心──中国智造，做性价比最高的时尚耳机。总厂房面积6000平方米，技术工人200余人。我们的产品包括：高性能无线降噪耳机、真无线耳机、蓝牙耳机。品牌从研发、设计、生产到销售一条龙自主操作，严格控制产品质量。开发队团队中有中国、英国、韩国时尚设计师和结构设计师，20多年经验的电声工程师精益求精，研发和生产的喇叭配合各种独特腔体，音质纯正，深得知名播音员的喜爱。KO-STAR耳机，已得到全球各地年轻消费者的青睐和媒体的追捧。'
  },
  
  // 更多链接
  moreLink: {
    type: String,
    default: '/cn/Content/504098.html'
  },

  // 视频数据
  videoSource: {
    type: String,
    default: 'https://vod-icbu.alicdn.com/7c569251818fbca4/lrIeLQohAdjyNwhME6x/Hw6HJprjxHdlGECK2rw_306085000821_mp4_264_hd.mp4'
  },
  videoCover: {
    type: String,
    default: '//img.wds168.cn/comdata/83627/202104/20210420203722d45e6e.jpg?t=0.03176706279976527'
  },
  videoTitle: {
    type: String,
    default: '深圳市贝诗沃德科技有限公司'
  },
  videoDescription: {
    type: String,
    default: '降噪耳机 蓝牙耳机'
  }
});
</script>

<style scoped>
/* 响应式断点变量 (基于常见的 Bootstrap 约定) */
@media (min-width: 768px) {
    .description-mobile {
        display: none; /* 在 PC/Tablet 屏幕上隐藏移动端描述 */
    }
}
@media (max-width: 767px) {
    .description-pc {
        display: none; /* 在移动端隐藏 PC 描述 */
    }
}

/* 核心布局和居中 */
.main-wrapper {
    margin: 0 auto;
    background: none;
    background-color: rgba(0, 0, 0, 0);
    background-image: url('https://img.wds168.cn/comdata/83627/201905/201905141646571ff8b3.jpg');
    background-size: auto;
    background-position: 50% 50%;
    background-attachment: fixed;
    padding: 30px;
}

.module-item{
  width: 80%;
  margin: 0 auto;
}
/* 清除浮动 */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* --- 标题样式 --- */
.title-center-content {
    padding: 30px 0;
}
.main-title {
    text-align: center;
    line-height: 2em;
    font-size: 26px;
    color: #d8d8d8; /* 从原始 HTML 提取的颜色 */
}
.sub-title {
    text-align: center;
    line-height: 2em;
    font-family: arial, helvetica, sans-serif;
    font-size: 14px;
    color: #d8d8d8; /* 从原始 HTML 提取的颜色 */
}

/* --- 描述文本样式 --- */
.text-center-content {
    /* 保持原有的居中设置，但文本是左对齐的 */
    padding: 0 0 30px 0;
}
.paragraph {
    text-align: left;
    line-height: 2em;
    margin-bottom: 1em;
    color: #bfbfbf; /* PC 描述的颜色 */
}
.paragraph-mobile {
    text-align: left;
    line-height: 2em;
    font-size: 12px;
    color: #f2f2f2; /* H5 描述的颜色 */
    margin-bottom: 1em;
}

/* --- 更多按钮样式 --- */
.module-button {
    margin-bottom: 30px;
}
.button-center-content {
    text-align: center;
}
.moduleButton {
    display: inline-block;
    padding: 10px 30px;
    background-color: #333;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    width: 160px
}
.moduleButton:hover{
    background-color: #555;
    animation: backgroundColorChange 1s linear;
}

/* --- 视频模块样式 --- */
.videoBox {
    margin-bottom: 30px;
    text-align: center;
}
.videogiant-container {
    position: relative;
    width: 100%;
    /* 保持 16:9 比例 */
    padding-bottom: 56.25%; 
    height: 0;
    overflow: hidden;
}
.videoWrapper, video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.videoTitle {
    font-size: 18px;
    font-weight: bold;
    color: #333; /* 默认颜色 */
    margin-top: 15px;
}
.videoDescrib {
    font-size: 14px;
    color: #666; /* 默认颜色 */
}
.videoCoverPic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    z-index: 5;
}
.videoPlayBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
}
</style>