import { ref, watch } from 'vue'

export function useModal() {
  const showModal = ref(false)
  const showContentModal = ref(false)
  const showAnalysisModal = ref(false)
  const selectedLesson = ref(null)
  const selectedCourse = ref(null)

  // Body scroll lock yönetimi
  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const unlockBodyScroll = () => {
    document.body.style.overflow = ''
  }

  // Modal state'lerini izle ve scroll lock'u yönet
  watch([showModal, showContentModal, showAnalysisModal], ([newShowModal, newShowContentModal, newShowAnalysisModal]) => {
    if (newShowModal || newShowContentModal || newShowAnalysisModal) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }
  })

  const openWrappedModal = () => {
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const openContentModal = (item, type) => {
    if (!item) return;

    const modalContent = {
      ...item,
      type
    };

    selectedLesson.value = modalContent;
    showContentModal.value = true;
  }

  const closeContentModal = () => {
    showContentModal.value = false
    selectedLesson.value = null
  }

  const showAnalysisForCourse = (courseTitle) => {
    if (!courseTitle) return
    
    selectedCourse.value = courseTitle
    showAnalysisModal.value = true
  }

  const closeAnalysisModal = () => {
    showAnalysisModal.value = false
    selectedCourse.value = null
  }

  // Escape tuşu ile modalları kapatma
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      if (showContentModal.value) closeContentModal()
      if (showAnalysisModal.value) closeAnalysisModal()
      if (showModal.value) closeModal()
    }
  }

  // Event listener'ları ekle
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyPress)
  }

  // Cleanup fonksiyonu
  const cleanup = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyPress)
      unlockBodyScroll()
    }
  }

  return {
    // State
    showModal,
    showContentModal,
    showAnalysisModal,
    selectedLesson,
    selectedCourse,

    // Actions
    openWrappedModal,
    closeModal,
    openContentModal,
    closeContentModal,
    showAnalysisForCourse,
    closeAnalysisModal,

    // Cleanup
    cleanup
  }
} 