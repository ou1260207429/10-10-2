import { FlowServices } from './../../../../services/flow.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { AppConsts } from '@shared/AppConsts';
// import { ProjectFlowServcieServiceProxy, DraftQueryDto } from '@shared/service-proxies/service-proxies';

/**
 *  草稿箱
 */
@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styles: []
})
export class DraftsComponent implements OnInit {
  data: any;
  // @ViewChild('treeCom') treeCom;
  // @ViewChild('st') st: STComponent;
  // flowAddType: any = {
  //   type: '',
  //   name: ''
  // };
  // nodes = [{
  //   title: '全部',
  //   key: '',
  //   icon: 'folder-open',
  //   isLeaf: true
  // }];

  // chooseAuditors;

  // params: DraftQueryDto = new DraftQueryDto();
  // data;
  // columns: STColumn[] = [
  //   { title: '表单ID', index: 'projectId' },
  //   { title: '表单名称', index: 'projectName' },
  //   {
  //     title: '操作', className: 'text-center', buttons: [
  //       {
  //         text: '<font class="stButton">查看详情</font>', click: (record: any) => {
  //           this.router.navigate([`/app/work-matters/alreadyDoneDetailsComponent/${record.workFlow_Instance_Id}`]);
  //         }
  //       },
  //     ]
  //   }
  // ];


  // pageConfig: STPage = publicPageConfig;
  // constructor(private router: Router, private _projectFlowServcieService: ProjectFlowServcieServiceProxy, private eventEmiter: EventEmiter, ) {
  //   this.init();
  // }
  ngOnInit() { }
  // ngOnInit() {
  //   let _self = this;

  //   this.eventEmiter.on('init', () => {
  //     _self.init();
  //   });

  //   this.eventEmiter.on('flowadd', () => {
  //     _self.init();
  //   });
  // }

  // /**
  //  * 初始化
  //  */
  // init() {
  //   this.params.page = 1;
  //   this.params.maxResultCount = AppConsts.grid.defaultPageSize;
  //   this.params.sorting = 'ProjectId';
  //   this.workFlow_NodeAuditorRecords();
  // }

  // /**
  //  * 回车
  //  */
  // onEnter(v) {
  //   if (v.which === 13) {
  //     this.query();
  //   }
  // }

  // /**
  //  * 获取列表 
  //  */
  // workFlow_NodeAuditorRecords() {
  //   this.data = '';
  //   // this._projectFlowServcieService.post_GetDrafts(this.params).subscribe(data => {
  //   //   this.data = data
  //   // })
  // }

  // /**
  //  * 点击查询
  //  */
  // query() {
  //   this.params.page = 1;
  //   this.params.maxResultCount = AppConsts.grid.defaultPageSize;
  //   this.workFlow_NodeAuditorRecords();
  // }

  // change(v) {
  //   pageOnChange(v, this.params, () => {
  //     this.workFlow_NodeAuditorRecords();
  //   })
  // }

}
