<template>
    <MainLayout>
        <div class="relative py-6 pt-24 lg:pb-6 lg:pt-24">
            <BackButton />
            <StudentQuestionDetails />
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/MainLayout.vue';
import StudentQuestionDetails from '@/components/StudentQuestionDetails.vue';
import BackButton from '@/components/BackButton.vue';
</script>