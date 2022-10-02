import Default from '@playground/layouts/default/Default.vue'
import Example1 from '../views/Example1.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.component('LayoutDefault', Default)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Example1',
    component: Example1,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/example2',
    name: 'Example2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "example2" */ '../views/Example2.vue'),
    meta: {
      layout: 'default'
    }
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router
