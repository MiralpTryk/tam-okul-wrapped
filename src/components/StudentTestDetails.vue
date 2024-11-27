<template>
    <div class="mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 mx-auto sm:mt-0 mt-4">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
                <div
                    class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2 flex justify-between">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Test</h2>
                    <div v-if="testDetails && testDetails.data && testDetails.data.title"
                        class="flex gap-1 text-lg md:text-xl text-violet-900 dark:text-slate-400 font-semibold px-4 items-center">
                        <span class="block text-base"
                            :style="{ color: getCourseColor(testDetails.data.title), textShadow: !isDark ? `-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000` : 'none' }">
                            <img :src="getCourseIcon(testDetails.data.title)" alt="" class="inline-block w-6 h-6 mr-1">
                            {{ extractCourseName(testDetails.data.title) }}
                        </span>
                    </div>
                </div>
                <div v-if="testDetails" class="flex mt-4 items-center justify-center gap-4">
                    <div class="flex flex-col mx-auto items-center">
                        <span class="text-center text-lg md:text-xl text-violet-900 dark:text-slate-400 font-semibold">
                            {{ testDetails.data.title }}
                        </span>
                        <span
                            class="text-center text-lg md:text-lg text-violet-900 dark:text-slate-400 font-semibold mt-4">
                            {{ testDetails.data.book_name }}
                        </span>
                        <span
                            class="text-center text-lg md:text-base text-violet-900 dark:text-slate-400 font-semibold mt-4">
                            {{ testDetails.data.test_name }}
                        </span>
                        <div class="flex gap-4 mt-4">
                            <div class="flex gap-1">
                                <IconCalendar />
                                <span v-if="testDetails.data.start_date && testDetails.data.due_date"
                                    class="text-violet-900 dark:text-slate-400"> {{ testDetails.data.start_date }} - {{
                                        testDetails.data.due_date }}
                                </span>
                                <span v-else-if="testDetails.data.start_date || testDetails.data.due_date"
                                    class="text-violet-900 dark:text-slate-400"> {{ testDetails.data.start_date ?
                                        testDetails.data.start_date
                                        :
                                        'Belirtilmemiş' }} - {{
                                        testDetails.data.due_date ? testDetails.data.due_date : '—' }}
                                </span>
                                <span v-else class="text-violet-900 dark:text-slate-400">—</span>
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
                <div v-if="testDetails" class="flex w-full justify-center items-center">
                    <div class="flex flex-col text-violet-900 dark:text-slate-400 gap-2 text-xl items-center w-full">
                        <div class="flex gap-2 items-center">
                            <span>{{ testDetails.data.status === 1 ? 'Çözüldü' : 'Çözülmedi' }}</span>
                            <CheckIcon v-if="testDetails.data.status === 1" />
                            <CloseIcon v-else />
                        </div>
                        <StudentTestSuccessBar :net="testDetails.data.net"
                            :totalNumberOfQuestions="testDetails.data.total_number_of_questions" />
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
        <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 mx-auto h-auto mt-4 sm:mt-4">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg max-h-[320px]">
                <div
                    class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2 flex justify-between">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Cevap Dağılımı</h2>
                    <h2 v-if="testDetails" class="text-violet-900 dark:text-slate-400 px-4">Toplam Soru: {{
                        testDetails.data.total_number_of_questions }}</h2>
                </div>
                <div v-if="testDetails" class="flex w-full justify-between items-center">
                    <div class="flex flex-col text-violet-900 dark:text-slate-400 gap-2 text-lg">
                        <span>Doğru: {{ testDetails.data.correct ? testDetails.data.correct : '—' }}</span>
                        <span>Yanlış: {{ testDetails.data.incorrect ? testDetails.data.incorrect : '—' }}</span>
                        <span>Boş: {{ testDetails.data.empty ? testDetails.data.empty : '—' }}</span>
                        <span>Net: {{ testDetails.data.net ?? '—' }}</span>
                    </div>
                    <StudentTestGraph :correct="testDetails.data.correct" :incorrect="testDetails.data.incorrect"
                        :empty="testDetails.data.empty" />
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
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Sıralama</h2>
                </div>
                <div v-if="testDetails"
                    class="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-2 md:gap-4 lg:gap-8 text-violet-900 dark:text-slate-400 text-2xl">
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconClass />
                        <span v-if="testDetails">Sınıf: {{ testDetails.data.order_in_class ?
                            testDetails.data.order_in_class
                            : '—' }}</span>

                    </div>
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconSchool />
                        <span v-if="testDetails">Okul: {{ testDetails.data.order_in_school ?
                            testDetails.data.order_in_school
                            : '—' }}</span>
                    </div>
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconCity />
                        <span v-if="testDetails">İl: {{ testDetails.data.order_in_city ?
                            testDetails.data.order_in_city :
                            '—' }}</span>
                    </div>
                    <div class="col-span-1 row-span-1 flex gap-2 items-center justify-start">
                        <IconGeneral />
                        <span v-if="testDetails">Genel: {{ testDetails.data.order_general ?
                            testDetails.data.order_general :
                            '—' }}</span>
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
        <div class="grid grid-cols-1 md:grid-cols-1 grid-rows-1 md:grid-rows-1 mt-4 sm:mt-4 gap-4 mx-auto h-auto">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-violet-900 dark:border-sky-900 rounded-lg">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Sorular</h2>
                </div>
                <div v-if="testDetails && testDetails.data && testDetails.data.student_answers"
                    class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-center rtl:text-center text-violet-900 dark:text-slate-400">
                        <thead
                            class="text-xs text-violet-900 dark:text-slate-400 uppercase bg-slate-300 dark:bg-slate-900">
                            <!-- Soru tablosu -->
                            <tr>
                                <th scope="col" class="px-3 py-2">Soru No</th>
                                <th scope="col" class="px-3 py-2">Cevabın</th>
                                <th scope="col" class="px-3 py-2">Doğru Cevap</th>
                                <th scope="col" class="px-3 py-2">Sonuç</th>
                                <th scope="col" class="px-3 py-2">Detay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(answer, index) in testDetails.data.student_answers" :key="answer.id"
                                class="bg-slate-200 dark:bg-slate-950 border-b border-slate-400 hover:bg-slate-300 dark:hover:bg-sky-600 dark:text-slate-400 hover:cursor-pointer">
                                <td class="px-3 py-2">{{ index + 1 }}</td>
                                <td class="px-3 py-2">{{
                                    answersArray[index] === 'X' ? '—' : answersArray[index] }}</td>
                                <td class="px-3 py-2 font-bold">
                                    {{
                                        answer.correct_answer_key }}</td>
                                <td class="px-3 py-2">
                                    <StudentTestStatusComplete text="Doğru"
                                        v-if="answer.correct_answer_key === answersArray[index]" />
                                    <StudentTestStatusEmpty v-else-if="answersArray[index] === 'X'" />
                                    <StudentTestStatusIncomplete text="Yanlış" v-else />
                                </td>
                                <td class="px-3 py-2">
                                    <button @click="goToQuestionDetail(answer.question_id)"
                                        class="font-medium text-slate-200 dark:text-slate-900 hover:bg-violet-950 hover:underline bg-violet-900 dark:bg-slate-200 px-2.5 rounded-md py-0.5 text-xs">
                                        Görüntüle
                                    </button>
                                </td>
                            </tr>
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

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import axios from 'axios';
import CheckIcon from './CheckIcon.vue';
import CloseIcon from './CloseIcon.vue';
import StudentTestGraph from "./StudentTestGraph.vue";
import StudentTestSuccessBar from "./StudentTestSuccessBar.vue";
import StudentTestStatusComplete from './StudentTestStatusComplete.vue';
import StudentTestStatusIncomplete from './StudentTestStatusIncomplete.vue';
import StudentTestStatusEmpty from './StudentTestStatusEmpty.vue';
import Spinner from './Spinner.vue';

