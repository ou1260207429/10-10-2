import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult } from '@shared/service-proxies/service-proxies'

import { PublicFormComponent } from '../public/public-form.component';

import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
/**
 * 待办流程
 */
@Component({
  selector: 'app-agency-done',
  templateUrl: '../public/public-form.html',
  styles: [],
})
export class AgencyDoneComponent extends PublicFormComponent implements OnInit {


  searchKey = '';


  page = 1;


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
    { title: '表单', index: 'fromName' },
    { title: '创建人员', index: 'createEName' },
    { title: '申报时间', index: 'completionTime' },
  ];

  constructor(private workFlowedServiceProxy: WorkFlowedServiceProxy,
    private _flowServices: FlowServices,
    private router: Router,
    private http: _HttpClient,
    private xlsx: XlsxService) {
    super();
  }

  ngOnInit() {
    this.search();
  }



  refresh() {
    this.search();
  }

  search() {

    var searchParam = new PendingWorkFlow_NodeAuditorRecordDto();



    var jsonData = {
      "applyTimeStart": this.rangeTime ? this.rangeTime[0] : null,
      "applyTimeEnd": this.rangeTime ? this.rangeTime[1] : new Date(),
      "companyName": this.orgName,
      "projectName": this.proName,
      "pagedAndFilteredInputDto": {
        "filterText": "",
        "page": this.page,
        "sorting": "",
        "skipCount": this.page * this.pageSize,
        "maxResultCount": this.pageSize
      },
    };

    searchParam.init(jsonData);

    this.isSearchForm = true;
    this._flowServices.tenant_PendingWorkFlow_NodeAuditorRecord(searchParam).subscribe(data => {
      this.formResultData = data.result.data;
      this.isSearchForm = false;
    })

  }


  watchItem(item) {
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.workFlow_TemplateInfo_Id}/${item.workFlow_Instance_Id}/${item.workFlow_NodeRecord_Id}`]);
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



}
