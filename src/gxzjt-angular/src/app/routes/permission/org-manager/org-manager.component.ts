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
  styles: [],
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
    { title: '部门', index: 'pro_type' },
    { title: '流程流水号', index: 'pro_no' },

    { title: '工程名称', index: 'pro_name' },

    { title: '建设单位', index: 'org' },
    {
      title: '工程类型', index: 'node',
      sort: {
        compare: (a, b) => a.node > b.node ? 1 : 0,
      },
      filter: {
        menus: [
          { text: '初审', value: 0 },
          { text: '复审', value: 1 },
          { text: '审核完毕', value: 2 },
        ],
        fn: (filter: any, record: any) =>
          record.node >= filter.value[0] && record.node <= filter.value[1],
        multiple: false,
      }
    },
    { title: '当前处理人', index: 'person' },

    { title: '申报时间', type: 'date', index: 'repo_time' },
    { title: '流程超时', index: 'timeout' }

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