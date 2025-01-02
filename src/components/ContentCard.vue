<template>
  <div 
    class="relative flex-shrink-0 group cursor-pointer select-none w-[200px] sm:w-[250px]"
    :class="{ 'animate-pulse': type === 'lesson' && item.isLoading }"
    @click="handleClick"
  >
    <!-- Thumbnail -->
    <div 
      class="relative aspect-video rounded-lg overflow-hidden bg-zinc-800"
      :class="{ 'animate-pulse': type === 'lesson' && item.isLoading }"
    >
      <div v-if="type === 'lesson' && item.isLoading" class="absolute inset-0 bg-zinc-700"></div>
      <img 
        v-else
        :src="getImageSource" 
        :alt="getTitle"
        class="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
      />
      <!-- Quote overlay -->
      <div v-if="type === 'quote'" class="absolute inset-0 bg-black/50 p-4 flex flex-col justify-center">
        <div class="text-sm sm:text-base font-medium text-white line-clamp-4">{{ getTitle }}</div>
        <div class="mt-2 text-xs sm:text-sm text-white/70">{{ getSubtitle }}</div>
      </div>
    </div>

    <!-- Title (non-quote) -->
    <div 
      v-if="type !== 'quote'"
      class="mt-2 text-sm sm:text-base font-medium text-zinc-200"
      :class="{ 'bg-zinc-700 rounded h-5 w-3/4': type === 'lesson' && item.isLoading }"
    >
      {{ type === 'lesson' && item.isLoading ? '' : getTitle }}
    </div>

    <!-- Subtitle (non-quote) -->
    <div 
      v-if="showSubtitle && type !== 'quote'"
      class="mt-1 text-xs sm:text-sm text-zinc-400"
      :class="{ 'bg-zinc-700 rounded h-4 w-1/2': type === 'lesson' && item.isLoading }"
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
  console.log('ContentCard - Click event triggered');
  console.log('ContentCard - Props:', props);
  
  // Loading durumunda tıklamayı engelle
  if (props.type === 'lesson' && props.item.isLoading) {
    console.log('ContentCard - Click ignored because item is loading');
    return;
  }
  
  console.log('ContentCard - Emitting click event with:', props.item, props.type);
  emit('click', props.item, props.type);
}

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