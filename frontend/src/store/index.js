import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        userType: localStorage.getItem('userType') || null
    },
    mutations: {
        login(state, data) {
            localStorage.setItem('token', data[1].token)
            localStorage.setItem('userType', data[0][0].authority)
            state.userType = data[0][0].authority;
            state.token = data[1].token
        },
        logout(state) {
            // 移除token
            localStorage.removeItem('token')
            localStorage.removeItem('userType')
            state.userType = null
            state.token = null
        }
    },
    actions: {}
})