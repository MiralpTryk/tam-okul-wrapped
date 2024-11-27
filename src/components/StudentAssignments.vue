<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table v-if="assignmentsData && assignmentsData.data"
            class="w-full text-sm text-left rtl:text-right text-slate-400">
            <thead class="text-xs text-slate-400 uppercase bg-slate-900 ">
                <tr>
                    <th scope="col" class="px-6 py-3">Başlangıç Tarihi</th>
                    <th scope="col" class="px-6 py-3">Teslim Tarihi</th>
                    <th scope="col" class="px-6 py-3">Öğretmen</th>
                    <th scope="col" class="px-6 py-3">Başlık</th>
                    <th scope="col" class="px-6 py-3">Detay</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="assignment in assignmentsData.data" :key="assignment.id"
                    class="bg-slate-950 border-b border-slate-400 hover:bg-sky-800 hover:text-slate-400">
                    <td class="px-6 py-4">{{ formatDate(assignment.created_at) }}</td>
                    <td class="px-6 py-4">{{ formatDate(assignment.created_at) }}</td>
                    <td class="px-6 py-4">{{ assignment.teacher_review || '-' }}</td>
                    <td class="px-6 py-4">{{ assignment.title || '-' }}</td>
                    <td class="px-6 py-4">
                        <a :href="assignment.attachment || '#'"
                            class="font-medium text-slate-900 hover:underline bg-sky-500 px-2 rounded-md py-1">
                            Rapor
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="isLoading" class="flex justify-center items-center p-16">
            <Spinner />
        </div>
        <div v-else class="flex justify-center items-center">
            <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
                Öğrenci verileri yüklenirken bir hata oluştu :(
            </span>
        </div>
        <!-- Pagination -->
        <nav v-if="assignmentsData" class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation">
            <span class="text-sm font-normal text-slate-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                <span class="font-semibold text-slate-400">{{ currentPage }}</span> of <span
                    class="font-semibold text-slate-400">{{ totalPages }}</span>
            </span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button :disabled="currentPage === 1" @click="goToPage(1)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-slate-400 bg-slate-900 border border-slate-400 rounded-s-lg hover:bg-slate-400 hover:text-slate-900">
                        İlk
                    </button>
                </li>
                <li>
                    <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-slate-400 bg-slate-900 border border-slate-400 hover:bg-slate-400 hover:text-slate-900">
                        Önceki
                    </button>
                </li>
                <li v-for="page in visiblePages" :key="page">
                    <button :disabled="page === currentPage" @click="goToPage(page)"
                        class="flex items-center justify-center px-3 h-8 leading-tight"
                        :class="page === currentPage ? 'bg-slate-400 text-slate-900' : 'text-slate-400 bg-slate-900 border border-slate-400 hover:bg-slate-400 hover:text-slate-900'">
                        {{ page }}
                    </button>
                </li>
                <li>
                    <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-slate-400 bg-slate-900 border border-slate-400 hover:bg-slate-400 hover:text-slate-900">
                        Sonraki
                    </button>
                </li>
                <li>
                    <button :disabled="currentPage === totalPages" @click="goToPage(totalPages)"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-slate-400 bg-slate-900 border border-slate-400 rounded-e-lg hover:bg-slate-400 hover:text-slate-900">
                        Son
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const assignmentsData = ref(null)
const store = useStore();

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

        assignmentsData.value = response.data.flexHomeWorks;
        totalPages.value = assignmentsData.value.last_page;
    } catch (error) {
        console.error(error);
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped></style>
