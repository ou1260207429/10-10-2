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
import { timeTrans } from 'infrastructure/regular-expression';
import { PublicFormComponent } from '../public/public-form.component';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';


/**
 * 消防設計
 */
@Component({
  selector: 'app-fire-design',
  templateUrl: './fire-design.component.html',
  styleUrls: ['./fire-design.component.less'],
})
export class FireDesignComponent extends PublicFormComponent implements OnInit {
  param = new FireAuditCompleteQueryDto();
  formResultData = [];
  rangeTime = [];
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width:'200px',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.watchItem(record)
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
    { title: '设计审查申报编号', index: 'investigateNumber' },
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '联系人', index: 'contactPerson',width:'120px' },
    { title: '当前处理环节', index: 'currentNodeName',width:'120px' },
    {
      title: '流程是否超时', index: 'isExpireTime',width:'120px', format: (item: any) => `${item.isExpireTime == true ? "是" : "否"}`, type: 'tag', tag: {
        "是": { text: '是', color: 'red' },
        "否": { text: '否', color: '' },
      }
    },
    {
      title: '结果', index: 'status',width:'120px', format: (item: any) => `${item.status == 0 ? "未处理" : (item.status == 1 ? "受理" : (item.status == 2 ? "不受理" : (item.status == 3 ? "不合格" : (item.status == 4 ? "合格" : (item.status == 5 ? "未抽中" : "未处理")))))}`, type: 'tag', tag: {
        "未处理": { text: '未处理', color: '' },
        "受理": { text: '受理', color: 'green' },
        "不受理": { text: '不受理', color: 'red' },
        "不合格": { text: '不合格', color: 'red' },
        "合格": { text: '合格', color: '' },
        "未抽中": { text: '未抽中', color: '' },
      }
    },
    { title: '操作时间', index: 'applyTime',width:'120px', type: 'date' },
  ];

  pageConfig: STPage = publicPageConfig;
  constructor(private http: _HttpClient,
    private _projectFlowServcieServiceProxy: ProjectFlowServcieServiceProxy,
    private modal: ModalHelper,
    private router: Router,
    private publicModel: PublicModel,
    private _eventEmiter: EventEmiter,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService, private message: NzMessageService) {
    super();
  }

  ngOnInit() {
    this.param.orgType = 1;
    this.resetTime();
    this.init();
    const _slef = this;
    this._eventEmiter.on('fireDesignComponentInit', () => {
      _slef.init();
    });
  }


  init() {
    this.param.page = 1;
    this.param.maxResultCount = 10;
    this.param.flowPathType = 1
    this.param.sorting = 'projectId desc';
    this.resetTime();
    this.param.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    this.param.endApplyTime = moment(this.rangeTime[1]).add(28800000);
    this.getList();
  }
  reststart() {
    this.param.projectName = '';
    this.param.status = -1;
    this.param.page = 1;
    this.param.maxResultCount = 10;
    this.param.flowPathType = 1
    this.param.sorting = 'projectId desc';
    this.resetTime();
    this.param.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    this.param.endApplyTime = moment(this.rangeTime[1]).add(28800000);
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
    this.param.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    this.param.endApplyTime = moment(this.rangeTime[1]).add(28800000);
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
    this._projectFlowServcieServiceProxy.post_GetFireAuditCompleteList(this.param).subscribe((data: any) => {
      this.formResultData = data
      console.log(this.formResultData)
    })
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
}
