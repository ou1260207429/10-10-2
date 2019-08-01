import { ValidatorFn, AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { STComponent } from '@delon/abc';
import lodash from 'lodash'

// 常用正则表达式


export const RegularExpression = {
  'matchPhone': /^[1][3,4,5,7,8,9][0-9]{9}$/,     // 匹配手机
  // 匹配15位和18位身份证号
  'matchIDCard': /^[1-9]\d{5}(18|19|([2]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,    // 匹配身份证

  /**
   * 校验IOS 中文输入英文的六分之一空格
   */
  'matchIOSSpace': /\u2006/g,

  /**
   * 校验空格
   */
  'matchSpace': /(^\s*)|(\s*$)/g,

  /**
   * 校验正整数，注：可为0
   */
  'matchInteger': /^([1-9]\d*|0)?$/,
};



// 正则表达式验证
export function forRegExpValidator(nameRe: RegExp, properyName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const res = !control.value || nameRe.test(control.value);
    const errorObj = { ForRegExpValidator: !res };
    errorObj[properyName] = { value: control.value };
    return res ? null : errorObj;
  };
}

/**
 * 获取当前的时间戳
 * @param 返回number类型
 */
export function getTimestamp(): number {
  return Date.parse((new Date()).toString()) / 1000;
}

/**
 * 获取当天时间的 23：59:59
 * @param 返回number类型
 */
export function getLastTimestamp(): number {
  return parseInt(((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1) / 1000).toString(), 0);
}

/**
 * 获取当天时间的 00：00:00
 * @param 返回number类型
 */
export function getFirstTimestamp(): number {
  return new Date(new Date().toLocaleDateString()).getTime() / 1000;
}

// 密码校验
export function equalValidetor(group: FormGroup): any {
  const password: FormControl = group.get('password') as FormControl;
  const pConfirm: FormControl = group.get('pConfirm') as FormControl;
  const valid: boolean = (password.value === pConfirm.value);
  return valid ? null : { equal: { descs: '密码和确认密码不匹配' } };
}

/**
 * 比较日期 参数为string或者date类型
 * return number >0 则是大于0 等于0等于0 -1小于0
 */
export function comopareDate(date1: any, date2: any): number {

  /**
   * 如果是date类型就直接比较，如果不是就转成string
   */

  let comparedate1: Date = typeof (date1) == 'string' ? dateParse(date1.toString()) : date1;

  let comparedate2: Date = typeof (date2) == 'string' ? dateParse(date2.toString()) : date2;

  if (comparedate1.getTime() > comparedate2.getTime()) {

    return 1;

  } else if (comparedate1.getTime() == comparedate2.getTime()) {

    return 0;

  } else {

    return -1;
  }
}

/**
 * 日期解析，字符串转日期
 * @param dateString 可以为2017-02-16，2017/02/16，2017.02.16
 * @returns {Date} 返回对应的日期对象
 */
function dateParse(dateString: string): Date {
  var SEPARATOR_BAR = "-";
  var SEPARATOR_SLASH = "/";
  var SEPARATOR_DOT = ".";
  var dateArray;
  if (dateString.indexOf(SEPARATOR_BAR) > -1) {
    dateArray = dateString.split(SEPARATOR_BAR);
  } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
    dateArray = dateString.split(SEPARATOR_SLASH);
  } else {
    dateArray = dateString.split(SEPARATOR_DOT);
  }
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
}


export function timeTrans(src: any): string {

  if ("string" == typeof src) {
    if (src == "") {
      return formateDate(new Date());
    }
    try {
      var d = new Date(src);
      return formateTime(d);
    } catch (e) {
      return formateTime(new Date());
    }

  }
  if ("number" == typeof src) {
    try {
      return formateTime(new Date(src));
    } catch (e) {
      return formateTime(new Date());
    }

  }
  if (src instanceof Date) {

    return formateTime(src);
  }

  return formateTime(new Date());
}




export function formateTime(src: Date): string {
  var result = src.getFullYear() + '/'
    + (src.getMonth() + 1)
    + '/' + src.getDate()
    + " "
    + src.getHours()
    + ':' + src.getMinutes()
    + ':' + src.getSeconds();

  return result;
}



export function dateTrans(src: any): string {

  if ("string" == typeof src) {
    if (src == "") {
      return formateDate(new Date());
    }
    try {
      var d = new Date(src);
      return formateTime(d);
    } catch (e) {
      return formateDate(new Date());
    }

  }
  if ("number" == typeof src) {
    try {
      return formateDate(new Date(src));
    } catch (e) {
      return formateDate(new Date());
    }

  }
  if (src instanceof Date) {

    return formateDate(src);
  }

  return formateDate(new Date());
}



export function formateDate(src: Date): string {
  var result = src.getFullYear()
    + '/' + (src.getMonth() + 1)
    + '/' + src.getDate();

  return result;
}

/**
 * 根据时间辍返回对应的时间 如 yyyy/MM/dd HH:mm:ss  yyyy/MM/dd
 * @param date 时间 辍
 * @param format 时间格式 默认返回年月日时分秒 按照的格式化是 yyyy/MM/dd HH:mm:ss
 * @param timeWord 默认返回2018年01月15日 16:26:30  这种  如填写 - 的。则返回 2018-01-15 16:26:30
 */
export function timeTransOld(date: number, format: string = 'yyyy/MM/dd HH:mm:ss', timeWord: string = '') {
  date = date.toString().length === 13 ? date : date * 1000;
  const time = new Date(date); /*如果date为13位不需要乘1000 */
  const YType = timeWord === '' ? '年' : timeWord;
  const MType = timeWord === '' ? '月' : timeWord;
  const DType = timeWord === '' ? '日' : '';
  let dataValue = '';
  const Y = time.getFullYear() + YType;
  const M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + MType;
  const D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()) + ' ';
  const h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':';
  const m = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':';
  const s = (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
  switch (format) {
    case 'yyyy/MM/dd HH:mm:ss':
      dataValue = Y + M + D + h + m + s;
      break;
    case 'yyyy':
      dataValue = time.getFullYear().toString();
      break;
    case 'MM':
      dataValue = M.substring(0, M.length - 1);
      break;
    case 'dd':
      dataValue = D.substring(0, D.length - 1);
      break;
    case 'yyyy-MM':
      dataValue = Y + M.substring(0, M.length - 1);
      break;
    case 'yyyy/MM/dd':
      dataValue = Y + M + D.substring(0, D.length - 1);
      break;
    case 'MM-dd':
      dataValue = M + D.substring(0, D.length - 1);
      break;
    case 'HH':
      dataValue = h.substring(0, h.length - 1);
      break;
    case 'mm':
      dataValue = m.substring(0, m.length - 1);
      break;
    case 'ss':
      dataValue = s.toString();
      break;
    case 'HH:mm':
      dataValue = h + m.substring(0, m.length - 1);
      break;
    case 'HH:mm:ss':
      dataValue = h + m + s;
      break;
    case 'mm:ss':
      dataValue = m + s;
      break;
    default:
      throw new Error('没有找到对应的时间');
  }
  return dataValue;
}

/**
* 根据日期获取星期几
* @param data '2018-12-3'
*/
export function dateGetDay(data: string) {
  const list = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return list[new Date(Date.parse(data.replace(/\-/g, '/'))).getDay()];
}

/**
 * 比较时间
 * @param date1 包含毫秒的时间戳或者 '2018-12-3' '2018/12/3'  '2018.12.3'
 * @param date2 包含毫秒的时间戳或者 '2018-12-3' '2018/12/3'  '2018.12.3'
 * @returns 参数1大于参数2  返回1,参数1等于参数2返回0，否则返回-1
 */
export function compareTime(date1: any, date2: any): number {
  const comparedate1 = typeof (date1) === 'string' ? Date.parse(date1.toString()) / 1000 : date1;

  const comparedate2 = typeof (date2) === 'string' ? Date.parse(date2.toString()) / 1000 : date2;
  if (comparedate1 > comparedate2) {

    return 1;

  } else if (comparedate1 === comparedate2) {

    return 0;

  } else {

    return -1;
  }
}

/**
   * form 校验
   * @param form form 对象
   * @param formErrors 错误信息对象
   * @param validationMessages  错误信息模板对象
   */
export function allFrom(form: FormGroup, formErrors: any, validationMessages: any) {
  form.valueChanges.subscribe(data => {
    onInputValueChanged(form, formErrors, validationMessages);
  });
  onInputValueChanged(form, formErrors, validationMessages);
}

/**
   * 表单值改变处理错误信息方法
   * @param RegisterForm
   * @param formErrors
   */
export function onInputValueChanged(RegisterForm: FormGroup, formErrors: any, validationMessages: any) {
  if (!RegisterForm) {
    return;
  }
  const form = RegisterForm;
  for (const field in formErrors) {
    if (formErrors.hasOwnProperty(field)) {
      formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const message = validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key) && message[key]) {
            formErrors[field] += message[key];
          }
        }
      }
    }
  }
}

