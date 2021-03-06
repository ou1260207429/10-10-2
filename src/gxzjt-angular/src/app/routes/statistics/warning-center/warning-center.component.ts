import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { StatisticalServiceServiceProxy, WarningCenterQueryDto } from '@shared/service-proxies/service-proxies';
import { dateTrans } from 'infrastructure/regular-expression';


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

    // {
    //   title: '操作',
    //   buttons: [
    //     {
    //       text: '查看',
    //       type: 'modal',
    //       modal: {
    //         component: StatisticsWarningCenterDetailComponent,
    //         paramsName: 'record',
    //       },
    //       click: (record: any, modal: any) => {

    //       },
    //     },
    //     // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
    //   ]
    // },
    { title: '流程流水号', default: '', index: 'flowNo', width: '200px'},
    {
      title: '工程类型', index: 'flowPathType', width: '100px',
      format: (item: any) => `${item.flowPathType == 0 ? "数据不存在" : (item.flowPathType == 1 ? "消防设计审查" : (item.flowPathType == 2 ? "消防验收" : (item.flowPathType == 3 ? "竣工验收消防备案" : "数据不存在")))}`,
      type: 'tag', tag: {
        "数据不存在": { text: '数据不存在', color: 'red' },
        "消防设计审查": { text: '消防设计审查', color: '' },
        "消防验收": { text: '消防验收', color: '' },
        "竣工验收消防备案": { text: '竣工验收消防备案', color: '' },
      }
    },
    { title: '工程名称', default: '', index: 'projectName', width: '120px' },
    { title: '工程编号', default: '', index: 'projectCode', width: '150px' },
    { title: '建设单位', default: '', index: 'companyName', width: '150px' },
    { title: '节点名称', default: '', index: 'currentNodeName', width: '60px' },
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
    { title: '流程发起人', index: 'applyName', width: '120px' },

    { title: '申报时间', type: 'date', index: 'applyTime', width: '150px' },
    // { title: '流程结束时间', type: 'date', index: 'endTime' },
    { title: '剩余审批时间(h)', index: 'approvalRemainingTime', format: (item: any) => `${item.approvalRemainingTime > 0 ?item.approvalRemainingTime : '已超时'}`,width: '60px' },

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
    this.param.projectName = this.fliterForm.controls.proName.value;
    this.param.flowPathType = Number(this.fliterForm.controls.proType.value);
    if (this.param.flowPathType == 0) {
      this.param.flowPathType = -1;
    }
    // this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    // this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
    // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
    if (this.fliterForm.controls.dateRange.value.length != 0) {
      // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
      // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
      this.param.startApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    this.statisticalServiceServiceProxy.post_GetWarningCenterList(this.param).subscribe((result: any) => {
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
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    // this.fliterForm.reset();
    this.search();
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
        "startApplyTime": "",
        "endApplyTime": "",
        "dateTimeNow": "",
        "page": 1,
        "sorting": "ProjectId",
        "skipCount": 0,
        "maxResultCount": 3000
      });
    // this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    // this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
    // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
    if (this.fliterForm.controls.dateRange.value.length != 0) {
      // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
      // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
      this.param.startApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
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
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
}
