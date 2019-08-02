import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';

import { ModalHelper } from '@delon/theme';

import { FormControl, FormGroup } from '@angular/forms';
import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult, PagedAndFilteredInputDto, ProjectFlowServcieServiceProxy, FireAuditCompleteQueryDto, StatisticalServiceServiceProxy, WarningCenterQueryDto } from '@shared/service-proxies/service-proxies'

import { PublicModel } from 'infrastructure/public-model';
import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { dateTrans } from 'infrastructure/regular-expression';
import { PublicFormComponent } from '../public/public-form.component';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { EngManageService } from '../engineering-management.service';
import { NzModalService } from 'ng-zorro-antd';


/**
 * 消防設計
 */
@Component({
  selector: 'app-fire-design',
  templateUrl: './fire-design.component.html',
  styleUrls: ['./fire-design.component.less'],
})
export class FireDesignComponent extends PublicFormComponent implements OnInit {
  // param = new FireAuditCompleteQueryDto();
param={
  endApplyTime: "2019-07-31 23:59:59",
  flowPathType: 1,
  maxResultCount: 10,
  orgType: '-1',
  page: 1,
  sorting: "projectId desc",
  startApplyTime: "2019-07-24 00:00:00",
  status:'-1',
  recordNumber: '',
  projectName:'',
  companyName:'',
  currentNodeName: '',
  isExpire: null,
  isSelected: null,
  skipCount: 0,
  proType:'-1',
  natureName: '',
}
url;//导出地址
  // param={
  //   recordNumber:null,
  //   projectName:null,
  //   buildName: null,
  //   workName: null,
  //   designName: null,
  //   supervisorName: null,
  //   drawName: null,
  //   companyName: null,
  //   proType: null,
  //   status:null,
  //   flowPathType: null,
  //   orgType: null,
  //   startApplyTime:null,
  //   endApplyTime: null,
  //   page: null,
  //   sorting: null,
  //   skipCount: null,
  //   maxResultCount: null,
  // }
  formResultData = [];
  rangeTime = [];

