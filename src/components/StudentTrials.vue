<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <!-- Spinner -->
        <div v-if="isLoading" class="flex justify-center items-center p-16">
            <Spinner />
        </div>
        <!-- Table -->
        <table v-else-if="trials"
            class="w-full text-sm text-center rtl:text-center text-violet-900 dark:text-slate-400">
            <thead class="text-xs text-violet-900 dark:text-slate-400 uppercase bg-slate-300 dark:bg-slate-950">
                <tr>
                    <th scope="col" class="px-3 py-2">Tür</th>
                    <th scope="col" class="px-3 py-2">Tarih</th>
                    <th scope="col" class="px-3 py-2">Deneme Adı</th>
                    <th scope="col" class="px-3 py-2">Kitapçık</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Doğru</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Yanlış</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Boş</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Net</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Sınıf Sırası</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">Okul Sırası</th>
                    <th scope="col" class="px-3 py-2 hidden sm:table-cell">İl Sırası</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trial in trials" :key="trial.optic_stuent_assessment_id"
                    @click="goToTrialDetails(trial.optic_student_assessment_id)"
                    class="bg-slate-200 dark:bg-slate-900 border-b border-violet-900 dark:border-slate-400 hover:bg-slate-300 dark:hover:bg-slate-950 hover:text-violet-900 dark:text-slate-400 hover:cursor-pointer">
                    <td scope="row"
                        class="px-3 py-2 font-medium text-violet-900 dark:text-slate-400 whitespace-normal flex flex-col items-center justify-center">
                        <img :src="getIcon(trial.optic_trial_type)" :alt="trial.optic_trial_type" class="w-12 h-12">
                    </td>
                    <td class="px-3 py-2">{{ trial.optic_student_assessment_applied_time || '-' }}</td>
                    <td class="px-3 py-2">{{ trial.optic_trial_name || '-' }}</td>
                    <td :class="{ 'text-sky-500': trial.booklet === 'A', 'text-rose-500': trial.booklet === 'B' }"
                        class="px-3 py-2 font-bold ">{{ trial.booklet || '-' }}</td>
                    <td class="px-3 py-2 font-bold dark:text-green-500 text-green-600 hidden sm:table-cell">{{
                        trial.total_correct ||
                        '-'
                    }}</td>
                    <td class="px-3 py-2 font-bold dark:text-amber-500 text-amber-600 hidden sm:table-cell">{{
                        trial.total_incorrect ||
                        '-'
                    }}
                    </td>
                    <td class="px-3 py-2 font-bold dark:text-sky-500 text-sky-600 hidden sm:table-cell">{{
                        trial.total_empty || '-'
                    }}
                    </td>
                    <td class="px-3 py-2 font-bold hidden sm:table-cell">{{ trial.total_net || '-' }}</td>
                    <td class="px-3 py-2 font-bold hidden sm:table-cell">{{ trial.order_in_class || '-' }}</td>
                    <td class="px-3 py-2 font-bold hidden sm:table-cell">{{ trial.order_in_school || '-' }}</td>
                    <td class="px-3 py-2 font-bold hidden sm:table-cell">{{ trial.order_in_city || '-' }}</td>
                </tr>
            </tbody>
        </table>
        <!-- Error Message -->
        <div v-else class="flex items-center">
            <span class="text-xs text-slate-200 bg-red-500 px-2 py-1 rounded-md font-semibold">
                Henüz hiç deneme veriniz yok
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import iconAyt from '@/assets/icon-ayt.svg';
import iconTyt from '@/assets/icon-tyt.svg';

const store = useStore();
const router = useRouter();
const isLoading = ref(true);

const fetchTrials = async () => {
    await store.dispatch('fetchTrials');
    isLoading.value = false;
};

const getIcon = (trialType) => {
    const icons = {
        'tyt': iconTyt,
        'ayt': iconAyt
    };
    return icons[trialType.toLowerCase()] || iconAyt;
};

const goToTrialDetails = (trialId) => {
    router.push({ name: 'StudentTrialDetails', params: { trialId } });
};

onMounted(() => {
    fetchTrials().then(() => {
    });
});

const trials = computed(() => store.getters.trials);
</script>

<style scoped></style>
