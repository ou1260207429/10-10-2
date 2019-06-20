import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { ProjectFlowServcieServiceProxy, FireAuditCompleteQueryDto } from '@shared/service-proxies/service-proxies'

import { PublicModel } from 'infrastructure/public-model';
import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { PublicFormComponent } from '../public/public-form.component';
import * as moment from 'moment';

/**
 * 消防验收
 */
@Component({
  selector: 'app-fire-acceptance',
  templateUrl: './fire-acceptance.component.html',
  styles: []
})
export class FireAcceptanceComponent  extends PublicFormComponent implements OnInit {


  formResultData;
  companyName;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          // modal: {
          //   component: StatisticsProAppStaticDetailComponent,
          //   paramsName: 'record',
          // },
          // click: (record: any, modal: any) => {

          // },
        },
        {
          text: '受理凭证',
          type: 'link',
          // modal: {
          //   component: StatisticsAcceptCredentialsComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            window.open(record.acceptAttachmentFileUrl)
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

            window.open(record.opinionFileUrl)
          },
        },
      ]
    },
    { title: '消防验收申报编号', index: 'acceptanceNumber' },
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '联系人', index: 'contactPerson' },
    { title: '当前处理环节', index: 'currentNodeName' },
    { title: '当前处理人', index: 'currentHandleUserName' },
    { title: '流程是否超时', index: 'isExpireTime',type: 'tag', tag: {
      true: { text: '是', color: 'red' },
      false: { text: '否', color: '' },
    }},
    { title: '审核结果', index: 'status',format: (item: any) => `${item.status?item.status:'4001'}`,type: 'tag', tag: {
      4001:{text:'未处理',color: ''},
      0: { text: '未处理', color: '' },
      1: { text: '受理', color: 'green' },
      2:{ text: '不受理', color: 'red' },
      3:{ text: '不合格', color: 'red' },
      4:{ text: '合格', color: '' },
      5:{ text: '未抽中', color: '' },
    }},
    { title: '操作人', index: 'companyName' },
    { title: '操作时间', index: 'applyTime' },
  ];

  searchParam = new FireAuditCompleteQueryDto();

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime = ['2019-02-19T05:46:09.135Z','2019-06-19T05:46:09.135Z'];
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
    this.searchParam.flowPathType = 2
    this.searchParam.sorting = 'ProjectName';
    this.searchParam.startApplyTime = moment(this.rangeTime[0])
    this.searchParam.endApplyTime =moment(this.rangeTime[1])
    this.getList();
  }


  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    this._projectFlowServcieServiceProxy.post_GetFireAuditCompleteList(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
      console.log(this.formResultData)
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.searchParam.page = 1;
    this.searchParam.startApplyTime = moment(this.rangeTime[0])
    this.searchParam.endApplyTime =moment(this.rangeTime[1])
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

  /**
   * 新增申报
   */
  addDeclare() {
    this.router.navigate([`/app/engineering-management/addFireAcceptanceComponent/0/null`]);
  }

  /**
   * 导出
   */
  exportXlsx(){
    this._publicModel.exportXlsx(this.columns,this.formResultData.data);
  }


}
