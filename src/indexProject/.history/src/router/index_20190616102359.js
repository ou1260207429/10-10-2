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
      meta: {
        name: ["首页"]
      }
    }, {
      path: '/handling-guid',
      name: 'handling-guid',
      component: resolve => require(['../views/Handling-guid.vue'], resolve),
      meta: {
        name: ["办事指南"]
      }
    }, {
      path: '/laws-and-regulations',
      name: 'laws-and-regulations',
      component: resolve => require(['../views/laws-and-regulations.vue'], resolve),
      meta: {
        name: ["法律法规"]
      }
    }, {
      path: '/form-download',
      name: 'form-download',
      component: resolve => require(['../views/form-download-list.vue'], resolve),
      meta: {
        name: ["法律法规"]
      }
    }, {
      path: '/announcement-information',
      name: 'announcement-information',
      component: resolve => require(['../views/announcement-information.vue'], resolve),
      meta: {
        name: ["表格下载"]
      }
    }, {
      path: '/handling-guid-list-detail',
      name: 'handling-guid-list-detail',
      component: resolve => require(['../views/handling-guid-list-detail.vue'], resolve),
      meta: {
        name: ["办事指南详情"]
      }
    }]
  }]
})
