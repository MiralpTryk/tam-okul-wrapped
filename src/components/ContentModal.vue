<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-[100]">
      <div class="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm" @click="close"></div>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-0 sm:p-4">
          <div class="relative bg-black bg-opacity-90 w-full xl:pt-0 pt-16 h-dvh xl:h-auto xl:max-h-[90vh] overflow-hidden xl:rounded-lg xl:border xl:border-gray-800 xl:max-w-7xl">
            <button 
              @click="close" 
              class="absolute top-4 right-4 text-gray-400 hover:text-white z-50 bg-black bg-opacity-50 rounded-full p-1"
            >
              <XIcon class="w-6 h-6" />
            </button>
            <div class="h-full overflow-y-auto">
              <slot></slot>
            </div>
          </div>
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
  
  