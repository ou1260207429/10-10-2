import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult, PagedAndFilteredInputDto, ProjectFlowServcieServiceProxy, FireAuditCompleteQueryDto } from '@shared/service-proxies/service-proxies'


import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import * as moment from 'moment';
import { PublicFormComponent } from '../public/public-form.component';
import { NzMessageService } from 'ng-zorro-antd';

/**
 * 竣工验收
 */
@Component({
  selector: 'app-completed-acceptance',
  templateUrl: './completed-acceptance.component.html',
  styles: []
})
export class CompletedAcceptanceComponent extends PublicFormComponent implements OnInit {

  formResultData;

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          // modal: {
          //   component: StatisticsProAppStaticDetailComponent,
          //   paramsName: 'record',
          // },
          // click: (record: any, modal: any) => {

          // },
        },
        {
          text: '受理凭证',
          type: 'link',
          // modal: {
          //   component: StatisticsAcceptCredentialsComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if(record.acceptAttachmentUrl){
              window.open(record.acceptAttachmentUrl)
            }else{
              this.message.error('暂无受理凭证');
            }
            
          },
        },
        {
          text: '意见书',
          type: 'link',
          // modal: {
          //   component: StatisticsPositionPaperComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if(record.opinionAttachmentUrl){
              window.open(record.opinionAttachmentUrl)
            }else{
              this.message.error('暂无意见书');
            }
            
          },
        },
      ]
    },
    { title: '竣工验收备案申报编号', index: 'recordNumber' },
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '是否被抽中', index: 'isSelected',format: (item: any) => `${item.isSelected?item.isSelected:4001}`,type: 'tag', tag: {
      4001:{text:'是',color: 'red' },
      true: { text: '是', color: '' },
      false: { text: '否',color: 'red' },
    }},
    { title: '验证码', index: '无此字段返回' },
    { title: '当前处理环节', index: 'currentNodeName' },
    { title: '当前处理人', index: 'currentHandleUserName' },
    { title: '流程是否超时', index: 'isExpireTime',format: (item: any) => `${item.isExpireTime?item.isExpireTime:4001}`,type: 'tag', tag: {
      4001:{text:'是',color: 'red' },
      true: { text: '是', color: '' },
      false: { text: '否',color: 'red' },
    }},
    { title: '审核结果', index: 'status',format: (item: any) => `${item.status?item.status:4001}`,type: 'tag', tag: {
      4001:{text:'待处理',color: '' },
      0: { text: '未处理', color: '' },
      1: { text: '受理', color: 'green' },
      2:{ text: '不受理',color: 'red' },
      3:{ text: '不合格',color: 'red' },
      4:{ text: '合格', color: '' },
      5:{ text: '未抽中', color: '' },
    }},
    { title: '操作人', index: 'companyName' },
    { title: '操作时间', index: 'applyTime',type:'date' },
  ];

  searchParam = new FireAuditCompleteQueryDto();

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime = ['2019-02-19T05:46:09.135Z','2019-06-19T05:46:09.135Z'];
  constructor(private _projectFlowServcieServiceProxy: ProjectFlowServcieServiceProxy,
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
    this.searchParam.page = 1;
    this.searchParam.maxResultCount = 10;
    this.searchParam.flowPathType = 3
    this.searchParam.sorting = 'ProjectName';
    this.searchParam.startApplyTime = moment(this.rangeTime[0]);
    this.searchParam.endApplyTime =moment(this.rangeTime[1]);
    this.getList();
  }


  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    this._projectFlowServcieServiceProxy.post_GetFireAuditCompleteList(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
      console.log(this.formResultData)
    })
  }

  /**
   * 点击查询
   */
  query() {
    this.searchParam.page = 1;
    this.searchParam.startApplyTime = moment(this.rangeTime[0])
    this.searchParam.endApplyTime =moment(this.rangeTime[1])
    this.getList();
  }


  watchItem(item) {
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.id}/${item.flowPathType}/1`]);
  }

  change(v) {
    pageOnChange(v, this.searchParam, () => {
      this.getList();
    })
  }

  okRangeTime(v){
    console.log(v);
    // const applyTimeStart:any = timeTrans(Date.parse(v[0]) / 1000, 'yyyy-MM-dd', '-')
    // const applyTimeEnd:any = timeTrans(Date.parse(v[1]) / 1000, 'yyyy-MM-dd', '-')
    // this.searchParam.applyTimeStart = applyTimeStart;
    // this.searchParam.applyTimeEnd = applyTimeEnd;
    // console.log(applyTimeEnd);
  }

  /**
   * 新增申报
   */
  addDeclare() {
    this.router.navigate([`/app/engineering-management/addCompletedAcceptanceComponent/0/null`]);
  }

  /**
   * 导出
   */
  exportXlsx(){
    // this._publicModel.exportXlsx(this.columns,this.formResultData.data);
  }

}
