import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';

import { RegulationServiceProxy } from '@shared/service-proxies/service-proxies';
import { PublicModel } from 'infrastructure/public-model';
import { timeTrans } from 'infrastructure/regular-expression';
@Component({
  selector: 'app-policies-and-regulations',
  templateUrl: './policies-and-regulations.component.html',
  styles: []
})

export class PoliciesAndRegulationsComponent implements OnInit {
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
    { title: '法规编号', index: 'regulationCode' },
    { title: '法规类型', index: 'regulationType' },
    { title: '标题名称', index: 'title' },
    { title: '颁布机关', index: 'issueOrg' },
    {
      title: '发布时间', index: 'creationTime', type: 'date'
    },
    { title: '生效日期', index: 'issueDate', type: 'date' },
    {
      title: '内容存放路径', index: 'contentUrl'
    },
    {
      title: '最近修改时间', index: 'lastUpdateTime', type: 'date'
    },
    {
      title: '最近操作人账号', index: 'lastUpdateUserCode'
    },
    {
      title: '最近操作人名字', index: 'lastUpdateUserName'
    },
    {
      title: '浏览量', index: 'visitCount'
    },
    {
      title: '删除人id', index: '删除人id'
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
        {
          text: '<font class="stButton">删除</font>', click: (record: any) => {
            this._publicModel.isDeleteModal(() => {
              this._regulationServiceProxy.deleteRegulationByIdAsync(record.id).subscribe(data => {
                this.init();
              })
            });
          }
        },
      ]
    }
  ];

  pageConfig: STPage = publicPageConfig;
  constructor(private _eventEmiter: EventEmiter, private _publicModel: PublicModel, private _regulationServiceProxy: RegulationServiceProxy, private router: Router) {
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
   let nowDate =new Date(new Date()).getTime();
   console.log(nowDate)
   console.log(new Date(1560390485279))
  //  this.params.startTime = timeTrans(nowDate, 'yyyy-MM-dd 00:00:00', '-');
    // this.params.startTime = new Date();

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
    this._regulationServiceProxy.regulationListAsync(params).subscribe(data => {
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
    this.router.navigate([`/app/content-manage/policiesAndRegulationsDetailsComponent/1`, { operate: 0 }]);
  }

}
