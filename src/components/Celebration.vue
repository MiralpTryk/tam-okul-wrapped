<template>
  <div class="celebration">
    <div ref="confettiContainer" class="confetti-container"></div>
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
import { ref, onMounted, onUnmounted } from 'vue';

const celebrationEmojis = ref(['🎉', '🎊', '🥳', '🏆', '👏', '🙌']);
const confettiContainer = ref(null);

const emojiStyle = () => {
  return {
    '--delay': `${Math.random() * 2}s`,
    '--duration': `${2 + Math.random() * 2}s`,
    '--left-offset': `${Math.random() * 100}%`,
    '--size': `${1 + Math.random() * 1.5}rem`,
  };
};

const isMobile = () => {
  return window.innerWidth <= 768; // Assuming 768px as the breakpoint for mobile devices
};

onMounted(() => {
  startConfetti();
});

onUnmounted(() => {
  stopConfetti();
});

let confetti = [];
let frame;

const startConfetti = () => {
  const container = confettiContainer.value;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const Confetti = function() {
    this.randomModifier = Math.random() * 0.8 + 0.2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.dimensions = {
      x: (Math.random() * 8 + 5) * this.randomModifier,
      y: (Math.random() * 8 + 5) * this.randomModifier,
    };
    this.position = {
      x: Math.random() * containerWidth,
      y: containerHeight - Math.random() * containerHeight * 2,
    };
    this.rotation = Math.random() * 2 * Math.PI;
    this.scale = {
      x: 1,
      y: 1,
    };
    this.velocity = {
      x: Math.random() * 60 - 30,
      y: 100 + Math.random() * 150,
    };

    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    const outerStyle = this.outer.style;
    const innerStyle = this.inner.style;

    outerStyle.position = 'absolute';
    outerStyle.backfaceVisibility = 'hidden';
    outerStyle.willChange = 'transform';
    outerStyle.width = `${this.dimensions.x}px`;
    outerStyle.height = `${this.dimensions.y}px`;

    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = this.color;
    innerStyle.transform = 'skew(15deg)';

    this.update = function(height, delta) {
      this.velocity.x += Math.random() * 4 - 2;
      this.position.x += this.velocity.x * delta;
      this.position.y += this.velocity.y * delta;
      this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.1);

      outerStyle.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) rotate(${this.rotation}rad) scale(${this.scale.x}, ${this.scale.y})`;

      return this.position.y > height + this.dimensions.x;
    };

    container.appendChild(this.outer);
  };

  const frameDriver = () => {
    const height = window.innerHeight;
    const delta = 1 / 60;

    confetti.forEach((confetto, index) => {
      if (confetto.update(height, delta)) {
        container.removeChild(confetto.outer);
        confetti.splice(index, 1);
      }
    });

    const maxConfetti = isMobile() ? 50 : 200;
    const confettiPerFrame = isMobile() ? 1 : 5;

    if (confetti.length < maxConfetti) {
      for (let i = 0; i < confettiPerFrame; i++) {
        confetti.push(new Confetti());
      }
    }

    frame = requestAnimationFrame(frameDriver);
  };

  frame = requestAnimationFrame(frameDriver);
};

const stopConfetti = () => {
  if (frame) {
    cancelAnimationFrame(frame);
  }
  if (confettiContainer.value) {
    confettiContainer.value.innerHTML = '';
  }
  confetti = [];
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

