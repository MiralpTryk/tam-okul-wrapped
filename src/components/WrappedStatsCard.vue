<template>
    <div class="w-full max-w-md mx-auto">
      <div
        ref="cardRef"
        class="relative w-full aspect-[9/16] overflow-hidden bg-black shadow-2xl"
      >
        <!-- Background gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-900/30"></div>
  
        <!-- Content -->
        <div class="relative h-full px-8 pt-8 pb-8 flex flex-col">
          <!-- Header -->
          <div class="text-zinc-300 text-left mb-16 flex justify-between items-center">
            <h2 class="text-2xl sm:text-3xl font-bold leading-tight max-w-6">
              {{ userName }}'in Öğrenme Yolculuğu
            </h2>
            <img :src="koksisLogo" alt="KÖKSİS Logo" class="w-36 h-auto mx-auto absolute top-6 -right-6">
          </div>
  
          <!-- Main Stats -->
          <div class="flex flex-col justify-center items-center text-center text-white space-y-4 z-10">
            <p class="text-xl leading-tight text-zinc-300">
              Tüm öğrenciler arasında <span class="text-red-600 font-bold">{{ rank }}</span> içindesin!
            </p>
  
            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl p-4 border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600">
                <div class="flex items-center justify-center space-x-3 mb-2">
                  <span class="text-xl">🔥</span>
                  <span class="text-2xl font-bold text-red-600">{{ longestStreak }}</span>
                </div>
                <div class="text-[10px] sm:text-sm text-zinc-400">En Uzun Seri</div>
              </div>
              <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl p-4 border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600">
                <div class="flex items-center justify-center space-x-3 mb-2">
                  <span class="text-xl">🔥</span>
                  <span class="text-2xl font-bold text-red-600">{{ longestStreak }}</span>
                </div>
                <div class="text-[10px] sm:text-sm text-zinc-400">En Uzun Seri</div>
              </div>
              <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl p-4 border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600">
                <div class="flex items-center justify-center space-x-3 mb-2">
                  <span class="text-xl">🔥</span>
                  <span class="text-2xl font-bold text-red-600">{{ longestStreak }}</span>
                </div>
                <div class="text-[10px] sm:text-sm text-zinc-400">En Uzun Seri</div>
              </div>
              <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl p-4 border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600">
                <div class="flex items-center justify-center space-x-3 mb-2">
                  <span class="text-xl">✍️</span>
                  <span class="text-2xl font-bold text-red-600">{{ totalAnswers }}</span>
                </div>
                <div class="text-[10px] sm:text-sm text-zinc-400">Toplam Cevap</div>
              </div>
              <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl p-4 border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600">
                <div class="flex items-center justify-center space-x-3 mb-2">
                  <span class="text-xl">⏱️</span>
                  <span class="text-2xl font-bold text-red-600">{{ minutesSpent }}</span>
                </div>
                <div class="text-[10px] sm:text-sm text-zinc-400">Harcanan Dakika</div>
              </div>
              <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl p-4 border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600">
                <div class="flex items-center justify-center space-x-3 mb-2">
                  <span class="text-xl">🎉</span>
                  <span class="text-2xl font-bold text-red-600">2023</span>
                </div>
                <div class="text-[10px] sm:text-sm text-zinc-400">Yıl Tamamlandı!</div>
              </div>
            </div>
          </div>
  
          <!-- Footer -->
          <div class="text-center text-zinc-300 text-xs italic mt-auto flex items-center justify-center">
            <img :src="tamOkulLogo" alt="Tam Okul Logo" class="w-16 h-auto inline-block mr-2">
            KÖKSİS tarafından oluşturuldu.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";

  import koksisLogo from "@/assets/koksis-card-logo.png";
 import tamOkulLogo from "@/assets/tam-okul-logo-dark.webp";
  
  defineProps({
    rank: {
      type: String,
      default: "İlk %10",
    },
    longestStreak: {
      type: Number,
      default: 342,
    },
    totalAnswers: {
      type: Number,
      default: 7480,
    },
    minutesSpent: {
      type: Number,
      default: 1191,
    },
    userName: {
      type: String,
      default: "Anonim",
    },
  });
  
  const cardRef = ref(null);
  </script>
  
  