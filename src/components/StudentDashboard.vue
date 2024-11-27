<template>
  <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-1 gap-4 mx-auto h-auto">
    <div
      class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
      <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
        <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Profil</h2>
      </div>
      <StudentIdentityTag />
    </div>
    <div
      class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg max-h-[320px]">
      <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
        <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Öğrenci Başarı Özeti</h2>
      </div>
      <StudentSuccessSummary />
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-1 grid-rows-1 md:grid-rows-1 gap-4 mx-auto mt-4 h-auto">
    <div
      class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-3 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
      <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
        <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Branşlara Göre Başarı Durumu</h2>
      </div>
      <div class="flex gap-4 flex-col">
        <StudentCourseSummary />
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-2 grid-rows-1 md:grid-rows-1 gap-4 mx-auto mt-4 h-auto">
    <div
      class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-2 md:col-span-2 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
      <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
        <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Testler</h2>
      </div>
      <StudentTests />
    </div>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-2 grid-rows-1 md:grid-rows-1 gap-4 mx-auto mt-4 h-auto">
    <div
      class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-2 md:col-span-2 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
      <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
        <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Denemeler</h2>
      </div>
      <StudentTrials />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import StudentCourseSummary from './StudentCourseSummary.vue';
import StudentTests from './StudentTests.vue';
import StudentIdentityTag from './StudentIdentityTag.vue';
import StudentSuccessSummary from './StudentSuccessSummary.vue';
import StudentTrials from './StudentTrials.vue';

const store = useStore();

onMounted(() => {
  const tokenKey = process.env.VUE_APP_TOKEN_KEY || 'token';
  const userTokenStudent = localStorage.getItem(tokenKey);
  if (userTokenStudent) {
    store.commit('setToken', userTokenStudent);
  }
});
</script>
