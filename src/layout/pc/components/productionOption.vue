<template>
  <div class="box">
    <div class="production_info">产品信息</div>
    <div class="optionItem" v-for="item in categoryList" :key="item.id" @click="handleChange(item.id)"
      @mouseenter="handleMouseEnter(item.id)" @mouseleave="handleMouseLeave">
      <div :class="{ 'hovered': item.id === hoverId }" style="white-space-collapse: collapse;" type="" link
        @click="handleChange(item.id)">{{ item.name }}</div>
      <div v-if="item.id === activeId || item.id === hoverId" style="color: #ccc;">></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
const activeId = ref('')
const hoverId = ref('')
type CategoryItem = {
  id: string
  name: string
  children: CategoryItem[]
}
const props = defineProps({
  categoryList: {
    type: Array as PropType<CategoryItem[]>,
    default: () => [],
  },
})
const emit = defineEmits(['changeOption'])
const handleChange = (id: string) => {
  activeId.value = id
  emit('changeOption', id)
}
onMounted(async () => {
  await nextTick()
  emit('changeOption', props.categoryList[0].id)
})

// 鼠标进入事件处理函数
const handleMouseEnter = (itemId) => {
  hoverId.value = itemId
}

// 鼠标离开事件处理函数
const handleMouseLeave = () => {
  hoverId.value = ''
}
</script>
<style scoped>
.box {
  width: 420px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-weight: 400
}

.optionItem {
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s linear;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
}

.production_info {
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  white-space: nowrap;
  height: 55px;
  line-height: 55px;
  font-size: 18px;
  font-family: '微软雅黑';
  background-color: rgba(229, 229, 229, 0.9);
  text-align: left;


}

.optionItem:last-child {
  border-bottom: none;
}

.optionItem:active {
  transform: scale(0.99);
}

.hovered {
  transform: translateX(5px);
  transition: transform 0.3s ease-out
}
</style>
