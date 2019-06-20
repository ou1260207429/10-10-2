import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'

Vue.use(Router)

export default new Router({
  //mode: "history",
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
        show: true,
        title: "首页"
      }
    }, {
      path: '/handling-guid-list',
      name: 'handling-guid',
      component: resolve => require(['../views/Handling-guid.vue'], resolve),
      meta: {
        name: ["办事指南"],
        show: true,
        title: "办事指南"
      }
    }, {
      path: '/laws-and-regulations',
      name: 'laws-and-regulations',
      component: resolve => require(['../views/laws-and-regulations.vue'], resolve),
      meta: {
        name: ["法律法规"],
        show: true,
        title: "法律法规"
      }
    }, {
      path: '/form-download',
      name: 'form-download',
      component: resolve => require(['../views/form-download-list.vue'], resolve),
      meta: {
        name: ["表格下载"],
        show: true,
        title: "表格下载"
      }
    }, {
      path: '/announcement-information/:id',
      name: 'announcement-information',
      component: resolve => require(['../views/announcement-information.vue'], resolve),
      meta: {
        name: ["公告信息"],
        show: true,
        title: "公告信息"
      }
    }, {
      path: '/handling-guid-list/detail/:id',
      name: 'handling-guid-list-detail',
      component: resolve => require(['../views/handling-guid-list-detail.vue'], resolve),
      meta: {
        name: ["办事指南", "办事指南详情"],
        show: false,
        title: "办事指南详情"
      }
    }, {
      path: '/laws-and-regulations/detail/:id',
      name: 'laws-and-regulations-detail',
      component: resolve => require(['../views/laws-and-regulations-detail.vue'], resolve),
      meta: {
        name: ["办事指南", "法律法规详情"],
        show: false,
        title: "法律法规详情"
      }
    }]
  }]
})
