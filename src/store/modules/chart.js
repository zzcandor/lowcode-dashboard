const chart = {
    state: {
        chartData: {
            elements: [],
        },
        currentElementIndex: -1,
    },
    mutations: {
        addComponent(state, data) {
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
                    },
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
            } else if (componentType === 'weatherTime') {
                initData = {
                    type: 'weatherTime',
                    datacon: {
                        borderId: 1,
                        opacity: 1,
                        time: '16:55:55',
                        date: '2021/08/02',
                        temperature: '33',
                        temperatureUrl: '../../assets/img/temperature.png',
                        weatherUrl: '../../assets/img/temperature.png',
                        weather: '多云',
                        airQuality: '雾霾'
                    }
                }
            } else {
                initData = {
                    type: 'chart',
                    settings: {
                        type: componentType,
                    },
                    datacon: {
                        type: 'raw',
                        connectId: '',
                        data: {
                            columns: ['日期', '访问用户'],
                            rows: [
                                { 日期: '1月1日', 访问用户: 1523 },
                                { 日期: '1月2日', 访问用户: 1223 },
                                { 日期: '1月3日', 访问用户: 2123 },
                                { 日期: '1月4日', 访问用户: 4123 },
                                { 日期: '1月5日', 访问用户: 3123 },
                                { 日期: '1月6日', 访问用户: 7123 },
                            ],
                        },
                        getUrl: '',
                        interval: 2,
                    },
                    generated: {
                        columns: ['日期', '访问用户'],
                        rows: [
                            { 日期: '1月1日', 访问用户: 1523 },
                            { 日期: '1月2日', 访问用户: 1223 },
                            { 日期: '1月3日', 访问用户: 2123 },
                            { 日期: '1月4日', 访问用户: 4123 },
                            { 日期: '1月5日', 访问用户: 3123 },
                            { 日期: '1月6日', 访问用户: 7123 },
                        ],
                    },
                }
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
            }
            commit('addComponent', component)
        }
    }
}

export default chart
