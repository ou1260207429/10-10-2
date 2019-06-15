import { FlowServices } from './../../../../services/flow.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STPage, STComponent } from '@delon/abc';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
import { Router } from '@angular/router';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { AppConsts } from '@shared/AppConsts';
import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, PagedAndFilteredInputDto } from '@shared/service-proxies/service-proxies';



/**
 * 竣工验收
 */
@Component({
  selector: 'app-completed-acceptance',
  templateUrl: './completed-acceptance.component.html',
  styles: []
})
export class CompletedAcceptanceComponent implements OnInit {
  @ViewChild('st') st: STComponent;
  params: PendingWorkFlow_NodeAuditorRecordDto
  data;
  columns: STColumn[] = [
    {
      title: '操作', className: 'text-center', buttons: [
        {
          text: '<font class="stButton">详情</font>', click: (record: any) => {
            this.router.navigate([`/app/engineering-management/addCompletedAcceptanceComponent/2/${record.projectId}`]);
          }
        },
        {
          text: '<font class="stButton">受理凭证</font>', click: (record: any) => {

          }
        },
        {
          text: '<font class="stButton">意见书</font>', click: (record: any) => {

          }
        },
      ]
    },
    { title: '工程编号', index: 'projectCode' },
    { title: '工程名称', index: 'projectName' },
    { title: '表单名称', index: 'name' },
    { title: '创建人单位', index: 'companyName' },
    { title: '创建人名', index: 'createEName' },
    {
      title: '申请时间', index: 'applyTime', type: 'date'
    },

  ];
  pageConfig: STPage = publicPageConfig;
  constructor(private _workFlowedService: WorkFlowedServiceProxy, private router: Router, private _flowServices: FlowServices, private eventEmiter: EventEmiter, ) {
    this.init();
  }

  /**
   * 判断发起流程
   * @param key 
   * @param index 
   */
  isSen(key) {
    return key
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
    this.params = new PendingWorkFlow_NodeAuditorRecordDto();
    this.params.pagedAndFilteredInputDto = new PagedAndFilteredInputDto()
    this.params.pagedAndFilteredInputDto.page = 1;
    this.params.pagedAndFilteredInputDto.maxResultCount = AppConsts.grid.defaultPageSize;
    this.params.projectTypeStatu = 2;
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
    this._workFlowedService.queryWorkFlow_InstanceList(this.params).subscribe(data => {
      this.data = data;
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.params.pagedAndFilteredInputDto.page = 1;
    this.params.pagedAndFilteredInputDto.maxResultCount = AppConsts.grid.defaultPageSize;
    this.workFlow_NodeAuditorRecords(this.params);
  }

  /**
   * 导出
   */
  export() {

  }

  /**
   * 新增申报
   */
  addDeclare() {
    this.router.navigate([`/app/engineering-management/addCompletedAcceptanceComponent/0/null`]);
  }

  change(v) {
    pageOnChange(v, this.params.pagedAndFilteredInputDto, () => {
      this.workFlow_NodeAuditorRecords(this.params);
    })
  }

}
