// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import "./assets/css/common.css"
import "./assets/css/elementUi.css";
import element from "./assets/js/elementUI"
import 'element-ui/lib/theme-chalk/index.css';
import func from './vue-temp/vue-editor-bridge';
Vue.config.productionTip = false
Vue.use(element)
/* eslint-disable no-new */
//在main.js中定义一个全局函数
Vue.prototype.getConfigJson = function () {
  axios.get('static/serverconfig.json').then((result) => {
    Vue.prototype.baseUrl = result.data.ApiUrl; //设置成Vue的全局属性
    new Vue({
      el: '#app',
      router,
      components: { 
        App
      },
      template: '<App/>'
    })
  }).catch((error) => {
    console.log(error)
  })
}
Vue.prototype.getConfigJson() //调用声明的全局方法