import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult, PagedAndFilteredInputDto } from '@shared/service-proxies/service-proxies'

import { PublicFormComponent } from '../public/public-form.component';

import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';

import { PublicModel } from 'infrastructure/public-model';
import { EventEmiter } from 'infrastructure/eventEmiter';
/**
 * 待办流程
 */
@Component({
  selector: 'search-had-done',
  templateUrl: 'search-had-done.html',
})
export class SearchHadDoneComponent extends PublicFormComponent implements OnInit {
  index;


  formResultData

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
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode' },
    { title: '建设单位', index: 'companyName' },
    { title: '工程类型', index: 'flowTypeName' },
    { title: '当前处理人', index: 'cur_NodeAuditorName' },
    { title: '申报时间', index: 'applyTime',type:'date' },
    { title: '受理时间', index: 'acceptTime',type:'date' },
    { title: '流程是否超时', index: 'isExpire',type: 'tag', tag: {
      true: { text: '超时', color: 'red' },
      false: { text: '未超时', color: 'green' },
    }},
  ];

  searchParam = new PendingWorkFlow_NodeAuditorRecordDto();

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime
  constructor(private workFlowedServiceProxy: WorkFlowedServiceProxy,
    private eventEmiter: EventEmiter,
    private _flowServices: FlowServices,
    private router: Router,
    private _publicModel: PublicModel,
    private http: _HttpClient,
    private xlsx: XlsxService) {

    super();

  }

  ngOnInit() {
    this.init()

    let _self = this;
    this.init();
    this.eventEmiter.on('agencyDoneInit', () => {
      _self.init();
    });
  }

  init() {
    this.searchParam.pagedAndFilteredInputDto = new PagedAndFilteredInputDto();
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.searchParam.pagedAndFilteredInputDto.maxResultCount = 10;
    this.searchParam.number='';
    this.searchParam.projectName='';
    this.searchParam.companyName='';
    this.searchParam.projectTypeStatu=null;
    this.getList();
  }


  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    this.workFlowedServiceProxy.pendingWorkFlow_NodeAuditorRecord(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.getList();
  }
  reststart() {
    this.resetTime();
    this.searchParam.pagedAndFilteredInputDto = new PagedAndFilteredInputDto();
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.searchParam.pagedAndFilteredInputDto.maxResultCount = 10;
    this.searchParam.number = '';
    this.searchParam.projectName = '';
    this.searchParam.companyName = '';
    this.searchParam.projectTypeStatu = null;
    this.searchParam.applyTimeStart = this.rangeTime[0];
    this.searchParam.applyTimeEnd = this.rangeTime[1];
    this.getList();
  }

  watchItem(item) {
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.flowId}/${item.flowPathType}/0`]);
  }

  change(v) {
    pageOnChange(v, this.searchParam.pagedAndFilteredInputDto, () => {
      this.getList();
    })
  }

  /**
   * 导出
   */
  exportXlsx() {
    this._publicModel.exportXlsx(this.columns, this.formResultData.data);
  }

  okRangeTime(v) {

  }

  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
}

}
