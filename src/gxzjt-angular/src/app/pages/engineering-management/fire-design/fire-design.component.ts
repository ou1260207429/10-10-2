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


/**
 * 消防設計
 */
@Component({
  selector: 'app-fire-design',
  templateUrl: './fire-design.component.html',
  styles: [],
  styleUrls: ['./fire-design.component.less'],
})
export class FireDesignComponent extends PublicFormComponent implements  OnInit {
  // param = new FireAuditCompleteQueryDto();
  param:FireAuditCompleteQueryDto;
  formResultData = [];
  rangeTime = [];
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
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
          iif: record => record.status  === 3,
        },
        {
          text: '验收',
          type: 'modal',
          iif: record => record.status  === 4,
        },
        {
          text: '受理凭证',
          type: 'link',
          // modal: {
          //   component: StatisticsAcceptCredentialsComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if(record.acceptAttachmentUrl){
              window.open(record.acceptAttachmentUrl)
            }else{
              this.message.error('暂无受理凭证');
            }
          },
        },
        {
          text: '意见书',
          type: 'link',
          // modal: {
          //   component: StatisticsPositionPaperComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if(record.opinionAttachmentUrl){
              window.open(record.opinionAttachmentUrl)
            }else{
              this.message.error('暂无意见书');
            }
          },
        },
      ]
    },
    { title: '设计审查申报编号', index: 'investigateNumber' },
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '联系人', index: 'contactPerson' },
    { title: '当前处理环节', index: 'currentNodeName' },
    { title: '流程是否超时', index: 'isExpireTime',type: 'tag', tag: {
      true: { text: '是', color: '' },
      false: { text: '否', color: '' },
    }},
    { title: '结果', index: 'status',format: (item: any) => `${item.status!=null?item.status:4001}`,
    type: 'tag', tag: {
      4001:{text: '待处理', color: '' },
      0: { text: '未处理', color: '' },
      1: { text: '受理', color: 'green' },
      2:{ text: '不受理', color: '' },
      3:{ text: '不合格', color: '' },
      4:{ text: '合格', color: '' },
      5:{ text: '未抽中', color: '' },
    }},
    { title: '操作时间', index: 'applyTime',type:'date' },
  ];

  pageConfig: STPage = publicPageConfig;
  constructor(private http: _HttpClient,
    private _projectFlowServcieServiceProxy: ProjectFlowServcieServiceProxy,
    private modal: ModalHelper,
    private router: Router,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService, private message: NzMessageService) {
      super();
     }

  ngOnInit() {
    this.resetTime();
    this.init();

  }


  init() {
    this.param=new FireAuditCompleteQueryDto();
    this.param.page = 1;
    this.param.maxResultCount = 10;
    this.param.flowPathType = 1
    this.param.sorting = 'ProjectName';
    this.resetTime();
    this.param.startApplyTime = moment(this.rangeTime[0]);
    this.param.endApplyTime =moment(this.rangeTime[1]);
    this.getList();
  }

  addDeclare(){
    this.router.navigate([`/app/engineering-management/addFireDesignDeclareComponent/0/null`]);
  }
  /**
   * 点击查询
   */
  query() {
    this.param.page = 1;
    this.param.startApplyTime = moment(this.rangeTime[0])
    this.param.endApplyTime =moment(this.rangeTime[1])
    this.getList();
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
    this._projectFlowServcieServiceProxy.post_GetFireAuditCompleteList(this.param).subscribe((data: any) => {
      this.formResultData = data
      console.log(this.formResultData)
    })
  }

  watchItem(item) {
    this.router.navigate([`/app/work-matters/alreadyDoneDetailsComponent/${item.flowNo}/${item.id}/${item.flowPathType}`]);
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 1)
    this.rangeTime = [startTime, new Date()];
  }

  change(v) {
    pageOnChange(v, this.param, () => {
      this.getList();
    })
  }
}
