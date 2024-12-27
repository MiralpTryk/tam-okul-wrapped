<template>
    <div class="relative">
      <img 
        :src="item.thumbnail_url"
        :alt="item.title"
        class="w-full h-40 object-cover rounded-md transition-opacity duration-300 group-hover:opacity-75 opacity-85"
        @dragstart.prevent
        @error="handleImageError"
      />
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#141414] via-[#141414]/75 to-transparent ">
        <p class="text-sm font-semibold truncate text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          {{ item.title }}
        </p>
        <p class="text-xs text-gray-300 truncate opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          {{ item.channel_title }}
        </p>
      </div>
<!--       <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#E50914]/75 rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14l11-7-11-7z"></path>
        </svg>
      </div> -->
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/seed/${props.item.id}/300/450`
  }
  </script>