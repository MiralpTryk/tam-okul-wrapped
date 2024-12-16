<template>
  <div class="flex flex-col md:flex-row h-full bg-black text-white">
    <!-- Sol Kolon - Resim -->
    <div class="w-full md:w-2/5 flex items-start justify-center p-8">
      <img 
        v-if="book?.image"
        :src="book.image" 
        :alt="book.title" 
        class="w-full rounded-lg shadow-lg object-cover aspect-[3/4]"
      />
    </div>
    
    <!-- Sağ Kolon - İçerik -->
    <div class="w-full md:w-3/5 p-6">
      <h2 class="text-2xl font-bold mb-2">{{ book?.title }}</h2>
      <p class="text-lg text-gray-300 mb-4">{{ book?.subtitle }}</p>
      <div class="flex flex-wrap gap-2 text-sm items-center mb-4">
        <span 
          v-for="(cat, index) in book?.category" 
          :key="index"
          class="px-3 py-1 bg-[#1A93BD] rounded-full"
        >
          {{ cat }}
        </span>
      </div>
      <div class="flex gap-8 text-sm text-gray-400 mb-8">
        <span>Okuma süresi: {{ book?.readingTime }}</span>
        <span>Sayfa sayısı: {{ book?.pages }}</span>
      </div>

      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Kitap Hakkında</h3>
          <p class="text-gray-300 leading-relaxed">
            {{ book?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: {
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

