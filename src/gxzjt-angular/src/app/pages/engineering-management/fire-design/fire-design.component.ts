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


/**
 * 消防設計
 */
@Component({
  selector: 'app-fire-design',
  templateUrl: './fire-design.component.html',
  styles: []
})
export class FireDesignComponent extends PublicFormComponent implements  OnInit {
  param = new FireAuditCompleteQueryDto();
  formResultData = [];
  rangeTime = ['2019-02-19T05:46:09.135Z','2019-06-19T05:46:09.135Z'];
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

  pageConfig: STPage = publicPageConfig;
  constructor(private http: _HttpClient,
    private _projectFlowServcieServiceProxy: ProjectFlowServcieServiceProxy,
    private modal: ModalHelper,
    private router: Router,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService) {
      super();
     }

  ngOnInit() {
    this.init();
  }


  init() { 
    this.param.page = 1;
    this.param.maxResultCount = 10;
    this.param.flowPathType = 1 
    this.param.sorting = 'ProjectName';
    this.param.startApplyTime = moment(this.rangeTime[0])
    this.param.endApplyTime =moment(this.rangeTime[1])  
    this.getList();
  }

  addDeclare(){
    
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
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.id}/${item.flowPathType}/1`]);
  }
}
