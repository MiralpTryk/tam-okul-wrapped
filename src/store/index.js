import { createStore } from 'vuex';

// Local storage işlemleri için yardımcı fonksiyonlar
const STORAGE_KEY = 'tamokul_wrapped_data';
const SESSION_KEY = 'tamokul_wrapped_session';

const saveToLocalStorage = (data) => {
  try {
    // 6 ay sonrası için tarih oluştur
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    
    // Session bilgisini kaydet
    localStorage.setItem(SESSION_KEY, expiryDate.toISOString());
    
    // Verileri kaydet
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    // Session süresini kontrol et
    const sessionExpiry = localStorage.getItem(SESSION_KEY);
    if (!sessionExpiry) return null;

    const expiryDate = new Date(sessionExpiry);
    const now = new Date();

    // Session süresi dolmuşsa verileri temizle
    if (now > expiryDate) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    // Verileri yükle
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

const clearLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_KEY);
};

export default createStore({
  state: {
    analysisData: null,
    userDetails: null,
    learningJourney: null,
    courses: null,
    opticData: null,
    isLoading: false,
    error: null
  },

  getters: {
    // User related getters
    getUserFullName: state => state.userDetails?.full_name,
    getUserName: state => state.userDetails?.name,
    getSchoolName: state => state.userDetails?.school?.school_name,
    getAcademicYear: state => state.userDetails?.student?.academic_year_title,

    // Learning journey getters
    getTotalQuestionsSolved: state => state.learningJourney?.total_questions_solved || 0,
    getTotalQuestionsSolvedPercentage: state => state.learningJourney?.total_questions_solved_percentage || 0,
    getTotalHoursSpent: state => state.learningJourney?.total_hours_spent || 0,
    getBestCourses: state => state.learningJourney?.best_courses || [],
    getBestSubjects: state => state.learningJourney?.best_subjects || [],
    getBestCourse: state => state.learningJourney?.best_course,

    // Course content getters
    getCourses: state => state.courses,
    getCourseByTitle: state => title => {
      console.log('Searching for course title:', title)
      console.log('Available courses:', state.courses?.map(c => ({ title: c.title, uppercase: c.title_uppercase })))
      const course = state.courses?.find(course => 
        course.title?.toLowerCase() === title?.toLowerCase() || 
        course.title_uppercase?.toLowerCase() === title?.toLowerCase()
      )
      console.log('Found course:', course)
      return course
    },
    
    // Optic form getters
    getOpticData: state => state.opticData,
    getOpticCourses: state => state.opticData?.courses || [],
    
    // Status getters
    isAnalysisLoading: state => state.isLoading,
    isCoursesLoading: state => state.isLoading,
    isOpticDataLoading: state => state.isLoading,
    getAnalysisError: state => state.error
  },

  mutations: {
    SET_ANALYSIS_DATA(state, data) {
      state.analysisData = data;
      state.userDetails = data?.data?.user;
      state.learningJourney = data?.data?.user?.student?.learning_journey;
      state.courses = data?.data?.content?.courses;
      state.opticData = data?.data?.optic;
      
      // Verileri local storage'a kaydet
      saveToLocalStorage({
        analysisData: data,
        userDetails: data?.data?.user,
        learningJourney: data?.data?.user?.student?.learning_journey,
        courses: data?.data?.content?.courses,
        opticData: data?.data?.optic
      });
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ANALYSIS_DATA(state) {
      state.analysisData = null;
      state.userDetails = null;
      state.learningJourney = null;
      state.courses = null;
      state.opticData = null;
      state.error = null;
      
      // Local storage'ı temizle
      clearLocalStorage();
    },
    RESTORE_DATA(state, data) {
      if (data) {
        state.analysisData = data.analysisData;
        state.userDetails = data.userDetails;
        state.learningJourney = data.learningJourney;
        state.courses = data.courses;
        state.opticData = data.opticData;
      }
    }
  },

  actions: {
    loadAnalysisData({ commit }, data) {
      commit('SET_LOADING', true);
      try {
        commit('SET_ANALYSIS_DATA', data);
        commit('SET_ERROR', null);
      } catch (error) {
        commit('SET_ERROR', error.message);
        console.error('Error loading analysis data:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    clearAnalysisData({ commit }) {
      commit('CLEAR_ANALYSIS_DATA');
    },

    initializeStore({ commit }) {
      const savedData = loadFromLocalStorage();
      if (savedData) {
        commit('RESTORE_DATA', savedData);
      }
    }
  }
});
