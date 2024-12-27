import { ref } from 'vue'

export function useModal() {
  const showModal = ref(false)
  const showContentModal = ref(false)
  const showAnalysisModal = ref(false)
  const selectedLesson = ref(null)
  const selectedCourse = ref(null)

  const openWrappedModal = () => {
    showModal.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    showModal.value = false
    document.body.style.overflow = ''
  }

  const openContentModal = (item, type, event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (type === "video") {
      selectedLesson.value = {
        title: item.title,
        channelName: item.subtitle,
        videoUrl: item.videoUrl,
        content: item.content,
        type: "video"
      }
    } else if (type === "quote") {
      selectedLesson.value = {
        ...item,
        text: item.quote,
        type: type
      }
    } else {
      selectedLesson.value = {
        ...item,
        type: type
      }
    }

    showContentModal.value = true
  }

  const closeContentModal = () => {
    showContentModal.value = false
    selectedLesson.value = null
  }

  const showAnalysisForCourse = (courseTitle) => {
    selectedCourse.value = courseTitle
    showAnalysisModal.value = true
  }

  const closeAnalysisModal = () => {
    showAnalysisModal.value = false
    selectedCourse.value = null
  }

  return {
    showModal,
    showContentModal,
    showAnalysisModal,
    selectedLesson,
    selectedCourse,
    openWrappedModal,
    closeModal,
    openContentModal,
    closeContentModal,
    showAnalysisForCourse,
    closeAnalysisModal
  }
} 