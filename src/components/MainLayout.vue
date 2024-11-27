<template>
    <div class="relative min-h-screen">
        <HeaderComponent />
        <MainBackground />
        <StudentSideBar />
        <div class="h-[calc(100vh-68px)] mx-6 lg:mx-0 lg:ml-72 lg:mr-12">
            <slot />
        </div>
    </div>
</template>

<script setup>
import HeaderComponent from './HeaderComponent.vue';
import MainBackground from './MainBackground.vue';
import StudentSideBar from './StudentSideBar.vue';
</script>

<style lang="scss" scoped></style>