/**
 * 数组中判断删除
 * @param array 数组
 * @param checkAttribute  判断的属性
 * @param 例子 arr = [{name:'1',isChecked:true},{name:'2',isChecked:false,}]  deleteArray(arr,'isChecked')
 */
export function deleteArray(array: any, checkAttribute: string, ) {
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][checkAttribute]) {
        array.splice(i, 1)
        i--;
      }
    }
  } else {
    throw new Error('传入的类型错误');
  }
}

export function objDeleteType(box) {
  var obj = lodash.cloneDeep(box);
  Object.keys(obj).forEach(function (key) {
    obj[key] = '';
  });
  return obj;
}

export function updateEngineeringNo(array: Array<any>, length, id, no) {
  let result = {
    i: -1,
    index: - 2,
    no: '',
  };
  switch (length) {
    case 0:
      result.i = checkArrayString(array, 'value', id[length])
      result.no = array[result.i].ID
      break;

    case 1:
      result.i = checkArrayString(array[0].children, 'value', id[1])
      result.no = array[0].children[result.i].ID
      break;

    case 2:
      result.i = checkArrayString(array[0].children, 'value', id[1])
      result.index = checkArrayString(array[0].children[result.i].children, 'value', id[2])

      if (result.index == -1) {
        id.splice(id.length - 1, 1);
        result.no = array[0].children[result.i].ID
      } else {
        result.no = array[0].children[result.i].children[result.index].ID
      }
      break;

    default:
      break;
  }
  return result
}


