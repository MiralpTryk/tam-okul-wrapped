<template>
    <div :class="['progress mt-8', { 'dark-mode': isDark }]">
        <div class="track">
            <div v-for="(bar, index) in maxBars" :key="index" class="bar" :class="{ active: index < activeBars }">
            </div>
        </div>
    </div>
    <span class="font-semibold text-2xl">%{{ successRate }}</span>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useDark } from '@vueuse/core';

const isDark = useDark();

const props = defineProps({
    net: {
        type: Number,
        required: true
    },
    totalNumberOfQuestions: {
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

const successRate = computed(() => {
    if (props.totalNumberOfQuestions > 0) {
        return Math.round((props.net / props.totalNumberOfQuestions) * 100);
    }
    return 0;
});

const activeBars = computed(() => {
    return Math.round((successRate.value / 100) * maxBars.value);
});
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
    border: solid 2px #0ea5e9;
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
}

div.bar.active {
    background-color: #00bb00;
    box-shadow: 0px 0px 5px #00bb00;
}

.dark-mode .bar.active {
    background-color: #00ff00;
    box-shadow: 0px 0px 5px #00ff00;
}
</style>