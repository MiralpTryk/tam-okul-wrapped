<template>
    <div :class="['progress', { 'dark-mode': isDark }]">
        <div class="track">
            <div v-for="n in maxBars" :key="n" class="bar" :class="{ filled: n <= filledBars }"></div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useDark } from '@vueuse/core';

const isDark = useDark();

const props = defineProps({
    successRate: {
        type: Number,
        required: true,
    },
});

const maxBars = ref(10);

const updateMaxBars = () => {
    const width = window.innerWidth;
    if (width <= 480) {
        maxBars.value = 10;
    } else if (width <= 768) {
        maxBars.value = 10;
    } else if (width <= 1024) {
        maxBars.value = 10;
    } else {
        maxBars.value = 10;
    }
};

onMounted(() => {
    updateMaxBars();
    window.addEventListener('resize', updateMaxBars);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateMaxBars);
});

const filledBars = computed(() => {
    return Math.round((props.successRate / 100) * maxBars.value);
});
</script>

<style scoped>
div.track,
div.bar {
    box-sizing: border-box;
    position: relative;
}

div.progress {
    width: 108px;
    padding-left: 2px;
    padding-right: 2px;
    height: 24px;
    border-radius: 0px;
    border: solid 2px #0ea5e9;
}

@media (max-width: 1024px) {
    div.progress {
        width: 100px;
    }
}

@media (max-width: 768px) {
    div.progress {
        width: 90px;
    }
}

@media (max-width: 480px) {
    div.progress {
        width: 80px;
    }
}

div.track {
    position: relative;
    width: 100%;
    height: 21px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}

div.bar {
    height: 15px;
    width: 6px;
    position: relative;
    border-radius: 0px;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 100px;
    top: 3px;
    float: left;
}

div.bar.filled {
    background-color: #00bb00;
    box-shadow: 0px 0px 5px #00bb00;
}

.dark-mode .bar.filled {
    background-color: #00ff00 !important;
    box-shadow: 0px 0px 5px #00ff00 !important;
}
</style>