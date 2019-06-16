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
      path: '/index',
      name: 'index',
      component: resolve => require(['../views/index.vue'], resolve),
      meta:{
        name:["首页"]
      }
    },{
      path: '/handling-guid',
      name: 'handling-guid',
      component: resolve => require(['../views/Handling-guid.vue'], resolve),
      meta:{
        name:["办事指南"]
      }
    },{
      path: '/laws-and-regulations',
      name: 'laws-and-regulations',
      component: resolve => require(['../views/laws-and-regulations.vue'], resolve),
      meta:{
        name:["法律法规"]
      }
    },{
      path: '/form-download-list',
      name: 'form-download-list',
      component: resolve => require(['../views/form-download-list.vue'], resolve),
      meta:{
        name:["法律法规"]
      }
    }]
  }]
})