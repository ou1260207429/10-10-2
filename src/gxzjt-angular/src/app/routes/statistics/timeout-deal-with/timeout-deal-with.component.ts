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
  url = [{
    jgbh: '10000005',
    gcname: '西南大厦超时',
    jsdanw: '未来科技',
    lxr: '王哈哈',
    phone: '13333333',
    lc: '否',
    sh: '通过',
    czr: '操作人A',
    cztime: '2015-05-05'

  }];
  searchKey = '';
  selectedValuePro = "";
  fliterForm: FormGroup;
  hiddenFliter = false;
  formResultData = [];

  isAddProducttyepe5 = false;
  submodel = {
    Name: ""
  };

  formData = {};


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: StatisticsTimeoutDealDetailComponent,
            paramsName: 'record',
          },
          click: (record: any, modal: any) => {

          },
        },
        {
          text: '受理凭证',
          type: 'modal',
          modal: {
            component: StatisticsAcceptCredentialsComponent,
            paramsName: 'record',
          },
          click: (record: any, modal: any) => {

          },
        },
        {
          text: '意见书',
          type: 'modal',
          modal: {
            component: StatisticsPositionPaperComponent,
            paramsName: 'record',
          },
          click: (record: any, modal: any) => {

          },
        },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    },
    { title: '竣工验收申报编号', index: 'jgbh' },
    { title: '工程名称', index: 'gcname' },
    { title: '建设单位', index: 'jsdanw' },
    { title: '联系人', index: 'lxr' },
    { title: '联系电话', index: 'phone' },
    { title: '流程是否超时', index: 'lc' },
    { title: '审核结果', index: 'sh' },
    { title: '操作人', index: 'czr' },
    { title: '操作时间', index: 'cztime' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private xlsx: XlsxService) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [[]],

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

  }

  resetForm(): void {
    this.fliterForm.reset();
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

    var param = new TimeoutQuetyDto();
    param.init(

      {
        "recordNumber": "",
        "projectName": "",
        "status": -1,
        "startApplyTime": "2019-02-17T08:53:21.525Z",
        "endApplyTime": "2019-06-17T08:53:21.525Z",
        "dateTimeNow": "2019-06-17T08:53:21.525Z",
        "page": 1,
        "sorting": "",
        "skipCount": 0,
        "maxResultCount": 10
      });

    this.statisticalServiceServiceProxy.post_GetTimeoutList(param).subscribe((result: any) => {
      this.formResultData = result.data;
    }, err => {
      console.log(err);

    });
  }
}
