<template>
  <div class="w-fit max-w-sm mx-auto">
    <div ref="cardRef"
      class="relative w-full aspect-[9/16] overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-red-950 shadow-2xl [padding:24px]">
      <!-- Content -->
      <div class="relative h-full flex flex-col">
        <!-- Header -->
        <div class="text-zinc-300 text-left flex justify-between items-center">
          <h2 class="text-2xl sm:text-3xl font-bold max-w-6 [margin-right:10px]">
            {{ userName }}'in Öğrenme Yolculuğu
          </h2>
          
          <!-- Badges -->
          <div class="flex gap-2 absolute top-0 right-0">
            <div v-for="(badge, index) in badges" 
                 :key="index"
                 class="w-8 h-8 rounded-full bg-zinc-800/60 backdrop-blur-md border border-zinc-700 flex items-center justify-center"
                 :title="badge.title">
              <span class="text-lg">{{ badge.emoji }}</span>
            </div>
          </div>

          <img :src="koksisLogo" alt="KÖKSİS Logo" class="w-28 absolute top-4 -right-6 h-auto" crossorigin="anonymous"
            loading="eager" :class="{ 'opacity-0': !logoLoaded }" />
        </div>

        <!-- Main Stats -->
        <div class="flex flex-col justify-center items-center text-center text-white z-10 gap-[30px] mt-[80px]">

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 w-full max-w-sm [gap:8px]">

            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-xl">🎯</span>
                <span class="text-2xl font-bold text-red-600">%{{ successRate }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Başarı Oranı
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <img :src="dahi" alt="Dahi Logo" class="w-16 h-auto" crossorigin="anonymous" loading="eager"
                  :class="{ 'opacity-0': !logoLoaded }" />
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-xl">🏆</span>
                <span class="text-xl font-bold text-red-600">{{ bestCourse }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                En İyi Ders
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-xl">⭐</span>
                <span class="text-xl font-bold text-red-600">{{ bestTopic }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                En İyi Konu
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-xl">✍️</span>
                <span class="text-2xl font-bold text-red-600">{{ totalQuestions }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Çözülen Soru
              </div>
            </div>
            <div
              class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center gap-1">
                <span class="text-xl">⏱️</span>
                <span class="text-2xl font-bold text-red-600">{{ hoursSpent }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Çalışma Saati
              </div>
            </div>
          </div>

          <!-- Rozet Açıklamaları -->
          <div class="text-[10px] text-zinc-400 flex flex-col gap-1 text-left w-full px-2">
            <div v-if="badges.length > 0" class="text-zinc-300 mb-1">Rozetlerin:</div>
            <div v-for="(badge, index) in badges" 
                 :key="index" 
                 class="flex items-center gap-1">
              <span class="text-sm">{{ badge.emoji }}</span>
              <span>{{ badge.title }}</span>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="text-center text-zinc-300 text-xs italic flex items-center justify-center [gap:8px] -mt-[16px] sm:-mt-0">
            <img :src="tamOkulLogo" alt="Tam Okul Logo" class="w-16 h-auto" crossorigin="anonymous" loading="eager"
              :class="{ 'opacity-0': !logoLoaded }" />
            KÖKSİS tarafından oluşturuldu.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import tamOkulLogo from "@/assets/tam-okul-logo-dark.webp";
import koksisLogo from "@/assets/koksis-card-logo_5.webp";
import dahi from "@/assets/dahi.png";

const logoLoaded = ref(false);
const cardRef = ref(null);

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
      console.log('Tüm logolar yüklendi');
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

const props = defineProps({
  rank: {
    type: [String, Number],
    default: "10",
  },
  totalQuestions: {
    type: Number,
    default: 1342,
  },
  bestCourse: {
    type: String,
    default: "Matematik",
  },
  bestTopic: {
    type: String,
    default: "Sayılar",
  },
  hoursSpent: {
    type: Number,
    default: 720,
  },
  userName: {
    type: String,
    default: "Anonim",
  },
  successRate: {
    type: Number,
    default: 80,
  },
});

// Rozetleri hesapla
const badges = computed(() => 
  calculateBadges(props.totalQuestions, props.successRate, props.hoursSpent)
);
</script>
