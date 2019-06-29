var cookieIsAble = navigator.cookieEnabled;
import axios from 'axios';
import Vue from "vue"
import qs from 'qs';
import 'url-search-params-polyfill'
import {
  Message
} from 'element-ui'
import {
  table
} from './apiValue'
var app = {

  loginUrl(){
    let url = Vue.prototype.loginUrl
    return url
  },
  downLoadUrl: Vue.prototype.downLoadUrl,
  clentHeight() {
    let clientHeight = document.body.clientHeight;
    let topHeight = document.getElementById('top') ? document.getElementById('top').clientHeight : 0;
    let navHeight = document.getElementById('nav') ? document.getElementById('nav').clientHeight : 0;
    let breadcrumb = document.getElementById('breadcrumb') ? document.getElementById('breadcrumb').clientHeight : 0;
    let contentHeight = clientHeight - topHeight - navHeight - breadcrumb - 120;
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
   * url为服务器的地址,data为请求参数,dataType表示请求参数格式
   * */
  post: function (url, data, isLoad, dataType, flag, succCallBack, errorCallBack) {
    let formData = data; //处理axios请求的参数问题（要导入qs库），下面注释也可以解决（但是要导入url-search-params-polyfill解决URLSearchParams兼容性的问题）
    if (dataType) {
      formData = qs.stringify(data);
    }
    return app.ajax(url, formData, "POST", succCallBack, errorCallBack);
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
    return app.ajax(url + "?" + reqParam, {}, "GET", succCallBack, errorCallBack);
  },

  /**
   * get请求
   * url为服务器的地址,data为请求参数，method为请求方法,isLoad表示是否显示加载样式
   * isLoad  不传的时候默认有加载样式，如果传了true则是没有加载样式
   * */
  ajax: function (url, data, method, succCallBack, errorCallBack) {
    let baseUrl = Vue.prototype.baseUrl;

    return new Promise(function (resolve, reject) {
      axios({
        method: method,
        url: baseUrl + url,
        data: data
      }).then(function (req) {
        if (req.status == 200) {
          resolve(req.data);
        }
      })
    })
  },
  /**
   * 显示提示信息
   * message(提示的内容),type（success,error,info等）
   * */
  alert(message, type, duration) {
    let defaultType = 'info';
    let defaultDuration = 2;
    if (type) {
      defaultType = type;
    }
    if (duration) {
      defaultDuration = duration;
    }
    Message({
      showClose: true,
      message: message,
      type: defaultType,
      duration: defaultDuration * 1000
    })
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
   * 
   * @param {*下载文件的} id 
   */
  countDownLoadTimes(id) {
    app.post(table.compute_downLoad + "?attachmentId=" + id).then(result => {});
  },
  //获取附件详情
  getFileDetail(guid, id) {
    let downLoadUrl = Vue.prototype.downLoadUrl;
    let finalUrl =
      table.search_downLoadDetail +
      "?appId=9F947774-8CB4-4504-B441-2B9AAEEAF450&module=table&sourceId=" +
      guid;
    return new Promise(function (resolve, reject) {
      axios({
        method: "POST",
        url: downLoadUrl + finalUrl,
      }).then(function (req) {
        resolve(req);
      })
    })
  },

  downLoadFile(data, id) {
    let downLoadUrl = Vue.prototype.downLoadUrl;
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = downLoadUrl + table.download + "?appId=9F947774-8CB4-4504-B441-2B9AAEEAF450&id=" + data.id;
    link.setAttribute("download", data.fileName);
    document.body.appendChild(link);
    link.click();
    app.countDownLoadTimes(id)
  },




}
// new Set()方法可以去除重复的元素
// const value=new Set([42, 'foo', 42, 'foo', true, true]);
// const noRepeat=[...value];   //noRepeat的值为[42, "foo", true]

export {
  app
};