import IconGeneral from './IconGeneral.vue';
import IconCity from './IconCity.vue';
import IconSchool from './IconSchool.vue';
import IconCalendar from './IconCalendar.vue';
import IconClass from './IconClass.vue';
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

const isDark = useDark();

const store = useStore();
const route = useRoute();
const router = useRouter();

const testDetails = ref(null);
const answersArray = ref([]);

const isLoading = ref(false);

const courseColors = {
    Matematik: '#99f6e4',
    Coğrafya: '#84cc16',
    "Sosyal Bilgiler": '#84cc16',
    Tarih: '#ea580c',
    Kimya: '#fbbf24',
    "Türkçe - Edebiyat": '#22d3ee',
    "Türkçe": '#22d3ee',
    Edebiyat: '#22d3ee',
    Biyoloji: '#22c55e',
    Fizik: '#f43f5e',
    Felsefe: '#c026d3',
    "Din Kültürü ve Ahlak Bilgisi": '#ef4444',
    "Din Kültürü": '#ef4444',
    İngilizce: '#0ea5e9',
    "Fen Bilimleri": '#f97316',
    Diğer: '#34d399',
};


const extractCourseName = (title) => {
    const courseNames = Object.keys(courseColors);
    if (title.includes("inkılap")) {
        return "Sosyal Bilgiler";
    }
    for (const course of courseNames) {
        if (title.includes(course)) {
            return course;
        }
    }
    return 'Diğer';
};

