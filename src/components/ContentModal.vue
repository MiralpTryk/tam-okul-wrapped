<template>
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center md:p-4">
        <div class="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm" @click="close"></div>
        <div class="relative bg-black bg-opacity-90 md:rounded-lg shadow-xl w-full h-full md:h-auto md:max-w-7xl overflow-hidden md:border md:border-gray-800">
          <button 
            @click="close" 
            class="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-black bg-opacity-50 rounded-full p-1"
          >
            <XIcon class="w-6 h-6" />
          </button>
          <div class="h-full overflow-y-auto">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { watch } from 'vue';
  import { XIcon } from 'lucide-vue-next';
  
  const props = defineProps({
    show: Boolean,
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  
  watch(() => props.show, (newShow) => {
    if (!newShow) {
      // Modal kapandığında YouTube player'ını temizle
      const youtubePlayer = document.getElementById('youtube-player');
      if (youtubePlayer) {
        youtubePlayer.innerHTML = '';
      }
    }
  });
  </script>
  
  <style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
  
  .modal-enter-to,
  .modal-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  </style>
  
  