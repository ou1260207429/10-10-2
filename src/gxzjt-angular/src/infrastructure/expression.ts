
///通用变量
import { STPage, STComponent } from "@delon/abc";


export const FLOW_SERVICES_URL = 'http://localhost:3521'

///通用变量
export let publicPageConfig: STPage = {
  front: false,
  show: true,
  placement: 'center',
  // showSize: true,
  // pageSizes: [5, 10, 25, 50, 100],
  pageSizes: [25, 50, 100, 500, 1000],
  showQuickJumper: true,
  total: '当前页{{range[1]}}条  共 {{total}} 条',
};

/**
 * @param event 根据点击分页传回来的值
 * @param params 请求的参数
 * @param then  回调方法
 */
export function pageOnChange(event: any, params: publicParamsModel, then?: Function) {
  if (event.type === 'pi' || event.type === 'ps') {
    params.page = event.pi;
    params.MaxResultCount = event.ps;
    if (then) { then() }
  }
}

let _self: any;
export function getSelf() {
  return _self;
}
export function setSelf(box) {
  return _self = box;
}

export let publicParams: publicParamsModel = {
  page: 1,
  MaxResultCount: 10,
}

export let publicTemplateInfoListByClassIdEntity = {
  page: 1,
  MaxResultCount: 10,
  // WorkFlow_ClassID: '',
  // FilterText: '',
  // Sorting: '',
  // SkipCount:0,
}

//分页模型
export interface publicParamsModel {
  page?: number,
  MaxResultCount?: number,
}

export let SystenNameEnum = [
  { label: '公用系统' },
  { label: 'OA系统' },
  { label: '经营支撑系统' },
  { label: '项目队派单' },
  { label: '项目管理' },
  { label: 'HR系统' },
  { label: '客户关系管理系统' },
  { label: '房屋租赁管理系统' },
  { label: '车辆管理' },
  { label: '考试管理系统' },
  { label: '物资管理系统V2' },
  { label: '报账二期' },
  { label: '智能工地系统' },
  { label: '档案管理系统' },
  { label: '房屋租赁管理系统V2' },
  { label: 'BSSV2' },
  { label: '项目管理V2' },
]


export let DataTypeEnum = [
  { label: 'string', value: 'string' },
  { label: 'int', value: 'int' },
  { label: 'datetime', value: 'datetime' },
  { label: 'decimal', value: 'decimal' },
]

export let CustomFromTypeEnum = [
  { label: '输入框', value: 'text', dataType: 'string' },
  { label: '数字输', value: 'inputNumber', dataType: 'decimal' },
  { label: '日期框', value: 'datePicker', dataType: 'date' },
]

export let selectExpression = [
  { value: '1', label: '等于' },
  { value: '2', label: '不等于' },
  { value: '3', label: '大于' },
  { value: '4', label: '大于等于' },
  { value: '5', label: '小于' },
  { value: '6', label: '小于等于' },
  { value: '7', label: '包含' },
  { value: '8', label: '不包含' },
]

export let versionSelect = [
  { label: 'v1', value: 'v1' },
  { label: 'v2', value: 'v2' },
  { label: 'v3', value: 'v3' },
  { label: 'v4', value: 'v4' },
  { label: 'v5', value: 'v5' },
  { label: 'v6', value: 'v6' },
  { label: 'v7', value: 'v7' },
  { label: 'v8', value: 'v8' },
  { label: 'v9', value: 'v9' },
  { label: 'v10', value: 'v10' },
  { label: 'v11', value: 'v11' },
  { label: 'v12', value: 'v12' },
  { label: 'v13', value: 'v13' },
  { label: 'v14', value: 'v14' },
  { label: 'v15', value: 'v15' },
  { label: 'v16', value: 'v16' },
  { label: 'v17', value: 'v17' },
  { label: 'v18', value: 'v18' },
  { label: 'v19', value: 'v19' },
  { label: 'v20', value: 'v20' },
]

export let runStateEnum = {
  0: { text: '草稿', color: '' },
  1: { text: '启用中', color: 'green' },
  2: { text: '停用', color: 'red' },
}


export let conditionEnum = {
  1: { color: '', text: '等于' },
  2: { color: '', text: '不等于' },
  3: { color: '', text: '大于' },
  4: { color: '', text: '大于等于' },
  5: { color: '', text: '小于' },
  6: { color: '', text: '小于等于' },
  7: { color: '', text: '包含' },
  8: { color: '', text: '不包含' },
}

export let WorkFlowedStateEnum = {
  0: { color: '', text: '处理中' },
  1: { color: '', text: '异常' },
  2: { color: '', text: '撤销' },
  3: { color: '', text: '已完成' },
  4: { color: '', text: '缺少审批人' },
  5: { color: '', text: '已驳回' },
}
