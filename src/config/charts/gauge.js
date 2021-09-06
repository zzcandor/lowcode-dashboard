export default {
    type: 'chart',
    settings: {
        type: 'gauge',
        seriesMap: {
            有进展: {
                anchor: false,
                pointer: false,
                axisTick: false,
                splitNumber: 5,
                max: 200,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [[1, '#5470c6']],
                        width: 30,
                        shadowColor: '#fff', // 默认透明
                        shadowBlur: 10,
                    },
                },
                axisLabel: {
                    distance: 35,
                },
                splitLine: { // 分隔线
                    length: 5,
                },
                title: {
                    height: 36,
                    lineHeight: 36,
                    padding: [0, 15],
                    borderColor: '#5470c6',
                    borderWidth: 1,
                    borderRadius: 18,
                    color: '#5470c6',
                    offsetCenter: ['0', '80%'],
                    rich: {},
                },
                detail: {
                    formatter: '{value}',
                    offsetCenter: ['0', '0'],
                },
            },
        },
        dataName: {
            有进展: '有进展',
        },
    },
    datacon: {
        type: 'raw',
        connectId: '',
        data: {
            columns: ['任务状态', '完成数量'],
            rows: [
                { 任务状态: '有进展', 完成数量: 50 },
            ],
        },
        getUrl: '',
        interval: 2,
    },
    generated: {
        columns: ['完成率'],
        rows: [
            { 完成率: 20 },
        ],
    },
}