  record;
  isAddProducttyepe1 = false;
  isAddProducttyepe2 = false;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width: '230px',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.watchItem(record)
          },
        },
        {
          text: '撤回申请',
          type: 'modal',
          iif: record => (record.status === 0),
          click: (record: any, modal: any) => {
            this.record = record;
            this.withdraw();
            // this.router.navigate([`/app/engineering-management/addFireDesignDeclareComponent/0/${record.projectId}/${record.id}`]);
          },
        },
        {
          text: '重新申请',
          type: 'modal',
          iif: record => (record.status === 2 || record.status === 3) && record.isResubmitted != true,
          click: (record: any, modal: any) => {
            this.router.navigate([`/app/engineering-management/addFireDesignDeclareComponent/0/${record.projectId}/${record.id}`]);
          },
        },
        {
          text: '验收',
          type: 'modal',
          iif: record => record.status === 4 && record.isAcceptanceSubmitted != true,
          click: (record: any, modal: any) => {
            this.router.navigate([`/app/engineering-management/addFireAcceptanceComponent/0/${record.projectId}/${record.id}`]);
          },
        },
        {
          text: '受理凭证',
          type: 'link',
          iif: record => record.acceptAttachmentUrl != null,
          // modal: {
          //   component: StatisticsAcceptCredentialsComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if (record.acceptAttachmentUrl) {
              window.open(record.acceptAttachmentUrl)
            } else {
              this.message.info('暂无受理凭证');
            }
          },
        },
        {
          text: '意见书',
          type: 'link',
          iif: record => record.opinionAttachmentUrl != null,
          // modal: {
          //   component: StatisticsPositionPaperComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if (record.opinionAttachmentUrl) {
              window.open(record.opinionAttachmentUrl)
            } else {
              this.message.info('暂无意见书');
            }
          },
        },
      ]
    },

    { title: '设计审查申报编号', index: 'investigateNumber', width: '200px' },
    { title: '工程名称', index: 'projectName', width: '120px' },
    { title: '建设单位', index: 'companyName', width: '120px' },
    { title: '联系人', index: 'contactPerson', width: '100px' },
    { title: '当前处理环节', index: 'currentNodeName', width: '120px' },
    {
      title: '流程是否超时', index: 'isExpireTime', width: '100px', format: (item: any) => `${item.isExpireTime == true ? "是" : "否"}`, type: 'tag', tag: {
        "是": { text: '是', color: 'red' },
        "否": { text: '否', color: '' },
      }
    },
    {
      title: '结果', index: 'status', width: '60px', format: (item: any) => `${item.status == 0 ? "未处理" : (item.status == 1 ? "受理" : (item.status == 2 ? "不受理" : (item.status == 3 ? "不合格" : (item.status == 4 ? "合格" : (item.status == 5 ? "未抽中" : "未处理")))))}`, type: 'tag', tag: {
        "未处理": { text: '未处理', color: '' },
        "受理": { text: '受理', color: 'green' },
        "不受理": { text: '不受理', color: 'red' },
        "不合格": { text: '不合格', color: 'red' },
        "合格": { text: '合格', color: '' },
        "未抽中": { text: '未抽中', color: '' },
      }
    },
    { title: '操作时间', index: 'applyTime', width: '120px', type: 'date' },
  ];

  pageConfig: STPage = publicPageConfig;
  constructor(private http: _HttpClient,
    private _projectFlowServcieServiceProxy: ProjectFlowServcieServiceProxy,
    private modal: ModalHelper,
    private router: Router,
    private EngManageService: EngManageService,
    private publicModel: PublicModel,
    private _eventEmiter: EventEmiter,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
    private xlsx: XlsxService, private message: NzMessageService) {
    super();
  }

  ngOnInit() {
    this.resetTime();
    this.init();
    const _slef = this;
    this._eventEmiter.on('fireDesignComponentInit', () => {
      _slef.init();
    });
  }


  init() {
    this.param.maxResultCount = 10;
    this.param.flowPathType = 1
    this.param.sorting = 'projectId desc';

    this.resetTime();
    // this.param.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    // this.param.endApplyTime = moment(this.rangeTime[1]).add(28800000);

    if (this.rangeTime.length != 0) {
      this.param.startApplyTime = dateTrans(this.rangeTime[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.rangeTime[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    this.getList();
  }
  reststart() {
     this.param.proType = '-1';
     this.param.natureName = '';
     this.param.projectName = '';
     this.param.companyName='';
     this.param.currentNodeName= '';
     this.param.isExpire = null;
     this.param.isSelected = null;
     this.param.skipCount = 0;
     this.param.recordNumber = '';
     this.param.status = '-1',
     this.param.orgType = '-1';
     this.param.page = 1;
     this.param.maxResultCount = 10;
     this.param.flowPathType = 1;
     this.param.sorting = 'projectId desc';
     this.resetTime();
    if (this.rangeTime.length != 0) {
      this.param.startApplyTime = dateTrans(this.rangeTime[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.rangeTime[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }

    this.getList();
  }

  addDeclare() {
    this.router.navigate([`/app/engineering-management/addFireDesignDeclareComponent/0/null/null`]);
  }
  /**
   * 点击查询
   */
  query() {


    this.param.page = 1;
    this.param.projectName = this.param.projectName.trim();
    if (this.rangeTime.length != 0) {
      this.param.startApplyTime = dateTrans(this.rangeTime[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.rangeTime[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    this.getList();
  }



  exportXlsx() {
    console.log(this.formResultData);

    // this.publicModel.exportXlsx(this.columns,)
    // const expData = [this.columns.map(i => i.title)];

    // expData.push(['1', '1', '1', '1',]);

    // this.xlsx.export({
    //   sheets: [
    //     {
    //       data: expData,
    //       name: 'sheet name',
    //     },
    //   ],
    // });
  }
  getList() {
    // this._projectFlowServcieServiceProxy.post_GetFireAuditCompleteList(this.param).subscribe((data: any) => {
    //   this.formResultData = data
    //   console.log(this.formResultData)
    // })

    this.EngManageService.GetFireAuditCompleteList(this.param).subscribe(
      res => {
        this.formResultData = res.result
      },
    );

  }

  watchItem(item) {
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.id}/${item.flowPathType}/1`]);
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 7)
    this.rangeTime = [startTime, new Date()];
  }

  change(v) {
    pageOnChange(v, this.param, () => {
      this.getList();
    })
  }
  withdraw() {
    this.isAddProducttyepe1 = true;

  }

  handleCancel1(): void {

    this.isAddProducttyepe1 = false;
  }
  subProducttype1(): void {
    this.EngManageService.CancelApply({ flowId: this.record.id }).subscribe(
      res => {
        if (res.result.status == 0) {
          this.message.error(res.result.message)
        } else if (res.result.status == 1) {
          this.message.success(res.result.message)
        } else if (res.result.status == 2) {
          this.message.success(res.result.message)
        } else {
          this.message.error("系统发生异常！")
        }


      },
    );

    this.st.reload();
    this.isAddProducttyepe1 = false;
  }
  export(){
    this.param.page = 1;
    this.param.projectName = this.param.projectName.trim();
    if (this.rangeTime.length != 0) {
      this.param.startApplyTime = dateTrans(this.rangeTime[0]) + " 00:00:00";
      this.param.endApplyTime = dateTrans(this.rangeTime[1]) + " 23:59:59";
    } else {
      this.param.startApplyTime = '';
      this.param.endApplyTime = '';
    }
    this.EngManageService.Post_ExportFireAuditCompleteList(this.param).subscribe(
      res => {
        this.url = res.result;
        // window.open(this.url)

      },
    );

    this.isAddProducttyepe2 = true;

  }

  handleCancel2(): void {
    this.url=null;
    this.isAddProducttyepe2 = false;
  }
  subProducttype2(): void {
    this.url=null;
    this.isAddProducttyepe2 = false;
  }

}
