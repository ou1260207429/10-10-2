import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { AttachmentServiceProxy } from '@shared/service-proxies/service-proxies';
import { PublicModel } from 'infrastructure/public-model';
import { PublicFormComponent } from '../public/public-form.component';
import { timeTrans } from 'infrastructure/regular-expression';

@Component({
  selector: 'app-form-download',
  // templateUrl: './form-download.component.html',
  templateUrl: '../public/public-form.html',
  
})
export class FormDownloadComponent extends PublicFormComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  @ViewChild('st') st: STComponent;

  params: any = {
    page: 1,
    size: 200,
    sort: "",
    isAsc: false,
    orderby: "",
    totalCount: 200,
    group: "",
    search: "",
    startTime: null,
    endTime: null,
  };

  nzPlaceHolder=['创建开始时间','创建结束时间']
  columns: STColumn[] = [
    { title: '表名', index: 'attachmentName' },
    { title: '创建时间', index: 'creationTime', type: 'date' },
    // { title: '最近操作时间', index: 'lastUpdateTime', type: 'date' },
    { title: '最近操作人账号', index: 'lastUpdateUserCode' },
    // { title: '最近操作人姓名', index: 'lastUpdateUserName' },
    {
      title: '访问量', index: 'visitCount'
    },

    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">删除</font>', click: (record: any) => {
            this._publicModel.isDeleteModal(() => {
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
    super();
    this.searchHolder = "表格名称";
  }

  ngOnInit() {
    let _self = this;
    // this.params.startTime = new Date(new Date(new Date().toLocaleDateString()).getTime());
    // this.params.endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
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

    this.params.page = 1;
    if (this.rangeTime) {
      this.params.startTime = this.rangeTime[0];
      this.params.endTime = this.rangeTime[1];
    }
    this.params.search = this.searchKey;
    this.isSearchForm = true;
    this.formResultData = []
    if (params.startTime) {
      params.startTime = timeTrans(Date.parse(params.startTime) / 1000, 'yyyy-MM-dd', '-') + " 00:00:00"
    }
    if (params.endTime) {
      params.endTime = timeTrans(Date.parse(params.endTime) / 1000, 'yyyy-MM-dd', '-') + " 23:59:59"
    }
    this._attachmentServiceProxy.attachmentListAsync(params).subscribe(data => {
      this.isSearchForm = false;
      this.formResultData = data.data;
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

  refresh() {
    this.query();
  }
}
