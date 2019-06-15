
///通用变量
import { STPage, STComponent } from "@delon/abc";


export const FLOW_SERVICES_URL = 'http://222.84.250.158:8111'

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

export let RefractoryEnum = [
  { label: '一级', value: '一级' },
  { label: '二级', value: '二级' },
  { label: '三级', value: '三级' },
  { label: '四级', value: '四级' },
]

export const ArchitectureTypeEnum = [
  { label: '混凝土结构。包括素混凝土结构、钢筋混凝土结构和预应力混凝土结构', value: '混凝土结构。包括素混凝土结构、钢筋混凝土结构和预应力混凝土结构' },
  { label: '砌体结构', value: '砌体结构' },
  { label: '钢结构', value: '钢结构' },
  { label: '木结构', value: '木结构' }
]

/**
 * 市县区的json 
 */
export const OptionsEnum = [
  {
    value: '广西',
    label: '广西',
    children: [{
      value: '南宁',
      label: '南宁',
      children: [{
        value: '青秀区',
        label: '青秀区',
        isLeaf: true
      },
      {
        value: '兴宁区',
        label: '兴宁区',
        isLeaf: true
      },
      {
        value: '西乡塘区',
        label: '西乡塘区',
        isLeaf: true
      },
      {
        value: '良庆区',
        label: '良庆区',
        isLeaf: true
      },
      {
        value: '江南区',
        label: '江南区',
        isLeaf: true
      },
      {
        value: '邕宁区',
        label: '邕宁区',
        isLeaf: true
      },
      {
        value: '武鸣县',
        label: '武鸣县',
        isLeaf: true
      },
      {
        value: '隆安县',
        label: '隆安县',
        isLeaf: true
      },
      {
        value: '马山县',
        label: '马山县',
        isLeaf: true
      },
      {
        value: '上林县',
        label: '上林县',
        isLeaf: true
      },
      {
        value: '宾阳县',
        label: '宾阳县',
        isLeaf: true
      },
      {
        value: '横县',
        label: '横县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '柳州',
      label: '柳州',
      children: [{
        value: '城中区',
        label: '城中区',
        isLeaf: true
      },
      {
        value: '鱼峰区',
        label: '鱼峰区',
        isLeaf: true
      },
      {
        value: '柳北区',
        label: '柳北区',
        isLeaf: true
      },
      {
        value: '柳南区',
        label: '柳南区',
        isLeaf: true
      },
      {
        value: '柳江县',
        label: '柳江县',
        isLeaf: true
      },
      {
        value: '柳城县',
        label: '柳城县',
        isLeaf: true
      },
      {
        value: '鹿寨县',
        label: '鹿寨县',
        isLeaf: true
      },
      {
        value: '融安县',
        label: '融安县',
        isLeaf: true
      },
      {
        value: '融水苗族自治县',
        label: '融水苗族自治县',
        isLeaf: true
      },
      {
        value: '三江侗族自治县',
        label: '三江侗族自治县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '桂林',
      label: '桂林',
      children: [{
        value: '象山区',
        label: '象山区',
        isLeaf: true
      },
      {
        value: '秀峰区',
        label: '秀峰区',
        isLeaf: true
      },
      {
        value: '叠彩区',
        label: '叠彩区',
        isLeaf: true
      },
      {
        value: '七星区',
        label: '七星区',
        isLeaf: true
      },
      {
        value: '雁山区',
        label: '雁山区',
        isLeaf: true
      },
      {
        value: '阳朔县',
        label: '阳朔县',
        isLeaf: true
      },
      {
        value: '临桂县',
        label: '临桂县',
        isLeaf: true
      },
      {
        value: '灵川县',
        label: '灵川县',
        isLeaf: true
      },
      {
        value: '全州县',
        label: '全州县',
        isLeaf: true
      },
      {
        value: '平乐县',
        label: '平乐县',
        isLeaf: true
      },
      {
        value: '兴安县',
        label: '兴安县',
        isLeaf: true
      },
      {
        value: '灌阳县',
        label: '灌阳县',
        isLeaf: true
      },
      {
        value: '荔浦县',
        label: '荔浦县',
        isLeaf: true
      },
      {
        value: '资源县',
        label: '资源县',
        isLeaf: true
      },
      {
        value: '永福县',
        label: '永福县',
        isLeaf: true
      },
      {
        value: '龙胜各族自治县',
        label: '龙胜各族自治县',
        isLeaf: true
      },
      {
        value: '恭城瑶族自治县',
        label: '恭城瑶族自治县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '梧州',
      label: '梧州',
      children: [{
        value: '万秀区',
        label: '万秀区',
        isLeaf: true
      },
      {
        value: '蝶山区',
        label: '蝶山区',
        isLeaf: true
      },
      {
        value: '长洲区',
        label: '长洲区',
        isLeaf: true
      },
      {
        value: '岑溪市',
        label: '岑溪市',
        isLeaf: true
      },
      {
        value: '苍梧县',
        label: '苍梧县',
        isLeaf: true
      },
      {
        value: '藤县',
        label: '藤县',
        isLeaf: true
      },
      {
        value: '蒙山县',
        label: '蒙山县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '北海',
      label: '北海',
      children: [{
        value: '海城区',
        label: '海城区',
        isLeaf: true
      },
      {
        value: '银海区',
        label: '银海区',
        isLeaf: true
      },
      {
        value: '铁山港区',
        label: '铁山港区',
        isLeaf: true
      },
      {
        value: '合浦县',
        label: '合浦县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '防城港',
      label: '防城港',
      children: [{
        value: '港口区',
        label: '港口区',
        isLeaf: true
      },
      {
        value: '防城区',
        label: '防城区',
        isLeaf: true
      },
      {
        value: '东兴市',
        label: '东兴市',
        isLeaf: true
      },
      {
        value: '上思县',
        label: '上思县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '钦州',
      label: '钦州',
      children: [{
        value: '钦南区',
        label: '钦南区',
        isLeaf: true
      },
      {
        value: '钦北区',
        label: '钦北区',
        isLeaf: true
      },
      {
        value: '灵山县',
        label: '灵山县',
        isLeaf: true
      },
      {
        value: '浦北县',
        label: '浦北县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '贵港',
      label: '贵港',
      children: [{
        value: '港北区',
        label: '港北区',
        isLeaf: true
      },
      {
        value: '港南区',
        label: '港南区',
        isLeaf: true
      },
      {
        value: '覃塘区',
        label: '覃塘区',
        isLeaf: true
      },
      {
        value: '桂平市',
        label: '桂平市',
        isLeaf: true
      },
      {
        value: '平南县',
        label: '平南县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '玉林',
      label: '玉林',
      children: [{
        value: '玉州区',
        label: '玉州区',
        isLeaf: true
      },
      {
        value: '北流市',
        label: '北流市',
        isLeaf: true
      },
      {
        value: '容县',
        label: '容县',
        isLeaf: true
      },
      {
        value: '陆川县',
        label: '陆川县',
        isLeaf: true
      },
      {
        value: '博白县',
        label: '博白县',
        isLeaf: true
      },
      {
        value: '兴业县',
        label: '兴业县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '百色',
      label: '百色',
      children: [{
        value: '右江区',
        label: '右江区',
        isLeaf: true
      },
      {
        value: '凌云县',
        label: '凌云县',
        isLeaf: true
      },
      {
        value: '平果县',
        label: '平果县',
        isLeaf: true
      },
      {
        value: '西林县',
        label: '西林县',
        isLeaf: true
      },
      {
        value: '乐业县',
        label: '乐业县',
        isLeaf: true
      },
      {
        value: '德保县',
        label: '德保县',
        isLeaf: true
      },
      {
        value: '田林县',
        label: '田林县',
        isLeaf: true
      },
      {
        value: '田阳县',
        label: '田阳县',
        isLeaf: true
      },
      {
        value: '靖西县',
        label: '靖西县',
        isLeaf: true
      },
      {
        value: '田东县',
        label: '田东县',
        isLeaf: true
      },
      {
        value: '那坡县',
        label: '那坡县',
        isLeaf: true
      },
      {
        value: '隆林各族自治县',
        label: '隆林各族自治县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '贺州',
      label: '贺州',
      children: [{
        value: '八步区',
        label: '八步区',
        isLeaf: true
      },
      {
        value: '钟山县',
        label: '钟山县',
        isLeaf: true
      },
      {
        value: '昭平县',
        label: '昭平县',
        isLeaf: true
      },
      {
        value: '富川瑶族自治县',
        label: '富川瑶族自治县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '河池',
      label: '河池',
      children: [{
        value: '金城江区',
        label: '金城江区',
        isLeaf: true
      },
      {
        value: '宜州市',
        label: '宜州市',
        isLeaf: true
      },
      {
        value: '天峨县',
        label: '天峨县',
        isLeaf: true
      },
      {
        value: '凤山县',
        label: '凤山县',
        isLeaf: true
      },
      {
        value: '南丹县',
        label: '南丹县',
        isLeaf: true
      },
      {
        value: '东兰县',
        label: '东兰县',
        isLeaf: true
      },
      {
        value: '都安瑶族自治县',
        label: '都安瑶族自治县',
        isLeaf: true
      },
      {
        value: '罗城仫佬族自治县',
        label: '罗城仫佬族自治县',
        isLeaf: true
      },
      {
        value: '巴马瑶族自治县',
        label: '巴马瑶族自治县',
        isLeaf: true
      },
      {
        value: '环江毛南族自治县',
        label: '环江毛南族自治县',
        isLeaf: true
      },
      {
        value: '大化瑶族自治县',
        label: '大化瑶族自治县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '来宾',
      label: '来宾',
      children: [{
        value: '兴宾区',
        label: '兴宾区',
        isLeaf: true
      },
      {
        value: '合山市',
        label: '合山市',
        isLeaf: true
      },
      {
        value: '象州县',
        label: '象州县',
        isLeaf: true
      },
      {
        value: '武宣县',
        label: '武宣县',
        isLeaf: true
      },
      {
        value: '忻城县',
        label: '忻城县',
        isLeaf: true
      },
      {
        value: '金秀瑶族自治县',
        label: '金秀瑶族自治县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '崇左',
      label: '崇左',
      children: [{
        value: '江州区',
        label: '江州区',
        isLeaf: true
      },
      {
        value: '凭祥市',
        label: '凭祥市',
        isLeaf: true
      },
      {
        value: '宁明县',
        label: '宁明县',
        isLeaf: true
      },
      {
        value: '扶绥县',
        label: '扶绥县',
        isLeaf: true
      },
      {
        value: '龙州县',
        label: '龙州县',
        isLeaf: true
      },
      {
        value: '大新县',
        label: '大新县',
        isLeaf: true
      },
      {
        value: '天等县',
        label: '天等县',
        isLeaf: true
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }],
    },
    {
      value: '其他',
      label: '其他',
      children: [{
        value: '其他',
        label: '其他',
        isLeaf: true
      }]
    }],
  },
]