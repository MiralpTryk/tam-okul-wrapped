<template>
    <button 
      class="relative text-xl cursor-pointer px-4 py-1 rounded-md
             border-2 border-[#ffffff] text-[#ffffff]
             shadow-[inset_0_0_0.5em_0_#ffffff,0_0_0.5em_0_#ffffff]
             transition-colors duration-100
             hover:text-[#1b1016] focus:text-[#1b1016]
             before:content-[''] before:absolute before:pointer-events-none
             before:bg-[#ffffff] before:top-[120%] before:left-0
             before:w-full before:h-full before:opacity-70
             before:blur-[1em]
             hover:before:opacity-100 focus:before:opacity-100
             after:content-[''] after:absolute after:inset-0
             after:bg-[#ffffff] after:-z-10 after:opacity-0
             hover:after:opacity-100 focus:after:opacity-100
             flex items-center gap-2"
    >
      <Play class="w-5 h-5" />
      Öğrenme Yolculuğun {{ new Date().getFullYear() }}
    </button>
  </template>
  
  <script setup>
  import { Play } from 'lucide-vue-next'
  </script>
  
  <style scoped>
  .neon-button {
    text-shadow: 0 0 0.125em hsla(0, 0%, 100%, 0.3), 0 0 0.45em currentColor;
  }
  
  .neon-button::before {
    transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
  }
  
  .neon-button::after {
    box-shadow: 0 0 2em 0.5em #ffffff;
    transition: opacity 100ms linear;
  }
  
  .neon-button:hover,
  .neon-button:focus {
    text-shadow: none;
  }
  </style>