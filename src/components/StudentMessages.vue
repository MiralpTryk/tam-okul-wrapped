<template>
    <HeaderComponent :unreadMessagesCount="studentSummary?.unreadMessagesCount || 0" />
    <div v-if="isLoading" class="flex justify-center items-center p-16">
        <Spinner />
    </div>
    <div v-else-if="messages.length === 0" class="flex items-center">
        <span class="text-xs text-slate-200 bg-red-500 px-2 py-1 rounded-md font-semibold">
            Henüz hiç mesajınız yok
        </span>
    </div>
    <div v-else class="flex flex-col md:flex-row">
        <div v-if="!isLoading && (!selectedMessage || isDesktop)"
            class="w-full md:w-1/3 lg:border-r border-slate-400 pr-0 lg:pr-4">
            <div v-for="message in messages" :key="message.id"
                :class="['p-4 cursor-pointer mb-2 dark:hover:bg-slate-700 hover:bg-slate-100 rounded-lg',
                    selectedMessage?.id === message.id ? 'dark:bg-slate-700 bg-slate-100' : 'dark:bg-slate-900 bg-slate-300']" @click="selectMessage(message)">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold dark:text-sky-500 text-violet-900">{{ message.sender }}</h3>
                    <p class="text-sm dark:text-slate-400 text-violet-900">{{ formatDate(message.created_at) }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-sm dark:text-slate-400 text-violet-900">{{ truncateMessageTitle(message.title) }}</p>
                    <span v-if="message.read_at === null"
                        class="dark:bg-rose-500 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md dark:shadow-rose-500/50 shadow-amber-500/50">
                        Yeni
                    </span>
                </div>
            </div>
        </div>
        <div v-if="!isLoading && selectedMessage"
            class="w-full md:w-2/3 ml-0 lg:ml-4 p-4 lg:p-6 dark:bg-slate-900 bg-slate-300 rounded-lg">
            <div class="flex justify-between">
                <h2 class="text-2xl font-bold dark:text-sky-500 text-violet-900">{{ selectedMessage.sender }}</h2>
                <p class="text-sm dark:text-slate-400 text-violet-900 mb-4">{{ formatDate(selectedMessage.created_at) }}
                </p>
            </div>
            <h3 class="text-lg font-semibold dark:text-slate-400 text-violet-900">{{ selectedMessage.title }}</h3>
            <div v-html="selectedMessage.message" class="prose dark:text-slate-400 text-violet-900 mt-4"></div>
        </div>
        <div v-else-if="!isLoading"
            class="w-full md:w-2/3 ml-0 lg:ml-4 p-4 lg:p-6 dark:text-slate-400 text-violet-900 dark:bg-slate-800 lg:dark:bg-slate-900 bg-slate-200 lg:bg-slate-300 rounded-lg">
            <p>Görüntülemek için bir mesaj seçin</p>
        </div>
    </div>
    <!-- Pagination -->
    <nav v-if="!isLoading && messages.length > 0 && (!selectedMessage || isDesktop)"
        class="flex flex-col md:flex-row items-center justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal dark:text-slate-400 text-violet-900">
            <span class="font-semibold dark:text-slate-400 text-violet-900">{{ currentPage }}</span>
            of <span class="font-semibold dark:text-slate-400 text-violet-900">{{ totalPages }}</span>
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import Spinner from '@/components/Spinner.vue';

const store = useStore();

const messages = ref([]);
const selectedMessage = ref(null);
const isLoading = ref(false);

const currentPage = ref(1);
const totalPages = ref(1);

const studentSummary = ref(null);

const fetchMessages = async (page = 1) => {
    isLoading.value = true;
    try {
        const token = store.state.token;
        const baseURL = axios.defaults.baseURL;
        const requestUrl = `${baseURL}/direct_messages?page=${page}`;

        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
            messages.value = response.data.data.data;
            currentPage.value = response.data.data.current_page;
            totalPages.value = response.data.data.last_page;
        } else {
            console.error('Beklenen veri yapısı alınamadı.');
        }

        const summaryResponse = await axios.get(`${baseURL}/my_student_summary`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const studentSummary = summaryResponse.data;
        store.commit('setUnreadMessagesCount', studentSummary.unreadMessagesCount);

    } catch (error) {
        console.error('API Error:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchMessages();
});

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        fetchMessages(page);
    }
}

function selectMessage(message) {
    selectedMessage.value = message;

    if (!message.read_at) {
        message.read_at = new Date().toISOString();
        markMessageAsRead(message.id);

        const newUnreadCount = store.state.unreadMessagesCount - 1;
        store.commit('setUnreadMessagesCount', newUnreadCount);
    }
}


async function markMessageAsRead(messageId) {
    try {
        const token = store.state.token;
        const baseURL = axios.defaults.baseURL;
        const requestUrl = `${baseURL}/inertia/message-set-read/${messageId}`;

        await axios.post(requestUrl, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const messageIndex = messages.value.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
            messages.value[messageIndex].read_at = new Date().toISOString();
        }

        const unreadCount = store.state.unreadMessagesCount - 1;
        store.commit('setUnreadMessagesCount', unreadCount);

    } catch (error) {
        console.error("Mesajı okundu olarak işaretleme hatası:", error);
    }
}

function truncateMessageTitle(title) {
    return title.length > 50 ? title.slice(0, 50) + '...' : title;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

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

const isDesktop = computed(() => window.innerWidth >= 768);
</script>

<style scoped></style>
