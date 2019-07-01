import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper, DatePipe } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';
import { StatisticalServiceServiceProxy, HandleLimitQueryDto } from '@shared/service-proxies/service-proxies';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatisticsTimeLimtDealDetailComponent } from '../time-limt-deal-detail/time-limt-deal-detail.component';
import { UserRightService } from '../../userright/userright.service';



var  datePipe=new  DatePipe();
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
  cityarray =[] ;
  selectedcity;//存市
  countyarray;//存县数组
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    // {
    //   title: '操作',
    //   buttons: [
    //     {
    //       text: '查看',
    //       type: 'modal',
    //       modal: {
    //         component: StatisticsTimeLimtDealDetailComponent,
    //         paramsName: 'record',
    //       },
    //       click: (record: any, modal: any) => {

    //       },
    //     },
    //     // {
    //     //   text: '测试',
    //     //   type: 'link',
    //     //   click: (record: any, modal: any) => {

    //     //   }
    //     // },
    //     // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
    //   ]
    // },
    { title: '地市', index: 'cityName' },
    // { title: '区域', index: 'area' },
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode' },
    { title: '建设单位', index: 'companyName' },
    { title: '工程类型', index: 'flowPathType',format:(item:any)=>`${item.flowPathType==1?"消防设计审查":(item.flowPathType==2?"消防验收":"竣工验收消防备案")}`, type: 'tag', tag: {
        "消防设计审查": { text: '消防设计审查', color: '' },
        "消防验收": { text: '消防验收', color: '' },
        "竣工验收消防备案": { text: '竣工验收消防备案', color: '' },

      }
    },
    { title: '当前处理人', index: 'currentHandleUserName' },
    { title: '申报时间', index: 'applyTime',type:'date' },
    { title: '流程结束时间', index: 'endTime',format:(item:any)=>`${item.endTime=='0001-01-01T00:00:00'?'':datePipe.transform(item.endTime, 'YYYY-MM-DD HH:mm:ss')}`,type:'date'},
    { title: '超时时长', index: 'approvalRemainingTime' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private UserRightService: UserRightService,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,

    private xlsx: XlsxService) {
      this.getCityList();
     }

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
    this.search();
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
        "maxResultCount": 3000
      });
      this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
      this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetHandleLimitList(this.param).subscribe((result: any) => {
      this.formResultData = result.data;
    }, err => {
      console.log(err);

    });
  }
  getCityList() {
    this.UserRightService.GetAreaDropdown().subscribe(
      res => {

        this.cityarray=JSON.parse(res.result).Children
      },
    );

  }

  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
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
      if (element.Name == e) {
        this.countyarray = element.Children
      }

    });

  }
}
