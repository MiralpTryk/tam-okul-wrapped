<template>
    <div class="decode-text">
      <div v-for="(char, index) in characters" :key="index" :class="['text-animation', char.class]" :style="char.style">
        {{ char.value }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    interval: {
      type: Number,
      default: 10000
    }
  });
  
  const characters = ref([]);
  
  const initializeCharacters = () => {
    characters.value = props.text.split('').map(char => ({
      value: char,
      class: '',
      style: char === ' ' ? { marginRight: '0.25em' } : {}
    }));
  };
  
  const decodeText = () => {
    const shuffled = shuffle([...Array(characters.value.length).keys()]);
    
    shuffled.forEach((index) => {
      const char = characters.value[index];
      if (char.value === ' ') return;
  
      const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
      setTimeout(() => {
        char.class = 'state-1';
        setTimeout(() => {
          char.class = 'state-2';
          setTimeout(() => {
            char.class = 'state-3';
          }, 100);
        }, 100);
      }, state1Time);
    });
  };
  
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  watch(() => props.text, initializeCharacters);
  
  onMounted(() => {
    initializeCharacters();
    decodeText();
    setInterval(decodeText, props.interval);
  });
  </script>
  
  <style scoped>
  .decode-text {
    width: 100%;
    text-align: left;
    word-wrap: break-word;
  }
  .text-animation {
    display: inline-block;
    position: relative;
    color: transparent;
    white-space: normal;
  }
  .text-animation:before {
    content: "";
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #fff;
    width: 0;
    height: 1.2em;
    transform: translate(-50%, -55%);
  }
  .text-animation.state-1:before {
    width: 1px;
  }
  .text-animation.state-2:before {
    width: 0.9em;
  }
  .text-animation.state-3 {
    color: white;
  }
  .text-animation.state-3:before {
    width: 0;
  }
  </style>
  
  