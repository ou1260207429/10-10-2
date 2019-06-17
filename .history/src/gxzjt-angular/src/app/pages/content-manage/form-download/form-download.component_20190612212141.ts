import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import {AttachmentServiceProxy } from '@shared/service-proxies/service-proxies';
import { PublicModel } from 'infrastructure/public-model';

@Component({
  selector: 'app-form-download',
  templateUrl: './form-download.component.html',
  styles: []
})
export class FormDownloadComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  @ViewChild('st') st: STComponent;

  params: any = {
    page: 1,
    size: 10,
    sort: "",
    isAsc: false,
    orderby: "",
    totalCount: 20,
    group:''
    //search: 11,
    //startTime: null,
    //endTime: null,
  };
  data

  // id
  // 表名 AttachmentName
  
  // 最近操作时间 LastUpdateTime
  
  // 最近操作人账号 LastUpdateUserCode
  
  // 最近操作人姓名 LastUpdateUserName 
  
  // 访问量 VisitCount 




  columns: STColumn[] = [
    { title: '表名', index: 'AttachmentName' },
    { title: '最近操作时间', index: 'LastUpdateTime', type: 'date' },
    { title: '最近操作人账号', index: 'LastUpdateUserCode' },
    { title: '最近操作人姓名', index: 'LastUpdateUserName' },
    { title: '操作人', index: 'issueDate', type: 'date' },
    {
      title: '访问量', index: 'visitCount'
    },

    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">删除</font>', click: (record: any) => {
            this._publicModel.isDeleteModal(()=>{
              this._attachmentServiceProxy.deleteAttachmentById(record.id).subscribe(data => {
                this.init();
              })
            });
          }
        }
      ]
    }
  ];


  pageConfig: STPage = publicPageConfig;
  constructor(private _publicModel: PublicModel, private _attachmentServiceProxy: AttachmentServiceProxy, private router: Router, private _eventEmiter: EventEmiter) {
  }

  ngOnInit() {
    let _self = this;
    this.init();
    this._eventEmiter.on('init', () => {
      _self.init();
    });

  }

  /**
   * 初始化
   */
  init() {

    this.workFlow_NodeAuditorRecords(this.params);

  }

  /**
   * 回车
   */
  onEnter(v) {
    if (v.which === 13) {
      this.query();
    }
  }

  /**
   * 获取列表 
   */
  workFlow_NodeAuditorRecords(params?: any) {
    this.data = "";
    this._attachmentServiceProxy.attachmentListAsync(params).subscribe(data => {
      this.data = data;
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.params.page = 1;
    this.workFlow_NodeAuditorRecords(this.params);
  }

  change(v) {
    pageOnChange(v, this.params, () => {
      this.workFlow_NodeAuditorRecords(this.params);
    })
  }

  add() {
    this.router.navigate([`/app/content-manage/formDownloadDetailComponent`]);
  }

}
