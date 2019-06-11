import { FlowServices } from './../../../../services/flow.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { AppConsts } from '@shared/AppConsts';

/**
 * 已办流程
 */
@Component({
  selector: 'app-already-done',
  templateUrl: './already-done.component.html',
  styles: []
})
export class AlreadyDoneComponent implements OnInit {

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
  data;
  columns: STColumn[] = [
    { title: '流水号', index: 'number' },
    { title: '流程名称', index: 'name' },
    { title: '发起人', index: 'createEName' },
    { title: '当前节点', index: 'curNodeName' },
    { title: '当前审核人', index: 'applyEName' },
    {
      title: '创建时间', index: 'creationTime', type: 'date'
    },
    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">查看详情</font>', click: (record: any) => {
            this.router.navigate([`/app/work-matters/alreadyDoneDetailsComponent/${record.workFlow_Instance_Id}`]);
          }
        },
      ]
    }
  ];


  pageConfig: STPage = publicPageConfig;
  constructor(private router: Router, private _flowServices: FlowServices, private eventEmiter: EventEmiter, ) {
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
    this.data = '';
    this._flowServices.tenant_ProcessedWorkFlow_NodeAuditorRecord(params).subscribe(data => {
      this.data = data.result;
    })
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
