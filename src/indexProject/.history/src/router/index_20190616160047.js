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
        name: ["首页"],
        show: true
      }
    }, {
      path: '/handling-guid',
      name: 'handling-guid',
      component: resolve => require(['../views/Handling-guid.vue'], resolve),
      meta: {
        name: ["办事指南"],
        show: true
      }
    }, {
      path: '/laws-and-regulations',
      name: 'laws-and-regulations',
      component: resolve => require(['../views/laws-and-regulations.vue'], resolve),
      meta: {
        name: ["法律法规"],laws-and-regulations-detail
        show: true
      }
    }, {
      path: '/form-download',
      name: 'form-download',
      component: resolve => require(['../views/form-download-list.vue'], resolve),
      meta: {
        name: ["法律法规"],
        show: true
      }
    }, {
      path: '/announcement-information/:id',
      name: 'announcement-information',
      component: resolve => require(['../views/announcement-information.vue'], resolve),
      meta: {
        name: ["公告信息"],
        show: true
      }
    }, {
      path: '/handling-guid-list-detail/:id/:name',
      name: 'handling-guid-list-detail',
      component: resolve => require(['../views/handling-guid-list-detail.vue'], resolve),
      meta: {
        name: ["办事指南", "办事指南详情"],
        show: false,
      }
    }, {
      path: '/laws-and-regulations-detail/:id/:name',
      name: 'laws-and-regulations-detail',
      component: resolve => require(['../views/laws-and-regulations-detail.vue'], resolve),
      meta: {
        name: ["办事指南", "办事指南详情"],
        show: false,
      }
    }]
  }]
})
