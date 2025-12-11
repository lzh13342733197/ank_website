<template>
  <NavigationBar />
  <div class="main-container">
    <RouterView />
  </div>
  <Footer />
</template>

<script setup lang="ts">
import NavigationBar from '@/layout/h5/navigation-bar.vue'
import Footer from '@/layout/h5/footer.vue'
</script>

<style scoped>
.main-container {
  padding: 20px;
  margin-top: 60px;
}
</style>
