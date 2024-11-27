import { createStore } from "vuex";
import axios from "axios";
// import router from "@/router";
import { subdomainTamokul } from "@/main";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function deleteCookie(name) {
  document.cookie = `${name}=; Path=/; Domain=${subdomainTamokul}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

axios.interceptors.request.use(
  (config) => {
    const cookieToken = getCookie("XSRF-TOKEN");
    const localToken =
      localStorage.getItem("userTokenStudent") || store.state.token;

    if (cookieToken) {
      config.headers["X-Requested-With"] = "XMLHttpRequest";
    } else if (localToken) {
      config.headers.Authorization = `Bearer ${localToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const store = createStore({
  state: {
    token: null,
    studentDetails: null,
    studentInfo: null,
    isStudentDetailsLoaded: false,
    selectedTest: null,
    isWideSidebar: true,
    unreadMessagesCount: 0,
    backgroundImageUrl: "",
    questionData: null,
    selectedQuestion: null,
    trials: null,
    selectedTrial: null,
    trialDetails: null,
    opticStudentAssessmentId: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("userTokenStudent", token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("userTokenStudent");
    },
    setStudentDetails(state, details) {
      state.studentDetails = details;
      state.isStudentDetailsLoaded = true;
    },
    setStudentInfo(state, info) {
      state.studentInfo = info;
    },
    setUnreadMessagesCount(state, count) {
      state.unreadMessagesCount = count;
    },
    toggleSidebar(state) {
      state.isWideSidebar = !state.isWideSidebar;
    },
    setSidebarState(state, isWide) {
      state.isWideSidebar = isWide;
    },
    setBackgroundImageUrl(state, url) {
      state.backgroundImageUrl = url;
    },
    setQuestionData(state, data) {
      state.questionData = data;
    },
    setSelectedQuestion(state, question) {
      state.selectedQuestion = question;
    },
    setTrials(state, trials) {
      state.trials = trials;
    },
    setTrialDetails(state, details) {
      state.trialDetails = details;
    },
    setOpticStudentAssessmentId(state, id) {
      state.opticStudentAssessmentId = id;
    },
  },
  actions: {
    login({ commit, dispatch }, { token, studentId }) {
      commit("setToken", token);
      console.log("Login successful");
      dispatch("fetchStudentDetails", studentId);
    },
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("userTokenStudent");
      localStorage.removeItem("token");
      localStorage.removeItem("userToken");
      deleteCookie("XSRF-TOKEN");

      if (getCookie("XSRF-TOKEN")) {
        console.error("XSRF-TOKEN cookie not deleted");
      }

      const isLocal = process.env.VUE_APP_ENV === "local";
      if (isLocal) {
        // router.push("/login");
      } else {
        window.location.href =
          axios.defaults.trialReportURL + "/okul-login?type=student";
      }
    },
    async fetchStudentDetails({ commit }) {
      const baseURL = axios.defaults.baseURL;
      const requestUrl = `${baseURL}/my_student_summary/`;
      const requestUrl2 = `${baseURL}/user_details_for_vue`;
      const localToken =
        localStorage.getItem("userTokenStudent") || store.state.token;

      console.log("Fetching student details with token:", localToken);

      if (
        !localToken ||
        localToken === "undefined" ||
        localToken === "" ||
        localToken === null ||
        localToken === undefined
      ) {
        try {
          console.log("No valid local token, fetching new token from API");
          const response = await axios.get(requestUrl2);
          const token = response?.data?.success?.data;
          console.log("New token received:", token);
          commit("setToken", token);
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      }

      try {
        const response = await axios.get(requestUrl);
        console.log("Student details received:", response.data);
        commit("setStudentDetails", response.data);
        commit("setUnreadMessagesCount", response.data.unreadMessagesCount);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    },
    updateBackgroundImageUrl({ commit }, url) {
      commit("setBackgroundImageUrl", url);
    },
    async fetchQuestionData({ commit }, questionId) {
      const baseURL = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.get(`${baseURL}/questions/${questionId}`);
        commit("setQuestionData", response.data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    },
    selectQuestion({ commit }, question) {
      commit("setSelectedQuestion", question);
    },
    async fetchTrials({ state, commit, dispatch }) {
      if (!state.studentDetails) {
        await dispatch("fetchStudentDetails", state.studentDetails?.student_id);
      }
      const baseURL = axios.defaults.baseURL;
      const studentId = state.studentDetails?.student_id;
      if (!studentId) {
        console.error("Student ID is not available.");
        return;
      }
      const requestUrl = `${baseURL}/optic-student-assessment/${studentId}`;
      try {
        const response = await axios.get(requestUrl);
        const assessmentId = response.data.data[0].optic_student_assessment_id;
        commit("setTrials", response.data.data);
        commit("setOpticStudentAssessmentId", assessmentId);
      } catch (error) {
        console.error("Error fetching trials:", error);
      }
    },
    async fetchTrialDetails({ commit }, trialId) {
      const baseURL = axios.defaults.baseURL;
      const requestUrl = `${baseURL}/optic-student-assessment-detail/${trialId}`;
      try {
        const response = await axios.get(requestUrl);
        commit("setTrialDetails", response.data.data);
      } catch (error) {
        console.error("Error fetching trial details:", error);
      }
    },
    setTokenAction({ commit }, token) {
      return new Promise((resolve) => {
        commit("setToken", token);
        resolve();
      });
    },
  },
  getters: {
    isAuthenticated(state) {
      const cookieToken = getCookie("XSRF-TOKEN");
      return !!state.token || !!cookieToken;
    },
    studentDetails(state) {
      return state.studentDetails;
    },
    isStudentDetailsLoaded(state) {
      return state.isStudentDetailsLoaded;
    },
    isWideSidebar: (state) => state.isWideSidebar,
    backgroundImageUrl: (state) => state.backgroundImageUrl,
    questionData: (state) => state.questionData,
    selectedQuestion: (state) => state.selectedQuestion,
    trials: (state) => state.trials,
    trialDetails: (state) => state.trialDetails,
    studentId: (state) => state.studentDetails?.student_id,
  },
});

export default store;
