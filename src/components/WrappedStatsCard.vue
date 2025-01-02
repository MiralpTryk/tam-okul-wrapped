<template>
  <div class="w-[300px] mx-auto">
    <div ref="cardRef"
      class="relative w-full aspect-[9/16] overflow-hidden bg-gradient-to-tl to-black via-black from-red-600 shadow-xl [padding:24px]">
      <!-- Content -->
      <div class="relative flex flex-col">
        <!-- Header -->
        <div class="text-zinc-200 text-left flex justify-between items-center">
          <h2 class="text-lg font-bold max-w-64 leading-5 [margin-right:10px]">
            {{ full_name }}'in <br /> Öğrenme Yolculuğu
          </h2>
          <img :src="koksisLogo" alt="KÖKSİS Logo" class="w-16 absolute -top-7 -right-6 h-auto" crossorigin="anonymous"
            loading="eager" :class="{ 'opacity-0': !logoLoaded }" />
        </div>

        <!-- Main Stats -->
        <div class="flex flex-col justify-center items-center text-center text-zinc-200 z-10 gap-[30px] mt-[48px]">

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 w-full max-w-sm [gap:8px]">

            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-lg">🎯</span>
                <span class="text-sm font-bold text-red-600">%{{ total_questions_solved_percentage }}</span>
              </div>
              <div class="text-[10px] text-zinc-200 [margin-top:4px]">
                Başarı Oranı
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <img :src="dahi" alt="Dahi Logo" class="w-12 h-auto" crossorigin="anonymous" loading="eager"
                  :class="{ 'opacity-0': !logoLoaded }" />
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-lg">🏆</span>
                <span class="text-sm font-bold text-red-600 text-left">{{ best_course }}</span>
              </div>
              <div class="text-[10px] text-zinc-200 [margin-top:4px]">
                En İyi Ders
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-lg">⭐</span>
                <span class="text-sm font-bold text-red-600 text-left">{{ best_subject }}</span>
              </div>
              <div class="text-[10px] text-zinc-200 [margin-top:4px]">
                En İyi Konu
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-lg">✍️</span>
                <span class="text-sm font-bold text-red-600">{{ total_questions_solved }}</span>
              </div>
              <div class="text-[10px] text-zinc-200 [margin-top:4px]">
                Çözülen Soru
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-lg">⏱️</span>
                <span class="text-sm font-bold text-red-600">{{ total_hours_spent }}</span>
              </div>
              <div class="text-[10px] text-zinc-200 [margin-top:4px]">
                Çalışma Saati
              </div>
            </div>
          </div>

          <!-- Rozet Açıklamaları -->
          <div class="text-[10px] text-zinc-200 flex flex-col gap-1 text-left w-full px-2">
            <div v-if="badges.length > 0" class="text-zinc-200 mb-1">Rozetlerin:</div>
            <div v-for="(badge, index) in badges" :key="index" class="flex items-center gap-1">
              <span class="text-sm">{{ badge.emoji }}</span>
              <span>{{ badge.title }}</span>
            </div>
          </div>

          <!-- Footer -->
          <img :src="tamOkulLogo" alt="Tam Okul Logo" class="w-16 h-auto" crossorigin="anonymous" loading="eager"
            :class="{ 'opacity-0': !logoLoaded }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAnalysisStore } from '@/composables/useAnalysisStore';
import tamOkulLogo from "@/assets/tam-okul-logo-dark.webp";
import koksisLogo from "@/assets/koksis-card-logo_5.webp";
import dahi from "@/assets/dahi.png";

const analysisStore = useAnalysisStore();
const logoLoaded = ref(false);
const cardRef = ref(null);

// Store'dan verileri al - varsayılan değerlerle
const full_name = computed(() => analysisStore.userName || 'Öğrenci');
const total_questions_solved = computed(() => analysisStore.totalQuestionsSolved || 0);
const total_questions_solved_percentage = computed(() => analysisStore.totalQuestionsSolvedPercentage || 0);
const best_course = computed(() => analysisStore.bestCourse || 'Henüz veri yok');
const best_subject = computed(() => analysisStore.bestSubject || 'Henüz veri yok');
const total_hours_spent = computed(() => analysisStore.totalHoursSpent || 0);

onMounted(() => {
  const preloadImages = [koksisLogo, tamOkulLogo].map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
    });
  });

  Promise.all(preloadImages)
    .then(() => {
      logoLoaded.value = true;
    })
    .catch(error => {
      console.error('Logo yükleme hatası:', error);
    });
});

const calculateBadges = (totalQuestions, successRate, hoursSpent) => {
  const badges = [];

  // Soru Çözüm Rozetleri
  if (totalQuestions >= 1500) {
    badges.push({ emoji: '📚', title: 'Soru Çözüm Ustası (1500+ Soru)' });
  } else if (totalQuestions >= 1000) {
    badges.push({ emoji: '📖', title: 'Soru Çözüm Uzmanı (1000+ Soru)' });
  } else if (totalQuestions >= 500) {
    badges.push({ emoji: '📝', title: 'Soru Çözüm Acemisi (500+ Soru)' });
  }

  // Başarı Yüzdesi Rozetleri
  if (successRate >= 100) {
    badges.push({ emoji: '👑', title: 'Tam İsabet (%100 Başarı)' });
  } else if (successRate >= 85) {
    badges.push({ emoji: '⭐', title: 'Başarı Yıldızı (%85+ Başarı)' });
  } else if (successRate >= 70) {
    badges.push({ emoji: '✨', title: 'Yükselen Yıldız (%70+ Başarı)' });
  }

  // Çalışma Saati Rozetleri
  if (hoursSpent >= 300) {
    badges.push({ emoji: '⏰', title: 'Azimli Şampiyon (300+ Saat)' });
  } else if (hoursSpent >= 200) {
    badges.push({ emoji: '⌚', title: 'Çalışkan Arı (200+ Saat)' });
  } else if (hoursSpent >= 100) {
    badges.push({ emoji: '⏱️', title: 'Öğrenme Aşığı (100+ Saat)' });
  }

  return badges;
};

const badges = computed(() =>
  calculateBadges(
    total_questions_solved.value,
    total_questions_solved_percentage.value,
    total_hours_spent.value
  )
);
</script>

<style scoped>
.badge-emoji {
  font-size: 1.125rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.h2c-badge-emoji {
  margin-bottom: 1rem;
  /* mb-4 */
}
</style>
