<template>
    <div ref="chart" class="chart-container w-64 h-40 sm:w-48 sm:h-24 md:w-40 md:h-28 lg:w-64 lg:h-36"></div>
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
    },
    courseName: {
        type: String,
        required: true
    }
});

const isDark = useDark();

const courseColors = {
    Matematik: ['#2dd4bf', '#115e59', '#0d9488'],
    Coğrafya: ['#a3e635', '#3f6212', '#65a30d'],
    "Sosyal Bilgiler": ['#a3e635', '#3f6212', '#65a30d'],
    Tarih: ['#fb923c', '#9a3412', '#ea580c'],
    Kimya: ['#fbbf24', '#92400e', '#d97706'],
    "Türkçe - Edebiyat": ['#22d3ee', '#155e75', '#0891b2'],
    "Türkçe": ['#22d3ee', '#155e75', '#0891b2'],
    Biyoloji: ['#4ade80', '#166534', '#16a34a'],
    Fizik: ['#fb7185', '#9f1239', '#e11d48'],
    Felsefe: ['#e879f9', '#86198f', '#c026d3'],
    "Din Kültürü ve Ahlak Bilgisi": ['#f87171', '#991b1b', '#dc2626'],
    "Din Kültürü": ['#f87171', '#991b1b', '#dc2626'],
    İngilizce: ['#a78bfa', '#5b21b6', '#7c3aed'],
    "Fen Bilimleri": ['#fb923c', '#9a3412', '#ea580c'],
    Diğer: ['#34d399', '#059669', '#065f46'],
    default: ['#ddd', '#bbb', '#999']
};

const darkModeColors = {
    Matematik: ['#2dd4bf', '#0d9488', '#115e59'],
    Coğrafya: ['#a3e635', '#65a30d', '#3f6212'],
    "Sosyal Bilgiler": ['#a3e635', '#65a30d', '#3f6212'],
    Tarih: ['#fb923c', '#ea580c', '#9a3412'],
    Kimya: ['#fbbf24', '#d97706', '#92400e'],
    "Türkçe - Edebiyat": ['#22d3ee', '#0891b2', '#155e75'],
    "Türkçe": ['#22d3ee', '#0891b2', '#155e75'],
    Biyoloji: ['#4ade80', '#16a34a', '#166534'],
    Fizik: ['#fb7185', '#e11d48', '#9f1239'],
    Felsefe: ['#e879f9', '#c026d3', '#86198f'],
    "Din Kültürü ve Ahlak Bilgisi": ['#f87171', '#dc2626', '#991b1b'],
    "Din Kültürü": ['#f87171', '#dc2626', '#991b1b'],
    İngilizce: ['#a78bfa', '#7c3aed', '#5b21b6'],
    "Fen Bilimleri": ['#fb923c', '#ea580c', '#9a3412'],
    Diğer: ['#34d399', '#065f46', '#059669'],
    default: ['#ddd', '#bbb', '#999']
};

const getCourseColors = () => {
    return isDark.value ? darkModeColors[props.courseName] || darkModeColors.default : courseColors[props.courseName] || courseColors.default;
};

const chart = ref(null);

const getChartRadius = () => {
    if (window.innerWidth < 640) {
        return '70%';
    }
    return '90%';
};

const initializeChart = () => {
    const myChart = echarts.init(chart.value);

    const [correctColor, incorrectColor, emptyColor] = getCourseColors();

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
                    { value: props.correct, name: 'Doğru', itemStyle: { color: correctColor } },
                    { value: props.incorrect, name: 'Yanlış', itemStyle: { color: incorrectColor } },
                    { value: props.empty, name: 'Boş', itemStyle: { color: emptyColor } }
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
        myChart.setOption({
            series: [
                {
                    radius: getChartRadius()
                }
            ]
        });
    });
};

onMounted(() => {
    initializeChart();
});

watch(() => [props.correct, props.incorrect, props.empty, props.courseName, isDark.value], () => {
    initializeChart();
});
</script>

<style scoped></style>