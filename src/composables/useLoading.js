import { ref, computed } from 'vue'
import { useAnalysisStore } from '@/composables/useAnalysisStore'

export function useLoading() {
  const analysisStore = useAnalysisStore()
  const loading = ref(false)
  const error = ref(null)

  // Store'dan gelen loading state'leri
  const isCoursesLoading = computed(() => analysisStore.isCoursesLoading)
  const isOpticDataLoading = computed(() => analysisStore.isOpticDataLoading)

  // Loading state'i güncelle
  const startLoading = () => {
    console.log('useLoading - Starting loading');
    loading.value = true;
    error.value = null;
  }

  const stopLoading = () => {
    console.log('useLoading - Stopping loading');
    loading.value = false;
  }

  // Error state'i güncelle
  const setError = (err) => {
    console.error('useLoading - Setting error:', err);
    error.value = err?.message || 'Bir hata oluştu';
    loading.value = false;
  }

  // Loading state'i sıfırla
  const reset = () => {
    console.log('useLoading - Resetting state');
    loading.value = false;
    error.value = null;
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