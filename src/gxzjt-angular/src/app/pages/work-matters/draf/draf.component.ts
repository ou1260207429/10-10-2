import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto } from '../../../../shared/service-proxies/service-proxies'



import { Router } from '@angular/router';


/**
 * 待办流程
 */
@Component({
  selector: 'app-work-draf',
  templateUrl: '../public/public-form.html',
  styles: [],
})
export class DrafComponent implements OnInit {





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
    private router: Router

  ) {

  }

  ngOnInit() {
    this.getList();
  }


  isSearchForm = false;
  refresh() {
    this.getList();
  }
  getList() {

    // var searchParam = new PendingWorkFlow_NodeAuditorRecordDto();

    // var jsonData = {

    // };

    // searchParam.init(jsonData);

    // this.isSearchForm = true;
    // this.workFlowedServiceProxy.pendingWorkFlow_NodeAuditorRecord(searchParam).pipe().subscribe(res => {
    //   console.log(res);
    //   this.isSearchForm = false;
    // }, err => {
    //   console.log(err);
    //   this.isSearchForm = false;
    // });
  }


  watchItem(item) {
    this.router.navigate([`/app/work-matters/alreadyDoneDetailsComponent/${item.workFlow_Instance_Id}`]);
  }



}
