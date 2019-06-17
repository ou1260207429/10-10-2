import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'header',
    component: header,
    redirect: "/index",
    children: [{
      path: '/',
      name: 'header',
      component: import("../views/Index.vue"),
    }]
  }]
})
