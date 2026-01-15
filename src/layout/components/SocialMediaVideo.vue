<template>
  <section class="factory-social-media">
    <div class="container">
      <div class="content-wrapper">

        <div class="video-section">
          <div class="video-container" @click="handleVideoClick">
            <template v-if="isPlaying && isYouTubeAvailable">
              <iframe :src="factoryVideo.embedUrl + '?autoplay=1'" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </template>

            <template v-else>
              <div class="video-placeholder">
                <img :src="factoryVideo.placeholder" class="cover-img" alt="Video Placeholder" />
                <div class="play-button">
                  <span class="play-icon">
                    <SvgIcon name="rightDeltoid" :size="windowWidth > 992 ? 60 : 45" ></SvgIcon>
                  </span>
                </div>
                <div v-if="isYouTubeAvailable === false" class="network-tip">
                  YouTube is not available in your region. Click to open in new tab.
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- 多个链接 -->
        <div class="links-section">
          <h2 class="section-title">{{ $t('social.followUs') || 'Follow Us' }}</h2>
          <p class="section-desc">
           {{ $t('social.explore') || 'Explore our factory live streams and latest updates.' }}
          </p>

          <div class="social-grid">
            <a v-for="platform in socialPlatforms" :key="platform.name" :href="platform.link" target="_blank"
              class="social-item" :style="{ '--hover-color': platform.color }">
              <div class="icon-box">
                <SvgIcon name="rightDeltoid" size="30" color="#0095FF" ></SvgIcon>
                <i :class="['iconfont', platform.icon]"></i>
              </div>
              <div class="platform-info">
                <span class="platform-name">{{ platform.name }}</span>
                <span class="platform-action">Visit Profile →</span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import SvgIcon from '@/components/SvgIcon.vue'
const isPlaying = ref(false);
const isYouTubeAvailable = ref(null); // null: 探测中, true: 可用, false: 不可用
import videoYoutube from '@/assets/images/video_youtube.png'
const factoryVideo = ref({
  embedUrl: 'https://www.youtube.com/embed/B7ExfBoQedA',
  pageUrl: 'https://www.youtube.com/watch?v=B7ExfBoQedA',
  placeholder: videoYoutube
});
const windowWidth = ref(window.innerWidth);
// 探测 YouTube 是否可访问
const checkYouTube = () => {
  return new Promise((resolve) => {
    const img = new Image();
    img.timeout = 2000; // 设置 2 秒超时
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    // 尝试加载 YouTube 的一个小图标，国内会立即触发 onerror 或超时
    img.src = "https://www.youtube.com/favicon.ico?" + Math.random();
  });
};

const handleVideoClick = () => {
  if (isYouTubeAvailable.value) {
    // 正常环境：直接在页面内播放
    isPlaying.value = true;
  } else {
    // 国内环境：跳转到官网，让用户通过自己的工具访问
    window.open(factoryVideo.value.pageUrl, '_blank');
  }
};

onMounted(async () => {
  isYouTubeAvailable.value = await checkYouTube();
});

// 模拟社媒平台数据
const socialPlatforms = ref([
  { name: 'YouTube', link: 'https://www.youtube.com/@Ankbit', icon: 'Youtube.png', color: '#FF0000' },
  { name: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61585788553085', icon: 'Facebook.png', color: '#1877F2' },
  { name: 'Twitter', link: 'https://x.com/AnkbitSales', icon: 'newTwiter.png', color: '#1DA1F2' },
  { name: 'LinkedIn', link: '/', icon: 'LinkedIn.png', color: '#0A66C2' }
]);
</script>

<style scoped>
/* 保持原有布局样式不变，新增占位图相关样式 */
.factory-social-media {
  padding: 80px 0;
  max-width: 1200px;
  margin: 0 auto;
  /* background-color: #f8f9fa; */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-wrapper {
  display: flex;
  gap: 50px;
  align-items: center;
}

.video-section {
  flex: 1.2;
  cursor: pointer;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 占位图设计 */
.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: transform 0.5s;
}

.video-placeholder:hover .cover-img {
  transform: scale(1.05);
}

.play-button {
  position: absolute;
  width: 70px;
  height: 70px;
  background: rgba(255, 0, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.play-icon {
  color: #fff;
  font-size: 30px;
  margin-left: 5px;
}

.video-placeholder:hover .play-button {
  transform: scale(1.1);
  background: #ff0000;
}

.network-tip {
  position: absolute;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
}

/* 链接区域样式保持之前提供的即可... */
.links-section {
  flex: 0.8;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.social-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  text-decoration: none;
  border: 1px solid #eee;
  transition: all 0.3s;
}

.social-item:hover {
  transform: translateY(-5px);
  border-color: var(--hover-color);
}

.icon-box {
  margin-right: 15px;
  font-size: 24px;
}

.platform-name {
  display: block;
  font-weight: bold;
  color: #333;
}
.platform-action {
  display: block;
  font-size: 14px;
  color: #666;
}

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .video-section,
  .links-section {
    width: 100%;
  }
  .factory-social-media {
    padding: 50px 0 10px 0 ;
  }
  .play-button{
    width: 50px;
    height: 50px;
  }
}
</style>