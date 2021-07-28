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
        progress: {
          show: true,
          overlap: true,
          roundCap: true,
          width: 30,
        },
        axisLabel: {
          distance: 35,
        },
        splitLine: {
          length: 5,
          distance: 2,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 30,
          },
        },
        title: {
          fontSize: 14,
          width: 180,
          height: 36,
          borderColor: '#5470c6',
          borderWidth: 1,
          borderRadius: 18,
          color: '#5470c6',
          offsetCenter: ['0', '80%'],
        },
        detail: {
          formatter: '{value}',
          offsetCenter: ['0', '0'],
        },
      },
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
};
