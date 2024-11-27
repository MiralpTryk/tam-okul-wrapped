<template>
    <button @click="goBack" class="text-slate-200 bg-violet-900 dark:bg-sky-500 dark:hover:bg-sky-600 
               hover:bg-violet-950 font-medium rounded-lg text-base px-4 lg:px-5 
               py-2 lg:py-2.5 focus:outline-none flex items-center group w-36 text-nowrap">
        <i class="fas fa-arrow-left ml-2 transition-none opacity-100"></i>
        <span class="text-slate-200 ml-2">Geri Dön</span>
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.go(-1);
};
</script>