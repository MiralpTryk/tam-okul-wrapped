<template>
    <div class="mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 mx-auto h-auto sm:mt-0 mt-4">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-sky-900 rounded-lg">
                <div
                    class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2 flex justify-between">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Soru Bilgileri</h2>
                    <div v-if="questionData && questionData.courses"
                        class="flex gap-1 text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold px-4 items-center">
                        <span v-for="(course, index) in questionData.courses" :key="index" class="block text-base"
                            :style="{ color: getCourseColor(course) }">
                            <img :src="getCourseIcon(course)" alt="" class="inline-block w-6 h-6 mr-1">
                            {{ formatCourseName(course) }}
                        </span>
                    </div>
                </div>

                <div v-if="questionData && studentDetails && testOrder"
                    class="flex mt-4 items-center justify-center gap-4 w-full">
                    <div class="flex flex-col mx-auto items-start text-slate-600 dark:text-slate-400 w-full">
                        <div class="flex gap-1 text-lg text-slate-600 dark:text-slate-400 font-semibold">
                            <span class="text-violet-900 dark:text-sky-500 text-base">Testteki Sırası:</span>
                            <span text-base>{{ testOrder }}</span>
                        </div>
                        <div
                            class="flex gap-1 text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold mt-4">
                            <span class="text-violet-900 dark:text-sky-500 text-base">Ünite:</span>
                            <span v-for="(unit, index) in formatObjectList(questionData.units)" :key="index"
                                class="block text-base">
                                {{ unit }}
                            </span>
                        </div>
                        <div
                            class="flex gap-1 text-lg md:text-lg text-slate-600 dark:text-slate-400 font-semibold mt-4">
                            <span class="text-violet-900 dark:text-sky-500 text-base">Konu:</span>
                            <span v-if="questionData.subjects && formatObjectList(questionData.subjects).length > 0">
                                <span v-for="(subject, index) in formatObjectList(questionData.subjects)" :key="index"
                                    class="block text-base">
                                    {{ subject }}
                                </span>
                            </span>
                            <span v-else>
                                -
                            </span>
                        </div>
                        <!-- accordion for outcomes -->
                        <div id="accordion-collapse" data-accordion="collapse" class="w-full mt-4">
                            <h2 id="accordion-collapse-heading-2">
                                <button type="button"
                                    class="flex items-center justify-between w-full p-5 font-medium bg-slate-300 dark:bg-slate-900 rtl:text-right border border-b-0 rounded-t-xl focus:ring-2 focus:ring-slate-500 dark:focus:ring-gray-800 border-violet-900 dark:border-slate-700 text-violet-900 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-slate-400 gap-3"
                                    @click="toggleAccordion(2)" :aria-expanded="isAccordionOpen(2)"
                                    aria-controls="accordion-collapse-body-2">
                                    <span class="text-base text-violet-900 dark:text-sky-500">Kazanımlar</span>
                                    <svg data-accordion-icon class="w-3 h-3"
                                        :class="isAccordionOpen(2) ? 'rotate-180' : ''" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="#4c1d95" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 1l4 4 4-4" />
                                    </svg>
                                </button>
                            </h2>
                            <div v-show="isAccordionOpen(2)" id="accordion-collapse-body-2"
                                class="border border-violet-900 dark:border-slate-700 bg-slate-200 dark:bg-slate-900"
                                aria-labelledby="accordion-collapse-heading-2">
                                <div class="p-5">
                                    <div v-if="questionData && questionData.outcomes">
                                        <span v-for="(outcome, index) in formatObjectList(questionData.outcomes)"
                                            :key="index" class="block">
                                            {{ index + 1 }}- {{ outcome }}
                                        </span>
                                    </div>
                                    <div v-else>
                                        <span class="text-xs text-violet-900 dark:text-slate-400">Kazanım verisi
                                            bulunamadı.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- accordion end -->
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
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-sky-900 rounded-lg lg:max-h-[360px]">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Soru Resmi</h2>
                </div>
                <div v-if="questionData" class="flex items-center justify-center bg-white rounded-lg">
                    <img :src="questionData.question_image" alt="Soru Resmi" class="max-h-[260px] cursor-pointer"
                        @click="showImagePopup(questionData.question_image)">
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
        <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 mx-auto h-auto mt-4">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-sky-900 rounded-lg max-h-[240px] lg:max-h-[360px]">
                <div
                    class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2 flex justify-between">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Cevap Durumu</h2>
                </div>
                <div v-if="!isLoading">
                    <StudentAnswerStatusBadgeCorrect
                        v-if="!isLoading && currentAnswer && currentAnswer.answer === currentAnswer.correct_answer_key" />
                    <StudentAnswerStatusBadgeIncorrect
                        v-else-if="!isLoading && currentAnswer && currentAnswer.answer !== currentAnswer.correct_answer_key && currentAnswer.answer !== 'X'" />
                    <StudentAnswerStatusBadgeEmpty v-else-if="!isLoading" />
                    <div class="flex flex-col mt-4 items-center justify-center gap-4">
                        <div>
                            <span class="text-center text-lg md:text-xl text-slate-600 dark:text-slate-400">
                                Cevabınız:
                            </span>
                            <span class="text-center text-lg md:text-xl text-slate-600 dark:text-slate-400">
                                {{ currentAnswer.answer === "X" ? "Boş" : currentAnswer.answer }}
                            </span>
                        </div>
                        <div>
                            <span
                                class="text-center text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold">
                                Doğru Cevap:
                            </span>
                            <span
                                class="text-center text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold mt-4">
                                {{ currentAnswer.correct_answer_key }}
                            </span>
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
                class="bg-slate-200 dark:bg-slate-800 -mt-14 lg:-mt-0 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-sky-900 rounded-lg max-h-[360px]">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Çözüm Videosu</h2>
                </div>
                <div v-if="questionData && questionData.external_video_solution">
                    <div class="flex items-center justify-center w-full">
                        <iframe v-if="videoUrlWithTimestamp" :src="videoUrlWithTimestamp" width="100%" height="260"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen class="rounded-lg"></iframe>
                    </div>
                </div>
                <div v-else-if="isLoading" class="flex justify-center items-center p-16">
                    <Spinner />
                </div>
                <div v-else class="flex justify-center items-center">
                    <span class="text-xs text-slate-600 dark:text-slate-400">
                        Bu soruya ait çözüm videosu bulunamadı.
                    </span>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 grid-rows-1 md:grid-rows-1 gap-4 mx-auto h-auto mt-4">
            <div
                class="bg-slate-200 dark:bg-slate-800 px-4 py-2 col-span-1 md:col-span-1 row-span-1 md:row-span-1 border-2 border-sky-900 rounded-lg">
                <div class="bg-slate-300 dark:bg-slate-900 rounded-t-lg -mx-4 -mt-2 mb-4 py-4 px-2">
                    <h2 class="text-violet-900 dark:text-sky-500 font-semibold text-lg px-4">Benzer Sorular</h2>
                </div>
                <div v-if="questionData && questionData.connected_questions && questionData.connected_questions.length">
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div v-for="(question, index) in questionData.connected_questions" :key="index"
                            @click="selectQuestion(question)"
                            class="cursor-pointer lg:hover:scale-105 transition-transform duration-300">
                            <div class="cursor-pointer flex flex-col items-center justify-center">
                                <img :src="question.url" alt="Benzer Soru"
                                    class="w-full h-32 object-cover rounded-lg" />
                                <span class="text-slate-600 dark:text-slate-400 text-sm">{{ question.book_name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
import StudentAnswerStatusBadgeCorrect from './StudentAnswerStatusBadgeCorrect.vue';
import StudentAnswerStatusBadgeIncorrect from './StudentAnswerStatusBadgeIncorrect.vue';
import StudentAnswerStatusBadgeEmpty from './StudentAnswerStatusBadgeEmpty.vue';
import Spinner from './Spinner.vue';

import ScienceIcon from '@/assets/science.svg';
import PhilosophyIcon from '@/assets/philosophy.svg';
import ReligionIcon from '@/assets/religion.svg';
import TurkishAndLiteratureIcon from '@/assets/turkish.svg';
import EnglishIcon from '@/assets/english.svg';
import OtherIcon from '@/assets/other.svg';
import MathIcon from '@/assets/maths.svg';
import GeographyIcon from '@/assets/geography.svg';
import HistoryIcon from '@/assets/history.svg';
import ChemistryIcon from '@/assets/chemistry.svg';
import BiologyIcon from '@/assets/biology.svg';
import PhysicsIcon from '@/assets/physics.svg';

const baseURL = axios.defaults.baseURL;
const route = useRoute();
const router = useRouter();
const store = useStore();

const questionId = computed(() => route.params.questionId);
const selectedTestId = computed(() => route.params.testId);
const questionInTest = ref(null);
const questionData = ref(null);
const currentAnswer = ref({});
const isLoading = ref(true);
const testOrder = ref(null);
const studentDetails = ref({});
const accordionStates = ref({});

const updateCanvasBackground = (id, url) => {
    store.dispatch('updateBackgroundImageUrl', url);
    store.dispatch('fetchQuestionData', questionId.value);
    router.push({ name: 'canvas', params: { id } });
};

const selectQuestion = (question) => {
    store.dispatch('selectQuestion', question);
    updateCanvasBackground(question.id, question.url);
};

const getCourseIcon = (courseName) => {
    const formattedName = formatCourseName(courseName);
    switch (formattedName) {
        case 'Matematik':
            return MathIcon;
        case 'Coğrafya':
            return GeographyIcon;
        case 'Tarih':
            return HistoryIcon;
        case 'Kimya':
            return ChemistryIcon;
        case 'Türk Dili ve Edebiyatı':
        case 'Türkçe - Edebiyat':
            return TurkishAndLiteratureIcon;
        case 'Biyoloji':
            return BiologyIcon;
        case 'Fizik':
            return PhysicsIcon;
        case 'Felsefe':
            return PhilosophyIcon;
        case 'Din Kültürü ve Ahlak Bilgisi':
            return ReligionIcon;
        case 'İngilizce':
            return EnglishIcon;
        case 'Fen Bilimleri':
            return ScienceIcon;
        case 'Diğer':
            return OtherIcon;
        default:
            return null;
    }
};

const courseColors = {
    Matematik: '#99f6e4',
    Coğrafya: '#84cc16',
    Tarih: '#ea580c',
    Kimya: '#fbbf24',
    "Türkçe - Edebiyat": '#22d3ee',
    "Türk Dili ve Edebiyatı": '#22d3ee',
    Biyoloji: '#22c55e',
    Fizik: '#f43f5e',
    Felsefe: '#c026d3',
    "Din Kültürü ve Ahlak Bilgisi": '#ef4444',
    İngilizce: '#0ea5e9',
    "Fen Bilimleri": '#f97316',
    Diğer: '#34d399',
};

watch(questionInTest, (newValue) => {
    if (newValue && newValue.origin_order) {
        testOrder.value = newValue.origin_order;
    }
});

const fetchData = async () => {
    isLoading.value = true;
    try {
        const questionIdValue = questionId.value;
        const requestUrl = `${baseURL}/questions/outcome/${questionIdValue}`;

        const response1 = await axios.get(requestUrl, {
            headers: {
                Authorization: `Bearer ${store.state.token}`,
            },
        });
        questionData.value = response1.data.data;
        store.commit('setQuestionData', questionData.value);

        const response3 = await axios.get(`${baseURL}/my_student_summary`, {
            headers: {
                Authorization: `Bearer ${store.state.token}`,
            },
        });
        const studentTests = response3.data.studentTests.data;

        const currentTest = studentTests.find(test => test.id === Number(selectedTestId.value));
        if (currentTest) {
            const foundQuestion = currentTest.assignment.data.questions.find(
                question => question.id === questionData.value.id
            );
            if (foundQuestion) {
                questionInTest.value = foundQuestion;
            }
        }

        const response2 = await axios.get(`${baseURL}/students/homework/${selectedTestId.value}`, {
            headers: {
                Authorization: `Bearer ${store.state.token}`,
            },
        });

        const foundAnswer = response2.data.data.student_answers.find(
            (answer) => answer.question_id === parseInt(questionId.value)
        );

        if (foundAnswer) {
            currentAnswer.value = foundAnswer;
        } else {
            console.error('Bu soru için cevap bulunamadı.');
        }
    } catch (error) {
        console.error('Veriler alınırken bir hata oluştu.', error);
    } finally {
        isLoading.value = false;
    }
};

const videoUrlWithTimestamp = computed(() => {
    if (!questionData.value || !questionData.value.external_video_solution || !questionData.value.video_meta) {
        return null;
    }

    const videoMeta = questionData.value.video_meta.split(',');
    const videoId = videoMeta[0];
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;

    if (videoMeta.length > 1) {
        const startTime = videoMeta[1];
        embedUrl += `?start=${startTime}`;
    }

    embedUrl += `&rel=0&modestbranding=1&autoplay=0`;

    return embedUrl;
});

const showImagePopup = (imageUrl) => {
    Swal.fire({
        html: `<div style="position: relative; text-align: center;">
               <img src="${imageUrl}" alt="Soru Resmi" style="display: block; margin: 20px auto; max-width: 100%; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"/>
           </div>`,
        title: '<span style="color: #94a3b8;">Soru Resmi</span>',
        showCloseButton: true,
        showConfirmButton: false,
        background: '#1f2937',
        padding: '4px 0',
        customClass: {
            popup: 'swal2-popup-custom',
            closeButton: 'swal2-close-custom'
        }
    });
};

const formatObjectList = (obj) => {
    if (!obj) return [];
    return Object.values(obj);
};

const formatCourseName = (courseName) => {
    return courseName.replace(/\d+/g, '').trim();
};

const getCourseColor = (courseName) => {
    const formattedName = formatCourseName(courseName);
    return courseColors[formattedName] || '#ffffff';
};

const toggleAccordion = (index) => {
    accordionStates.value[index] = !accordionStates.value[index];
};

const isAccordionOpen = (index) => {
    return accordionStates.value[index] || false;
};

onMounted(() => {
    fetchData();
});
</script>

<style></style>
