<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex';
// import { onMounted } from 'vue';
// import router from '@/router';
import axios from 'axios';

const store = useStore();

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

axios.interceptors.request.use(
  async (config) => {
    const cookieToken = getCookie('XSRF-TOKEN');
    const localToken = localStorage.getItem("userTokenStudent") || store.state.token;

    if (cookieToken) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
    } else if (localToken) {
      config.headers.Authorization = `Bearer ${localToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Commenting out the onMounted lifecycle hook
// onMounted(async () => {
//   const userTokenStudent = localStorage.getItem('userTokenStudent');
//   const cookieToken = getCookie('XSRF-TOKEN');
//   const isLocal = process.env.VUE_APP_ENV === 'local';

//   console.log('Initial Tokens:', { userTokenStudent, cookieToken });

//   try {
//     if (userTokenStudent && userTokenStudent !== 'undefined') {
//       console.log('Using localStorage token');
//       store.commit('setToken', userTokenStudent);
//       console.log('Token set in store:', store.state.token);
//       await router.push('/');
//     } else if (cookieToken && cookieToken !== 'undefined') {
//       console.log('Using cookie token');
//       const baseURL = axios.defaults.baseURL;
//       const requestUrl = `${baseURL}/user_details_for_vue`;
//       const response = await axios.get(requestUrl);
//       const token = response?.data?.success?.data;
//       console.log('Token received from API:', token);
//       await store.dispatch("setTokenAction", token);
//       console.log('Token set in store:', store.state.token);
//       await router.push('/');
//     } else {
//       console.log('No valid token found, redirecting to login');
//       if (isLocal) {
//         // await router.push('/login');
//       } else {
//         window.location.href = axios.defaults.trialReportURL + "/okul-login?type=student";
//       }
//     }
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     if (isLocal) {
//       // await router.push('/login');
//     } else {
//       window.location.href = axios.defaults.trialReportURL + "/okul-login?type=student";
//     }
//   }
// });

// Commenting out the router.beforeResolve navigation guard
// router.beforeResolve(async (to, from, next) => {
//   const isLocal = process.env.VUE_APP_ENV === 'local';
//   const isAuthenticated = store.getters.isAuthenticated;

//   console.log("Is authenticated:", isAuthenticated);

//   if (isAuthenticated) {
//     next();
//   } else {
//     if (to.path !== '/login') {
//       if (isLocal) {
//         // next('/login');
//       } else {
//         window.location.href = axios.defaults.trialReportURL + "/okul-login?type=student";
//       }
//     } else {
//       next();
//     }
//   }
// });
</script>

<style></style>