/**
 * 数组中单独判断
 * @param array 数组
 * @param checkAttribute  判断的属性
 * @param 例子 arr = [{name:'1',isChecked:true},{name:'2',isChecked:false,}]
 * @param return  boolean
 */
export function checkArray(array: any, checkAttribute: string): boolean {
  let variable = false;
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][checkAttribute]) {
        variable = true;
        break;
      }
    }
  } else {
    throw new Error('传入的类型错误');
  }
  return variable;
}


/**
 * 数组中单独判断
 * @param array 数组
 * @param checkAttribute  判断的属性
 * @param typeString 校验的属性
 * @param return  boolean
 */
export function checkArrayString(array: any, arrayType, typeString: any): number {
  let index = -1;
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][arrayType] == typeString) {
        index = i;
        break;
      }
    }
  } else {
    throw new Error('传入的类型错误');
  }
  return index;
}

/**
 * 数组中单独判断
 * @param array 数组
 * @param checkAttribute  判断的属性
 * @param typeString 校验的属性
 * @param return  boolean
 */
export function arrayChecked(array: any): number {
  let index = -1;
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].checked) {
        index = i;
        break;
      }
    }
  } else {
    throw new Error('传入的类型错误');
  }
  return index;
}

/**
   * 单个删除
   * @param arrar 列表
   * @param subordinateattribute 对比的属性
   * @param record 对比的参数
   * @param st 刷新st
   */
export function removeSt(arrar: Array<any>, subordinateattribute: string, record: any, st: STComponent, ) {
  for (let i = 0; i < arrar.length; i++) {
    if (arrar[i][subordinateattribute] == record) {
      arrar.splice(i, 1);
      st.removeRow(record);
      //刷新当前页
      st.reload()
      break;
    }
  }
}

/**
 * 树形迭代
 * @param arr 数组
 */
export function classTreeChildrenArray(arr: Array<any>): Array<any> {
  arr.forEach(element => {
    element.label = element.Name;
    element.value = element.DomainId.toString();
    if (element.Children && element.Children.length > 0) {
      element.children = []
      element.children = element.Children
      classTreeChildrenArray(element.children)
    } else {
      element['isLeaf'] = true
    }
  });
  return arr;
}

export function newClassTreeChildrenArray(arr: Array<any>): Array<any> {
  arr.forEach(element => {
    element.label = element.Name;
    element.value = element.ID;
    element.areaIds = element.AreaIds[0]
    if (element.Children && element.Children.length > 0) {
      element.children = []
      element.children = element.Children
      newClassTreeChildrenArray(element.children)
    } else {
      element['isLeaf'] = true
    }
  });
  return arr;
}

/**
 * 一层的树形迭代
 * @param arr 数组
 */
export function classTreeArray(arr: Array<any>): Array<any> {
  arr.forEach(element => {
    element.title = element.name;
    element.key = element.id;
    if (element.children && element.children.length > 0) {
      classTreeArray(element.children)
    } else {
      element['isLeaf'] = true
    }
  });
  return arr;
}


/**
 * 数组的checked 是true
 * @param arr 数组
 */
export function arrarChecked(arr: Array<any>): Array<any> {
  let array = [];
  arr.forEach(element => {
    if (element.checked) {
      array.push(element.id)
    }
  });
  return array;
}

/**
 * 判断审核人的对象
 * @param item 对象
 * @param typeName 属性值
 * @param checkName auditorType对应的值  0是直接选人，1是条件选人 2是配置选人
 * @param arrList 第三方数组
 */
