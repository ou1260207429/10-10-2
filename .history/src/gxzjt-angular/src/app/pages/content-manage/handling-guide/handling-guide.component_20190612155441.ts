import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { NoticeDto } from '@shared/service-proxies/service-proxies';
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
  columns: STColumn[] = [
    { title: '内部编号', index: 'regulationCode' },
    { title: '类型', index: 'regulationTypeId' },
    { title: '标题名称', index: 'title' },
    { title: '浏览量', index: 'issueOrg' },
    { title: '操作人', index: 'issueDate', type: 'date' },
    {
      title: '发布时间', index: 'creationTime', type: 'date'
    },

    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">详情</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/policiesAndRegulationsDetailsComponent/${record.id}`, { operate: 1 }]);
          }
        },
        {
          text: '<font class="stButton">编辑</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/policiesAndRegulationsDetailsComponent/${record.id}`, { operate: 2 }]);
          }
        },
      ]
    }
  ];


  pageConfig: STPage = publicPageConfig;
  constructor(private _noticeDto: NoticeDto, private router: Router, private _eventEmiter: EventEmiter) {
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
  query_noticeList(params?: any) {
    this.data = "";
    this._noticeDto.noticeListAsync(params).subscribe(data => {
      this.data = data;
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.params.page = 1;
    this.query_noticeList(this.params);
  }

  change(v) {
    pageOnChange(v, this.params, () => {
      this.query_noticeList(this.params);
    })
  }

  add() {
    this.router.navigate([`/app/content-manage/handlingGuidDetailComponent/1`, { operate: 0 }]);
  }

}
