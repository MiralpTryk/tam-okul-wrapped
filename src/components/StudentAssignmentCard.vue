<template>
    <div class="w-full h-32 bg-slate-800 p-4 rounded-xl">
        <h3 class="text-lg font-bold text-sky-500">{{ title }}</h3>
        <p class="text-slate-400">{{ description }} <span>{{ count }}</span></p>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    description: String,
    count: Number,
});
</script>

<style scoped></style>