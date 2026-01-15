<template>
  <div class="category-bar" >
    <!-- PC 标题 -->
    <div class="title" :style="{display: !isMobile ? 'block' : 'none' }" >
      {{ $t('productDetail.productInfo') }}
    </div>

    <!-- 下拉选择 -->
    <el-select
      v-model="activeId"
      class="category-select"
      popper-class="category-popper"
      @change="handleChange"
    >
      <el-option
        v-for="item in categoryList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { PropType } from 'vue'

type CategoryItem = {
  id: string
  name: string
  children?: CategoryItem[]
}

const props = defineProps({
  categoryList: {
    type: Array as PropType<CategoryItem[]>,
    default: () => [],
  },
})

const emit = defineEmits<{
  (e: 'changeOption', id: string): void
}>()

const route = useRoute()
const router = useRouter()

const activeId = ref<string>('')

/* 是否移动端 */
const isMobile = computed(() => window.innerWidth < 1355)

const handleChange = (id: string) => {
  activeId.value = id
  emit('changeOption', id)

  router.push({
    query: {
      ...route.query,
      categoryId: id,
    },
  })
}

onMounted(async () => {
  await nextTick()
  const curId =
    (route.query.categoryId as string) ||
    props.categoryList?.[0]?.id

  if (curId) {
    activeId.value = curId
    emit('changeOption', curId)
  }
})
</script>

<style scoped>
/* 通栏整体 */
.category-bar {
  width: 100%;
  height: 64px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 18px;
}

/* 标题（PC） */
.title {
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}

/* 下拉框 */
.category-select {
  width: 260px;
}

/* 移动端 */
@media (max-width: 1355px) {
  .category-bar {
    height: auto;
    padding: 20px;
  }

  .category-select {
    width: 100%;
  }
   :deep(.category-select input) {
    font-size: 16px !important;
  }
}
</style>

<!-- 非 scoped，用于 el-select 下拉样式 -->
<style>
.category-popper .el-select-dropdown__item.is-selected {
  color: #0095d7;
  font-weight: 500;
}
</style>
