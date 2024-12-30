<template>
    <div class="relative">
      <img 
        :src="props.item.image" 
        :alt="props.item.title"
        class="w-full aspect-video object-cover object-top rounded-md transition-opacity duration-300 group-hover:opacity-75"
        @dragstart.prevent
      />
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent">
        <p class="text-sm font-semibold truncate text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          {{ props.item.title }}
        </p>
        <p class="text-xs text-gray-300 truncate opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          {{ props.item.subtitle }}
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