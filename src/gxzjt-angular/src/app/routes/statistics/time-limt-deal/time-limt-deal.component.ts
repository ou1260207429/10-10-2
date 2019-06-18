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
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    },
    { title: '地市', index: 'cityName' },
    { title: '区域', index: 'area' },
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode' },
    { title: '建设单位', index: 'companyName' },
    { title: '工程类型', index: 'flowPathType',type: 'tag', tag: {
      1: { text: '消防设计审查', color: '' },
      2: { text: '消防验收', color: '' },
      3:{ text: '竣工验收消防备案', color: '' },

    }},
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
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  search() {
    this.param.flowPathType=Number(this.fliterForm.controls.proType.value);
    if(this.param.flowPathType==0){
      this.param.flowPathType=-1;
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
        "startApplyTime": "2019-01-18T01:16:28.542Z",
        "endApplyTime": "2019-07-18T01:16:28.543Z",
        "dateTimeNow": "2019-06-18T01:16:28.543Z",
        "page": 1,
        "sorting": "CityName",
        "skipCount": 0,
        "maxResultCount": 10
      });

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
}
