<template>
    <div 
      class="w-full h-40 rounded-md flex items-center justify-center p-4 relative overflow-hidden transition-transform duration-300"
      :style="{
        backgroundImage: `url(${props.item.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }">
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div class="relative z-[5] opacity-75 group-hover:opacity-100 transition-opacity duration-300">
        <p class="text-white text-center text-lg font-semibold line-clamp-3">
          {{ props.item.quote }}
        </p>
        <p class="text-white text-center text-sm mt-2">
          - {{ props.item.author }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  </script>