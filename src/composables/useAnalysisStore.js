import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export function useAnalysisStore() {
  const store = useStore()
  const isOpticDataLoading = ref(false)

  // Store getters as computed properties with null checks
  const opticData = computed(() => store.state.opticData)
  const userName = computed(() => store.state.userDetails?.name || '')
  const totalQuestionsSolved = computed(() => store.state.learningJourney?.total_questions_solved || 0)
  const totalQuestionsSolvedPercentage = computed(() => store.state.learningJourney?.total_questions_solved_percentage || 0)
  const totalHoursSpent = computed(() => store.state.learningJourney?.total_hours_spent || 0)
  const bestCourses = computed(() => store.state.learningJourney?.best_courses || [])
  const bestCourse = computed(() => store.state.learningJourney?.best_course || '')
  const bestSubject = computed(() => {
    const rawSubject = store.state.learningJourney?.best_subject
    if (!rawSubject) return ''
    
    // Eğer rawSubject bir obje ise
    if (typeof rawSubject === 'object') {
      const values = Object.values(rawSubject)
      return values[0] || ''
    }
    
    // Eğer string ise ve ":" içeriyorsa
    if (typeof rawSubject === 'string' && rawSubject.includes(':')) {
      const parts = rawSubject.split(':')
      if (parts.length > 1) {
        return parts[1].replace(/["{}]/g, '').trim()
      }
    }
    
    return rawSubject
  })
  const bestSubjects = computed(() => store.state.learningJourney?.best_subjects || [])
  const courses = ref(null)
  const isCoursesLoading = computed(() => store.state.isLoading)

  const fetchAnalysisData = async (code) => {
    isOpticDataLoading.value = true
    try {
      const apiBaseUrl = process.env.VUE_APP_API_BASE_URL
      const response = await fetch(`${apiBaseUrl}/koksis/${code}`)
      if (!response.ok) {
        throw new Error('Veri yüklenirken bir hata oluştu')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || 'Veri yüklenirken bir hata oluştu')
      }
      await store.dispatch('loadAnalysisData', data)
      courses.value = data.data.content.courses
      return data
    } catch (error) {
      console.error('Error fetching analysis data:', error)
      throw error
    } finally {
      isOpticDataLoading.value = false
    }
  }

  const getCourseByTitle = (title) => {
    if (!courses.value || !Array.isArray(courses.value)) return null;
    
    return courses.value.find(course => {
      const courseTitle = (course.title || course.title_uppercase || '').toLowerCase();
      const searchTitle = (title || '').toLowerCase();
      return courseTitle === searchTitle;
    });
  };

  return {
    // Data
    opticData,
    userName,
    totalQuestionsSolved,
    totalQuestionsSolvedPercentage,
    totalHoursSpent,
    bestCourses,
    bestCourse,
    bestSubject,
    bestSubjects,
    courses: computed(() => courses.value),
    isCoursesLoading,
    
    // Loading state
    isOpticDataLoading,
    
    // Methods
    fetchAnalysisData,
    getCourseByTitle
  }
} 