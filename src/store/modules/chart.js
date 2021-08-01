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
    }
}

export default chart
