<template>
  <div class="flex flex-col md:flex-row h-full bg-black text-white">
    <!-- Main Content Section -->
    <div class="w-full md:w-2/3 p-2 md:p-6">
      <!-- Title Section -->
      <div class="text-center md:text-left mb-6">
        <h2 class="text-2xl md:text-3xl font-bold mb-2">{{ music.title }}</h2>
        <p class="text-gray-400 text-sm md:text-base">{{ music.artist }}</p>
      </div>
  
      <!-- Spotify Player -->
      <div class="w-full aspect-square md:aspect-video rounded-xl shadow-2xl overflow-hidden bg-black">
        <iframe 
          :src="music.spotifyEmbed"
          width="100%" 
          height="100%" 
          frameborder="0" 
          allowtransparency="true" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          class="w-full h-full"
        ></iframe>
      </div>
    </div>
  
    <!-- Study Tips Section -->
    <div class="w-full md:w-1/3 p-4 md:p-6 bg-black/50">
      <div class="sticky top-0">
        <h3 class="text-xl font-semibold mb-4">Çalışma İpucu</h3>
        <div class="prose prose-invert">
          <p class="text-gray-300">{{ music.studyTip }}</p>
          <ul class="mt-4 space-y-2 text-gray-300">
            <li>🎧 Kulaklık kullanmanız önerilir</li>
            <li>🔊 Orta ses seviyesinde dinleyin</li>
            <li>⏱️ Her 45 dakikada bir ara verin</li>
            <li>📱 Bildirimlerinizi kapatın</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  defineProps({
  music: {
    type: Object,
    required: true
  }
  });
  </script>
  
  <style scoped>
  iframe {
  border-radius: 12px;
  }
  
  .prose :where(ul):not(:where([class~="not-prose"] *)) {
    list-style-type: none;
    padding-left: 0;
  }
  
  .aspect-square {
    @media (max-width: 768px) {
      aspect-ratio: auto;
      height: 352px;
    }
  }
  
  .sticky {
    @media (max-width: 768px) {
      position: static;
    }
  }
  
  .bg-gray-900\/50 {
    @media (max-width: 768px) {
      overflow-y: auto;
      max-height: calc(100vh - 352px - 8rem);
      padding: 1rem;
      margin-bottom: 0;
    }
  }
  
  .prose {
    @media (max-width: 768px) {
      padding-bottom: 1rem;
    }
  }
  
  .text-gray-300 {
    @media (max-width: 768px) {
      line-height: 1.6;
      margin-bottom: 1rem;
    }
  }
  </style>
  
  