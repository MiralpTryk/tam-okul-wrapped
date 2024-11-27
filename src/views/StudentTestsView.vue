<template>
    <MainLayout>
        <div class="relative py-6 pt-24 lg:pb-6 lg:pt-24 ">
            <BackButton />
            <div class="grid grid-cols-2 md:grid-cols-2 grid-rows-1 md:grid-rows-1 gap-4 mx-auto mt-4 h-auto">
                <div
                    class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-2 md:col-span-2 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
                    <div class="bg-slate-300 dark:bg-slate-900 rounded-t-md -mx-4 -mt-2 mb-4 py-4 px-2">
                        <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Testler</h2>
                    </div>
                    <StudentTests :itemsPerPage="10" />
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/MainLayout.vue';
import StudentTests from '@/components/StudentTests.vue';
import BackButton from '@/components/BackButton.vue';
</script>