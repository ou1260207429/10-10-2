import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatisticsTimeoutDealDetailComponent } from '../timeout-deal-detail/timeout-deal-detail.component';
import { StatisticsAcceptCredentialsComponent } from '../accept-credentials/accept-credentials.component';
import { StatisticsPositionPaperComponent } from '../position-paper/position-paper.component';
import { StatisticalServiceServiceProxy, TimeoutQuetyDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-statistics-timeout-deal-with',
  templateUrl: './timeout-deal-with.component.html',
  styleUrls: ['./timeout-deal-with.less'],
})
export class StatisticsTimeoutDealWithComponent implements OnInit {
  searchKey = '';
  selectedValuePro = "";
  fliterForm: FormGroup;
  hiddenFliter = false;
  formResultData = [];

  isAddProducttyepe5 = false;
  rangeTime = [];
  submodel = {
    Name: ""
  };

  formData = {};
  param = new TimeoutQuetyDto();

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    // {
    //   title: '操作',
    //   buttons: [
    //     {
    //       text: '查看',
    //       type: 'modal',
    //       modal: {
    //         component: StatisticsTimeoutDealDetailComponent,
    //         paramsName: 'record',
    //       },
    //       click: (record: any, modal: any) => {

    //       },
    //     },
    //     {
    //       text: '受理凭证',
    //       type: 'link',
    //       // modal: {
    //       //   component: StatisticsAcceptCredentialsComponent,
    //       //   paramsName: 'record',
    //       // },
    //       click: (record: any, modal: any) => {
    //         window.open(record.acceptAttachmentFileUrl)
    //       },
    //     },
    //     {
    //       text: '意见书',
    //       type: 'link',
    //       // modal: {
    //       //   component: StatisticsPositionPaperComponent,
    //       //   paramsName: 'record',
    //       // },
    //       click: (record: any, modal: any) => {
    //         window.open(record.opinionFileUrl)
    //       },
    //     },
    //     // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
    //   ]
    // },
    { title: '竣工验收申报编号',default:'0', index: 'recordNumber' , },
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '联系人', index: 'contactPerson' },
    { title: '联系电话', index: 'contactNumber' },
    { title: '审核结果', index: 'status',format: (item: any) => `${item.status==0?"未处理":(item.status==1?"受理":(item.status==2?"不受理":(item.status==3?"不合格":(item.status==4?"合格":(item.status==5?"未抽中":"未处理")))))}`,type: 'tag', tag: {
      "未处理": { text: '未处理', color: '' },
      "受理": { text: '受理', color: 'green' },
      "不受理":{ text: '不受理', color: 'red' },
      "不合格":{ text: '不合格', color: 'red' },
      "合格":{ text: '合格', color: '' },
      "未抽中":{ text: '未抽中', color: '' },
    }},
    // { title: '操作人', index: '' },
    { title: '操作时间', index: 'acceptTime',type:'date' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
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
    this.getList();
  }
  search() {
    this.param.recordNumber = this.fliterForm.controls.proNo.value;
    this.param.projectName = this.fliterForm.controls.proName.value;
    this.param.status = this.fliterForm.controls.proType.value;
    if (this.param.status == null) {
      this.param.status = -1;
    }
    this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetTimeoutList(this.param).subscribe((result: any) => {
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
  handleCancel5(): void {
    this.isAddProducttyepe5 = false;
  }
  subProducttype5(): void {
    this.isAddProducttyepe5 = false;
  }
  addview() {
    this.isAddProducttyepe5 = true;
  }
  getList() {
    this.param.init(

      {
        "recordNumber": "",
        "projectName": "",
        "status": -1,
        "startApplyTime": "",
        "endApplyTime": "",
        "dateTimeNow": "",
        "page": 1,
        "sorting": "ProjectName",
        "skipCount": 0,
        "maxResultCount": 3000
      });
      this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
      this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetTimeoutList(this.param).subscribe((result: any) => {
      this.formResultData = result.data;
    }, err => {
      console.log(err);

    });
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
}
