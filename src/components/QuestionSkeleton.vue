<template>
  <div class="bg-[#141414]/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-transparent">
    <div class="flex justify-between items-center mb-2">
      <SkeletonLoader width="100" height="24" />
      <SkeletonLoader width="24" height="24" />
    </div>
    <SkeletonLoader width="200" height="16" class="mb-6" />

    <!-- Question Image -->
    <div class="mb-4">
      <div class="aspect-w-4 aspect-h-3 bg-zinc-800 rounded-md overflow-hidden">
        <SkeletonLoader height="full" />
      </div>
    </div>

    <!-- Answer Options -->
    <div class="grid grid-cols-5 gap-4 md:gap-6">
      <div v-for="option in ['A', 'B', 'C', 'D', 'E']" :key="option">
        <SkeletonLoader width="48" height="48" class="rounded-full" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './SkeletonLoader.vue'
</script> 