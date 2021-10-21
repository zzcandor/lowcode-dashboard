import chartsConfig, { gaugeConfig } from '@/config/charts'

class BaseData {
    constructor({ type, dataConfig, datacon }) {
        this.type = type // 类型
        this.dataConfig = dataConfig || {
            dataType: 1, // 数据类型，1是静态，2是api
            refreshTime: '', // 刷新时间
            url: '', // 接口地址
            query: '', // 接口参数
            requestType: '', // 请求类型
            dataFormat: data => {
                // 数据处理
            }
        } // 数据相关
        this.datacon = datacon || {}// 组件的配置，一般把data存这里
    }
}

const chart = {
    state: {
        chartData: {
            elements: [],
            w: 1920,
            h: 900
        },
        currentElementIndex: -1,
    },
    mutations: {
        addComponent(state, data) {
            console.log(state.chartData.elements)
            console.log(data)
            state.chartData.elements.unshift(data)
        },
        deleteComponent(state, index) {
            state.chartData.elements.splice(index, 1)
            if (state.currentElementIndex === index) {
                this.commit('setActiveComponentByIndex', -1)
            }
        },
        initChartData(state, list) {
            state.chartData = list
        },
        setActiveComponentByIndex(state, index) {
            state.currentElementIndex = index
            for (let i = 0; i < state.chartData.elements.length; i += 1) {
                const element = state.chartData.elements[i]
                if (index === i) {
                    element.active = true
                } else {
                    element.active = false
                }
            }
        },
    },
    actions: {
        handleAddComponentFromIcon({ commit, state }, componentType) {
            let initData = {}
            console.log(componentType)

            if (componentType === 'text') {
                initData = {
                    type: 'text',
                    datacon: {
                        text: '请输入文字',
                        color: '#000000',
                        fontSize: 48,
                        fontFamily: 'ZCOOL QingKe HuangYou',
                        bold: false,
                        italic: false,
                        stroke: false,
                        strokeColor: '#ffffff',
                        strokeSize: 2,
                        shadow: false,
                        shadowColor: '#ff0000',
                        shadowBlur: 10,
                        scroll: false,
                        scrollSpeed: 50,
                        openlink: false,
                        linkTarget: '_blank',
                        linkHref: '',
                        lineHeight: 50,
                        backgroundColor: 'rgba(100,100,0,0.5)',
                        textAlign: 'left',
                    }
                }
            } else if (componentType === 'image') {
                initData = {
                    type: 'image',
                    datacon: {
                        img: '',
                        imgSize: 'cover',
                        opacity: 1,
                    },
                }
            } else if (componentType === 'border') {
                initData = {
                    type: 'border',
                    datacon: {
                        borderId: 1,
                        opacity: 1,
                    },
                }
            } else if (componentType === 'mask') {
                initData = {
                    type: 'mask',
                    datacon: {
                        borderId: 1,
                        opacity: 1,
                    },
                    bgcolor: 'rgba(192,196,204,1)',
                }
            } else if (componentType === 'table') {
                initData = new BaseData(
                    {
                        type: 'table',
                        datacon: {
                            header: ['列1', '列2', '列3'],
                            data: [
                                ['行1列1', '行1列2', '行1列3'],
                                ['行2列1', '行2列2', '行2列3'],
                                ['行3列1', '行3列2', '行3列3'],
                                ['行4列1', '行4列2', '行4列3'],
                                ['行5列1', '行5列2', '行5列3'],
                                ['行6列1', '行6列2', '行6列3'],
                                ['行7列1', '行7列2', '行7列3'],
                                ['行8列1', '行8列2', '行8列3'],
                                ['行9列1', '行9列2', '行9列3'],
                                ['行10列1', '行10列2', '行10列3']
                            ],
                            rowNum: 5,
                            headerBGC: '#00BAFF',
                            oddRowBGC: '#003B51',
                            evenRowBGC: '#0A2732',
                            waitTime: 2000,
                            headerHeight: 35,
                            columnWidth: [],
                            align: [],
                            index: false,
                            indexHeader: '#',
                            carousel: 'single',
                            hoverPause: true,
                            time: 0,
                        }
                    }
                )
            } else if (componentType === 'weatherTime') {
                initData = {
                    type: 'weatherTime',
                    datacon: {
                        borderId: 1,
                        opacity: 1,
                        time: '16:55:55',
                        date: '2021/08/02',
                        temperature: '33',
                        temperatureUrl: require('@/assets/img/temperature.png'),
                        weatherUrl: require('@/assets/img/temperature.png'),
                        weather: '多云',
                        airQuality: '雾霾',
                        backgroundColor: 'rgba(100,100,0,0.5)',
                    }
                }
            } else if (componentType === 'datetime') {
                initData = {
                    type: 'datetime',
                    config: {
                        format: 'yyyy-MM-dd hh:mm:ss',
                        color: '#fff',
                        lineHeight: 30,
                        textIndent: 2,
                        backgroundColor: 'rgba(100,100,0,0.5)',
                        textAlign: 'left',
                        fontSize: 24,
                        fontWeight: 'normal',
                    }
                }
            } else if (componentType === 'gauge') {
                initData = gaugeConfig
            } else {
                initData = chartsConfig(componentType)
            }
            const component = {
                name: '新建图层' + (state.chartData.elements.length + 1),
                x: 10,
                y: 10,
                w: 400,
                h: 200,
                bgcolor: initData.bgcolor || 'rgba(0,0,0,0)',
                active: true,
                data: initData,
                id: Math.random()
            }
            commit('addComponent', component)
        }
    }
}

export default chart
