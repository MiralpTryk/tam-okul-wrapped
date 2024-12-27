<template>
    <div 
      class="flex-shrink-0 w-64 sm:w-72 relative group cursor-pointer"
      @click="$emit('click', item, type)"
    >
      <component 
        :is="cardComponent" 
        :item="item"
      />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import CourseCard from '@/components/CourseCard.vue'
  import MusicCard from '@/components/MusicCard.vue'
  import QuoteCard from '@/components/QuoteCard.vue'
  import StoryCard from '@/components/StoryCard.vue'
  import BookCard from '@/components/BookCard.vue'
  
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
  
  defineEmits(['click'])
  
  const cardComponent = computed(() => {
    const components = {
      course: CourseCard,
      music: MusicCard,
      quote: QuoteCard,
      story: StoryCard,
      book: BookCard
    }
    return components[props.type] || CourseCard
  })
  </script>