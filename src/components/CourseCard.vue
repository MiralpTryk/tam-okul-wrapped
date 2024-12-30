<template>
  <div 
    class="relative group cursor-pointer w-full h-full bg-zinc-900 rounded-lg overflow-hidden"
    @click="$emit('click', item)"
  >
    <!-- Thumbnail Container -->
    <div class="relative w-full h-full">
      <img 
        :src="item.thumbnail_url" 
        :alt="item.title"
        class="w-full h-full object-cover"
      />
      <!-- Hover Overlay -->
<!--       <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <PlayIcon class="w-12 h-12 text-white" />
      </div> -->
    </div>

    <!-- Video Info - Absolute positioned at bottom -->
<!--     <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
      <h3 class="text-sm font-medium text-white line-clamp-2">{{ item.title }}</h3>
      <p class="text-xs text-gray-400 mt-1">{{ item.channel_title }}</p>
    </div> -->
  </div>
</template>

<script setup>
/* import { PlayIcon } from 'lucide-vue-next'
 */
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>