<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted } from 'vue';
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

// Uygulama başladığında local storage'dan verileri yükle
onMounted(() => {
  store.dispatch('initializeStore');
});
</script>

<style></style>
