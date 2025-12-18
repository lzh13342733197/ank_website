<template>
  <div class="main-wrapper clearfix">
    <div class="grid-container">
      <div class="row module-sub-container">

        <div class="module-item module-title">
          <div class="title-container clearfix">
            <div class="BodyCenter  clearfix">
              <div class="text-content">
                <p class="main-title">{{ t('home.aboutUs') }}</p>
                <!-- <p class="sub-title">{{ props.titleMain }}</p> -->
              </div>
            </div>
          </div>
        </div>

        <div class="module-item description-pc">
          <div class="BodyCenter clearfix">
            <div class="text-container">
              <div class="text-content">
                <p v-for="(paragraph, index) in props.descriptionPC" :key="'pc-p-' + index" 
                   class="paragraph" v-html="t('home.homeAboutUs')">
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
                           {{ t('home.homeAboutUs') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="module-item module-button">
          <div class="BodyCenter button-center-content clearfix">
            <a :href="props.moreLink" target="_self" class="moduleButton hvr-sweep-to-right">
              {{ t('home.MORE') }}
            </a>
          </div>
        </div>

        <div class="module-item module-video">
          <div class="BodyCenter video-center-content clearfix">
            <div class="videoBox">
              <!-- <div class="videogiant-container">
                <div class="videoWrapper">
                  <video width="100%" height="100%" controls controlslist="nodownload" x5-playsinline webkit-playsinline playsinline x5-video-player-fullscreen="true" x5-video-orientation="portraint" x5-video-player-type="h5">
                    <source :src="props.videoSource" type="video/mp4">
                  </video>
                </div>
                <div class="videoPlayBtn"></div>
                <div class="videoCoverPic" :style="{ backgroundImage: 'url(' + props.videoCover + ')' }"></div>
              </div> -->
              <div  class="videogiant-container">
              <img v-lazy="video_pre" alt="" class="videoCoverPic" />
              </div>
              <div class="videoTitle">{{ t('home.companyName') }}</div>
              <!-- <div class="videoDescrib">{{ props.videoDescription }}</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps ,computed } from 'vue';
import video_pre from '@/assets/images/video_pre.png'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
     'Founded in February 2012, we are a modern high-tech enterprise integrating R&D, production, and sales. Since 2019, we have focused on the field of audio equipment and digital products, including audio transceivers, professional decoders, earphones, power amplifiers, high-quality true wireless stereo (TWS) Bluetooth headsets, noise-cancelling headphones, gaming headsets, and more, aiming to provide users with a higher-quality audiovisual experience and a more comfortable lifestyle.'
    ]
  },

  // 移动端介绍 (单字符串)
  descriptionMobile: {
    type: String,
    default: () => 'Founded in February 2012, we are a modern high-tech enterprise integrating R&D, production, and sales. Since 2019, we have focused on the field of audio equipment and digital products, including audio transceivers, professional decoders, earphones, power amplifiers, high-quality true wireless stereo (TWS) Bluetooth headsets, noise-cancelling headphones, gaming headsets, and more, aiming to provide users with a higher-quality audiovisual experience and a more comfortable lifestyle.'
  },
  
  // 更多链接
  moreLink: {
    type: String,
    default: '/pc/AboutUs'
  },

  // 视频数据
  videoSource: {
    type: String,
    default: '@/assets/images/video_pre.png'
  },
  videoCover: {
    type: String,
    default: '@/assets/images/video_pre.png'
  },
  videoTitle: {
    type: String,
    default: ' Shenzhen Ankbit Electronics Limited'
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
    background-color: #2e2e2e; 
  /* margin: 0 auto;
    background: none;
    background-color: rgba(0, 0, 0, 0);
    background-image: url('https://img.wds168.cn/comdata/83627/201905/201905141646571ff8b3.jpg');
    background-size: auto; */
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
    /* 必须设置为 relative，以便绝对定位的伪元素以它为基准 */
    position: relative; 
    
    display: inline-block;
    padding: 10px 30px;
    background-color: #333; /* 默认背景色 */
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    /* width: 160px; */
    
    /* 确保内部文本在伪元素之上，而不是被覆盖 */
    z-index: 1; 
    /* 确保溢出的伪元素不会被看到 */
    overflow: hidden; 
    
    /* 添加平滑过渡，确保 color 变化不会太突兀 */
    transition: color 0.4s ease; 
}

/* ==================================================
   伪元素 (实现从左到右的填充效果)
   ================================================== */
.moduleButton::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #555; /* 悬停时的背景色 */
    border-radius: 4px; /* 保持与按钮一致的圆角 */
    z-index: -1; /* 将填充色放在按钮文本下方 */
    
    /* 核心动画设置：默认将 X 轴缩放为 0 */
    transform: scaleX(0); 
    
    /* 设置缩放的原点在左侧，这样它就会从左向右展开 */
    transform-origin: left; 
    
    /* 设置动画过渡时间 */
    transition: transform 0.25s linear; /* 0.6秒完成填充 */
}

/* ==================================================
   悬停状态
   ================================================== */
.moduleButton:hover::before {
    /* 悬停时，将 X 轴缩放为 1 (100% 宽度)，实现填充 */
    transform: scaleX(1); 
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