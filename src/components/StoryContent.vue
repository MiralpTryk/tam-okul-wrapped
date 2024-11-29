<template>
    <div class="flex flex-col md:flex-row h-full bg-black text-white">
      <!-- Sol Kolon - Resim -->
      <div class="w-full md:w-2/5 flex items-start justify-center p-8">
        <img 
          v-if="story?.image"
          :src="story.image" 
          :alt="story.title" 
          class="w-full rounded-lg shadow-lg object-cover aspect-[3/4]"
        />
      </div>
      
      <!-- Sağ Kolon - İçerik -->
      <div class="w-full md:w-3/5 p-6">
        <h2 class="text-2xl font-bold mb-2">{{ story?.title }}</h2>
        <p class="text-lg text-gray-300 mb-4">{{ story?.subtitle }}</p>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Başarı Hikayesi</h3>
            <p class="text-gray-300 leading-relaxed">
              {{ story?.content || 'Bu öğrencinin azmi ve kararlılığı sayesinde hedeflerine ulaşma yolculuğu, birçok öğrenciye ilham kaynağı oldu. Düzenli çalışma alışkanlıkları, etkili zaman yönetimi ve kendine olan inancı başarısının temel taşlarıydı.' }}
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-3">Başarı İpuçları</h3>
            <ul class="list-disc list-inside text-gray-300 space-y-2">
              <li>Düzenli çalışma programı oluşturun</li>
              <li>Hedeflerinizi net bir şekilde belirleyin</li>
              <li>Kendinize inanın ve asla pes etmeyin</li>
              <li>Başarısızlıklardan ders çıkarın</li>
              <li>Motivasyonunuzu yüksek tutun</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    story: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  @media (min-width: 768px) {
    img {
      max-height: calc(100vh - 4rem);
    }
  }
  </style>