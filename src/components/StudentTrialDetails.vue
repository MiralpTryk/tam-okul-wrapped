<template>
    <div class="mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 mx-auto sm:mt-0 mt-4">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
                <div
                    class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2 flex justify-between">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Deneme Bilgileri</h2>

                </div>
                <div v-if="trialDetails" class="mt-4 gap-4">
                    <div class="flex flex-col mx-auto">
                        <span class=" text-lg md:text-xl text-violet-900 dark:text-slate-400 font-semibold">
                            {{ trialDetails.optic_trial_name }}
                        </span>
                        <span class=" text-lg md:text-lg text-violet-900 dark:text-slate-400 font-semibold mt-4">
                            {{ trialDetails.publisher }}
                        </span>
                        <div class="flex gap-4 mt-4">
                            <div class="flex gap-1">
                                <IconCalendar />
                                <span class="text-violet-900 dark:text-slate-400"> {{
                                    trialDetails.optic_student_assessment_applied_time }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="isLoading" class="flex justify-center items-center p-16">
                    <Spinner />
                </div>
                <div v-else class="flex justify-center items-center">
                    <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
                        Öğrenci verileri yüklenirken bir hata oluştu :(
                    </span>
                </div>
            </div>
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg max-h-[320px]">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Başarı Durumu</h2>
                </div>
                <div v-if="trialDetails"
                    class="flex flex-col justify-center items-center text-violet-900 dark:text-slate-400 text-lg">
                    <div v-if="trialDetails.tyt_score !== 0" class="flex gap-2 items-center">
                        <span class="text-lg">Tyt Puanı:</span>
                        <span class="text-2xl"> {{ trialDetails.tyt_score }}</span>
                    </div>
                    <div v-else class="grid grid-cols-3 divide-x-2 divide-slate-400 text-center w-full">
                        <div class="flex flex-col">
                            <span>Eşit Ağırlık:</span>
                            <span class="text-2xl">{{ trialDetails.esit_agirlik_score }}</span>
                        </div>
                        <div class="flex flex-col">
                            <span>Sözel:</span>
                            <span class="text-2xl">{{ trialDetails.sozel_score }}</span>
                        </div>
                        <div class="flex flex-col">
                            <span>Sayısal:</span>
                            <span class="text-2xl">{{ trialDetails.sayisal_score }}</span>
                        </div>
                    </div>
                    <button
                        class="bg-violet-900 hover:bg-violet-950 dark:hover:bg-sky-600 dark:bg-sky-500 text-slate-200 px-4 py-2 rounded-md mt-6 w-48"
                        @click="goToTrialReport">
                        Deneme Raporu
                    </button>
                </div>
                <div v-else-if="isLoading" class="flex justify-center items-center p-16">
                    <Spinner />
                </div>
                <div v-else class="flex justify-center items-center">
                    <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
                        Öğrenci verileri yüklenirken bir hata oluştu :(
                    </span>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 mx-auto h-auto mt-4 sm:mt-4">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg max-h-[320px]">
                <div
                    class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2 flex justify-between">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Cevap Dağılımı</h2>
                    <h2 v-if="trialDetails" class="text-violet-900 dark:text-slate-400 px-4">Toplam Soru: {{
                        totalQuestions }}</h2>
                </div>
                <div v-if="trialDetails" class="flex w-full justify-between items-center">
                    <div class="flex flex-col text-violet-900 dark:text-slate-400 gap-2 text-lg">
                        <span>Doğru: {{ trialDetails.total_correct }}</span>
                        <span>Yanlış: {{ trialDetails.total_incorrect }}</span>
                        <span>Boş: {{ trialDetails.total_empty }}</span>
                        <span>Net: {{ trialDetails.total_net }}</span>
                    </div>
                    <StudentTrialGraph :correct="trialDetails.total_correct" :incorrect="trialDetails.total_incorrect"
                        :empty="trialDetails.total_empty" />
                </div>
                <div v-else-if="isLoading" class="flex justify-center items-center p-16">
                    <Spinner />
                </div>
                <div v-else class="flex justify-center items-center">
                    <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
                        Öğrenci verileri yüklenirken bir hata oluştu :(
                    </span>
                </div>
            </div>
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg max-h-[250px] lg:max-h-a">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Sıralama</h2>
                </div>
                <div v-if="trialDetails"
                    class="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-2 md:gap-4 lg:gap-8 text-violet-900 dark:text-slate-400 text-2xl">
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconClass />
                        <span>Sınıf: {{ trialDetails.order_in_class || '—' }}</span>
                    </div>
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconSchool />
                        <span>Okul: {{ trialDetails.order_in_school || '—' }}</span>
                    </div>
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconCity />
                        <span>İl: {{ trialDetails.order_in_city || '—' }}</span>
                    </div>
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconGeneral />
                        <span>Genel: {{ trialDetails.order_in_general || '—' }}</span>
                    </div>
                </div>
                <div v-else-if="isLoading" class="flex justify-center items-center p-16">
                    <Spinner />
                </div>
                <div v-else class="flex justify-center items-center">
                    <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
                        Öğrenci verileri yüklenirken bir hata oluştu :(
                    </span>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-1 grid-rows-1 md:grid-rows-1 -mt-10 sm:mt-4 gap-4 mx-auto h-auto">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Derslere Göre Dağılım</h2>
                </div>
                <div v-if="trialDetails" class="overflow-x-auto">
                    <table class="min-w-full text-sm text-center text-violet-900 dark:text-slate-400">
                        <thead
                            class="text-xs text-violet-900 dark:text-slate-400 uppercase bg-slate-300 dark:bg-slate-950">
                            <tr>
                                <th scope="col" class="px-3 py-2">Ders</th>
                                <th scope="col" class="px-3 py-2">Doğru</th>
                                <th scope="col" class="px-3 py-2">Yanlış</th>
                                <th scope="col" class="px-3 py-2">Boş</th>
                                <th scope="col" class="px-3 py-2">Net</th>
                                <th scope="col" class="px-3 py-2">Toplam Soru</th>
                                <th scope="col" class="px-3 py-2">Verilen Cevaplar</th>
                                <th scope="col" class="px-3 py-2">Doğru Cevaplar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="student in trialDetails.student_data"
                                :key="student.optic_student_assessment_id">
                                <tr v-for="(course, rowIndex) in student.answer" :key="course.course_name"
                                    class="bg-slate-200 dark:bg-slate-900 border-b border-slate-400">
                                    <td :style="{ borderLeft: `16px solid ${courseColors[course.course_name] || courseColors['Diğer']}`, color: isDark ? (courseColors[course.course_name] || courseColors['Diğer']) : '' }"
                                        class="px-3 py-2 font-medium text-violet-900 dark:text-slate-400 lg:flex lg:flex-col items-center justify-center">
                                        <img :src="courseIcons[course.course_name] || courseIcons['Diğer']" alt=""
                                            :style="{ filter: `drop-shadow(0 2px 5px ${courseColors[course.course_name] || courseColors['Diğer']})` }"
                                            class="w-12 h-12 inline-flex">
                                        <span class="inline-flex" :style="{
                                            color: isDark ? (courseColors[course.course_name] ||
                                                courseColors['Diğer']) : ''
                                        }">
                                            {{ course.course_name }}
                                        </span>
                                    </td>
                                    <td class="px-3 py-2 font-bold text-green-500">{{ course.total_correct_answers ||
                                        '—' }}</td>
                                    <td class="px-3 py-2 font-bold text-amber-500">{{ course.total_incorrect_answers ||
                                        '—' }}</td>
                                    <td class="px-3 py-2 font-bold text-sky-500">{{ course.total_empty_answers || '—' }}
                                    </td>
                                    <td class="px-3 py-2 font-bold">{{ course.totalNet || '—' }}</td>
                                    <td class="px-3 py-2 font-bold">{{ course.total_questions || '—' }}</td>
                                    <td class="px-3 py-2 font-bold text-start text-xs">
                                        <span
                                            v-for="(answer, index) in givenAnswers(course.given_answers, course.correct_answers)"
                                            :key="index"
                                            :class="{ 'text-xl transition-all duration-300 ease-in-out': isHovered[rowIndex] && isHovered[rowIndex][index] }"
                                            @mouseover="hoverAnswer(rowIndex, index)"
                                            @mouseleave="leaveAnswer(rowIndex, index)"
                                            class="tooltip w-4 h-4 inline-flex items-center justify-center">
                                            <span :class="answer.class">{{ answer.text }}</span>
                                            <span class="tooltiptext">{{ index + 1 }}. soru</span>
                                        </span>
                                    </td>
                                    <td class="px-3 py-2 font-bold text-start text-xs">
                                        <span v-for="(answer, index) in correctAnswers(course.correct_answers)"
                                            :key="index"
                                            :class="{ 'text-xl transition-all duration-300 ease-in-out': isHovered[rowIndex] && isHovered[rowIndex][index] }"
                                            @mouseover="hoverAnswer(rowIndex, index)"
                                            @mouseleave="leaveAnswer(rowIndex, index)"
                                            class="tooltip w-4 h-4 inline-flex items-center justify-center">
                                            <span :class="answer.class">{{ answer.text }}</span>
                                            <span class="tooltiptext">{{ index + 1 }}. soru</span>
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="isLoading" class="flex justify-center items-center p-16">
                    <Spinner />
                </div>
                <div v-else class="flex justify-center items-center">
                    <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
                        Öğrenci verileri yüklenirken bir hata oluştu :(
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.tooltip .tooltiptext {
    font-size: 14px;
    visibility: hidden;
    width: 96px;
    background-color: #0f172a;
    color: #e2e8f0;
    border: 1px solid #0ea5e9;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useDark } from '@vueuse/core';
import axios from 'axios';

import IconCalendar from '@/components/IconCalendar.vue';
import IconClass from '@/components/IconClass.vue';
import IconSchool from '@/components/IconSchool.vue';
import IconCity from '@/components/IconCity.vue';
import IconGeneral from '@/components/IconGeneral.vue';
import StudentTrialGraph from '@/components/StudentTrialGraph.vue';
import Spinner from '@/components/Spinner.vue';

import ScienceIcon from '@/assets/science.svg';
import ScienceIconLight from '@/assets/science-light.svg';
import PhilosophyIcon from '@/assets/philosophy.svg';
import PhilosophyIconLight from '@/assets/philosophy-light.svg';
import ReligionIcon from '@/assets/religion.svg';
import ReligionIconLight from '@/assets/religion-light.svg';
import TurkishAndLiteratureIcon from '@/assets/turkish.svg';
import TurkishAndLiteratureIconLight from '@/assets/turkish-light.svg';
import EnglishIcon from '@/assets/english.svg';
import EnglishIconLight from '@/assets/english-light.svg';
import OtherIcon from '@/assets/other.svg';
import OtherIconLight from '@/assets/other-light.svg';
import MathIcon from '@/assets/maths.svg';
import MathIconLight from '@/assets/maths-light.svg';
import GeographyIcon from '@/assets/geography.svg';
import GeographyIconLight from '@/assets/geography-light.svg';
import HistoryIcon from '@/assets/history.svg';
import HistoryIconLight from '@/assets/history-light.svg';
import ChemistryIcon from '@/assets/chemistry.svg';
import ChemistryIconLight from '@/assets/chemistry-light.svg';
import BiologyIcon from '@/assets/biology.svg';
import BiologyIconLight from '@/assets/biology-light.svg';
import PhysicsIcon from '@/assets/physics.svg';
import PhysicsIconLight from '@/assets/physics-light.svg';
import GeometryIcon from '@/assets/geometry.svg';
import GeometryIconLight from '@/assets/geometry-light.svg';

const store = useStore();
const route = useRoute();
const isDark = useDark();
const trialDetails = ref(null);
const isLoading = ref(false);

onMounted(() => {
    fetchTrialDetails();
});

const fetchTrialDetails = async () => {
    try {
        isLoading.value = true;
        const trialId = route.params.trialId;
        await store.dispatch('fetchTrialDetails', trialId);
        trialDetails.value = store.state.trialDetails;
    } catch (error) {
        console.error('Error fetching trial details:', error);
    } finally {
        isLoading.value = false;
    }
};

const totalQuestions = computed(() => {
    return trialDetails.value.total_correct + trialDetails.value.total_incorrect + trialDetails.value.total_empty;
});

const courseColors = computed(() => ({
    Matematik: !isDark.value ? '#99f6e4' : '#99f6e4',
    Coğrafya: !isDark.value ? '#84cc16' : '#84cc16',
    Tarih: !isDark.value ? '#ea580c' : '#ea580c',
    Kimya: !isDark.value ? '#fbbf24' : '#fbbf24',
    "Türkçe - Edebiyat": !isDark.value ? '#22d3ee' : '#22d3ee',
    "Türkçe-TDE": !isDark.value ? '#22d3ee' : '#22d3ee',
    Biyoloji: !isDark.value ? '#22c55e' : '#22c55e',
    Fizik: !isDark.value ? '#f43f5e' : '#f43f5e',
    Felsefe: !isDark.value ? '#c026d3' : '#c026d3',
    "Din Kültürü ve Ahlak Bilgisi": !isDark.value ? '#ef4444' : '#ef4444',
    "Din Kültürü": !isDark.value ? '#ef4444' : '#ef4444',
    İngilizce: !isDark.value ? '#8b5cf6' : '#8b5cf6',
    "Fen Bilimleri": !isDark.value ? '#f97316' : '#f97316',
    Diğer: !isDark.value ? '#34d399' : '#34d399',
    "Geometri": !isDark.value ? '#ec4899' : '#ec4899',
}));

const courseIcons = computed(() => ({
    Matematik: !isDark.value ? MathIconLight : MathIcon,
    Coğrafya: !isDark.value ? GeographyIconLight : GeographyIcon,
    Tarih: !isDark.value ? HistoryIconLight : HistoryIcon,
    Kimya: !isDark.value ? ChemistryIconLight : ChemistryIcon,
    "Türkçe - Edebiyat": !isDark.value ? TurkishAndLiteratureIconLight : TurkishAndLiteratureIcon,
    "Türkçe-TDE": !isDark.value ? TurkishAndLiteratureIconLight : TurkishAndLiteratureIcon,
    Biyoloji: !isDark.value ? BiologyIconLight : BiologyIcon,
    Fizik: !isDark.value ? PhysicsIconLight : PhysicsIcon,
    Felsefe: !isDark.value ? PhilosophyIconLight : PhilosophyIcon,
    "Din Kültürü ve Ahlak Bilgisi": !isDark.value ? ReligionIconLight : ReligionIcon,
    "Din Kültürü": !isDark.value ? ReligionIconLight : ReligionIcon,
    İngilizce: !isDark.value ? EnglishIconLight : EnglishIcon,
    "Fen Bilimleri": !isDark.value ? ScienceIconLight : ScienceIcon,
    Diğer: !isDark.value ? OtherIconLight : OtherIcon,
    "Geometri": !isDark.value ? GeometryIconLight : GeometryIcon,
}));

const isHovered = ref([]);

const givenAnswers = (givenAnswers, correctAnswers = '') => {
    if (!givenAnswers) return [];
    const given = givenAnswers.split(', ');
    const correct = correctAnswers.split(', ');
    return given.map((answer, index) => {
        let answerClass = 'text-green-500';
        if (answer === 'X') {
            answerClass = 'text-sky-500';
        } else if (answer !== correct[index]) {
            answerClass = 'text-amber-500';
        }
        return { text: answer === 'X' ? '—' : answer, class: answerClass };
    });
}

const correctAnswers = (correctAnswers) => {
    if (!correctAnswers) return [];
    const correct = correctAnswers.split(', ');
    return correct.map(answer => {
        return { text: answer, class: 'text-green-500' };
    });
}

const hoverAnswer = (rowIndex, index) => {
    if (!isHovered.value[rowIndex]) {
        isHovered.value[rowIndex] = [];
    }
    isHovered.value[rowIndex][index] = true;
}

const leaveAnswer = (rowIndex, index) => {
    if (isHovered.value[rowIndex]) {
        isHovered.value[rowIndex][index] = false;
    }
}

watch(trialDetails, (newVal) => {
    if (newVal) {
        newVal.student_data.forEach((student, rowIndex) => {
            student.answer.forEach((course, index) => {
                if (!isHovered.value[rowIndex]) {
                    isHovered.value[rowIndex] = [];
                }
                isHovered.value[rowIndex][index] = false;
            });
        });
    }
});

const goToTrialReport = () => {
    const studentId = store.getters.studentId;
    const trialId = trialDetails.value?.optic_student_assessment_id;

    const reportUrl = `${axios.defaults.trialReportURL}/reports/student-optic-trial-report/${studentId}/${trialId}`;
    window.open(reportUrl, '_blank');
}
</script>