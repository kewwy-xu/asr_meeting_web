import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import configure from '@/store/configure'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        configure
    }
})

export default store