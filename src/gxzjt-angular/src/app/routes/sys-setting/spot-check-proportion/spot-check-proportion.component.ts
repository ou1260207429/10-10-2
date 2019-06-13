import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc';


import { _HttpClient } from '@delon/theme';

// import { NatureServiceServiceProxy, SpotChechSetupList } from '../../../../shared/service-proxies/service-proxies'

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
  formResultData = [];
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
    { title: '编号', index: 'natureCode' },
    { title: '使用性质名称', index: 'natureName' },

    { title: '抽查比例', index: 'ratio' },

    { title: '操作人', index: 'lastUpdateUserName' },


    { title: '操作时间', type: 'date', index: 'lastUpdateTime' },


  ];
  modifyProportion = -1;
  isVisibleModal = false;
  isOkLoading = false;
  modalTitle = "";

  constructor(
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



    this.isSearchForm = true;

    // this.natureServiceServiceProxy.post_GetSpotCheckSetupList().subscribe((result: SpotChechSetupList) => {
    //   console.log(result);
    //   this.formResultData = result.natureList;
    //   this.isSearchForm = false;
    // }, err => {
    //   console.log(err);
    //   this.isSearchForm = false;
    // });
  }




}
