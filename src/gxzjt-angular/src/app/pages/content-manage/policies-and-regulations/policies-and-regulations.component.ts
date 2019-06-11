import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { AppConsts } from '@shared/AppConsts';
@Component({
  selector: 'app-policies-and-regulations',
  templateUrl: './policies-and-regulations.component.html',
  styles: []
})
export class PoliciesAndRegulationsComponent implements OnInit {

  @ViewChild('treeCom') treeCom;
  @ViewChild('st') st: STComponent;
  flowAddType: any = {
    type: '',
    name: ''
  };
  nodes = [{
    title: '全部',
    key: '',
    icon: 'folder-open',
    isLeaf: true
  }];

  chooseAuditors;

  params: any = {};
  data=[
    {
      id:1,
      number:999,
      name:"xxx",
      titleName:"标题名称",
      curNodeName:"222",
      startDate:"2019-07-03",
      operator:"操作人",
      creationTime:"2019-082-21"
    }
  ];
  columns: STColumn[] = [
    { title: '内部编号', index: 'number' },
    { title: '类型', index: 'name' },
    { title: '标题名称', index: 'titleName' },
    { title: '颁布机关', index: 'curNodeName' },
    { title: '生效日期', index: 'startDate' },
    {
      title: '操作人', index: 'creationTime', type: 'date'
    },
    {
      title: '发布时间', index: 'creationTime', type: 'date'
    },
    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">详情</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/policiesAndRegulationsDetailsComponent/${record.id}`]);
          }
        },
        {
          text: '<font class="stButton">编辑</font>', click: (record: any) => {
            this.router.navigate([`/app/content-manage/policiesAndRegulationsDetailsComponent/${record.id}`]);
          }
        },
      ]
    }
  ];


  pageConfig: STPage = publicPageConfig;
  constructor(private router: Router, private eventEmiter: EventEmiter, ) {
    this.init();
  }

  ngOnInit() {
    let _self = this;

    this.eventEmiter.on('init', () => {
      _self.init();
    });

    this.eventEmiter.on('flowadd', () => {
      _self.init();
    });
  }

  /**
   * 初始化
   */
  init() {
    this.params.page = 1;
    this.params.maxResultCount = AppConsts.grid.defaultPageSize;
    this.params.filterText = '';
    this.params.result = 4;
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
   // this.data = '';
    // this._flowServices.tenant_ProcessedWorkFlow_NodeAuditorRecord(params).subscribe(data => {
    //   this.data = data.result;
    // })
  }

  /**
   * 点击查询
   */
  query() {
    this.params.page = 1;
    this.params.maxResultCount = AppConsts.grid.defaultPageSize;
    this.workFlow_NodeAuditorRecords(this.params);
  }

  change(v) {
    pageOnChange(v, this.params, () => {
      this.workFlow_NodeAuditorRecords(this.params);
    })
  }

}
