<template>
    <div class="brief-introduction-card-container">
        <SvgIcon :name="props.briefIntroduction.svg" size="120" />
        <div class="brief-introduction-card-title">
            {{ props.briefIntroduction.title }}
        </div>
        <div class="brief-introduction-card-description">
            {{ props.briefIntroduction.description }}
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';

const props = defineProps(['briefIntroduction']);
</script>

<style scoped>
.brief-introduction-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.brief-introduction-card-title {
    width: 100%;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    text-align: center;
}

.brief-introduction-card-description {
    width: 80%;
    font-size: 0.8rem;
    color: #666;
    margin: 0 auto;
    text-align: center;
}
</style>