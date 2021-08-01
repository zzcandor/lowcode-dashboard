import Vue from 'vue'
import Vuex from 'vuex'
import chart from './modules/chart'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: null,
    },
    mutations: {
        SET_USERINFO(state, data) {
            state.userInfo = data
        },
    },
    actions: {

    },
    getters: {
        userInfo(state) {
            if (!state.userInfo) {
                const _userInfo = localStorage.getItem('userInfo')
                store.commit('SET_USERINFO', JSON.parse(_userInfo))
            }
            return state.userInfo
        },
        chartData: state => state.chart.chartData,
        currentElementIndex: state => state.chart.currentElementIndex,
    },
    modules: {
        chart,
    },
})

export default store
