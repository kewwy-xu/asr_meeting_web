import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/audio',
    name: 'Audio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Audio.vue')
  },
  {
    path: '/keyWord',
    name: 'KeyWord',
    component: () => import(/* webpackChunkName: "about" */ '../views/KeyWord.vue')
  },
  {
    path: '/hotWord',
    name: 'HotWord',
    component: () => import(/* webpackChunkName: "about" */ '../views/HotWord.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
