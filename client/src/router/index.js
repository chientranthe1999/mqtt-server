import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/layout/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        name: 'HomeMain',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
      }
      // {
      //   path: 'detail/:id',
      //   name: 'InforDetail',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/place/Detail')
      // }
    ]
  },

  {
    path: '*',
    redirect: '/home',
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
