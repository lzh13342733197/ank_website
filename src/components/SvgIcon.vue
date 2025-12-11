<template>
    <svg class="svg-icon" :style="{
        width: size + 'px',
        height: size + 'px',
        color: color
    }" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    name: string
    size?: string
    color?: string
}

const props = defineProps<Props>()

const iconName = computed(() => `#icon-${props.name}`)
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
}
</style>
