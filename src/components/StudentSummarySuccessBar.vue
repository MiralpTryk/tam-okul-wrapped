<template>
    <div :class="['flex flex-col items-center gap-2 mt-4', { 'dark-mode': isDark }]">
        <div class="flex justify-center gap-2 text-violet-900 dark:text-slate-400" @mousemove="handleMouseMove"
            @mouseleave="hideTooltip">
            <div ref="progressBar" :class="['progress', { 'dark-mode': isDark }]">
                <div class="track">
                    <div v-for="n in totalBars" :key="n" class="bar" :class="{ filled: n <= totalBars }"></div>
                </div>
                <span ref="tooltip" :class="['tooltip-text', { 'dark-mode': isDark }]">Net/Toplam Soru Sayısı</span>
            </div>
        </div>
        <span class="text-violet-900 dark:text-slate-400 text-4xl font-bold">%{{ Math.round(netRatio) }}</span>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useDark } from '@vueuse/core';

const isDark = useDark();

const props = defineProps({
    netRatio: {
        type: Number,
        required: true
    }
});

const maxBars = ref(50);

const updateMaxBars = () => {
    const width = window.innerWidth;
    if (width <= 480) {
        maxBars.value = 20;
    } else if (width <= 768) {
        maxBars.value = 30;
    } else if (width <= 1024) {
        maxBars.value = 40;
    } else {
        maxBars.value = 50;
    }
};

onMounted(() => {
    updateMaxBars();
    window.addEventListener('resize', updateMaxBars);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateMaxBars);
});

const totalBars = computed(() => {
    let adjustedNetRatio = props.netRatio < 0 ? 0 : props.netRatio;
    let bars = Math.round((adjustedNetRatio / 100) * maxBars.value);

    if (isNaN(bars) || bars < 0) {
        bars = 0;
    }

    if (bars > maxBars.value) {
        bars = maxBars.value;
    }

    return bars;
});

const tooltip = ref(null);
const progressBar = ref(null);

const handleMouseMove = (event) => {
    const tooltipElement = tooltip.value;
    const progressBarElement = progressBar.value;

    if (tooltipElement && progressBarElement) {
        const rect = progressBarElement.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;

        tooltipElement.style.left = `${offsetX}px`;
        tooltipElement.style.visibility = 'visible';
        tooltipElement.style.opacity = '1';
    }
};

const hideTooltip = () => {
    const tooltipElement = tooltip.value;
    if (tooltipElement) {
        tooltipElement.style.visibility = 'hidden';
        tooltipElement.style.opacity = '0';
    }
};
</script>

<style scoped>
div.track,
div.bar {
    box-sizing: border-box;
    position: relative;
}

div.progress {
    width: 408px;
    padding-left: 2px;
    padding-right: 2px;
    height: 24px;
    border-radius: 0px;
    border: solid 2px #4c1d95;
    background-color: #cbd5e1;
    position: relative;
}

@media (max-width: 1024px) {
    div.progress {
        width: 300px;
    }
}

@media (max-width: 768px) {
    div.progress {
        width: 250px;
    }
}

@media (max-width: 480px) {
    div.progress {
        width: 200px;
    }
}

div.track {
    position: relative;
    width: 100%;
    height: 21px;
    overflow: hidden;
}

div.bar {
    height: 15px;
    width: 4px;
    position: relative;
    border-radius: 0px;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 100px;
    top: 3px;
    float: left;
    clear: top;
}

div.bar.filled {
    background-color: #00bb00;
    box-shadow: 0px 0px 5px #00bb00;
}

.tooltip-text {
    visibility: hidden;
    width: 160px;
    background-color: #4c1d95;
    color: #e2e8f0;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s, left 0.1s;
    transform: translateX(-50%);
    pointer-events: none;
}

.dark-mode .progress {
    background-color: #0f172a;
    border-color: #0ea5e9;
}

.dark-mode .tooltip-text {
    background-color: #0ea5e9;
    color: #e2e8f0;
}

.dark-mode .bar.filled {
    background-color: #00ff00;
    box-shadow: 0px 0px 5px #00ff00;
}
</style>
