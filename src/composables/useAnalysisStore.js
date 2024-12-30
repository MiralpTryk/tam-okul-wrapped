import { computed } from 'vue'
import { useStore } from 'vuex'

export function useAnalysisStore() {
  const store = useStore()

  // Loading states
  const isLoading = computed(() => store.getters.isAnalysisLoading)
  const isCoursesLoading = computed(() => store.getters.isCoursesLoading)
  const isOpticDataLoading = computed(() => store.getters.isOpticDataLoading)
  const error = computed(() => store.getters.getAnalysisError)

  // User related getters
  const userName = computed(() => store.getters.getUserName)
  const userFullName = computed(() => store.getters.getUserFullName)
  const schoolName = computed(() => store.getters.getSchoolName)
  const academicYear = computed(() => store.getters.getAcademicYear)

  // Learning journey getters
  const totalQuestionsSolved = computed(() => store.getters.getTotalQuestionsSolved)
  const totalQuestionsSolvedPercentage = computed(() => store.getters.getTotalQuestionsSolvedPercentage)
  const totalHoursSpent = computed(() => store.getters.getTotalHoursSpent)
  const bestCourses = computed(() => store.getters.getBestCourses)
  const bestSubjects = computed(() => store.getters.getBestSubjects)
  const bestCourse = computed(() => store.getters.getBestCourse)

  // Course content getters
  const courses = computed(() => store.getters.getCourses)
  const getCourseByTitle = (title) => store.getters.getCourseByTitle(title)

  // Optic form getters
  const opticData = computed(() => store.getters.getOpticData)
  const opticCourses = computed(() => store.getters.getOpticCourses)

  // Actions
  const loadAnalysisData = async (data) => {
    try {
      await store.dispatch('loadAnalysisData', data)
    } catch (error) {
      console.error('Error loading analysis data:', error)
      throw error
    }
  }

  const clearAnalysisData = () => {
    store.dispatch('clearAnalysisData')
  }

  return {
    // Loading states
    isLoading,
    isCoursesLoading,
    isOpticDataLoading,
    error,

    // User
    userName,
    userFullName,
    schoolName,
    academicYear,

    // Learning journey
    totalQuestionsSolved,
    totalQuestionsSolvedPercentage,
    totalHoursSpent,
    bestCourses,
    bestSubjects,
    bestCourse,

    // Course content
    courses,
    getCourseByTitle,

    // Optic form
    opticData,
    opticCourses,

    // Actions
    loadAnalysisData,
    clearAnalysisData,
  }
} 