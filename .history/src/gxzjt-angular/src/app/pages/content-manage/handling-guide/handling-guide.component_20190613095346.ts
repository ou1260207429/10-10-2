import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { RegulationServiceProxy, NoticeServiceProxy } from '@shared/service-proxies/service-proxies';
import { PublicModel } from 'infrastructure/public-model';

@Component({
  selector: 'app-handling-guide',
  templateUrl: './handling-guide.component.html',
  styles: []
})
export class HandlingGuideComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  @ViewChild('st') st: STComponent;

  params: any = {
    page: 1,
    size: 10,
    sort: "",
    isAsc: false,
    orderby: "",
    totalCount: 20,
    //search: 11,
    //startTime: null,
    //endTime: null,
  };
  data


  // Id = q.Id,
  // NoticeType = 类型
  // Title = 正文
  // VisitCount = 浏览量
  // CreationTime = 发布时间
  // LastUpdateUserName = 操作人
  // LastModificationTime = 最近操作时间
  //  LastUpdateUserCode = 操作人账号



  columns: STColumn[] = [
    { title: '内部编号', index: 'regulationCode' },
    { title: '类型', index: 'noticeType' },
    { title: '标题名称', index: 'title' },
    { title: '浏览量', index: 'visitCount' },
    {
      title: '发布时间', index: 'creationTime', type: 'date'
    },
    {
      title: '操作人', index: 'lastUpdateUserName'
    },
    {
      title: '最近操作时间', index: 'lastModificationTime', type: 'date'
    },
    {
      title: '操作人账号', index: 'lastUpdateUserCode'
    },
    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">详情</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/handlingGuidDetailComponent/${record.id}`, { operate: 1 }]);
          }
        },
        {
          text: '<font class="stButton">编辑</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/handlingGuidDetailComponent/${record.id}`, { operate: 2 }]);
          }
        },
        {
          text: '<font class="stButton">删除</font>', click: (record: any) => {
            this._publicModel.isDeleteModal(() => {
              this._noticeServiceProxy.deleteNoticeByIdAsync(record.id).subscribe(data => {
                this.init();
              })
            });
          }
        },
      ]
    }
  ];


  pageConfig: STPage = publicPageConfig;
  validateForm: any;
  constructor(private _publicModel: PublicModel, private _noticeServiceProxy: NoticeServiceProxy, private _regulationServiceProxy: RegulationServiceProxy, private router: Router, private eventEmiter: EventEmiter) {
  }

  ngOnInit() {
    let _self = this;
    this.params.startTime = new Date(new Date(new Date().toLocaleDateString()).getTime());
    this.params.endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    this.init();
    this.eventEmiter.on('init', () => {
      _self.init();
    });

  }

  /**
   * 初始化
   */
  init() {
    this.query_noticeRecords(this.params);

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
  query_noticeRecords(params?: any) {
    this.data = "";
    this._noticeServiceProxy.noticeListAsync(params).subscribe(data => {
      this.data = data;
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.params.page = 1;
    this.query_noticeRecords(this.params);
  }

  change(v) {
    pageOnChange(v, this.params, () => {
      this.query_noticeRecords(this.params);
    })
  }

  add() {
    this.router.navigate([`/app/content-manage/handlingGuidDetailComponent/1`,{ operate: 0 }]);
  }

}
