<template>
  <div class="relative w-32 h-32">
    <svg class="transform -rotate-90 w-32 h-32">
      <circle
        class="text-white/25"
        stroke-width="8"
        stroke="currentColor"
        fill="transparent"
        r="58"
        cx="64"
        cy="64"
      />
      <circle
        class="text-red-600 transition-all duration-1000"
        stroke-width="8"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke="currentColor"
        fill="transparent"
        r="58"
        cx="64"
        cy="64"
      />
    </svg>
    <span class="absolute inset-0 flex items-center justify-center text-2xl font-bold">
      %{{ percentage }}
    </span>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true
  }
});

const percentage = ref(0);
const circumference = 2 * Math.PI * 58;
const dashOffset = computed(() => 
  circumference - (percentage.value / 100) * circumference
);

// Animasyon fonksiyonu
const animatePercentage = () => {
  const duration = 1500;
  const startTime = Date.now();
  const endValue = props.value;
  
  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    
    if (elapsed >= duration) {
      percentage.value = endValue;
      return;
    }

    const easeOutQuart = t => 1 - (--t) * t * t * t;
    const progress = easeOutQuart(elapsed / duration);
    percentage.value = Math.round(progress * endValue);
    requestAnimationFrame(animate);
  };
  
  animate();
};

watch(() => props.value, () => {
  animatePercentage();
}, { immediate: true });
</script>
