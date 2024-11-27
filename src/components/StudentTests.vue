<template>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table
            v-if="!isLoading && studentDetails && studentDetails.studentTests && studentDetails.studentTests.data.length"
            class="w-full text-sm text-center rtl:text-center text-violet-900 dark:text-slate-400">
            <thead class="text-xs text-violet-900 dark:text-slate-400 uppercase bg-slate-300 dark:bg-slate-950">
                <tr>
                    <th scope="col" class="px-3 py-2">Ders</th>
                    <th scope="col" class="px-3 py-2">Tarih</th>
                    <th scope="col" class="px-3 py-2">Kaynak</th>
                    <th scope="col" class="px-3 py-2">Test Adı</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Doğru</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Yanlış</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Boş</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Sınıf Sırası</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Okul Sırası</th>
                    <th scope="col" class="px-3 py-2">Durum</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="test in studentDetails.studentTests.data" :key="test.id" @click="goToTestDetails(test.id)"
                    class="bg-slate-200 dark:bg-slate-900 border-b border-slate-400 hover:bg-slate-300 dark:hover:bg-slate-950 hover:text-violet-900 dark:text-slate-400 hover:cursor-pointer">
                    <td scope="row"
                        :style="{ borderLeft: `16px solid ${getCourseColor(test.assignment.data.lesson_name)}`, color: isDark ? getCourseColor(test.assignment.data.lesson_name) : '#4c1d95' }"
                        class="px-3 py-2 font-medium text-violet-900 dark:text-slate-400 whitespace-normal flex flex-col items-center justify-center">
                        <img :src="getCourseIcon(test.assignment.data.lesson_name)" alt="" class="w-12 h-12"
                            :style="{ filter: `drop-shadow(0 2px 5px ${getCourseColor(test.assignment.data.lesson_name)})` }">
                        <span :style="{ color: isDark ? getCourseColor(test.assignment.data.lesson_name) : '#4c1d95' }">
                            {{ test.assignment.data.lesson_name || 'Ders Adı' }}
                        </span>
                    </td>
                    <td class="px-3 py-2">{{ formatDate(test.created_at) || '—' }}</td>
                    <td class="px-3 py-2">{{ test.assignment.data.book_name || '—' }}</td>
                    <td class="px-3 py-2">{{ test.assignment.data.test_name || '—' }}</td>
                    <td class="px-3 py-2 font-bold text-green-500 hidden sm:table-cell">{{ test.correct || '—' }}</td>
                    <td class="px-3 py-2 font-bold text-amber-500 hidden sm:table-cell">{{ test.incorrect || '—' }}</td>
                    <td class="px-3 py-2 font-bold text-sky-500 hidden sm:table-cell">{{ test.empty || '—' }}</td>
                    <td class="px-3 py-2 font-bold hidden sm:table-cell">{{ test.order_in_class || '—' }}</td>
                    <td class="px-3 py-2 font-bold hidden sm:table-cell">{{ test.order_in_school || '—' }}</td>
                    <td class="px-3 py-2">
                        <StudentTestStatusComplete v-if="test.status === 1" text="Çözüldü" />
                        <StudentTestStatusIncomplete v-else text="Çözülmedi" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="isLoading" class="flex justify-center items-center p-16">
            <Spinner />
        </div>
        <div v-else class="flex items-center">
            <span class="text-xs text-slate-200 bg-red-500 px-2 py-1 rounded-md font-semibold">
                Henüz hiç test veriniz yok
            </span>
        </div>
        <!-- Pagination -->
        <nav v-if="studentDetails && studentDetails.studentTests && studentDetails.studentTests.data.length"
            class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation">
            <span
                class="text-sm font-normal text-violet-900 dark:text-slate-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                <span class="font-semibold text-violet-900 dark:text-slate-400">{{ currentPage }}</span>
                of <span class="font-semibold text-violet-900 dark:text-slate-400">{{ totalPages }}</span>
            </span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button :disabled="currentPage === 1" @click="goToPage(1)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-violet-900 dark:text-slate-400 bg-slate-300 dark:bg-slate-900 border border-slate-400 rounded-s-lg hover:bg-slate-400 hover:text-slate-900">
                        İlk
                    </button>
                </li>
                <li>
                    <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-violet-900 dark:text-slate-400 bg-slate-300 dark:bg-slate-900 border border-slate-400 hover:bg-slate-400 hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M11.354 1.354a.5.5 0 0 1 0 .707L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </button>
                </li>
                <li v-for="page in visiblePages" :key="page">
                    <button :disabled="page === currentPage" @click="goToPage(page)"
                        class="flex items-center justify-center px-3 h-8 leading-tight"
                        :class="page === currentPage ? 'bg-slate-400 text-slate-900' : 'text-violet-900 dark:text-slate-400 bg-slate-300 dark:bg-slate-900 border border-slate-400 hover:bg-slate-400 hover:text-slate-900'">
                        {{ page }}
                    </button>
                </li>
                <li>
                    <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-violet-900 dark:text-slate-400 bg-slate-300 dark:bg-slate-900 border border-slate-400 hover:bg-slate-400 hover:text-slate-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M4.646 14.646a.5.5 0 0 1 0-.707L10.293 8 4.646 2.354a.5.5 0 1 1 .708-.708l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708 0z" />
                        </svg>
                    </button>
                </li>
                <li>
                    <button :disabled="currentPage === totalPages" @click="goToPage(totalPages)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-violet-900 dark:text-slate-400 bg-slate-300 dark:bg-slate-900 border border-slate-400 rounded-e-lg hover:bg-slate-400 hover:text-slate-900">
                        Son
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Spinner from "@/components/Spinner.vue";
import { useDark } from '@vueuse/core';

