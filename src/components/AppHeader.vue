<template>
  <header :class="[
    isFixed ? 'fixed top-0 left-0 right-0' : '',
    'z-50 transition-all duration-1000',
    isScrolled ? 'bg-black backdrop-blur-sm' : 'bg-gradient-to-t from-transparent to-black'
  ]">
    <nav class="mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-16 2xl:px-24">
      <RouterLink :to="logoRoute">
        <img src="https://tamokul.com/new-landing/assets/images/logo/header-logo.webp" alt="Tam Okul" class="h-8" />
      </RouterLink>
      <div class="flex items-center space-x-4">
        <slot name="before-button"></slot>
        <RouterLink v-if="!hideOpticButton" :to="opticFormRoute">
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  hideOpticButton: {
    type: Boolean,
    default: false
  },
  isFixed: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()
const isScrolled = ref(false)

// Logo için yönlendirme mantığı
const logoRoute = computed(() => {
  // Eğer geçerli bir code parametresi varsa, o code ile wrapped sayfasına yönlendir
  if (route.params.code && /^[A-Z0-9]{8}$/.test(route.params.code)) {
    return { name: 'wrapped', params: { code: route.params.code } }
  }
  // Yoksa 404'e yönlendir
  return { name: 'NotFound' }
})

// Optik form için yönlendirme mantığı
const opticFormRoute = computed(() => {
  // Eğer geçerli bir code parametresi varsa, o code ile optik form sayfasına yönlendir
  if (route.params.code && /^[A-Z0-9]{8}$/.test(route.params.code)) {
    return { name: 'optic-form', params: { code: route.params.code } }
  }
  // Yoksa 404'e yönlendir
  return { name: 'NotFound' }
})

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