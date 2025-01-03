<template>
  <div 
    class="relative flex-shrink-0 group cursor-pointer select-none w-[200px] sm:w-[250px] transition-transform duration-300 hover:scale-[1.02]"
    :class="{ 'animate-pulse': type === 'lesson' && item.isLoading }"
    @click="handleClick"
  >
    <!-- Thumbnail -->
    <div 
      class="relative aspect-video rounded-lg overflow-hidden bg-zinc-800"
      :class="{ 'animate-pulse': type === 'lesson' && item.isLoading }"
    >
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      
      <!-- Loading skeleton -->
      <div v-if="type === 'lesson' && item.isLoading" class="absolute inset-0 bg-zinc-400/30"></div>
      
      <!-- Image -->
      <img 
        v-else
        :src="getImageSource" 
        :alt="getTitle"
        class="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- Quote overlay -->
      <div v-if="type === 'quote'" class="absolute inset-0 bg-black/50 p-4 flex flex-col justify-center">
        <div class="text-sm sm:text-base font-medium text-white line-clamp-4">{{ getTitle }}</div>
        <div class="mt-2 text-xs sm:text-sm text-white/70">{{ getSubtitle }}</div>
      </div>

      <!-- Play button overlay -->
      <div v-if="type === 'lesson' && !item.isLoading" 
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Title (non-quote) -->
    <div 
      v-if="type !== 'quote'"
      class="mt-2 text-sm sm:text-base font-medium text-zinc-200 transition-colors duration-300 group-hover:text-white"
      :class="{ 'bg-zinc-400/40 rounded h-5 w-3/4': type === 'lesson' && item.isLoading }"
    >
      {{ type === 'lesson' && item.isLoading ? '' : getTitle }}
    </div>

    <!-- Subtitle (non-quote) -->
    <div 
      v-if="showSubtitle && type !== 'quote'"
      class="mt-1 text-xs sm:text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300"
      :class="{ 'bg-zinc-400/30 rounded h-4 w-1/2': type === 'lesson' && item.isLoading }"
    >
      {{ type === 'lesson' && item.isLoading ? '' : getSubtitle }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { backgroundImages } from '@/constants/images'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (props.loading) return;
  emit('click', props.item, props.type);
};

const thumbnailUrl = computed(() => {
  if (props.item.thumbnail_url) {
    return props.item.thumbnail_url
  }
  return `https://picsum.photos/seed/${props.item.id}/300/200`
})

const getImageSource = computed(() => {
  if (props.type === 'quote') {
    const index = parseInt(props.item.id.split('-')[1]) - 1
    return `${backgroundImages[index % backgroundImages.length]}?auto=format&fit=crop&w=800&q=80`
  }
  if (props.type === 'lesson') return props.item.thumbnail_url || thumbnailUrl.value
  return props.item.image || thumbnailUrl.value
})

const getTitle = computed(() => {
  if (props.type === 'quote') return props.item.quote
  return props.item.title
})

const getSubtitle = computed(() => {
  if (props.type === 'quote') return props.item.author
  if (props.type === 'lesson') return props.item.channel_title
  return props.item.subtitle
})

const showSubtitle = computed(() => {
  return props.type === 'lesson' || props.type === 'quote' || props.item.subtitle
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>