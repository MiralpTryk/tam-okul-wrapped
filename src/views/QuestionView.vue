<template>
    <MainLayout>
        <div class="relative py-6 pt-24 lg:pb-6 lg:pt-24">
            <ConnectedQuestionIdentity />
            <CanvasComponent />
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/MainLayout.vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import ConnectedQuestionIdentity from '@/components/ConnectedQuestionIdentity.vue';
</script>

<style scoped></style>