import Vue from 'vue'
import Vuex from 'vuex'

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
    },
})

export default store
