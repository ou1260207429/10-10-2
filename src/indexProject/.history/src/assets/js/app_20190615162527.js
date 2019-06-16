var cookieIsAble = navigator.cookieEnabled;
import axios from 'axios';
import {Message, MessageBox, Loading} from 'element-ui';
import moment from 'moment';
import qs from 'qs';

const confirm = MessageBox.confirm;

var app = {
  pageSizeList: [10, 20, 50, 100, 200, 500, 1000],  //每页显示多少条的类目
  pageSize: 20,
  modalWidth: 650,   //添加编辑框的宽度
  twoButtonWidth: 150,   //列表中操作按钮的宽度
  paginationHeight: 10,

  /**
   * 设置cookie的值，key为变量名，value为key对应的值,exdays为设置过期天数(最好是数字类型)
   * */
  setCookie: function (key, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    if (typeof value == 'object') {
      document.cookie = key + "=" + JSON.stringify(value) + "; " + expires;
    } else {
      document.cookie = key + "=" + value + "; " + expires;
    }
  },

  /**
   * 获取cookie的值
   * */
  getCookie: function (key) {
    var name = key + "=";
    var keyList = document.cookie.split(';');
    for (var i = 0; i < keyList.length; i++) {
      var c = keyList[i].trim();
      if (c.indexOf(name) == 0) {
        var re = c.substring(name.length, c.length);
        if (typeof re == 'object') {
          return JSON.parse(re);
        } else {
          return re;
        }
      }
    }
  },

  /**
   * 删除cookie
   * */
  removeCookie: function (key) {
    app.setCookie(key, null, -1);
  },

  /**
   * 存储token
   * */
  setToken: function (token) {
    if (cookieIsAble) {
      localStorage.setItem('packToken', token);
    }

  },

  /**
   * 获取token的值
   * */
  getToken: function () {
    if (cookieIsAble) {
      return localStorage.getItem('packToken');
    }
  },

  /**
   * 移除token的值
   * */
  removeToken: function () {
    if (cookieIsAble) {
      localStorage.removeItem('packToken')
    }

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
    }
    catch (e) {
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
    const token = app.getToken();
    /*  if (token) {
        data.token = token;
      }*/
    let formData = qs.stringify(data);  //处理axios请求的参数问题（要导入qs库），下面注释也可以解决（但是要导入url-search-params-polyfill解决URLSearchParams兼容性的问题）
    if (contentType) {
      formData = data;
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
    let finalContentType = 'application/x-www-form-urlencoded;charset=UTF-8';
    if (contentType) {
      finalContentType = 'multipart/form-data';  //表单格式提交
    }
    return new Promise(function (resolve, reject) {
      axios({
        method: method,
        url: host.serverUrl + url,
        headers: {
          'Authorization': app.getToken(),
          'Content-Type': finalContentType
        },
        data: data
      }).then(function (req) {
        if (!isLoad) {
          myLoading.close();
        }
        switch (req.status) {
          case 401 :
            app.removeToken('token');
            window._this.$router.push({path: '/login'});  //线下登录
            break;
          case 403 :
            app.alert("权限不足，禁止访问");
            break;
          case 200 :
            if (req.data.code == -3) {
              app.removeToken('token');
              window._this.$router.push({path: '/login'});  //线下登录
            } else {
              resolve(req.data);
            }
            break;
          default:
            app.alert("未知错误");
            break;
        }
      })
        .catch(function (error) {
          if (!isLoad) {
            myLoading.close();
          }
          if (error.response) {
            switch (error.response.status) {
              case 401 :
                app.removeToken('token');
                window._this.$router.push({path: '/login'});  //线下登录
                break;
              case 403 :
                app.alert("权限不足，禁止访问");
                break;
              default:
                app.alert(error.message);
                break;
            }
          } else {
            app.alert(error.message);
          }
        });
    })
  },

  /**
   * 显示提示信息
   * message(提示的内容),type（success,error,info等），method为请求方法
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

  /**
   * 弹出是否删除的警告框
   * message(提示的内容),type(提示的图标),callback(返回点击了哪个按钮)
   * */
  alertDelete(message, type, success) {
    if (!type) {
      type = 'warning';
    }
    confirm(message, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type,
      callback: function (action, instance) {
        success(action, instance)
      }
    })
  },

  // 成功之后的加载样式（比如添加或者修改的时候出现加载样式，防止再次点击确定或者关闭按钮）
  loading() {
    const load = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)',
      customClass:'allLoading'
    });
    return load;
  },

  /**
   * 通用查询
   * searchValue为搜索的参数  是一个对象{}格式，
   * 例如{likeName:'张三',eqCraftId:'12456789',dateCreateTime:[new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]}
   * 传过来的参数中，参数前面固定写成前面带有date或者like或者range等
   * */
  commomSearch(searchValue) {
    var mySearch = Object.assign({}, searchValue);  //拷贝对象，不影响原来的数据
    let temp = {};
    for (var item in mySearch) {
      let value = mySearch[item];
      if (value) {
        // 两个时间搜素  date自己定义的搜索名称，例如:dateCreateTime
        if (item.indexOf('date$') != -1) {
          if (value.length > 0) {
            const key = item.split('$')[1];
            let timeValue = '';
            if (value.length > 0) {
              timeValue = moment(value[0]).format('YYYY-MM-DD HH:mm:ss') + '~' + moment(value[1]).format('YYYY-MM-DD HH:mm:ss') + '|#|date';
            } else {
              timeValue = ''
            }
            temp[key] = timeValue
          }
        }
        // 模糊搜索
        else if (item.indexOf('like$') != -1) {
          const key = item.split('$')[1];
          temp[key] = value + '|#|like'
        }

        // 精确搜索
        else if (item.indexOf('equal$') != -1) {
          const key = item.split('$')[1];
          temp[key] = value + '|#|eq'
        }

        // 大于
        else if (item.indexOf('bigthan$') != -1) {
          const key = item.split('$')[1];
          temp[key] = value + '|#|gt';  //动态生成key
        }
      }
    }
    return temp;
  },


  /**
   * 通用排序
   * column是点击表格排序时表格自身传的字段，sortObject是自己定义的排序
   * */
  mySort(column, sortObject) {
    var sortValue = Object.assign({}, sortObject);  //拷贝对象，不影响原来的数据
    for (let key in sortValue) {
      if (key == column.prop) {
        let paixu;
        if (column.order === 'ascending') {
          paixu = '1'
        }
        if (column.order === 'descending') {
          paixu = '-1'
        }
        sortValue[key] = paixu
      }
    }
    return sortValue;
  },

  // 下载Excel文件
  downLoad(createUrl, para, downUrl) {
    app.post(createUrl, para).then((req) => {
      if (req.name) {
        let fileName = req.name;
        location = host.serverUrl + downUrl + '?name=' + fileName
      }
      else {
        app.alert(req.msg, 'error', 2);
      }
    })
  },

  /**
   * 添加或者编辑的弹出框关闭之后清空曾经输入的内容
   * that为当前的this，
   * formName为表单ref的命名,
   * modalForm为添加或者编辑的所有字段，对象格式
   * */
  clearForm(that, formName, modalForm) {
    //清除请输入等格式
    if (that.$refs[formName]) {
      that.$refs[formName].resetFields();
    }
    for (let item in modalForm) {
      let value = modalForm[item];
      if (value) {
        if (typeof value === 'string') {
          modalForm[item] = '';
        } else if (typeof value === 'number') {
          modalForm[item] = '';
        } else if (typeof value === 'object') {
          modalForm[item] = [];
        }
      } else {
        modalForm[item] = '';
      }
    }
    return modalForm;
  },

  /**
   * 给详情框赋值
   * detailForm详情（数组格式），
   * rowData为点击当前行的表格的数据(对象)
   * */
  fillContent(detailForm, rowData) {
    detailForm.map((item) => {
      for (let row in rowData) {
        if (item.key == row) {
          item.value = rowData[row];
        }
      }
    });
    return detailForm;
  },

  /**
   * 给编辑框赋值
   * modalForm是提交编辑或者添加的时候要传给后台的字段，
   * rowData是点击编辑的那一行的单元格数据
   * */
  fillEdit(modalForm, rowData) {
    for (let editKey in modalForm) {
      for (let row in rowData) {
        if (editKey == row) {
          let value=rowData[row];
          if(typeof value=='number'){
            //主要是解决下拉框的赋值问题，但是考虑到数字输入框的赋值问题
          }
          modalForm[editKey] = value;
        }
      }
    }
    return modalForm;
  },

  // 请求工艺
  async requestCraft() {
    return app.post(log.SEARCH_GETCRAFT, {}, true)
  },

  // 搜索的时候处理时间的格式
  transformTime(timeSearch) {
    let temp = {
      startTime: '',
      endTime: ''
    };
    if (timeSearch && timeSearch.length > 0) {
      temp = {
        startTime: moment(timeSearch[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(timeSearch[1]).format('YYYY-MM-DD HH:mm:ss')
      }
    }
    return temp
  },

  /**
   * 计算表格的高度
   *  80大概是新增按钮  导出按钮 删除那一行的大概高度和分页的高度
   * */
  calculateTableHeight(document, id) {
    let tableHeight;
    const topHeight = config.topHeight;  //最顶部放置公司名称的高度，
    const breadHeight = config.breadHeight;  //面包屑导航的高度
    const pageHeight = document.body.clientHeight;  //整个页面的可视区域的高度
    const searchHeight = (document.getElementById('search')).clientHeight;  //搜索框的高度
    tableHeight = (pageHeight - searchHeight - topHeight - breadHeight - 20) + 'px';
    return tableHeight;
  },
}
// new Set()方法可以去除重复的元素
// const value=new Set([42, 'foo', 42, 'foo', true, true]);
// const noRepeat=[...value];   //noRepeat的值为[42, "foo", true]

export {app};
