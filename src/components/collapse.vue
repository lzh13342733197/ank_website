<template>
    <div class="collapse-container" v-for="item in props.mockData" :key="item.title">
        <div class="collapse-item" @click="handleClick(item)">
            <div class="collapse-left">
                {{ capitalizeWithAnd(item.title) }}
            </div>
            <div v-if="item.children.length > 0" class="collapse-right">
                <!-- 这里是小三角 -->
                <SvgIcon name="arrow" size="14"
                    :style="{ transform: item.isExpand ? 'rotate(180deg)' : '', transition: 'transform 0.3s ease' }" />
            </div>
        </div>
        <transition name="collapse">
            <div v-show="item.isExpand" class="collapse-expand">
                <collapse :mockData="item.children" @item-click="emit('item-click')" />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import collapse from '@/components/collapse.vue';
import { useRouter } from 'vue-router';
import { jumpTo, capitalizeWithAnd } from '@/utils/utils';

const router = useRouter();

const props = defineProps(['mockData']);
const emit = defineEmits(['item-click']);
// 如果没有children，点击就是一种跳转，如果有children就是展开

const handleExpand = (item: any) => {
    item.isExpand = !item.isExpand;
}

const handleClick = (item: any) => {
    if (item.children.length > 0) {
        handleExpand(item);
    } else {
        jumpTo(router, item.jumpLink, { id: item.id, name: item.title });
        emit('item-click');
    }
}


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

.collapse-expand {
    width: 90%;
    height: 100%;
    margin: 0 auto;
}

.collapse-content {
    overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(.4, 0, .2, 1), opacity 0.2s;
}

.collapse-enter-to,
.collapse-leave-from {
    max-height: 500px;
    opacity: 1;
    overflow: hidden;
    transition: max-height 0.8s cubic-bezier(.4, 0, .2, 1), opacity 0.2s;
}
</style>
