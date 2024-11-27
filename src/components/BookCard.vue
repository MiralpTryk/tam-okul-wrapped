<template>
    <div class="grid-container mt-6 px-">
        <div v-for="(book) in dummyBooks" :key="book.id"
            class="grid-item p-4 bg-slate-900 hover:bg-slate-800 hover:cursor-pointer rounded-2xl flex flex-col justify-start items-start">
            <div class="w-full h-[268px] bg-gray-200 rounded-xl"></div>
            <div class="w-full flex flex-col mt-4">
                <div class="flex justify-between items-start">
                    <div class="text-white text-[16px] mr-2">{{ book.title }}</div>
                    <button class="h-6 w-6 p-0 border-none bg-transparent flex-shrink-0">
                        <img src="@/assets/icon-favorite.svg" alt="Favorite Icon" class="h-6 w-6" />
                    </button>
                </div>
            </div>
            <div class="text-white text-sm flex gap-1 mt-2">
                <span>Eklenme tarihi:</span>
                <span class="text-gray-500">{{ book.date }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const dummyBooks = ref([
    {
        id: 1,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 2,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 3,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 4,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 5,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 6,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 7,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 8,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 9,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
    {
        id: 10,
        title: "AYT Türkçe Deneme Sınavları - 2022",
        date: "09.06.2024",
    },
]);
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
}
</style>