import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { StatisticalServiceServiceProxy, TimeoutQuetyDto } from '@shared/service-proxies/service-proxies';
import { dateTrans } from 'infrastructure/regular-expression';
import { StatisticsService } from '../statistics.service'

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
  total;
  isAddProducttyepe5 = false;
  rangeTime = [];
  submodel = {
    Name: ""
  };
  pageConfig: STPage = {
    front: false,
    show: true,
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
    // { title: '竣工验收申报编号',default:'0', index: 'acceptanceNumber' , },
    { title: '工程名称', index: 'projectName', width: '150px' },
    { title: '建设单位', index: 'companyName', width: '150px' },
    { title: '联系人', index: 'contactPerson', width: '120px' },
    { title: '联系电话', index: 'contactNumber', width: '120px' },
    // { title: '流程是否超时', index: 'isExpireTime',width:'120px',format:(item:any)=>`${item.isExpireTime==true?"是":"否"}`,type: 'tag', tag: {
    //   "是": { text: '是', color: 'red' },
    //   "否": { text: '否', color: '' },
    // }},
    { title: '超时时长', index: 'approvalRemainingTime', width: '120px' },
    {
      title: '审核结果', index: 'status', width: '120px', format: (item: any) => `${item.status == 0 ? "未处理" : (item.status == 1 ? "受理" : (item.status == 2 ? "不受理" : (item.status == 3 ? "不合格" : (item.status == 4 ? "合格" : (item.status == 5 ? "未抽中" : "未处理")))))}`, type: 'tag', tag: {
        "未处理": { text: '未处理', color: '' },
        "受理": { text: '受理', color: 'green' },
        "不受理": { text: '不受理', color: 'red' },
        "不合格": { text: '不合格', color: 'red' },
        "合格": { text: '合格', color: '' },
        "未抽中": { text: '未抽中', color: '' },
      }
    },
    { title: '操作人', index: 'currentHandleUserName', width: '120px' },
    { title: '申报时间', index: 'acceptTime', width: '120px', type: 'date' },//这个实际是申请时间操作时间暂时无数据
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    private StatisticsService: StatisticsService,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private xlsx: XlsxService) {
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
        "maxResultCount": 10
      });
  }

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
    this.param.page = 1;
    this.param.recordNumber = this.fliterForm.controls.proNo.value;
    this.param.projectName = this.fliterForm.controls.proName.value;
    this.param.status = this.fliterForm.controls.proType.value;
    if (this.param.status == null) {
      this.param.status = -1;
    }

    if (this.fliterForm.controls.dateRange.value.length != 0) {

      this.param.startApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    this.statisticalServiceServiceProxy.post_GetTimeoutList(this.param).subscribe((result: any) => {
      if (result.data) {
        this.formResultData = result.data;
        this.total = result.total;
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
    this.param.page = 1;
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


    if (this.fliterForm.controls.dateRange.value.length != 0) {

      this.param.startApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.fliterForm.controls.dateRange.value[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    //   this.statisticalServiceServiceProxy.post_GetTimeoutList(this.param).subscribe((result: any) => {
    //   this.formResultData = result.data;
    //   this.total=result.total
    // }, err => {
    //   console.log(err);

    // });
    this.StatisticsService.GetTimeoutList(this.param).subscribe(
      res => {

        this.formResultData = res.result.data;
        this.total = res.result.total;

        console.log(this.total)
      },
    );
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
  change(v) {
    if (this.param.page == v.pi) {
      return   //解决页面数据不能复制问题，因为change改变事件当点击的就会触发了所以当page不变的时候不执行方法
    }
    this.param.page = v.pi;
    this.getList();
  }

}
