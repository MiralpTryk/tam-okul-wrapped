<template>
    <button class="group relative isolate flex items-center gap-3 overflow-hidden rounded-full 
               bg-white px-6 py-3.5 
               shadow-lg transition-all duration-300 
               hover:shadow-black/10 hover:shadow-[0_0_30px_4px] 
               focus:outline-none focus:ring-2 focus:ring-gray-300
               animated-shadow" @mouseenter="startTextAnimation">
        <!-- Play Icon -->
        <PlayIcon class="h-5 w-5 text-black transition-transform duration-300 
                 group-hover:scale-110" 
                 fill="black"
                 />

        <!-- Text container -->
        <div class="relative overflow-hidden h-[1.5em] ">
            <div class="flex flex-col transition-transform duration-300"
                :style="{ transform: `translateY(${textOffset}%)` }">
                <span class="block font-semibold text-black">
                    {{ new Date().getFullYear() }} Öğrenme Yolculuğun</span>
            </div>
        </div>
    </button>
</template>

<script setup>
import { ref } from 'vue'
import { PlayIcon } from 'lucide-vue-next'

const textOffset = ref(0)
const currentText = ref('Get started')
const alternateText = ref('Launch project')
let isAnimating = false

const startTextAnimation = () => {
    if (isAnimating) return

    isAnimating = true
    textOffset.value = -100

    setTimeout(() => {
        const temp = currentText.value
        currentText.value = alternateText.value
        alternateText.value = temp

        textOffset.value = 0
        isAnimating = false
    }, 300)
}
</script>

<style scoped>
button {
    backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-font-smoothing: subpixel-antialiased;
}

.animated-shadow::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff00ff, #ffff00, #00ffff);
    background-size: 400% 400%;
    z-index: -1;
    filter: blur(5px);
    border-radius: 9999px;
    animation: shadowAnimation 20s ease infinite;
}

@keyframes shadowAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>