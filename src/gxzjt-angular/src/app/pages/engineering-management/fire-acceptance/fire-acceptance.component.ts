import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult, PagedAndFilteredInputDto, ProjectFlowServcieServiceProxy, FireAuditCompleteQueryDto } from '@shared/service-proxies/service-proxies'

import { PublicModel } from 'infrastructure/public-model';
import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { timeTrans } from 'infrastructure/regular-expression';
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
          text: '执行', click: (item: any) => {
            this.watchItem(item);
          }
        },
      ]
    },
    { title: '表单', index: 'companyName' },
    // { title: '创建人员', index: 'createEName' },
    { title: '申报时间', index: 'applyTime' },
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
