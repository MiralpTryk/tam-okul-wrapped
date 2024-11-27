<template>
    <div class="flex flex-col items-center gap-4">
        <span class="text-white text-3xl">AYT Türkçe Deneme Sınavları - 2022</span>
        <nav aria-label="Question Navigation" class="">
            <ul class="flex items-center h-10 text-base">
                <li>
                    <a href="#" @click.prevent="goToFirst"
                        :class="['flex items-center justify-center px-4 h-10 rounded-s-lg', currentPage === 1 ? 'text-gray-500 bg-gray-200 border-gray-300' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700']">
                        <span class="sr-only">First</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6L11.6 12L19 18" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M7 5C7.55 5 8 5.525 8 6.16667V17.8333C8 18.475 7.55 19 7 19C6.45 19 6 18.475 6 17.8333V6.16667C6 5.525 6.45 5 7 5Z"
                                fill="black" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#" @click.prevent="prevPage"
                        :class="['flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0', currentPage === 1 ? 'text-gray-500 bg-gray-200 border-gray-300' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700']">
                        <span class="sr-only">Previous</span>
                        <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                    </a>
                </li>
                <li v-for="page in visiblePages" :key="page">
                    <a href="#" @click.prevent="setPage(page)"
                        :class="['flex items-center justify-center px-4 h-10 leading-tight border', currentPage === page ? 'z-10 text-blue-600 border-blue-300 bg-blue-200 hover:bg-blue-300 hover:text-blue-700' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700']">
                        {{ page }}
                    </a>
                </li>
                <li>
                    <a href="#" @click.prevent="nextPage"
                        :class="['flex items-center justify-center px-4 h-10 leading-tight border', currentPage === totalPages.value ? 'text-gray-500 bg-gray-200 border-gray-300' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700']">
                        <span class="sr-only">Next</span>
                        <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#" @click.prevent="goToLast"
                        :class="['flex items-center justify-center px-4 h-10 rounded-e-lg', currentPage === totalPages.value ? 'text-gray-500 bg-gray-200 border-gray-300' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700']">
                        <span class="sr-only">Last</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6L13.4 12L6 18" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M18 5C18.55 5 19 5.525 19 6.16667V17.8333C19 18.475 18.55 19 18 19C17.45 19 17 18.475 17 17.8333V6.16667C17 5.525 17.45 5 18 5Z"
                                fill="black" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
        <BackButton />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BackButton from '@/components/BackButton.vue';

const currentPage = ref(1);
const totalPages = ref(40);
const pageSize = 5;

const startPage = ref(1);
const endPage = computed(() => Math.min(startPage.value + pageSize - 1, totalPages.value));


const visiblePages = computed(() => {
    const pages = [];
    for (let i = startPage.value; i <= endPage.value; i++) {
        pages.push(i);
    }
    return pages;
});

const setPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        if (page >= endPage.value) {
            startPage.value = page;
        } else if (page < startPage.value) {
            startPage.value = page - pageSize + 1;
        }
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        if (currentPage.value < startPage.value) {
            startPage.value = Math.max(1, currentPage.value - pageSize + 1);
        }
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        if (currentPage.value > endPage.value) {
            startPage.value = Math.min(totalPages.value - pageSize + 1, currentPage.value);
        }
    }
};

const goToFirst = () => {
    currentPage.value = 1;
    startPage.value = 1;
};

const goToLast = () => {
    currentPage.value = totalPages.value;
    startPage.value = Math.max(totalPages.value - pageSize + 1, 1);
};
</script>

<style></style>
