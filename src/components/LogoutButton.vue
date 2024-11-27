<template>
    <a href="#" @click="showLogoutConfirmation"
        class="text-violet-900 dark:text-slate-400 font-medium rounded-lg text-base px-4 lg:pr-0 py-2 lg:py-2.5 focus:outline-none flex items-center group">
        <span
            class="hidden lg:block
            relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-violet-900 dark:after:bg-slate-200 after:bottom-0 after:left-0 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">Çıkış
            Yap</span>
        <i class="fas fa-sign-out-alt ml-2 transition-none opacity-100"></i>
    </a>
</template>

<script setup>
import { useStore } from 'vuex';

import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";

const store = useStore();

const showLogoutConfirmation = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    Swal.fire({
        title: '<span class="text-violet-900 dark:text-slate-400">Çıkış Yapılıyor</span>',
        text: "Çıkış yapmak istediğinize emin misiniz?",
        icon: 'warning',
        iconColor: isDarkMode ? '#ff4000' : '#ff4000',
        background: isDarkMode ? '#1f2937' : '#e2e8f0',
        color: isDarkMode ? '#94a3b8' : '#4c1d95',
        showCancelButton: true,
        confirmButtonColor: isDarkMode ? '#0ea5e9' : '#4c1d95',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, Çıkış Yap',
        cancelButtonText: 'Vazgeç'
    }).then((result) => {
        if (result.isConfirmed) {
            logout();
        }
    });
};


const logout = () => {
    store.dispatch('logout');
};
</script>

<style scoped>
.swal-text {
    color: #f8fafc !important;
}
</style>