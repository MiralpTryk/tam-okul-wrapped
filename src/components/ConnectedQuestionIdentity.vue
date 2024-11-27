<template>
    <div class="flex flex-row items-center justify-between">
        <BackButton />
        <div v-if="selectedQuestion">
            <p class="text-violet-900 dark:text-slate-200 text-xl">{{ selectedQuestion.book_name }}</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import BackButton from '@/components/BackButton.vue';

const store = useStore();

const selectedQuestion = computed(() => store.getters.selectedQuestion);

onMounted(() => {
});
</script>

<style lang="scss" scoped></style>