<template>
    <component :is="tag" class="encrypted-text">
      <span v-for="(line, index) in lines" :key="index" class="encrypted-word">
        {{ line.displayText }}
      </span>
    </component>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    },
    delay: {
      type: Number,
      default: 1000
    },
    name: {
      type: String,
      default: ''
    },
    initialDelay: {
      type: Number,
      default: 0
    }
  });
  
  const lines = ref([]);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|[];,./`~';
  
  const encryptText = (text) => {
    return text
      .split('')
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join('');
  };
  
  const initializeLines = () => {
    const processedText = props.text.replace('{name}', props.name);
    lines.value = processedText.split('\n').map(line => ({
      originalText: line,
      displayText: encryptText(line)
    }));
  };
  
  const decryptLines = () => {
    lines.value.forEach((line, lineIndex) => {
      let currentIndex = 0;
      const baseDelay = props.delay * (lineIndex + 1);
      const decryptInterval = setInterval(() => {
        if (currentIndex >= line.originalText.length) {
          clearInterval(decryptInterval);
          return;
        }
        const revealLength = Math.floor(Math.random() * 3) + 1; // 1 to 3 characters at a time
        currentIndex = Math.min(currentIndex + revealLength, line.originalText.length);
        line.displayText = line.originalText.slice(0, currentIndex) +
          encryptText(line.originalText.slice(currentIndex));
      }, baseDelay / 20); // Increase update frequency
    });
  };
  
  onMounted(() => {
    initializeLines();
    setTimeout(decryptLines, props.initialDelay);
  });
  
  watch(() => props.text, () => {
    initializeLines();
    setTimeout(decryptLines, props.initialDelay);
  });
  </script>
  
  <style scoped>
  .encrypted-text {
    word-break: break-word;
  }
  .encrypted-word {
    display: inline-block;
    margin-right: 0.25em;
  }
  </style>
  
  