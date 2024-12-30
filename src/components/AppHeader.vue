<template>
  <header :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-1000',
    isScrolled ? 'bg-black backdrop-blur-sm' : 'bg-gradient-to-t from-transparent to-black'
  ]">
    <nav class="mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-16 2xl:px-24">
      <a href="/">
        <img src="https://tamokul.com/new-landing/assets/images/logo/header-logo.webp" alt="Tam Okul" class="h-8" />
      </a>
      <div class="flex items-center space-x-4">
        <slot name="before-button"></slot>
        <RouterLink v-if="!hideOpticButton" to="/optic-form">
          <button
            class="bg-[#E50914] hover:bg-[#E50914]/90 text-white px-6 py-2 rounded text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-[#E50914]/20">
            Optik İşaretle
          </button>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  hideOpticButton: {
    type: Boolean,
    default: false
  }
})

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 5
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script> 