import StudentTestStatusComplete from "@/components/StudentTestStatusComplete.vue";
import StudentTestStatusIncomplete from "@/components/StudentTestStatusIncomplete.vue";
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

const store = useStore();
const router = useRouter();
const isDark = useDark();
const studentDetails = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);

const fetchData = async (page = 1) => {
    try {
        isLoading.value = true;
        const token = store.state.token;
        const baseURL = axios.defaults.baseURL;
        const requestUrl = `${baseURL}/my_student_summary?page=${page}`;
        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        studentDetails.value = response.data;
        totalPages.value = response.data.studentTests.last_page;
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response);
            if (error.response.status === 401) {
                console.error("Unauthorized: Token might be invalid or expired.");
            }
        } else {
            console.error("Error:", error.message);
        }
    } finally {
        isLoading.value = false;
    }
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        fetchData(currentPage.value);
    }
};

const visiblePages = computed(() => {
    let startPage = Math.max(currentPage.value - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages.value);

    if (endPage - startPage < 4) {
        startPage = Math.max(endPage - 4, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return pages;
});

const getCourseIcon = (courseName) => {
    switch (courseName) {
        case 'Matematik':
            return isDark.value ? MathIcon : MathIconLight;
        case 'Coğrafya':
            return isDark.value ? GeographyIcon : GeographyIconLight;
        case 'Sosyal Bilgiler':
            return isDark.value ? GeographyIcon : GeographyIconLight;
        case 'Tarih':
            return isDark.value ? HistoryIcon : HistoryIconLight;
        case 'Kimya':
            return isDark.value ? ChemistryIcon : ChemistryIconLight;
        case 'Türkçe - Edebiyat':
            return isDark.value ? TurkishAndLiteratureIcon : TurkishAndLiteratureIconLight;
        case 'Türkçe':
            return isDark.value ? TurkishAndLiteratureIcon : TurkishAndLiteratureIconLight;
        case 'Biyoloji':
            return isDark.value ? BiologyIcon : BiologyIconLight;
        case 'Fizik':
            return isDark.value ? PhysicsIcon : PhysicsIconLight;
        case 'Felsefe':
            return isDark.value ? PhilosophyIcon : PhilosophyIconLight;
        case 'Din Kültürü ve Ahlak Bilgisi':
            return isDark.value ? ReligionIcon : ReligionIconLight;
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

const courseColors = {
    Matematik: '#99f6e4',
    Coğrafya: '#84cc16',
    "Sosyal Bilgiler": '#84cc16',
    Tarih: '#ea580c',
    Kimya: '#fbbf24',
    "Türkçe - Edebiyat": '#22d3ee',
    "Türkçe": '#22d3ee',
    Biyoloji: '#22c55e',
    Fizik: '#f43f5e',
    Felsefe: '#c026d3',
    "Din Kültürü ve Ahlak Bilgisi": '#ef4444',
    'Din Kültürü': '#ef4444',
    İngilizce: '#8b5cf6',
    "Fen Bilimleri": '#f97316',
    Diğer: '#34d399',
};

const getCourseColor = (courseName) => {
    return courseColors[courseName] || '#FFFFFF';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const goToTestDetails = (testId) => {
    router.push({ name: 'StudentTestDetails', params: { testId } });
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped></style>
