<template>
  <div class="flex items-center justify-center w-full h-screen bg-slate-200 dark:bg-[#040720] relative overflow-hidden">
    <form @submit.prevent="login"
      class="mt-0 lg:mt-16 px-4 xl:px-11 xl:w-[480px] xl:h-[480px] rounded-3xl bg-gray-300 bg-opacity-10 backdrop-blur-lg relative z-10 flex flex-col border border-violet-700 dark:border-slate-700">
      <div class="h-fit inline-flex pt-11 xl:pt-14">
        <span class="text-violet-500 dark:text-sky-500 text-sm font-medium text-nowrap">Tam Okul</span>
        <span class="text-violet-900 dark:text-slate-200 text-sm text-nowrap">'a Hoşgeldiniz</span>
      </div>
      <span class="text-violet-900 dark:text-slate-200 text-4xl xl:text-[55px] mt-4">
        Giriş yap
      </span>
      <div class="pt-8">
        <label for="email" class="block mb-2 text-violet-900 dark:text-slate-200 text-sm">Okul numarası</label>
        <input type="text" name="email" id="email" v-model="email" @blur="validateEmailInput"
          class="border sm:text-sm rounded-lg block w-full p-2 bg-gray-200 border-gray-600 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          placeholder="1234" required autocomplete="username" />
        <span v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</span>
      </div>
      <div class="pt-4">
        <label for="password" class="block mb-2 text-sm text-violet-900 dark:text-slate-200">Şifre</label>
        <input type="password" name="password" id="password" v-model="password" @blur="validatePasswordInput"
          class="border sm:text-sm rounded-lg block w-full p-2 bg-gray-200 border-sky-900 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          placeholder="••••••••" required autocomplete="current-password" />
        <span v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</span>
      </div>
      <button :disabled="loading || !isFormValid"
        :class="{ 'bg-gray-400': loading || !isFormValid, 'bg-violet-900 dark:bg-sky-500 hover:bg-violet-950 dark:hover:bg-sky-600': !loading && isFormValid }"
        class="font-medium my-8 xl:mt-4 p-[10px] sm:text-md rounded-lg text-slate-200 focus:ring-blue-500 focus:border-blue-500">
        Giriş yap
      </button>
      <div class="flex justify-center items-center mb-4">
        <Spinner v-if="loading" />
      </div>
    </form>
    <img src="@/assets/abstract-shape.svg" alt="" class="h-full absolute xl:right-[200px] xl:top-[50px]" />
    <div
      class="absolute right-[-130px] top-[-130px] w-[260px] h-[260px] bg-gray-200 rounded-full opacity-100 blur-[200px]">
    </div>
    <div
      class="absolute right-[390px] bottom-[-130px] w-[260px] h-[260px] bg-gray-200 rounded-full opacity-100 blur-[200px]">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { validateEmail, validatePassword } from '@/utils/validation';
import router from '@/router';
import Spinner from '@/components/Spinner.vue';

const store = useStore();

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const generalError = ref('');
const isFormValid = ref(true);
const loading = ref(false);

const validateEmailInput = () => {
  emailError.value = validateEmail(email.value);
};

const validatePasswordInput = () => {
  passwordError.value = validatePassword(password.value);
};

const login = async () => {
  emailError.value = '';
  passwordError.value = '';
  generalError.value = '';

  isFormValid.value = true;
  loading.value = true;

  validateEmailInput();
  validatePasswordInput();

  if (emailError.value || passwordError.value) {
    isFormValid.value = false;
    loading.value = false;
    return;
  }

  const baseURL = axios.defaults.baseURL;
  const requestUrl = `${baseURL}/login`;
  console.log("Logging in with URL:", requestUrl);


  try {
    const response = await axios.post(requestUrl, {
      email: email.value,
      password: password.value,
    });
    if (response.data.success && response.data.success.token) {
      const userTokenStudent = response.data.success.token;
      const studentId = response.data.success.data.id;
      localStorage.setItem('userTokenStudent', userTokenStudent);
      store.dispatch('login', { token: userTokenStudent, studentId });
      router.push('/');
    } else {
      generalError.value = response.data.success.message || 'Giriş başarısız oldu';
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      passwordError.value = 'Öğrenci numarası veya şifre hatalı.';
    } else {
      generalError.value = 'Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.';
    }
    console.error("Login error:", error);
  } finally {
    loading.value = false;
  }
};
</script>
