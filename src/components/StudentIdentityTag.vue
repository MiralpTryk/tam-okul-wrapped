<template>
    <div v-if="isLoading" class="flex items-center justify-center p-16">
        <Spinner />
    </div>
    <div v-else-if="studentDetails" class="flex flex-col items-center">
        <div class="flex flex-col md:flex-row items-center justify-center gap-4">
            <div class="w-16 md:w-24">
                <img src="https://www.svgrepo.com/show/420330/addicted-draw-love.svg" alt="Öğrenci"
                    class="rounded-full h-16 w-16 md:h-24 md:w-24 border-2 border-violet-900 dark:border-sky-900" />
            </div>
            <div class="flex flex-col items-center">
                <span class="text-center text-lg md:text-3xl text-violet-900 dark:text-slate-400 font-semibold">
                    {{ studentDetails.title }}
                </span>
                <div class="flex flex-col sm:flex-row gap-2 md:gap-4 mt-4">
                    <div class="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" md:width="24" md:height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M23 2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3L0 21C0 21.2652 0.105357 21.5196 0.292893 21.7071C0.48043 21.8946 0.734784 22 1 22H23C23.2652 22 23.5196 21.8946 23.7071 21.7071C23.8946 21.5196 24 21.2652 24 21V3C24 2.73478 23.8946 2.48043 23.7071 2.29289C23.5196 2.10536 23.2652 2 23 2ZM22 20H20V19H15V20H2V4H22V20ZM10.29 9.71C10.29 9.25648 10.4702 8.82154 10.7908 8.50085C11.1115 8.18016 11.5465 8 12 8C12.95 8 13.71 8.77 13.71 9.71C13.71 10.66 12.95 11.43 12 11.43C11.05 11.43 10.29 10.66 10.29 9.71ZM5.71 11.29C5.71 10.58 6.29 10 7 10C7.34213 10 7.67025 10.1359 7.91217 10.3778C8.15409 10.6198 8.29 10.9479 8.29 11.29C8.29 12 7.71 12.57 7 12.57C6.29 12.57 5.71 12 5.71 11.29ZM15.71 11.29C15.71 10.9479 15.8459 10.6198 16.0878 10.3778C16.3298 10.1359 16.6579 10 17 10C17.3421 10 17.6702 10.1359 17.9122 10.3778C18.1541 10.6198 18.29 10.9479 18.29 11.29C18.29 12 17.71 12.57 17 12.57C16.29 12.57 15.71 12 15.71 11.29ZM20 15.14V16H4V15.14C4 14.2 5.55 13.43 7 13.43C7.55 13.43 8.11 13.54 8.6 13.73C9.35 13.04 10.7 12.57 12 12.57C13.3 12.57 14.65 13.04 15.4 13.73C15.89 13.54 16.45 13.43 17 13.43C18.45 13.43 20 14.2 20 15.14Z"
                                fill="#8b5cf6" />
                        </svg>
                        <span class="text-violet-900 dark:text-slate-400 text-sm md:text-base">Sınıf:</span>
                        <span class="text-violet-900 dark:text-slate-400 font-semibold text-sm md:text-base">{{
                            studentDetails.classroom }}</span>
                    </div>
                    <div class="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" md:width="24" md:height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12.4737 2.4955C12.3243 2.43146 12.1635 2.39844 12.0009 2.39844C11.8384 2.39844 11.6775 2.43146 11.5281 2.4955L3.12814 6.0955C2.91167 6.18772 2.72709 6.34154 2.59735 6.53783C2.46761 6.73412 2.39844 6.96421 2.39844 7.19951C2.39844 7.4348 2.46761 7.66489 2.59735 7.86118C2.72709 8.05747 2.91167 8.21129 3.12814 8.30351L6.30094 9.66071C6.4187 9.5275 6.56463 9.42215 6.72814 9.3523L11.5281 7.29551C11.6734 7.23077 11.8301 7.19554 11.989 7.19189C12.148 7.18823 12.3061 7.2162 12.4542 7.27419C12.6023 7.33218 12.7374 7.41902 12.8516 7.52967C12.9658 7.64031 13.0569 7.77256 13.1196 7.91872C13.1822 8.06488 13.2152 8.22204 13.2166 8.38105C13.218 8.54007 13.1878 8.69778 13.1277 8.84502C13.0676 8.99225 12.9788 9.12607 12.8666 9.23871C12.7543 9.35134 12.6208 9.44053 12.4737 9.50111L9.20134 10.9051L11.5293 11.9023C11.6786 11.9662 11.8392 11.9991 12.0015 11.9991C12.1639 11.9991 12.3245 11.9662 12.4737 11.9023L20.8737 8.30231C21.0895 8.20974 21.2734 8.05593 21.4026 7.85991C21.5318 7.66389 21.6006 7.43428 21.6006 7.19951C21.6006 6.96473 21.5318 6.73512 21.4026 6.5391C21.2734 6.34308 21.0895 6.18927 20.8737 6.0967L12.4737 2.49671V2.4955ZM3.97294 11.2759L6.00094 12.1435V17.0659C5.58544 16.9714 5.1647 16.9017 4.74094 16.8571C4.46751 16.8284 4.21224 16.7066 4.01783 16.5122C3.82343 16.3178 3.70167 16.0625 3.67294 15.7891C3.51512 14.2782 3.61658 12.7514 3.97294 11.2747V11.2759ZM11.1609 19.8871C10.3498 19.0912 9.41836 18.4279 8.40094 17.9215V13.1731L10.5825 14.1091C11.0307 14.3012 11.5133 14.4003 12.0009 14.4003C12.4886 14.4003 12.9711 14.3012 13.4193 14.1091L20.0289 11.2759C20.3874 12.7523 20.4889 14.2794 20.3289 15.7903C20.3002 16.0637 20.1784 16.319 19.984 16.5134C19.7896 16.7078 19.5344 16.8296 19.2609 16.8583C16.84 17.1127 14.5768 18.1805 12.8409 19.8871C12.6166 20.107 12.315 20.2301 12.0009 20.2301C11.6868 20.2301 11.3853 20.107 11.1609 19.8871ZM7.20094 21.5995C7.5192 21.5995 7.82442 21.4731 8.04946 21.248C8.27451 21.023 8.40094 20.7178 8.40094 20.3995V17.9215C7.63773 17.5423 6.83205 17.2543 6.00094 17.0659V20.3995C6.00094 20.7178 6.12736 21.023 6.35241 21.248C6.57745 21.4731 6.88268 21.5995 7.20094 21.5995Z"
                                fill="#8b5cf6" />
                        </svg>
                        <span class="text-violet-900 dark:text-slate-400 text-sm md:text-base">Öğrenci No:</span>
                        <span class="text-violet-900 dark:text-slate-400 font-semibold text-sm md:text-base">{{
                            studentDetails.student_no }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center gap-2 md:gap-8 mt-4">
            <a v-if="studentDetails.tenant && studentDetails.tenant.school_no"
                :href="`https://${studentDetails.tenant.school_no}.tamokul.com/reports/student-outcome/${studentDetails.student_id}`"
                target="_blank" class="flex justify-center">
                <button
                    class="bg-violet-900 dark:bg-sky-500 hover:bg-violet-950 dark:hover:bg-sky-600 text-slate-200 font-bold text-sm py-2 px-3 rounded-xl lg:w-40 focus:outline-none focus:shadow-outline">
                    Kazanım Raporu
                </button>
            </a>
            <a v-if="studentDetails.tenant && studentDetails.tenant.school_no"
                :href="`https://${studentDetails.tenant.school_no}.tamokul.com/reports/student-subject/${studentDetails.student_id}`"
                target="_blank" class="flex justify-center">
                <button
                    class="bg-violet-900 dark:bg-sky-500 hover:bg-violet-950 dark:hover:bg-sky-600 text-slate-200 font-bold text-sm py-2 px-3 rounded-xl lg:w-40 focus:outline-none focus:shadow-outline">
                    Konu Raporu
                </button>
            </a>
        </div>
    </div>
    <div v-else class="flex justify-center items-center">
        <span class="text-xs bg-red-400 px-2 py-1 rounded-md">
            Öğrenci verileri yüklenirken bir hata oluştu :(
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
import Spinner from '@/components/Spinner.vue';

const store = useStore();
const isLoading = computed(() => !store.getters.isStudentDetailsLoaded);
const studentDetails = computed(() => store.getters.studentDetails);
</script>

<style scoped></style>