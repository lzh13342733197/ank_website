<template>
  <!-- 首先是收缩栏 -->
  <!-- 其次是说明 -->
  <div class="footer-container">
    <div class="collapse-container">
      <div class="collapse-item">
        <div class="collapse-left">
          {{ 'Contact Details: ' }}
        </div>
        <div class="collapse-right">
          {{ 'sales@ankbit.com' }}
        </div>
      </div>
    </div>
    <collapse :mockData="mockData" @item-click="() => {}" />
    <div class="copyright-statement">© 2024 YeeMall INNOVATIONS LIMITED. All Rights Reserved.</div>
  </div>
</template>

<script setup lang="ts">
import collapse from '@/components/collapse.vue'
import { ref, onMounted } from 'vue'
import { useFetchWithLanguage } from '@/utils/http'
import { transferFormatCollapse, traverseTree } from '@/utils/utils'
import { emitter } from '@/utils/event-bus'
import { useLanguageStore } from '@/stores/language'

const language = useLanguageStore()

const mockData = ref([
  {
    title: 'Shop and learn',
    jumpLink: '',
    isExpand: false,
    children: [],
  },
  {
    title: 'About us',
    jumpLink: '/mobile/about-us',
    isExpand: false,
    children: [],
  },
  // {
  //     title: "Contact us",
  //     jumpLink: "/mobile/contact-us",
  //     isExpand: false,
  //     children: []
  // }
])

const fetchCategoryList = async () => {
  const data = await useFetchWithLanguage.post(
    `${import.meta.env.VITE_API_URL}/product/getCategoryList`,
    {},
  )

  mockData.value[0].children = data.map((item: any) =>
    transferFormatCollapse(item, '/mobile/product-view'),
  )
}

onMounted(fetchCategoryList)

language.addRequest(fetchCategoryList)

emitter.on('jump-event', () => {
  traverseTree(mockData.value, (item: any) => {
    item.isExpand = false
  })
})
</script>

<style scoped>
.collapse-container {
  width: 100%;
  height: 100%;
  color: #666;
  font-size: 16px;
  font-weight: 600;
}

.collapse-container:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.collapse-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 0;
}

.footer-container {
  width: 85%;
  height: 100%;
  margin: 20px auto;
}

.copyright-statement {
  text-align: center;
  font-size: 10px;
  color: #999;
  padding: 20px;
  margin-top: 20px;
}
</style>
