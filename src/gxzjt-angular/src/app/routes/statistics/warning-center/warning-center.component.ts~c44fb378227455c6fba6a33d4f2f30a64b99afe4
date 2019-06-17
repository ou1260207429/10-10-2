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
  url = [{
    pro_type: '1',
    pro_name: '2',
    pro_no: '3',
    org: '4',
    node: '5',
    person: '6',
    repo_time: '7',
    at_time: '8',

  }];
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


    { title: '流程类型', index: 'pro_type' },
    { title: '工程名称', index: 'pro_name' },
    { title: '工程编号', index: 'pro_no' },
    { title: '建设单位', index: 'org' },
    {
      title: '节点名称', index: 'node',
      sort: {
        compare: (a, b) => a.node > b.node ? 1 : 0,
      },
      filter: {
        menus: [
          { text: '初审', value: 0 },
          { text: '复审', value: 1 },
          { text: '审核完毕', value: 2 },
        ],
        fn: (filter: any, record: any) =>
          record.node >= filter.value[0] && record.node <= filter.value[1],
        multiple: false,
      }
    },
    { title: '流程发起人', index: 'person' },

    { title: '申报时间', type: 'date', index: 'repo_time' },
    { title: '流程到达时间', type: 'date', index: 'at_time' },
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
    }
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
      dateRange: [[this.rangeTime]],

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
    console.log(this.rangeTime)
    this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetWarningCenterList(this.param).subscribe((result: any) => {
      this.formResultData = result.data;
    }, err => {
      console.log(err);

    });

  }

  resetForm(): void {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [[this.rangeTime]],

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
        "startApplyTime": "2019-02-17T08:51:45.854Z",
        "endApplyTime": "2019-06-17T08:51:45.854Z",
        "dateTimeNow": "2019-06-17T08:51:45.854Z",
        "page": 1,
        "sorting": "",
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
