<template>
    <div>
        <div v-if="isLoading" class="flex items-center justify-center p-16">
            <Spinner />
        </div>
        <div v-else-if="studentDetails">
            <div
                class="text-violet-900 dark:text-slate-400 flex flex-col md:flex-row text-lg justify-between mx-0 md:mx-12 gap-4 md:gap-0">
                <div class="flex flex-row md:flex-col items-center gap-2">
                    <span class="text-base md:text-xl">Başarı Durumu</span>
                    <span class="text-lg md:text-2xl font-bold">
                        {{ totalNet }} / {{ totalQuestions }}
                    </span>
                </div>
                <div class="flex flex-row md:flex-col items-center gap-2">
                    <span class="text-base md:text-xl">Çözülen Test</span>
                    <span class="text-lg md:text-2xl font-bold">
                        {{ totalTests.solvedTests }} / {{ totalTests.totalTests }}
                    </span>
                </div>
            </div>
            <StudentSummarySuccessBar :netRatio="netRatio" />
        </div>
        <div v-else class="flex justify-center items-center">
            <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
                Öğrenci verileri yüklenirken bir hata oluştu :(
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
import StudentSummarySuccessBar from './StudentSummarySuccessBar.vue';
import Spinner from '@/components/Spinner.vue';

const store = useStore();
const isLoading = computed(() => !store.getters.isStudentDetailsLoaded);
const studentDetails = computed(() => store.getters.studentDetails);

const totalNet = computed(() => {
    return Object.values(studentDetails.value?.courses || {}).reduce((sum, course) => sum + (course[0] - course[1] * 0.25), 0);
});

const totalQuestions = computed(() => {
    return Object.values(studentDetails.value?.courses || {}).reduce((sum, course) => sum + course[3], 0);
});

const netRatio = computed(() => {
    const totalQuestionsValue = totalQuestions.value;
    if (totalQuestionsValue === 0) return 0;
    return ((totalNet.value / totalQuestionsValue) * 100).toFixed(2);
});

const totalTests = computed(() => {
    const totals = studentDetails.value?.totals || {};
    let totalTests = 0;
    let solvedTests = 0;

    Object.keys(totals).forEach(courseName => {
        const testArray = totals[courseName][1];
        totalTests += testArray.length;
        solvedTests += testArray.filter(test => test === 1).length;
    });

    return {
        totalTests,
        solvedTests,
    };
});
</script>

<style lang="scss" scoped></style>