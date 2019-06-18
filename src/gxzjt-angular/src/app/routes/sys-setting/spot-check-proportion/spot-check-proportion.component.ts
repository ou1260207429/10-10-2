import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc';
import { NzModalService } from 'ng-zorro-antd';

import { _HttpClient } from '@delon/theme';

import { NatureServiceServiceProxy, SpotChechSetupList, SpotCheckSetup } from '@shared/service-proxies/service-proxies'

import { Router } from '@angular/router';


/**
 * 抽查比例
 */
@Component({
  selector: 'spot-check-proportion',
  templateUrl: './spot-check-proportion.html',
  styles: [],
})
export class SpotCheckProportionComponent implements OnInit {


  page = 1;
  isSearchForm = false;
  formResultData = [];

  needModifyItem = {
    ratio: 0,
    natureId: 0,
    // id: 0,
    natureName: '',
  };

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '修改比例', click: (item: any) => {
            this.needModifyItem = item;
            this.showModal();
          }
        },
      ]
    },
    { title: '编号', index: 'natureCode' },
    { title: '使用性质名称', index: 'natureName' },

    { title: '抽查比例(%)', index: 'ratio' },

    { title: '操作人', index: 'lastUpdateUserName' },


    { title: '操作时间', type: 'date', index: 'lastUpdateTime' },


  ];

  isVisibleModal = false;
  isOkLoading = false;


  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

  constructor(private natureServiceServiceProxy: NatureServiceServiceProxy,
    private router: Router,
    private modalService: NzModalService

  ) {

  }

  ngOnInit() {
    this.getList();
  }


  showModal(): void {
    this.isVisibleModal = true;
  }

  handleOk(): void {
    var param = new SpotCheckSetup();

    var jsonData = {
      "natureId": this.needModifyItem.natureId,
      "ratio": this.needModifyItem.ratio,
      // "id": this.needModifyItem.id
    };

    param.init(jsonData);
    this.isOkLoading = true;
    this.natureServiceServiceProxy.post_UpdateSpotCheckSetup(param).subscribe(res => {
      this.isOkLoading = false;
      this.isVisibleModal = false;
      this.refresh();
    }, err => {
      var msg = (JSON.parse(err.response)).error.message;
      this.modalService.error({
        nzTitle: '请求出错啦！',
        nzContent: msg
      });
      this.isOkLoading = false;
      this.isVisibleModal = false;
    });

  }

  handleCancel(): void {
    this.isVisibleModal = false;
  }

  refresh() {
    this.getList();
  }
  getList() {



    this.isSearchForm = true;

    this.natureServiceServiceProxy.post_GetSpotCheckSetupList().subscribe((result: any) => {

      this.formResultData = result.natureList;

      this.isSearchForm = false;
    }, err => {
      console.log(err);
      this.isSearchForm = false;
    });
  }


}
