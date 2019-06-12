import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, PagedAndFilteredInputDto } from '../../../../shared/service-proxies/service-proxies'

import { PublicFormComponent } from '../public/public-form.component';

import { Router } from '@angular/router';

/**
 * 已办流程
 */
@Component({
  selector: 'app-already-done',
  templateUrl: '../public/public-form.html',
  styles: []
})
export class AlreadyDoneComponent extends PublicFormComponent implements OnInit {


  searchKey = '';


  page = 1;


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '查看', click: (item: any) => {
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

    private xlsx: XlsxService) {
    super();
  }

  ngOnInit() {
    this.search();
  }



  refresh() {
    this.resetSearchFliterForm();
    this.search();
  }
  search() {

    var searchParam = new PendingWorkFlow_NodeAuditorRecordDto();

    var jsonData = {
      "applyTimeStart": this.rangeTime[0],
      "applyTimeEnd": this.rangeTime[1],
      "companyName": this.orgName,
      "projectName": this.proName,
      "pagedAndFilteredInputDto": {
        "filterText": "",
        "page": this.page,
        "sorting": "",
        "skipCount": 0,
        "maxResultCount": 50
      },
    };

    searchParam.init(jsonData);

    this.isSearchForm = true;
    this.workFlowedServiceProxy.processedWorkFlow_NodeAuditorRecord(searchParam).pipe().subscribe(res => {
      console.log(res);
      this.isSearchForm = false;
    }, err => {
      console.log(err);
      this.isSearchForm = false;
    });
  }


  watchItem(item) {
    this.router.navigate([`/app/work-matters/alreadyDoneDetailsComponent/${item.workFlow_Instance_Id}`]);
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
