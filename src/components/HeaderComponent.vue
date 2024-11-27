<template>
  <div class="absolute top-0 left-0 w-full z-20">
    <nav
      class="border-violet-900 dark:border-slate-700 border-b min-h-[68px] px-4 lg:px-12 p-4 lg:py-4 bg-slate-300 dark:bg-slate-900">
      <div class="flex justify-between items-center mx-auto">
        <a href="/student-panel/#/" class="flex items-center ml-10 md:ml-0">
          <img v-if="isDarkMode" src="@/assets/tam-okul-logo-dark.webp" alt="logo" class="w-[120px] h-[32px]" />
          <svg v-else width="120" height="38" viewBox="0 0 120 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5708_1735)">
              <path
                d="M112.775 0.291016H6.75057C3.18629 0.291016 0.296875 3.16156 0.296875 6.70256V31.5354C0.296875 35.0764 3.18629 37.947 6.75057 37.947H112.775C116.339 37.947 119.229 35.0764 119.229 31.5354V6.70256C119.229 3.16156 116.339 0.291016 112.775 0.291016Z"
                fill="#3D2770" />
              <mask id="mask0_5708_1735" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="120"
                height="38">
                <path
                  d="M112.767 0.291016H6.74276C3.17848 0.291016 0.289062 3.16156 0.289062 6.70256V31.5354C0.289062 35.0764 3.17848 37.947 6.74276 37.947H112.767C116.331 37.947 119.221 35.0764 119.221 31.5354V6.70256C119.221 3.16156 116.331 0.291016 112.767 0.291016Z"
                  fill="white" />
              </mask>
              <g mask="url(#mask0_5708_1735)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M120.072 7.15577L120.115 -6.51367L99.2259 13.189L87.1847 13.0803L82.1303 18.9859L61.5508 39.4357L67.0716 43.729L121.938 40.4712L120.072 7.15577Z"
                  fill="url(#paint0_linear_5708_1735)" />
                <path
                  d="M56.8623 31.8219C56.3864 31.8219 55.9961 31.5334 55.9961 31.1741V6.97004C55.9961 6.61069 56.3816 6.32227 56.8623 6.32227C57.343 6.32227 57.7285 6.61069 57.7285 6.97004V31.1788C57.7285 31.5382 57.343 31.8266 56.8623 31.8266V31.8219Z"
                  fill="#E8A834" />
                <path
                  d="M10.9236 22.974V14.8224H9.25781V13.1912H10.9236V10.0469H12.9225V13.1912H15.3736V14.8224H12.9225V22.5957C12.9225 23.3522 13.3033 23.8251 14.2313 23.8251C14.5169 23.8251 14.8977 23.7778 15.3498 23.6123V25.1963C14.9215 25.5272 14.2551 25.6218 13.684 25.6218C12.042 25.6218 10.9236 24.818 10.9236 22.974Z"
                  fill="white" />
                <path
                  d="M16.9844 19.3394C16.9844 15.1312 20.0542 12.9609 23.0478 12.9609C25.3561 12.9609 27.0933 14.2139 27.6882 15.5142H27.7596V13.1974H29.7585V25.4861H27.7596V23.1693H27.6882C27.0933 24.4696 25.3561 25.7226 23.0478 25.7226C20.0494 25.7226 16.9844 23.5475 16.9844 19.3441V19.3394ZM23.381 23.9022C25.6179 23.9022 27.831 22.3655 27.831 19.3394C27.831 16.3133 25.6179 14.7766 23.381 14.7766C21.1441 14.7766 18.9785 16.2896 18.9785 19.3394C18.9785 22.3891 21.1917 23.9022 23.381 23.9022Z"
                  fill="white" />
                <path
                  d="M40.7525 18.3926C40.7525 16.1467 39.7293 14.7755 37.7541 14.7755C35.779 14.7755 34.5653 16.1467 34.5653 18.3926V25.4803H32.5664V13.1915H34.5653V15.1064C35.1603 13.9717 36.3739 12.9551 38.349 12.9551C40.0862 12.9551 41.514 13.7352 42.2517 15.4374C42.8466 14.1844 44.1793 12.9551 46.4637 12.9551C49.0338 12.9551 50.9376 14.5863 50.9376 18.246V25.4755H48.9386V18.3879C48.9386 16.1419 47.9154 14.7707 45.9402 14.7707C43.9651 14.7707 42.7514 16.1419 42.7514 18.3879V25.4755H40.7525V18.3879V18.3926Z"
                  fill="white" />
                <path
                  d="M62.7422 19.3374C62.7422 15.2238 65.9548 12.959 69.1626 12.959C72.3704 12.959 75.5829 15.2286 75.5829 19.3374C75.5829 23.4463 72.3704 25.7159 69.1626 25.7159C65.9548 25.7159 62.7422 23.4463 62.7422 19.3374ZM69.1626 23.9002C71.4471 23.9002 73.5888 22.2453 73.5888 19.3374C73.5888 16.4295 71.4471 14.7746 69.1626 14.7746C66.8781 14.7746 64.7364 16.4295 64.7364 19.3374C64.7364 22.2453 66.8781 23.9002 69.1626 23.9002Z"
                  fill="white" />
                <path
                  d="M77.7977 8.70508H79.7967V19.7172L85.7411 13.1969H88.1922L82.9854 18.8189L88.7633 25.481H86.4312L81.7194 20.1664L79.7919 22.2469V25.4857H77.793V8.70508H77.7977Z"
                  fill="white" />
                <path
                  d="M101.232 25.4813H99.2331V23.4718C98.5906 24.6539 97.2342 25.7177 95.0925 25.7177C92.4986 25.7177 90.2617 24.1101 90.2617 20.4268V13.1973H92.2607V20.1431C92.2607 22.6254 93.7361 23.9021 95.7112 23.9021C97.6863 23.9021 99.2331 22.6254 99.2331 20.1431V13.1973H101.232V25.4861V25.4813Z"
                  fill="white" />
                <path d="M104.035 8.70508H106.034V25.481H104.035V8.70508Z" fill="white" />
                <path
                  d="M112.773 38.2451H6.74878C3.02696 38.2451 0 35.2379 0 31.5404V6.70274C0 3.00523 3.02696 -0.00195312 6.74878 -0.00195312H112.773C116.495 -0.00195312 119.522 3.00523 119.522 6.70274V31.5404C119.522 35.2379 116.495 38.2451 112.773 38.2451ZM6.74878 0.584353C3.35535 0.584353 0.590161 3.33148 0.590161 6.70274V31.5404C0.590161 34.9116 3.35059 37.6588 6.74878 37.6588H112.773C116.167 37.6588 118.932 34.9164 118.932 31.5404V6.70274C118.932 3.33148 116.171 0.584353 112.773 0.584353H6.74878Z"
                  fill="#3D2770" />
              </g>
            </g>
            <defs>
              <linearGradient id="paint0_linear_5708_1735" x1="87.6511" y1="12.6926" x2="115.369" y2="45.9458"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#3D2770" />
                <stop offset="0.11" stop-color="#3B4086" />
                <stop offset="0.29" stop-color="#3965A6" />
                <stop offset="0.47" stop-color="#3882BF" />
                <stop offset="0.65" stop-color="#3697D1" />
                <stop offset="0.83" stop-color="#36A3DC" />
                <stop offset="1" stop-color="#36A8E0" />
              </linearGradient>
              <clipPath id="clip0_5708_1735">
                <rect width="120" height="38" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>
        <div class="flex items-center lg:order-2">
          <ThemeSwitcher class="mr-2" />
          <router-link v-if="isAuthenticated" to="/messages"
            active-class="dark:bg-slate-800 bg-slate-200 dark:text-sky-600 text-violet-900"
            class="relative flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-400 text-violet-900 dark:hover:text-sky-500 dark:hover:drop-shadow-[0_0_1px_rgba(7,148,188,1)]">
            <div v-if="unreadMessagesCount > 0"
              class="absolute rounded-full w-4 h-4 dark:bg-rose-500 bg-amber-500 bottom-1 right-1 flex items-center justify-center">
              <span class="text-xs text-white font-bold">
                {{ unreadMessagesCount }}
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.2308 3.69141H2.76923C1.2 3.69141 0 4.89141 0 6.46064V17.5376C0 19.1068 1.2 20.3068 2.76923 20.3068H21.2308C22.8 20.3068 24 19.1068 24 17.5376V6.46064C24 4.89141 22.8 3.69141 21.2308 3.69141ZM21.9692 17.9068L14.7692 12.7376L12 14.5837L9.13846 12.7376L2.03077 17.9068L7.84615 11.9068L0.738462 6.36833L12 12.4606L23.1692 6.46064L16.1538 11.9991L21.9692 17.9068Z"
                fill="currentColor" />
            </svg>
          </router-link>
          <LogoutButton v-if="isAuthenticated" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, } from 'vue';
import { useStore } from 'vuex';
import LogoutButton from './LogoutButton.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { useDark } from '@vueuse/core';

const store = useStore();
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const unreadMessagesCount = computed(() => store.state.unreadMessagesCount);
const isDarkMode = useDark();

</script>
