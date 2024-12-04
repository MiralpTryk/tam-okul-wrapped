<template>
  <div class="w-fit max-w-sm mx-auto">
    <div ref="cardRef"
      :class="[
        'relative w-full aspect-[9/16] overflow-hidden bg-gradient-to-tl shadow-2xl [padding:24px]',
        selectedTheme.gradient
      ]">
      <!-- Content -->
      <div class="relative h-full flex flex-col">
        <!-- Header -->
        <div class="text-zinc-300 text-left flex justify-between items-center">
          <h2 class="text-2xl sm:text-3xl font-bold max-w-6 [margin-right:10px]">
            {{ userName }}'in Öğrenme Yolculuğu
          </h2>
          <img :src="koksisLogo" alt="KÖKSİS Logo" class="w-28 absolute top-4 -right-6 h-auto" crossorigin="anonymous" loading="eager"
            :class="{ 'opacity-0': !logoLoaded }" />
        </div>

        <!-- Main Stats -->
        <div class="flex flex-col justify-center items-center text-center text-white z-10 gap-[40px] mt-[60px]">
          <p class="text-xl leading-tight text-zinc-300">
            Tüm öğrenciler arasında
            <br />
            <span :class="selectedTheme.secondary">{{ rank }}</span> içindesin!
          </p>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 w-full max-w-sm [gap:12px]">
            <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center [gap:8px]">
                <span class="text-xl">🔥</span>
                <span :class="['text-2xl font-bold', selectedTheme.secondary]">{{ longestStreak }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                En Uzun Seri
              </div>
            </div>
            <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center [gap:8px]">
                <span class="text-xl">✍️</span>
                <span :class="['text-2xl font-bold', selectedTheme.secondary]">{{ totalAnswers }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Toplam Cevap
              </div>
            </div>
            <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center [gap:8px]">
                <span class="text-xl">⏱️</span>
                <span :class="['text-2xl font-bold', selectedTheme.secondary]">{{ minutesSpent }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Harcanan Dakika
              </div>
            </div>
            <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center [gap:8px]">
                <span class="text-xl">📚</span>
                <span :class="['text-2xl font-bold', selectedTheme.secondary]">{{ totalSubjects }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Toplam Ders
              </div>
            </div>
            <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center [gap:8px]">
                <span class="text-xl">🎯</span>
                <span :class="['text-2xl font-bold', selectedTheme.secondary]">{{ totalTopics }}</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Toplam Konu
              </div>
            </div>
            <div class="bg-zinc-800/60 backdrop-blur-md rounded-xl border border-zinc-700 transition-all duration-300 hover:bg-zinc-700/60 hover:border-zinc-600 [padding:12px]">
              <div class="flex items-center justify-center [gap:8px]">
                <span class="text-xl">🎉</span>
                <span :class="['text-2xl font-bold', selectedTheme.secondary]">2023</span>
              </div>
              <div class="text-[10px] sm:text-sm text-zinc-400 [margin-top:4px]">
                Yıl Tamamlandı!
              </div>
            </div>
          </div>
          <!-- Footer -->
          <div :class="['text-center text-xs italic flex items-center justify-center [gap:8px] -mt-[16px] sm:-mt-0', selectedTheme.secondary]">
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
import { ref, onMounted } from "vue";
import tamOkulLogo from "@/assets/tam-okul-logo-dark.webp";
import koksisLogo from "@/assets/koksis-card-logo_5.webp";

const logoLoaded = ref(false);
const cardRef = ref(null);

const colorThemes = [
  // Kırmızı tema (eski hali)
  {
    gradient: 'from-black via-zinc-900 to-red-950',
    accent: 'text-red-600',
    secondary: 'text-red-600'  // İsim değişikliği
  },
  // Yeşil tema
  {
    gradient: 'from-emerald-700 via-emerald-800 to-emerald-950',
    accent: 'text-emerald-500',
    secondary: 'text-rose-400'
  },
  // Mavi tema
  {
    gradient: 'from-blue-700 via-blue-800 to-blue-950',
    accent: 'text-blue-500',
    secondary: 'text-amber-400'
  },
  // Mor tema
  {
    gradient: 'from-purple-700 via-purple-800 to-purple-950',
    accent: 'text-purple-500',
    secondary: 'text-yellow-400'
  },
  // Turuncu tema
  {
    gradient: 'from-orange-700 via-orange-800 to-orange-950',
    accent: 'text-orange-500',
    secondary: 'text-cyan-400'
  }
];

const selectedTheme = ref(colorThemes[Math.floor(Math.random() * colorThemes.length)]);

onMounted(() => {
  // Her iki logo için de preload işlemi yapalım
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

defineProps({
  rank: {
    type: String,
    default: "%10",
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
  totalSubjects: {
    type: Number,
    default: 12,
  },
  totalTopics: {
    type: Number,
    default: 156,
  },
  userName: {
    type: String,
    default: "Anonim",
  },
});

const refreshTheme = () => {
  selectedTheme.value = colorThemes[Math.floor(Math.random() * colorThemes.length)];
};

defineExpose({
  refreshTheme
});
</script>
