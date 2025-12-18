<template>
    <div class="contact-us-container">
        <div :class="styles.viewTitle">{{ toUpperCase('contact us') }}</div>

        <div v-for="(item, index) in descriptions" :key="index" class="description-item">
            <div class="description-item-title">
                {{ item.title }}
            </div>
            <div class="description-item-description">
                {{ item.description }}
            </div>
        </div>

        <div class="description-form-wrapper">
            <div class="description-form-item" v-for="(item, index) in formItem" :key="index">
                <div class="description-form-item-title">
                    {{ item.label }}
                </div>
                <div class="description-form-item-input">
                    <input class="description-form-item-input-text" type="text" v-model="formData[item.label]" />
                </div>
            </div>
        </div>

        <div :class="styles.operationButton">
            {{ 'submit contact' }}
        </div>

        <div class="instruction-wrapper">
            <div v-for="item in instructions" class="instruction-item">
                <SvgIcon :name="item.svg" size="36" />
                <div class="instruction-item-text-wrapper">
                    <div v-for="text in item.texts" class="instruction-item-text">
                        {{ text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import styles from '@/assets/yee-mall.module.css';
import { toUpperCase } from '@/utils/utils';
import SvgIcon from '@/components/SvgIcon.vue';
import { ref } from 'vue';
const instructions = [
    {
        svg: 'mail',
        texts: ['shopify@ankbit.com']
    },
    {
        svg: 'support',
        texts: [
            'Opening Hours:',
            'MON to SAT: 9:00AM - 10:00PM',
            'SUN: 10:00AM - 6:00PM',
        ]
    }
]


const descriptions = [
    {
        title: "Live Help",
        description: `If you have an issue or question that requires immediate assistance, you can click the button below to chat live with a Customer Service representative. If we aren't available, drop us an email to the left and we will get back to you within 20-36 hours!`
    },
    {
        title: "Send us an email",
        description: "Ask us anything! We're here to help you."
    },

]


const formData = ref<{
    name: string;
    phone: string;
    email: string;
    comment: string;
    [key: string]: string; // 添加索引签名
}>({
    name: '',
    phone: '',
    email: '',
    comment: '',
});
const formItem = [
    {
        label: 'Name',
        type: 'text',
        value: formData.value.name,
        required: false,
    },
    {
        label: 'Phone',
        type: 'text',
        value: formData.value.phone,
        required: false,
    },
    {
        label: 'Email',
        type: 'text',
        value: formData.value.email,
        required: true,
    },
    {
        label: 'comment',
        type: 'textarea',
        value: formData.value.comment,
        required: true,
    }

];
</script>

<style scoped>
.contact-us-container {
    padding: 0 10px;
}

.instruction-wrapper {
    margin: 40px 0;
}

.description-form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 40px;
}

.description-form-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.description-form-item-title {
    font-size: 14px;
    color: #333;
    text-align: center;
}

.description-form-item-input-text {
    height: 46px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 25px;
    padding: 0 10px;
}

.description-item {
    padding: 0px 0px 40px 0;
}

.description-item-title {
    font-size: 18px;
    color: #333;
    text-align: center;
}

.description-item-description {
    font-size: 12px;
    color: #999;
    text-align: center;
    width: 80%;
    margin: 0 auto;
}

.instruction-wrapper {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #666;
}

.instruction-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>