export function checkChooseItem(item: any, typeName: string, checkName: string, arrList: Array<any>, arrType = 'auditorClass_Id') {
  let box = {
    type: false,
    index: 0
  }
  let arr = arrList
  if (checkName != '') {
    // 先筛选   剔除对应的数据
    arr = arrList.filter(item => {
      return item.auditorType == checkName;
    })
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][arrType] == item[typeName]) {
      box.type = true
      box.index = i;
      break;
    }
  }
  return box;
}

/**
 * 判断审核人的对象
 * @param item 对象
 * @param typeName 属性值
 * @param checkName auditorType对应的值  0是直接选人，1是条件选人 2是配置选人
 * @param arrList 第三方数组
 */
export function checkChooseItemAttribute(item: any, typeName: string, checkName: string, arrList: Array<any>, arrType = 'auditorClass_Id', attribute, attributeValue) {
  let box = {
    type: false,
    index: 0
  }
  let arr = arrList
  if (checkName != '') {
    // 先筛选   剔除对应的数据
    arr = arrList.filter(item => {
      return item.auditorType == checkName;
    })
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][arrType] == item[typeName] && arr[i][attribute] == attributeValue) {
      box.type = true
      box.index = i;
      break;
    }
  }
  return box;
}


/**
 * 审核人数组的选中和不选中
 * @param arr 当前数组
 * @param type 判断是添加还是删除
 * @param arrList 第三方数组
 */
export function checkChooseArrar(arr: Array<any>, type: boolean, arrList: Array<any>, typeName: string, checkName: string, ) {
  if (arrList.length == 0) {
    arr.forEach(item => {
      arrList.push(item)
    })
  } else {
    arr.forEach((item, index) => {
      let box = checkChooseItem(item, typeName, checkName, arrList);
      //添加
      if (type) {
        if (!box.type) {
          arrList.push(item);
        }
        //减
      } else {
        if (box.type) {
          arrList.splice(box.index, 1);
        }
      }
    })
  }
}

/**
 * 数组的选中和不选中
 * @param arr 当前数组
 * @param type 判断是添加还是删除
 * @param arrList 第三方数组
 */
export function checkArrarIsNo(arr: Array<any>, type: boolean, arrList: Array<any>, typeName: string, checkName: string, ) {
  if (arrList.length == 0) {
    arr.forEach(item => {
      arrList.push(item)
    })
  } else {
    arr.forEach((item, index) => {
      let box = checkChooseItem(item, typeName, checkName, arrList);
      //添加
      if (type) {
        if (!box.type) {
          arrList.push(item);
        }
        //减
      } else {
        if (box.type) {
          arrList.splice(box.index, 1);
        }
      }
    })
  }
  return arrList;
}

/**
 * 骚操作 这个框架只认字符串  select的默认值
 */
export function anyString(name: any) {
  const box: any = name.toString();
  return box
}

/**
 * 删除最后一个逗号
 */
export function removeComma(str: string): string {
  return str.replace(/,$/gi, "");
}


export function createguid() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

/**
 * 创建uid
 */
export function createguidOld() {
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var chars = CHARS,
    uuid = [],
    i
  // rfc4122, version 4 form
  var r
  // rfc4122 requires these characters
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
  uuid[14] = '4'
  for (i = 0; i < 36; i++) {
    if (!uuid[i]) {
      r = 0 | (Math.random() * 16)
      uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
    }
  }

  var ret = uuid.join('')
  return ret
}

export function genID(length) {
  return Number(Math.random().toString().substr(0, length) + Date.now()).toString(50);
}

/**
 * 单选框
 * 根据对象删除子数组
 * @param v
 * @param item 对象
 * @param itemName 对象的属性值
 * @param itemChecked 对象的是否选中的属性值
 * @param List 第三方数组
 * @param ListName 第三方数组的属性值
 */
export function radioCheckChooseArrar(v: boolean, item: any, itemName: string, itemChecked: string, List: Array<any>, ListName: string) {
  if (List.length == 0) {
    List.push(item)
  } else {
    let box = checkChooseItem(item, itemName, '', List, ListName);
    //添加
    if (v) {

      //判断没有 并且已经选中的
      if (!box.type && item[itemChecked]) {
        List.push(item);

        //判断已经存在的 并且已经选中的
      } else if (box.type && item[itemChecked]) {
        List[box.index] = item;
      }
      //减
    } else {
      //判断已经存在的 并且已经去掉选中的
      if (box.type) {
        List.splice(box.index, 1);
      }
    }
  }
}


// //去除字符串两端空格
// export function removeSpace(str:String){
//   //  return str.replace(/\s*/g,"");
//   return str.replace(/^\s*|\s*$/g,"");
// }


