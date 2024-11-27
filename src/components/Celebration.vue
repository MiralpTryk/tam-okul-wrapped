<template>
    <div class="celebration">
      <div class="confetti-container">
        <div v-for="i in 50" :key="i" class="confetti" :style="confettiStyle()"></div>
      </div>
      <div class="emojis">
        <span 
          v-for="(emoji, index) in celebrationEmojis" 
          :key="index" 
          class="emoji" 
          :style="emojiStyle()"
        >
          {{ emoji }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const celebrationEmojis = ref(['🎉', '🎊', '🥳', '🏆', '👏', '🙌']);
  
  const confettiStyle = () => {
    const r = Math.random();
    const color = `hsl(${Math.random() * 360}deg, 100%, 50%)`;
    return {
      '--rotation': `${Math.random() * 360}deg`,
      '--animation-delay': `${r * 3}s`,
      '--left-offset': `${Math.random() * 100}%`,
      backgroundColor: color,
    };
  };
  
  const emojiStyle = () => {
    return {
      '--delay': `${Math.random() * 2}s`,
      '--duration': `${2 + Math.random() * 2}s`,
      '--left-offset': `${Math.random() * 100}%`,
      '--size': `${1 + Math.random() * 2.5}rem`,
    };
  };
  </script>
  
  <style scoped>
  .celebration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 100;
  }
  
  .confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    top: -10px;
    left: var(--left-offset);
    opacity: 0;
    transform: rotate(var(--rotation));
    animation: fall 3s var(--animation-delay) ease-in-out infinite;
  }
  
  @keyframes fall {
    0% {
      top: -10px;
      transform: rotate(0deg);
      opacity: 1;
    }
    100% {
      top: 100%;
      transform: rotate(720deg);
      opacity: 0;
    }
  }
  
  .emojis {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .emoji {
    position: absolute;
    font-size: var(--size);
    top: -40px;
    left: var(--left-offset);
    opacity: 0;
    animation: float var(--duration) var(--delay) ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      top: 100%;
      transform: translateY(0);
      opacity: 0;
    }
    10%, 90% {
      opacity: 1;
    }
    50% {
      top: 0%;
      transform: translateY(-20px);
    }
  }
  </style>
  
  