const getCourseColor = (title) => {
    const courseName = extractCourseName(title);
    return courseColors[courseName] || '#ffffff';
};

const getCourseIcon = (title) => {
    const courseName = extractCourseName(title);
    switch (courseName) {
        case 'Matematik':
            return isDark.value ? MathIcon : MathIconLight;
        case 'Coğrafya':
        case 'Sosyal Bilgiler':
            return isDark.value ? GeographyIcon : GeographyIconLight;
        case 'Tarih':
            return isDark.value ? HistoryIcon : HistoryIconLight;
        case 'Kimya':
            return isDark.value ? ChemistryIcon : ChemistryIconLight;
        case 'Türkçe - Edebiyat':
        case 'Edebiyat':
        case 'Türkçe':
        case 'Türkçe-TDE':
            return isDark.value ? TurkishAndLiteratureIcon : TurkishAndLiteratureIconLight;
        case 'Biyoloji':
            return isDark.value ? BiologyIcon : BiologyIconLight;
        case 'Fizik':
            return isDark.value ? PhysicsIcon : PhysicsIconLight;
        case 'Felsefe':
            return isDark.value ? PhilosophyIcon : PhilosophyIconLight;
        case 'Din Kültürü ve Ahlak Bilgisi':
        case 'Din Kültürü':
            return isDark.value ? ReligionIcon : ReligionIconLight;
        case 'İngilizce':
            return isDark.value ? EnglishIcon : EnglishIconLight;
        case 'Fen Bilimleri':
            return isDark.value ? ScienceIcon : ScienceIconLight;
        case 'Diğer':
            return isDark.value ? OtherIcon : OtherIconLight;
        default:
            return isDark.value ? OtherIcon : OtherIconLight;
    }
};

const fetchData = async () => {
    try {
        isLoading.value = true;
        const token = store.state.token;
        const baseURL = axios.defaults.baseURL;
        const requestUrl = `${baseURL}/students/homework/${route.params.testId}`;

        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        testDetails.value = response.data;
        if (testDetails.value.data && testDetails.value.data.results_csv) {
            answersArray.value = testDetails.value.data.results_csv.split(',');
        }
    } catch (error) {
        console.error('Error fetching test details:', error);
    } finally {
        isLoading.value = false;
    }
};

const goToQuestionDetail = (questionId) => {
    const testId = route.params.testId;
    router.push({ name: 'QuestionDetails', params: { testId, questionId } });
};

onMounted(() => {
    fetchData();
});
</script>

<style></style>