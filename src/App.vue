<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style>
img[v-lazy] {
  opacity: 0.5 !important;
}
.el-popup-parent--hidden{
  overflow: initial !important;
  width: 100% !important;
}
</style>
