import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc';


import { _HttpClient } from '@delon/theme';

import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto } from '../../../../shared/service-proxies/service-proxies'

import { Router } from '@angular/router';


/**
 * 待办流程
 */
@Component({
  selector: 'sys-setting',
  templateUrl: './spot-check-proportion.html',
  styles: [],
})
export class SpotCheckProportionComponent implements OnInit {


  page = 1;
  isSearchForm = false;

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '修改比例', click: (item: any) => {

          }
        },
      ]
    },
    { title: '编号', index: 'no' },
    { title: '使用性质名称', index: 'use_name' },

    { title: '抽查比例', index: 'proportion' },

    { title: '操作人', index: 'controlor' },


    { title: '操作时间', type: 'date', index: 'ctrl_time' },


  ];
  modifyProportion = -1;
  isVisibleModal = false;
  isOkLoading = false;
  modalTitle = "";

  constructor(private workFlowedServiceProxy: WorkFlowedServiceProxy,
    private router: Router

  ) {

  }

  ngOnInit() {
    this.getList();
  }


  showModal(): void {
    this.isVisibleModal = true;
  }

  handleOk(): void {
    // this.isOkLoading = true;


  }

  handleCancel(): void {
    this.isVisibleModal = false;
  }

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




}
