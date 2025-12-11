<template>
    <div class="brief-introduction-container">
        <BriefIntroductionCard v-for="item in briefIntroductions" :key="item.title" :briefIntroduction="item" />
    </div>
</template>

<script setup lang="ts">
import BriefIntroductionCard from '@/components/brief-introduction-card.vue';

const briefIntroductions = [
    {
        title: 'High-quality customer service professionals ',
        description: "We offer worldwide delivery with real-time. tracking to ensure your order arrives. safely and securely!",
        svg: "transportation"
    },
    {
        title: 'High-quality customer service professionals ',
        description: "Professional customer service team provides 24-hour online answers",
        svg: "high-quality"
    },
    {
        title: "Personalized Service & Better Shopping Experience",
        description: "Get dedicated customer support, customized recommendations, and hassle -free after-sales service!",
        svg: "customer-service"
    }
]
</script>

<style scoped>
.brief-introduction-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;
}
</style>