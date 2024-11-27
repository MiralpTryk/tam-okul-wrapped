<template>
    <div>
        <div v-if="isLoading" class="flex items-center justify-center p-16">
            <Spinner />
        </div>
        <div v-else-if="studentDetails && studentDetails.courses && Object.keys(studentDetails.courses).length > 0">
            <div v-for="(course, courseName, index) in studentDetails.courses" :key="index"
                :style="{ borderLeft: `16px solid ${getCourseColor(courseName)}` }"
                class="bg-slate-300 dark:bg-slate-900 py-4 px-4 md:px-12 flex flex-col sm:flex-row justify-between rounded-r-2xl items-center mb-4 text-center">
                <div class="flex flex-col items-center justify-start gap-2 w-24 md:w-40">
                    <img :src="getCourseIcon(courseName)" alt="" class="w-10 h-10 md:w-12 md:h-12"
                        :style="{ filter: `drop-shadow(0 4px 10px ${getCourseColor(courseName)})` }">
                    <span :style="{
                        color: isDarkMode ? getCourseColor(courseName) : '#4c1d95',
                        filter: `drop-shadow(0 1px 2px ${getCourseColor(courseName)})`,
                        textShadow: !isDarkMode ? `-0.5px -0.5px 0 #4c1d95, 0.5px -0.5px 0 #4c1d95, -0.5px 0.5px 0 #4c1d95, 0.5px 0.5px 0 #4c1d95` : 'none'
                    }" class="text-xl md:text-2xl flex items-center">
                        {{ courseName }}
                    </span>
                </div>
                <div class="flex flex-col items-center gap-2 mt-4 md:mt-0">
                    <span class="text-violet-900 dark:text-slate-400 text-lg md:text-xl">Çözülen Test</span>
                    <span class="text-violet-900 dark:text-slate-400 text-2xl md:text-4xl font-bold">
                        {{ calculateSolvedTests(courseName) }} / {{ calculateTotalTests(courseName) }}
                    </span>
                </div>
                <div class="mt-4 md:mt-0">
                    <StudentCoursGraph :courseName="courseName" :correct="getCorrectCount(courseName)"
                        :incorrect="getIncorrectCount(courseName)" :empty="getEmptyCount(courseName)" />
                </div>
                <div class="flex flex-col items-center gap-2 mt-4 md:mt-0">
                    <span class="text-violet-900 dark:text-slate-400 text-lg md:text-xl">Başarı Durumu</span>
                    <StudentCourseSuccessBar :successRate="calculateSuccessRate(course)" />
                    <span class="text-violet-900 dark:text-slate-400 text-2xl md:text-4xl font-bold">
                        %{{ calculateSuccessRate(course) }}
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="flex items-center">
            <span class="text-xs text-slate-200 bg-red-500 px-2 py-1 rounded-md font-semibold">
                Henüz hiç branşlara göre başarı durumu veriniz yok
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
import Spinner from '@/components/Spinner.vue';
import StudentCoursGraph from './StudentCourseGraph.vue';
import StudentCourseSuccessBar from './StudentCourseSuccessBar.vue';

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

import { useDark } from '@vueuse/core';

const store = useStore();
const isLoading = computed(() => !store.getters.isStudentDetailsLoaded);
const studentDetails = computed(() => store.getters.studentDetails);

const courseColors = {
    Matematik: { dark: '#99f6e4' }, // teal-200
    Coğrafya: { dark: '#a3e635' }, // lime-400
    "Sosyal Bilgiler": { dark: '#a3e635' }, // lime-400
    Tarih: { dark: '#fb923c' }, // orange-400
    Kimya: { dark: '#facc15' }, // amber-400
    "Türkçe - Edebiyat": { dark: '#22d3ee' }, // cyan-400
    "Türkçe": { dark: '#22d3ee' }, // cyan-400
    Biyoloji: { dark: '#4ade80' }, // green-400
    Fizik: { dark: '#f43f5e' }, // rose-500
    Felsefe: { dark: '#e879f9' }, // fuchsia-400
    "Din Kültürü ve Ahlak Bilgisi": { dark: '#ef4444' }, // red-400
    "Din Kültürü": { dark: '#ef4444' }, // red-400
    İngilizce: { dark: '#8b5cf6' }, // violet-500
    "Fen Bilimleri": { dark: '#fb923c' }, // orange-400
    Diğer: { dark: '#6ee7b7' }, // emerald-400
};

const isDarkMode = useDark();

const getCourseColor = (courseName) => {
    return courseColors[courseName] ? courseColors[courseName].dark : '#FFFFFF';
};

const getCourseIcon = (courseName) => {
    const isDark = isDarkMode.value;
    switch (courseName) {
        case 'Matematik':
            return isDark ? MathIcon : MathIconLight;
        case 'Coğrafya':
            return isDark ? GeographyIcon : GeographyIconLight;
        case 'Sosyal Bilgiler':
            return isDark ? GeographyIcon : GeographyIconLight;
        case 'Tarih':
            return isDark ? HistoryIcon : HistoryIconLight;
        case 'Kimya':
            return isDark ? ChemistryIcon : ChemistryIconLight;
        case 'Türkçe - Edebiyat':
            return isDark ? TurkishAndLiteratureIcon : TurkishAndLiteratureIconLight;
        case 'Türkçe':
            return isDark ? TurkishAndLiteratureIcon : TurkishAndLiteratureIconLight;
        case 'Biyoloji':
            return isDark ? BiologyIcon : BiologyIconLight;
        case 'Fizik':
            return isDark ? PhysicsIcon : PhysicsIconLight;
        case 'Felsefe':
            return isDark ? PhilosophyIcon : PhilosophyIconLight;
        case 'Din Kültürü ve Ahlak Bilgisi':
            return isDark ? ReligionIcon : ReligionIconLight;
        case 'Din Kültürü':
            return isDark ? ReligionIcon : ReligionIconLight;
        case 'İngilizce':
            return isDark ? EnglishIcon : EnglishIconLight;
        case 'Fen Bilimleri':
            return isDark ? ScienceIcon : ScienceIconLight;
        case 'Diğer':
            return isDark ? OtherIcon : OtherIconLight;
        default:
            return null;
    }
};

const calculateSolvedTests = (courseName) => {
    const courseTotal = studentDetails.value.totals[courseName];
    return courseTotal[1].reduce((acc, testStatus) => acc + testStatus, 0);
};

const calculateTotalTests = (courseName) => {
    return studentDetails.value.totals[courseName][1].length;
};

const calculateSuccessRate = (course) => {
    const netCorrect = course[0] - (course[1] * 0.25);
    const successRate = (netCorrect / course[3]) * 100;
    return Math.max(Math.floor(successRate), 0);
};

const getCorrectCount = (courseName) => {
    return studentDetails.value.courses[courseName][0];
};

const getIncorrectCount = (courseName) => {
    return studentDetails.value.courses[courseName][1];
};

const getEmptyCount = (courseName) => {
    return studentDetails.value.courses[courseName][2];
};
</script>

<style scoped></style>
