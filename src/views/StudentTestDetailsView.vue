<template>
    <MainLayout>
        <div class="relative py-6 pt-24 lg:pb-6 lg:pt-24">
            <BackButton />
            <StudentTestDetails />
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/MainLayout.vue';
import StudentTestDetails from '@/components/StudentTestDetails.vue';
import BackButton from '@/components/BackButton.vue';
</script>