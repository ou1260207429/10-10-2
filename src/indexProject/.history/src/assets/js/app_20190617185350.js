var cookieIsAble = navigator.cookieEnabled;
import axios from 'axios';
import Vue from "vue"
import qs from 'qs';
import 'url-search-params-polyfill'
import {
  MessageBox,
} from 'element-ui';


var app = {
  clentHeight() {
    let clientHeight = document.body.clientHeight;
    let topHeight = document.getElementById('top').clientHeight;
    let navHeight = document.getElementById('nav').clientHeight ? document.getElementById('nav').clientHeight : 0;
    let bannerHeight = document.getElementById('banner').clientHeight == 18 ? 240 : document.getElementById('banner').clientHeight;
    let contentHeight = clientHeight - topHeight - navHeight - bannerHeight - 80 + 'px';
    return contentHeight;
  },
  pageSize: {
    "size": 10,
    "page": 1,
    "isAsc": true,
  },
  /**
   * 存储数据（可以是字符串或者对象的格式）
   * key表示变量名，value是对应的值
   * */
  setData: function (key, value) {
    // key对应的值为空或者不存在
    if (!value) {
      return;
    }
    // key对应的值为对象的格式
    else if (typeof value == 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },

  /**
   * 获取存储的数据
   * 当获取的key对应的值为空时，使用默认值defaultData
   * */
  getData: function (key, defaultData) {
    var re;
    try {
      re = localStorage.getItem(key);
      if (re) {
        return JSON.parse(re);
      } else {
        return defaultData
      }
    } catch (e) {
      return re;
    }
  },

  /**
   * 移除存储的数据
   * */
  removeData: function (key) {
    localStorage.removeItem(key);
  },

  /**
   * post请求
   * url为服务器的地址,data为请求参数,contentType表示请求头格式
   * */
  post: function (url, data, isLoad, contentType, flag, succCallBack, errorCallBack) {
    /*  if (token) {
        data.token = token;
      }*/
    let formData = data; //处理axios请求的参数问题（要导入qs库），下面注释也可以解决（但是要导入url-search-params-polyfill解决URLSearchParams兼容性的问题）
    if (contentType) {
      formData = qs.stringify(data);
    }

    // const formData = new URLSearchParams();
    // const keys = Object.keys(data);  //获取对象key,['name':'123],这个方法拿到name
    // keys.forEach(keyItem => {
    //   let value = data[keyItem];
    //   if (value || value == '0') {
    //     formData.append(keyItem, data[keyItem]);
    //   }
    // });
    return app.ajax(url, formData, "POST", isLoad, contentType, succCallBack, errorCallBack);
  },

  /**
   * get请求
   * url为服务器的地址,data为请求参数
   * */
  get: function (url, data, succCallBack, errorCallBack) {
    var reqParam = "";
    for (var key in data) {
      reqParam += key + "=" + data[key] + "&"
    }
    reqParam = reqParam.substr(0, reqParam.length - 1);
    // reqParam += "token=" + app.getToken();
    return app.ajax(url + "?" + reqParam, {}, "GET", succCallBack, errorCallBack);
  },

  /**
   * get请求
   * url为服务器的地址,data为请求参数，method为请求方法,isLoad表示是否显示加载样式
   * isLoad  不传的时候默认有加载样式，如果传了true则是没有加载样式
   * */
  ajax: function (url, data, method, isLoad, contentType, succCallBack, errorCallBack) {
    let myLoading;
    if (!isLoad) {
      myLoading = app.loading();
    }
    let baseUrl = Vue.prototype.baseUrl;
    console.log(baseUrl)
    let finalContentType = 'text/plain';

    return new Promise(function (resolve, reject) {
      axios({
          method: method,
          url: baseUrl + url,
          data: data
        }).then(function (req) {
          if (!isLoad) {
            // myLoading.close();
          }
          switch (req.status) {
            case 401:
              app.removeToken('token');
              window._this.$router.push({
                path: '/login'
              }); //线下登录
              break;
            case 403:
              // app.alert("权限不足，禁止访问");
              break;
            case 200:
              if (req.data.code == -3) {
                app.removeToken('token');
                window._this.$router.push({
                  path: '/login'
                }); //线下登录
              } else {
                resolve(req.data);
              }
              break;
            default:
              // app.alert("未知错误");
              break;
          }
        })
        .catch(function (error) {
          console.log(error)
          if (!isLoad) {
            // myLoading.close();
          }
          if (error.response) {
            switch (error.response.status) {
              case 401:
                app.removeToken('token');
                window._this.$router.push({
                  path: '/login'
                }); //线下登录
                break;
              case 403:
                // app.alert("权限不足，禁止访问");
                break;
              default:
                //   app.alert(error.message);
                break;
            }
          } else {
            //  app.alert(error.message);
          }
        });
    })
  },

  // 成功之后的加载样式（比如添加或者修改的时候出现加载样式，防止再次点击确定或者关闭按钮）
  loading() {
    // const load = Loading.service({
    //   lock: true,
    //   text: '加载中...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.4)',
    //   customClass: 'allLoading'
    // });
    // return load;
  },



  // 数组对象排序

  sortByKey(array, key) {

    return array.sort(function (a, b) {

      var x = a[key];

      var y = b[key];

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));

    });

  },
  /**
   * 下载表格
   */
  downList() {

  },



}
// new Set()方法可以去除重复的元素
// const value=new Set([42, 'foo', 42, 'foo', true, true]);
// const noRepeat=[...value];   //noRepeat的值为[42, "foo", true]

export {
  app
};
