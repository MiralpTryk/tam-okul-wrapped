<template>
  <!-- Grid Pattern Background -->
  <div class="fixed inset-0 z-[-1]">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_20%,transparent_80%)] opacity-[0.75]">
    </div>
  </div>
      <!-- Gradient Blobs -->
      <div class="fixed inset-0 z-[-2]">
      <!-- sky gradient -->
      <div class="absolute top-[-6rem] -left-[10rem] w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-sky-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:2000ms]"></div>
      
      <!-- Red gradient -->
      <div class="absolute top-[-1rem] -right-[10rem] w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-red-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:3000ms]"></div>
      
      <!-- violet gradient -->
      <div class="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-violet-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:4000ms]"></div>
    </div>

  <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 space-y-8">

    <!-- Error Code -->
    <div class="relative">
      <h1 class="text-[150px] md:text-[250px] font-bold text-red-900 animate-pulse">
        404
      </h1>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-fadeIn">
        <p class="text-2xl md:text-3xl font-semibold text-zinc-300 mb-2 text-nowrap">
          Eyvah! Kaybolmuş Gibisin 🙈
        </p>
        <p class="text-zinc-200 text-sm md:text-base max-w-md">
          Bu sayfa uzayda kaybolmuş olabilir, belki de bir kara deliğe düşmüştür 🚀
        </p>
      </div>
    </div>

    <!-- Action Button -->
    <router-link to="/"
      class="inline-flex items-center px-4 py-2 space-x-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-300 animate-fadeIn">
      <HomeIcon class="w-4 h-4" />
      <span>Ana Sayfaya Dön</span>
    </router-link>

    <!-- Additional Message -->
    <div class="text-center space-y-2 animate-fadeIn">
      <p class="text-zinc-400 text-sm">
        Endişelenme! Ana sayfa hala yerinde duruyor ve seni bekliyor 😉
      </p>
      <p class="text-zinc-300 text-xs">
        Tam Okul
      </p>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon } from 'lucide-vue-next'
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}


</style>