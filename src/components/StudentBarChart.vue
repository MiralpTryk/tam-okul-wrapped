<template>
    <div class="w-full bg-slate-800 p-4 rounded-xl">
        <div ref="chart" class="w-full h-[400px]"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { GridComponent, LegendComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LegendComponent, BarChart, CanvasRenderer]);

export default {
    name: 'EChartsBar',
    data() {
        return {
            chart: null
        };
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            const chartDom = this.$refs.chart;
            this.chart = echarts.init(chartDom);
            const rawData = [
                [90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
                [10, 20, 30, 40, 50, 60, 70, 80, 90, 95]
            ];
            const totalData = [];
            for (let i = 0; i < rawData[0].length; ++i) {
                let sum = 0;
                for (let j = 0; j < rawData.length; ++j) {
                    sum += rawData[j][i];
                }
                totalData.push(sum);
            }
            const grid = {
                left: 48,
                right: 48,
                top: 24,
                bottom: 24,
            };
            const series = ['Net(%)', 'Toplam Soru'].map((name, sid) => {
                return {
                    name,
                    type: 'bar',
                    stack: 'total',
                    barWidth: '60%',
                    label: {
                        show: true,
                        formatter: (params) => Math.round(params.value * 100) + '%',
                        color: '#fff', // Text color
                        fontSize: 12 // Text size
                    },
                    itemStyle: {
                        color: sid === 0 ? '#91CC75' : '#5470C6' // Bar colors
                    },
                    data: rawData[1 - sid].map((d, did) =>
                        totalData[did] <= 0 ? 0 : d / totalData[did]
                    )
                };
            });
            const option = {
                legend: {
                    selectedMode: false,
                    textStyle: {
                        color: '#fff', // Legend text color
                        fontSize: 14 // Legend text size
                    },
                    padding: [10, 20, 10, 20], // Adjust padding around the legend
                    itemGap: 20, // Adjust the gap between legend items
                    data: ['Toplam Soru', 'Net(%)']
                },
                grid,
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 1,
                    interval: 0.2,
                    axisLine: {
                        lineStyle: {
                            color: '#fff' // Y-axis line color
                        }
                    },
                    axisLabel: {
                        formatter: function (value) {
                            return (value * 100) + '%'; // Converts value to percentage
                        },
                        textStyle: {
                            color: '#fff', // Y-axis text color
                            fontSize: 12, // Y-axis text size
                        },
                    },
                    splitLine: { // Add grid lines for y-axis
                        lineStyle: {
                            color: '#444' // Grid line color
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [
                        'Matematik',
                        'Coğrafya',
                        'Fizik',
                        'Kimya',
                        'Biyoloji',
                        'Türkçe',
                        'Tarih',
                        'Felsefe',
                        'Din',
                        'S. Felsefe'
                    ],
                    axisLine: {
                        lineStyle: {
                            color: '#fff' // X-axis line color
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff', // X-axis text color
                            fontSize: 12, // X-axis text size
                            width: 100,
                        }
                    }
                },
                series
            };
            this.chart.setOption(option);
        }
    }
};
</script>

<style scoped></style>
