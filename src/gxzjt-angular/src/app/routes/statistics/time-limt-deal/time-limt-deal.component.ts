import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper, DatePipe } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';
import { StatisticalServiceServiceProxy, HandleLimitQueryDto } from '@shared/service-proxies/service-proxies';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatisticsTimeLimtDealDetailComponent } from '../time-limt-deal-detail/time-limt-deal-detail.component';
import { UserRightService } from '../../userright/userright.service';
import * as moment from 'moment';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { timeTrans } from 'infrastructure/regular-expression';


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
  total=100;
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
    { title: '地市', index: 'cityName',width:'120px' },
    // { title: '区域', index: 'area' },
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode' },
    { title: '建设单位', index: 'companyName' },
    { title: '工程类型', index: 'flowPathType',width:'120px',format:(item:any)=>`${item.flowPathType==1?"消防设计审查":(item.flowPathType==2?"消防验收":"竣工验收消防备案")}`, type: 'tag', tag: {
        "消防设计审查": { text: '消防设计审查', color: '' },
        "消防验收": { text: '消防验收', color: '' },
        "竣工验收消防备案": { text: '竣工验收消防备案', color: '' },

      }
    },
    { title: '当前处理人', index: 'currentHandleUserName',width:'120px' },
    { title: '申报时间', index: 'applyTime',type:'date',width:'120px' },
    { title: '流程结束时间', index: 'endTime',width:'120px',format:(item:any)=>`${item.endTime=='0001-01-01T00:00:00'?'':datePipe.transform(item.endTime, 'YYYY-MM-DD HH:mm:ss')}`,type:'date'},
    { title: '超时时长', index: 'approvalRemainingTime',width:'120px' },
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
    this.param.page=1;
    this.param.maxResultCount=3000;

    this.resetTime();
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    // this.getList();
    this.search();
  }

  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }

  refresh() {
    this.getList();
  }
  search() {
    if(this.fliterForm.controls.city.value){
      this.param.cityName = this.fliterForm.controls.city.value;
    }
    if(this.fliterForm.controls.count.value){
      this.param.area = this.fliterForm.controls.count.value;
    }

    this.param.flowPathType = Number(this.fliterForm.controls.proType.value);
      if (this.param.flowPathType == 0) {
        this.param.flowPathType = -1;
      }
    // this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    // this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
    // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
    if(this.fliterForm.controls.dateRange.value.length!=0){
      // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
      // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
      this.param.startApplyTime=timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
      this.param.endApplyTime =timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
    }else{
      this.param.startApplyTime='';
      this.param.endApplyTime='';
    }
    this.statisticalServiceServiceProxy.post_GetHandleLimitList(this.param).subscribe((result: any) => {
      if(result.data){
         this.formResultData = result.data;
         this.total=result;
         console.log(this.total)
      }else{
        this.formResultData=[];
      }
      this.st.reload()
    }, err => {
      console.log(err);
      this.st.reload()

    });
  }
  // search() {

  //   this.param.cityName = this.fliterForm.controls.city.value;
  //   this.param.area = this.fliterForm.controls.count.value;
  //   this.param.flowPathType = Number(this.fliterForm.controls.proType.value);
  //   if (this.param.flowPathType == 0) {
  //     this.param.flowPathType = -1;
  //   }
  //   this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
  //   this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
  //    this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
  //   this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);

  //   this.statisticalServiceServiceProxy.post_GetHandleLimitList(this.param).subscribe((result: any) => {
  //     if (result.data) {
  //       this.formResultData = result.data;
  //       this.total=result;
  //       console.log(this.total)
  //     } else {
  //       this.formResultData = [];
  //     }

  //   }, err => {
  //     console.log(err);


  //   });


  // }

  resetForm(): void {
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
  // getList() {
  //     // this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
  //     // this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
  //     this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
  //     this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
  //   this.statisticalServiceServiceProxy.post_GetHandleLimitList(this.param).subscribe((result: any) => {
  //     this.formResultData = result.data;
  //     // this.total=result.total;
  //     debugger
  //   }, err => {
  //     console.log(err);

  //   });


  // }
  getList() {
    // this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    // this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
    // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
    this.param.startApplyTime=timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
    this.param.endApplyTime =timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
    this.statisticalServiceServiceProxy.post_GetHandleLimitList(this.param).subscribe((result: any) => {
    this.formResultData = result;
    this.total=result.total;
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
    // this.fliterForm = this.formBuilder.group({
    //   city: [e],
    //   count: [null],
    //   proNo: [null],
    //   proName: [null],
    //   proType: [null],
    //   dateRange: [this.rangeTime],

    // });
    this.countyarray = []
    this.cityarray.forEach(element => {
      if (element.Name == e) {
        this.countyarray = element.Children
      }

    });

  }
  change(v) {
    pageOnChange(v, this.param, () => {
      this.getList();
    })
  }
}
