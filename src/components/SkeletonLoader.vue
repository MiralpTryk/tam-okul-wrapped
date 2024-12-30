<template>
  <div 
    class="animate-pulse" 
    :class="[
      width === 'full' ? 'w-full' : `w-${width}`,
      height === 'full' ? 'h-full' : `h-${height}`
    ]"
  >
    <div 
      class="bg-zinc-700 rounded"
      :style="{
        width: typeof width === 'number' ? `${width}px` : '100%',
        height: typeof height === 'number' ? `${height}px` : '100%'
      }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 'full'
  },
  height: {
    type: [String, Number],
    default: 16
  }
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