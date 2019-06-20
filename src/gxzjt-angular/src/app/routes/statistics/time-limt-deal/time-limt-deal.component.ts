import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';
import { StatisticalServiceServiceProxy, HandleLimitQueryDto } from '@shared/service-proxies/service-proxies';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatisticsTimeLimtDealDetailComponent } from '../time-limt-deal-detail/time-limt-deal-detail.component';

@Component({
  selector: 'app-statistics-time-limt-deal',
  templateUrl: './time-limt-deal.component.html',
  styleUrls: ['./time-limt-deal.less']
})
export class StatisticsTimeLimtDealComponent implements OnInit {
  searchKey = '';
  selectedValuePro = "";
  fliterForm: FormGroup;
  hiddenFliter = false;
  formData = {};
  formResultData = [];
  rangeTime = [];
  param = new HandleLimitQueryDto();
  cityarray = [
    {
      value: 450100,
      label: "南宁市",
      parent: 450000,
      children: [
        {
          value: 450102,
          label: "兴宁区",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450103,
          label: "青秀区",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450105,
          label: "江南区",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450107,
          label: "西乡塘区",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450108,
          label: "良庆区",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450109,
          label: "邕宁区",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450122,
          label: "武鸣县",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450123,
          label: "隆安县",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450124,
          label: "马山县",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450125,
          label: "上林县",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450126,
          label: "宾阳县",
          parent: 450100,
          isLeaf: true
        },
        {
          value: 450127,
          label: "横县",
          parent: 450100,
          isLeaf: true
        }
      ]
    },
    {
      value: 450200,
      label: "柳州市",
      parent: 450000,
      children: [
        {
          value: 450202,
          label: "城中区",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450203,
          label: "鱼峰区",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450204,
          label: "柳南区",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450205,
          label: "柳北区",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450221,
          label: "柳江县",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450222,
          label: "柳城县",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450223,
          label: "鹿寨县",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450224,
          label: "融安县",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450225,
          label: "融水苗族自治县",
          parent: 450200,
          isLeaf: true
        },
        {
          value: 450226,
          label: "三江侗族自治县",
          parent: 450200,
          isLeaf: true
        }
      ]
    },
    {
      value: 450300,
      label: "桂林市",
      parent: 450000,
      children: [
        {
          value: 450302,
          label: "秀峰区",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450303,
          label: "叠彩区",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450304,
          label: "象山区",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450305,
          label: "七星区",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450311,
          label: "雁山区",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450321,
          label: "阳朔县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450322,
          label: "临桂区",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450323,
          label: "灵川县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450324,
          label: "全州县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450325,
          label: "兴安县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450326,
          label: "永福县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450327,
          label: "灌阳县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450328,
          label: "龙胜各族自治县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450329,
          label: "资源县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450330,
          label: "平乐县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450331,
          label: "荔浦县",
          parent: 450300,
          isLeaf: true
        },
        {
          value: 450332,
          label: "恭城瑶族自治县",
          parent: 450300,
          isLeaf: true
        }
      ]
    },
    {
      value: 450400,
      label: "梧州市",
      parent: 450000,
      children: [
        {
          value: 450403,
          label: "万秀区",
          parent: 450400,
          isLeaf: true
        },
        {
          value: 450404,
          label: "蝶山区",
          parent: 450400,
          isLeaf: true
        },
        {
          value: 450405,
          label: "长洲区",
          parent: 450400,
          isLeaf: true
        },
        {
          value: 450421,
          label: "苍梧县",
          parent: 450400,
          isLeaf: true
        },
        {
          value: 450422,
          label: "藤县",
          parent: 450400,
          isLeaf: true
        },
        {
          value: 450423,
          label: "蒙山县",
          parent: 450400,
          isLeaf: true
        },
        {
          value: 450481,
          label: "岑溪市",
          parent: 450400,
          isLeaf: true
        }
      ]
    },
    {
      value: 450500,
      label: "北海市",
      parent: 450000,
      children: [
        {
          value: 450502,
          label: "海城区",
          parent: 450500,
          isLeaf: true
        },
        {
          value: 450503,
          label: "银海区",
          parent: 450500,
          isLeaf: true
        },
        {
          value: 450512,
          label: "铁山港区",
          parent: 450500,
          isLeaf: true
        },
        {
          value: 450521,
          label: "合浦县",
          parent: 450500,
          isLeaf: true
        }
      ]
    },
    {
      value: 450600,
      label: "防城港市",
      parent: 450000,
      children: [
        {
          value: 450602,
          label: "港口区",
          parent: 450600,
          isLeaf: true
        },
        {
          value: 450603,
          label: "防城区",
          parent: 450600,
          isLeaf: true
        },
        {
          value: 450621,
          label: "上思县",
          parent: 450600,
          isLeaf: true
        },
        {
          value: 450681,
          label: "东兴市",
          parent: 450600,
          isLeaf: true
        }
      ]
    },
    {
      value: 450700,
      label: "钦州市",
      parent: 450000,
      children: [
        {
          value: 450702,
          label: "钦南区",
          parent: 450700,
          isLeaf: true
        },
        {
          value: 450703,
          label: "钦北区",
          parent: 450700,
          isLeaf: true
        },
        {
          value: 450721,
          label: "灵山县",
          parent: 450700,
          isLeaf: true
        },
        {
          value: 450722,
          label: "浦北县",
          parent: 450700,
          isLeaf: true
        }
      ]
    },
    {
      value: 450800,
      label: "贵港市",
      parent: 450000,
      children: [
        {
          value: 450802,
          label: "港北区",
          parent: 450800,
          isLeaf: true
        },
        {
          value: 450803,
          label: "港南区",
          parent: 450800,
          isLeaf: true
        },
        {
          value: 450804,
          label: "覃塘区",
          parent: 450800,
          isLeaf: true
        },
        {
          value: 450821,
          label: "平南县",
          parent: 450800,
          isLeaf: true
        },
        {
          value: 450881,
          label: "桂平市",
          parent: 450800,
          isLeaf: true
        }
      ]
    },
    {
      value: 450900,
      label: "玉林市",
      parent: 450000,
      children: [
        {
          value: 450902,
          label: "玉州区",
          parent: 450900,
          isLeaf: true
        },
        {
          value: 450921,
          label: "容县",
          parent: 450900,
          isLeaf: true
        },
        {
          value: 450922,
          label: "陆川县",
          parent: 450900,
          isLeaf: true
        },
        {
          value: 450923,
          label: "博白县",
          parent: 450900,
          isLeaf: true
        },
        {
          value: 450924,
          label: "兴业县",
          parent: 450900,
          isLeaf: true
        },
        {
          value: 450981,
          label: "北流市",
          parent: 450900,
          isLeaf: true
        }
      ]
    },
    {
      value: 451000,
      label: "百色市",
      parent: 450000,
      children: [
        {
          value: 451002,
          label: "右江区",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451021,
          label: "田阳县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451022,
          label: "田东县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451023,
          label: "平果县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451024,
          label: "德保县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451025,
          label: "靖西县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451026,
          label: "那坡县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451027,
          label: "凌云县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451028,
          label: "乐业县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451029,
          label: "田林县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451030,
          label: "西林县",
          parent: 451000,
          isLeaf: true
        },
        {
          value: 451031,
          label: "隆林各族自治县",
          parent: 451000,
          isLeaf: true
        }
      ]
    },
    {
      value: 451100,
      label: "贺州市",
      parent: 450000,
      children: [
        {
          value: 451102,
          label: "八步区",
          parent: 451100,
          isLeaf: true
        },
        {
          value: 451121,
          label: "昭平县",
          parent: 451100,
          isLeaf: true
        },
        {
          value: 451122,
          label: "钟山县",
          parent: 451100,
          isLeaf: true
        },
        {
          value: 451123,
          label: "富川瑶族自治县",
          parent: 451100,
          isLeaf: true
        }
      ]
    },
    {
      value: 451200,
      label: "河池市",
      parent: 450000,
      children: [
        {
          value: 451202,
          label: "金城江区",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451221,
          label: "南丹县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451222,
          label: "天峨县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451223,
          label: "凤山县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451224,
          label: "东兰县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451225,
          label: "罗城仫佬族自治县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451226,
          label: "环江毛南族自治县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451227,
          label: "巴马瑶族自治县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451228,
          label: "都安瑶族自治县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451229,
          label: "大化瑶族自治县",
          parent: 451200,
          isLeaf: true
        },
        {
          value: 451281,
          label: "宜州市",
          parent: 451200,
          isLeaf: true
        }
      ]
    },
    {
      value: 451300,
      label: "来宾市",
      parent: 450000,
      children: [
        {
          value: 451302,
          label: "兴宾区",
          parent: 451300,
          isLeaf: true
        },
        {
          value: 451321,
          label: "忻城县",
          parent: 451300,
          isLeaf: true
        },
        {
          value: 451322,
          label: "象州县",
          parent: 451300,
          isLeaf: true
        },
        {
          value: 451323,
          label: "武宣县",
          parent: 451300,
          isLeaf: true
        },
        {
          value: 451324,
          label: "金秀瑶族自治县",
          parent: 451300,
          isLeaf: true
        },
        {
          value: 451381,
          label: "合山市",
          parent: 451300,
          isLeaf: true
        }
      ]
    },
    {
      value: 451400,
      label: "崇左市",
      parent: 450000,
      children: [
        {
          value: 451402,
          label: "江洲区",
          parent: 451400,
          isLeaf: true
        },
        {
          value: 451421,
          label: "扶绥县",
          parent: 451400,
          isLeaf: true
        },
        {
          value: 451422,
          label: "宁明县",
          parent: 451400,
          isLeaf: true
        },
        {
          value: 451423,
          label: "龙州县",
          parent: 451400,
          isLeaf: true
        },
        {
          value: 451424,
          label: "大新县",
          parent: 451400,
          isLeaf: true
        },
        {
          value: 451425,
          label: "天等县",
          parent: 451400,
          isLeaf: true
        },
        {
          value: 451481,
          label: "凭祥市",
          parent: 451400,
          isLeaf: true
        }
      ]
    }
  ]
  selectedcity;//存市
  countyarray;//存县数组
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: StatisticsTimeLimtDealDetailComponent,
            paramsName: 'record',
          },
          click: (record: any, modal: any) => {

          },
        },
        // {
        //   text: '测试',
        //   type: 'link',
        //   click: (record: any, modal: any) => {

        //   }
        // },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    },
    { title: '地市', index: 'cityName' },
    { title: '区域', index: 'area' },
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode' },
    { title: '建设单位', index: 'companyName' },
    {
      title: '工程类型', index: 'flowPathType', type: 'tag', tag: {
        1: { text: '消防设计审查', color: '' },
        2: { text: '消防验收', color: '' },
        3: { text: '竣工验收消防备案', color: '' },

      }
    },
    { title: '当前处理人', index: 'applyName' },
    { title: '流程到达时间', index: 'applyTime' },
    { title: '流程处理时间', index: 'acceptTime' },
    { title: '超时时长', index: 'approvalRemainingTime' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService) { }

  ngOnInit() {
    this.resetTime();
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    this.getList();
  }

  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }

  refresh() {
    this.getList();
  }
  search() {
    this.param.cityName = this.fliterForm.controls.city.value;
    debugger
    this.param.area = this.fliterForm.controls.count.value;
    this.param.flowPathType = Number(this.fliterForm.controls.proType.value);
    if (this.param.flowPathType == 0) {
      this.param.flowPathType = -1;
    }
    this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetHandleLimitList(this.param).subscribe((result: any) => {
      if (result.data) {
        this.formResultData = result.data;
      } else {
        this.formResultData = [];
      }
      this.st.reload()
    }, err => {
      console.log(err);
      this.st.reload()

    });

  }

  resetForm(): void {
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
  }

  addview() {

  }

  // exportXlsx() {
  //   const expData = [this.columns.map(i => i.title)];

  //   expData.push(['1', '1', '1', '1',]);

  //   this.xlsx.export({
  //     sheets: [
  //       {
  //         data: expData,
  //         name: 'sheet name',
  //       },
  //     ],
  //   });
  // }
  getList() {


    this.param.init(

      {
        "cityName": "",
        "area": "",
        "flowPathType": -1,
        "startApplyTime": "",
        "endApplyTime": "",
        "dateTimeNow": "",
        "page": 1,
        "sorting": "CityName",
        "skipCount": 0,
        "maxResultCount": 1000
      });
      this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
      this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetHandleLimitList(this.param).subscribe((result: any) => {
      this.formResultData = result.data;
    }, err => {
      console.log(err);

    });
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 1)
    this.rangeTime = [startTime, new Date()];
  }
  cityChange(e) {
    this.fliterForm = this.formBuilder.group({
      city: [e],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    this.countyarray = []
    this.cityarray.forEach(element => {
      if (element.label == e) {
        this.countyarray = element.children
      }

    });

  }
}
