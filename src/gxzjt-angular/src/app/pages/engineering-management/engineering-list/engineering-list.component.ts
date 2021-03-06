import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { ProjectFlowServcieServiceProxy,StatisticsQueryDto } from '@shared/service-proxies/service-proxies'
import { PublicModel } from 'infrastructure/public-model';

import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { PublicFormComponent } from '../public/public-form.component';
import * as moment from 'moment';

/**
 * 工程列表
 */
@Component({
  selector: 'app-engineering-list',
  templateUrl: './engineering-list.component.html',

})
export class EngineeringListComponent extends PublicFormComponent implements OnInit {

  formResultData;


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    // {
    //   title: '操作',
    //   buttons: [
    //     // {
    //     //   text: '执行', click: (item: any) => {
    //     //     this.watchItem(item);
    //     //   }
    //     // },
    //     // {
    //     //   text: '查看',
    //     //   type: 'modal',
    //     //   click: (record: any, modal: any) => {

    //     //     this.watchItem(record);
    //     //   },
    //     // },
    //     // {
    //     //   text: '受理凭证',
    //     //   type: 'link',
    //     //   // modal: {
    //     //   //   component: StatisticsAcceptCredentialsComponent,
    //     //   //   paramsName: 'record',
    //     //   // },
    //     //   click: (record: any, modal: any) => {
    //     //     window.open(record.acceptAttachmentFileUrl)
    //     //   },
    //     // },
    //     // {
    //     //   text: '意见书',
    //     //   type: 'link',
    //     //   // modal: {
    //     //   //   component: StatisticsPositionPaperComponent,
    //     //   //   paramsName: 'record',
    //     //   // },
    //     //   click: (record: any, modal: any) => {

    //     //     window.open(record.opinionFileUrl)
    //     //   },
    //     // },
    //   ]
    // },
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode', },
    { title: '建设单位', index: 'companyName' },
    { title: '消防设计', index: 'investigateStatus',width:'120px',format: (item: any) => `${item.investigateStatus==0?"不合格":(item.investigateStatus==1?"合格":(item.investigateStatus==-100?"已申报":"未申请"))}`,type: 'tag', tag: {
      "未申请":{text:'未申请',color: '' },
      "不合格": { text: '不合格', color: 'red' },
      "合格": { text: '合格', color: 'green' },
      "已申报": {text: '已申报', color: 'pink' }
    }},
    { title: '消防验收管理', index: 'acceptanceStatus',width:'120px',format: (item: any) => `${item.acceptanceStatus==0?"不合格":(item.acceptanceStatus==1?"合格":(item.acceptanceStatus==-100?"已申报":"未申请"))}`,type: 'tag', tag: {
      "未申请":{text:'未申请',color: '' },
      "不合格": { text: '不合格', color: 'red' },
      "合格": { text: '合格', color: 'green' },
      "已申报": {text: '已申报', color: 'pink' }
    }},
    { title: '竣工验收备案', index: 'putOnRecordStatus',width:'120px',format: (item: any) => `${item.putOnRecordStatus==0?"不合格":(item.putOnRecordStatus==1?"合格":(item.putOnRecordStatus==2?"未抽中":(item.putOnRecordStatus==-100?"已申报":"未申请")))}`,type: 'tag', tag: {
      "未申请":{text:'未申请',color: '' },
      "不合格": { text: '不合格', color: 'red' },
      "合格": { text: '合格', color: 'green' },
      "未抽中": { text: '未抽中', color: '' },
      "已申报": {text: '已申报', color: 'pink' }
    }},
  ];

  searchParam = new StatisticsQueryDto();

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime = [];
  constructor(private _projectFlowServcieServiceProxy: ProjectFlowServcieServiceProxy,
    private _flowServices: FlowServices,
    private router: Router,
    private http: _HttpClient,
    private _publicModel:PublicModel,
    private xlsx: XlsxService) {
    super();

  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.searchParam.page = 1;
    this.searchParam.maxResultCount = 10;
    this.searchParam.projectName='';
    this.searchParam.companyName='';
    this.searchParam.sorting = 'ProjectName';

    this.getList();
  }


  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    this._projectFlowServcieServiceProxy.post_GetStatisticsList(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.searchParam.page = 1;
    this.searchParam.projectName= this.searchParam.projectName.trim();
    this.searchParam.companyName= this.searchParam.companyName.trim();
     this.getList();
  }


  watchItem(item) {
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.id}/${item.flowPathType}/1`]);
  }

  change(v) {
    pageOnChange(v, this.searchParam, () => {
      this.getList();
    })
  }

  okRangeTime(v) {

  }

  /**
   * 导出
   */
  exportXlsx(){
    this._publicModel.exportXlsx(this.columns,this.formResultData.data);
  }






}
