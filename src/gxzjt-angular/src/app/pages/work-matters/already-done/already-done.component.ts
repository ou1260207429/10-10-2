import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult, PagedAndFilteredInputDto } from '@shared/service-proxies/service-proxies'

import { PublicFormComponent } from '../public/public-form.component';

import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { timeTrans } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
/**
 * 已办流程
 */
@Component({
  selector: 'app-agency-done',
  templateUrl: 'already-done.component.html',
  styles: [],
})
export class AlreadyDoneComponent  implements OnInit {

 


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

  searchParam = new PendingWorkFlow_NodeAuditorRecordDto();

  pageConfig: STPage = publicPageConfig;

  formResultData

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime
  constructor(private _publicModel:PublicModel,private workFlowedServiceProxy: WorkFlowedServiceProxy,
    private _flowServices: FlowServices,
    private router: Router,
    private http: _HttpClient,
    private xlsx: XlsxService) {

  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.searchParam.pagedAndFilteredInputDto = new PagedAndFilteredInputDto();
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.searchParam.pagedAndFilteredInputDto.maxResultCount = 10;
    this.getList();
  }


  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    this.workFlowedServiceProxy.processedWorkFlow_NodeAuditorRecord(this.searchParam).subscribe((data: any) => {
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


  watchItem(item) {
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.flowId}/${item.flowPathType}`]);
  }

  change(v) {
    pageOnChange(v, this.searchParam.pagedAndFilteredInputDto, () => {
      this.getList();
    })
  }

  okRangeTime(v) {
    console.log(v);
    // const applyTimeStart:any = timeTrans(Date.parse(v[0]) / 1000, 'yyyy-MM-dd', '-')  
    // const applyTimeEnd:any = timeTrans(Date.parse(v[1]) / 1000, 'yyyy-MM-dd', '-')   
    // this.searchParam.applyTimeStart = applyTimeStart;
    // this.searchParam.applyTimeEnd = applyTimeEnd;
    // console.log(applyTimeEnd);
  }

  /**
   * 导出
   */
  exportXlsx(){
    this._publicModel.exportXlsx(this.columns,this.formResultData.data);
  }

}
