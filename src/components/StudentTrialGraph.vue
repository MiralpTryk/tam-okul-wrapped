<template>
    <div ref="chart" class="w-64 h-36"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { useDark } from '@vueuse/core';

const props = defineProps({
    correct: {
        type: Number,
        required: true
    },
    incorrect: {
        type: Number,
        required: true
    },
    empty: {
        type: Number,
        required: true
    }
});

const isDark = useDark();

const chart = ref(null);

const initializeChart = () => {
    const myChart = echarts.init(chart.value);

    const option = {
        backgroundColor: '',
        title: {
            text: '',
            left: 'center',
            top: 'top',
            textStyle: {
                color: isDark.value ? '#ffffff' : '#0ea5e9',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                fontSize: 14,
            },
            padding: [0, 15, 10, 15],
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: isDark.value ? '#1e293b' : '#4c1d95',
            borderColor: isDark.value ? '#0ea5e9' : '#e2e8f0',
            borderWidth: 2,
            textStyle: {
                color: isDark.value ? '#ffffff' : '#e2e8f0'
            },
            formatter: '{a} {b}: {c}',
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '90%',
                center: ['50%', '50%'],
                data: [
                    { value: props.correct, name: 'Doğru', itemStyle: { color: '#22c55e' } },
                    { value: props.incorrect, name: 'Yanlış', itemStyle: { color: '#f59e0b' } },
                    { value: props.empty, name: 'Boş', itemStyle: { color: '#0ea5e9' } }
                ],
                label: {
                    color: isDark.value ? 'rgba(255, 255, 255, 1)' : 'rgba(76, 29, 149, 1)',
                    formatter: function (params) {
                        return params.value > 0 ? `${params.name}: ${params.value}` : '';
                    },
                    overflow: 'truncate'
                },
                labelLine: {
                    show: true,
                    length: 5,
                    length2: 0,
                    lineStyle: {
                        color: isDark.value ? 'rgba(255, 255, 255, 1)' : 'rgba(76, 29, 149, 1)'
                    }
                },
                itemStyle: {
                    shadowBlur: 0,
                    shadowColor: 'rgba(0, 0, 0, 0)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function () {
                    return Math.random() * 1000;
                }
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
};

onMounted(() => {
    initializeChart();
});

watch(() => [props.correct, props.incorrect, props.empty, isDark.value], () => {
    initializeChart();
});
</script>

<style scoped></style>