import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatisticsWarningCenterDetailComponent } from '../warning-center-detail/warning-center-detail.component';
import { StatisticalServiceServiceProxy, WarningCenterQueryDto } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-statistics-warning-center',
  templateUrl: './warning-center.component.html',
  styleUrls: ['./warning-center.component.less'],
})
export class StatisticsWarningCenterComponent implements OnInit {
  param = new WarningCenterQueryDto();
  searchKey = '';
  selectedValuePro = "";
  fliterForm: FormGroup;
  hiddenFliter = false;
  formResultData = [];
  rangeTime = [];

  formData = {};
  // i = {
  //   start: '2019-02-17T08:51:45.854Z',
  //   end: '2019-06-17T08:51:45.854Z',
  // };


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: StatisticsWarningCenterDetailComponent,
            paramsName: 'record',
          },
          click: (record: any, modal: any) => {

          },
        },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    },
    { title: '工程类型', index: 'flowPathType',type: 'tag', tag: {
      1: { text: '消防设计审查', color: '' },
      2: { text: '消防验收', color: '' },
      3:{ text: '激竣工验收消防备案活', color: '' },
    }},
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode' },
    { title: '建设单位', index: 'companyName' },
    // {
    //   title: '节点名称', index: 'flowPathType',
    //   sort: {
    //     compare: (a, b) => a.node > b.node ? 1 : 0,
    //   },
    //   filter: {
    //     menus: [
    //       { text: '初审', value: 0 },
    //       { text: '复审', value: 1 },
    //       { text: '审核完毕', value: 2 },
    //     ],
    //     fn: (filter: any, record: any) =>
    //       record.node >= filter.value[0] && record.node <= filter.value[1],
    //     multiple: false,
    //   }
    // },
    { title: '流程发起人', index: 'applyName' },

    { title: '申报时间', type: 'date', index: 'applyTime' },
    { title: '流程到达时间', type: 'date', index: 'acceptTime' },
    { title: '剩余审批时间',index: 'approvalRemainingTime' },

  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService) { }

  ngOnInit() {
    this.resetTime();
    this.fliterForm = this.formBuilder.group({
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
    this.getList();
    this.st.reload();
  }
  search() {
    this.param.projectName=this.fliterForm.controls.proName.value;
    debugger
    this.param.flowPathType=Number(this.fliterForm.controls.proType.value);
    if(this.param.flowPathType==0){
      this.param.flowPathType=-1;
    }
    this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetWarningCenterList(this.param).subscribe((result: any) => {
      if(result.data){
         this.formResultData = result.data;
      }else{
        this.formResultData=[];
      }
      this.st.reload()
    }, err => {
      console.log(err);
      this.st.reload()

    });

  }

  resetForm(): void {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    // this.fliterForm.reset();
  }



  exportXlsx() {
    const expData = [this.columns.map(i => i.title)];

    expData.push(['1', '1', '1', '1',]);

    this.xlsx.export({
      sheets: [
        {
          data: expData,
          name: 'sheet name',
        },
      ],
    });
  }
  getList() {
    this.param.init(
      {
        "flowNo": "",
        "projectName": "",
        "flowPathType": -1,
        "startApplyTime": "2019-02-17T10:04:36.137Z",
        "endApplyTime": "2019-06-17T21:04:36.137Z",
        "dateTimeNow": "2019-06-17T21:04:36.138Z",
        "page": 1,
        "sorting": "ProjectId",
        "skipCount": 0,
        "maxResultCount": 10
      });

    this.statisticalServiceServiceProxy.post_GetWarningCenterList(this.param).subscribe((result: any) => {
      this.formResultData = result.data;
    }, err => {
      console.log(err);

    });
  }
  // get dateRange() {
  //   return this.fliterForm.controls.dateRange;
  // }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 1)
    this.rangeTime = [startTime, new Date()];
  }
}
