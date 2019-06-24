import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { _HttpClient } from '@delon/theme';

import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult } from '@shared/service-proxies/service-proxies'

import { PublicFormComponent } from '../public/public-form.component';

import { Router } from '@angular/router';


/**
 * 权限管理
 */
@Component({
  selector: 'org-manager',
  templateUrl: '../public/public-form.html',
})
export class OrgManagerComponent extends PublicFormComponent implements OnInit {




  page = 1;

  searchInputs = [
    {
      searchKey: "",
      formControlName: "search",
      placeholder: "组织名称"
    }
  ];

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '编辑', click: (item: any) => {
            this.watchItem(item);
          }
        },
      ]
    },
    { title: '部门ID', index: 'pro_type' },
    { title: '部门名称', index: 'pro_no' },

    { title: '部门全路径', index: 'pro_name' },

    { title: '操作人', index: 'org' },

    { title: '操作时间', type: 'date', index: 'timeout' }

  ];

  constructor(private workFlowedServiceProxy: WorkFlowedServiceProxy,
    private router: Router,
    private http: _HttpClient,
    private xlsx: XlsxService) {
    super();
    this.needAdd = true;
    this.needSingleForm = false;
    this.needTreeForm = true;
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
    this.workFlowedServiceProxy.pendingWorkFlow_NodeAuditorRecord(searchParam).subscribe((res: DataSourceResult) => {
      console.log(JSON.stringify(res));
      this.formResultData = res.data;
      this.isSearchForm = false;
    }, err => {
      console.log(err);
      this.isSearchForm = false;
    });

  }



  watchItem(item) {

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
