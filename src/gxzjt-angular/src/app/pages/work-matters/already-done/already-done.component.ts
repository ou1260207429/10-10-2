import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult, PagedAndFilteredInputDto } from '@shared/service-proxies/service-proxies'

import { PublicFormComponent } from '../public/public-form.component';

import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { timeTrans } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { NzMessageService } from 'ng-zorro-antd';
/**
 * 已办流程
 */
@Component({
  selector: 'app-agency-done',
  templateUrl: 'already-done.component.html',
})
export class AlreadyDoneComponent
  extends PublicFormComponent implements OnInit {


    index;

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width:'200px',
      buttons: [
        {
          text: '详情',
          
          click: (item: any) => {
            this.watchItem(item);
          }
        },
        {
          text: '受理凭证', iif: record => record.acceptAttachmentUrl!=null,click: (record: any) => {
            if(record.acceptAttachmentUrl){
              window.open(record.acceptAttachmentUrl)
            }else{
              this.message.error('暂无受理凭证');
            }
          }
        },
        {
          text: '意见书', iif: record => record.opinionAttachmentUrl!=null,click: (record: any) => {
            if(record.opinionAttachmentUrl){
              window.open(record.opinionAttachmentUrl)
            }else{
              this.message.error('暂无意见书');
            }
          }
        },
      ]
    },
    { title: '工程名称', index: 'projectName',width:'150px' },
    { title: '工程编号', index: 'projectCode',width:'150px' },
    { title: '建设单位', index: 'companyName',width:'150px' },
    { title: '工程类型', index: 'flowTypeName',width:'150px' },
    { title: '节点处理人', index: 'cur_NodeAuditorName',width:'150px' },
    { title: '申报时间', index: 'applyTime', type: 'date',width:'150px' },
    { title: '处理时间', index: 'acceptTime',type:'date',width:'150px'},
    // { title: '流程是否超时', index: 'isExpire',type: 'tag', tag: {
    //   true: { text: '超时', color: 'red' },
    //   false: { text: '未超时', color: 'green' },
    // }},
    { title: '流程是否超时', index: 'isExpire',width:'120px',format:(item:any)=>`${item.isExpire==true?"是":"否"}`,type: 'tag', tag: {
      "是": { text: '是', color: 'red' },
      "否": { text: '否', color: '' },
    }},

  ];

  searchParam = new PendingWorkFlow_NodeAuditorRecordDto();

  pageConfig: STPage = publicPageConfig;

  formResultData: any;


  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime
  constructor(private _publicModel:PublicModel,private workFlowedServiceProxy: WorkFlowedServiceProxy,
    private _flowServices: FlowServices,
    private router: Router,
    private http: _HttpClient,
    private xlsx: XlsxService, private message: NzMessageService) {
    super();
  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.searchParam.pagedAndFilteredInputDto = new PagedAndFilteredInputDto();
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.searchParam.pagedAndFilteredInputDto.maxResultCount = 10;
    this.searchParam.number='';
    this.searchParam.projectName='';
    this.searchParam.companyName='';
    this.searchParam.pagedAndFilteredInputDto.sorting = 'projectName desc'
    this.searchParam.projectTypeStatu=null;
    this.getList();
  }
  reststart() {
    this.resetTime();
    this.searchParam.pagedAndFilteredInputDto = new PagedAndFilteredInputDto();
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.searchParam.pagedAndFilteredInputDto.maxResultCount = 10;
    this.searchParam.number = '';
    this.searchParam.projectName = '';
    this.searchParam.companyName = '';
    this.searchParam.pagedAndFilteredInputDto.sorting = 'projectId desc'
    this.searchParam.projectTypeStatu = null;
    this.searchParam.applyTimeStart = this.rangeTime[0];
    this.searchParam.applyTimeEnd = this.rangeTime[1];
    this.getList();
  }

  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    if(this.rangeTime!=null){
      this.searchParam.applyTimeStart = this.rangeTime[0];
      this.searchParam.applyTimeEnd = this.rangeTime[1];
    }else{
      this.searchParam.applyTimeStart = null;
      this.searchParam.applyTimeEnd = null;
    }
    this.workFlowedServiceProxy.processedWorkFlow_NodeAuditorRecord(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.getList();
  }


  watchItem(item) {
    this.router.navigate([`/app/work-matters/alreadyDoneDetailsComponent/${item.flowNo}/${item.flowId}/${item.flowPathType}`]);
  }

  change(v) {
    pageOnChange(v, this.searchParam.pagedAndFilteredInputDto, () => {
      this.getList();
    })
  }

  okRangeTime(v) {
  
  }

  /**
   * 导出
   */
  exportXlsx(){
    this._publicModel.exportXlsx(this.columns,this.formResultData.data);
  }

}
