import Vue from 'vue'
import VueRouter from 'vue-router'

import Meeting from '@/views/Meeting'
import RegisterOrLogin from '@/views/RegisterOrLogin'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: {
            name: 'Meeting'
        }
    },
    {
        path: '/meeting',
        name: 'Meeting',
        component: Meeting
    },
    {
        path: '/audio',
        name: 'Audio',
        component: () =>
            import ('../views/Audio.vue')
    },
    {
        path: '/keyWord',
        name: 'KeyWord',
        component: () =>
            import ('../views/KeyWord.vue')
    },
    {
        path: '/hotWord',
        name: 'HotWord',
        component: () =>
            import ('../views/HotWord.vue')
    },
    {
        path: '/registerOrLogin',
        name: 'RegisterOrLogin',
        component: RegisterOrLogin
    },
    {
        path: '/audioTrans/:audioId',
        name: 'AudioTrans',
        component: () =>
            import ('../views/AudioTrans.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router