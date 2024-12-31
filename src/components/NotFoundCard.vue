<template>
    <div 
      class="bg-gray-700 rounded-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
      @click="$emit('select', content)"
    >
      <img :src="content.image" :alt="content.title" class="w-full h-24 object-cover" />
      <div class="p-2">
        <h4 class="text-sm font-semibold truncate">{{ content.title }}</h4>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    content: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['select'])
  </script>
  
  