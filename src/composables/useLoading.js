import { ref, computed } from 'vue'
import { useAnalysisStore } from '@/composables/useAnalysisStore'

export function useLoading() {
  const analysisStore = useAnalysisStore()
  const loading = ref(true)
  const error = ref(null)

  // Store'dan gelen loading state'leri
  const isCoursesLoading = computed(() => analysisStore.isCoursesLoading)
  const isOpticDataLoading = computed(() => analysisStore.isOpticDataLoading)

  // Loading state'i güncelle
  const startLoading = () => {
    loading.value = true
    error.value = null
  }

  const stopLoading = () => {
    loading.value = false
  }

  // Error state'i güncelle
  const setError = (err) => {
    error.value = err?.message || 'Bir hata oluştu'
    loading.value = false
  }

  // Loading state'i sıfırla
  const reset = () => {
    loading.value = false
    error.value = null
  }

  // Loading component'i için gerekli class'lar
  const loadingClasses = computed(() => ({
    'fixed inset-0 bg-[#141414] z-50 flex flex-col items-center justify-center': true
  }))

  // Error component'i için gerekli class'lar
  const errorClasses = computed(() => ({
    'fixed inset-0 bg-[#141414] z-50 flex items-center justify-center px-4': true
  }))

  return {
    // State
    loading,
    error,
    isCoursesLoading,
    isOpticDataLoading,

    // Actions
    startLoading,
    stopLoading,
    setError,
    reset,

    // Classes
    loadingClasses,
    errorClasses
  }
} 