import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { ProjectFlowServcieServiceProxy, FireAuditCompleteQueryDto } from '@shared/service-proxies/service-proxies'

import { PublicModel } from 'infrastructure/public-model';
import { Router } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { PublicFormComponent } from '../public/public-form.component';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';

/**
 * 消防验收
 */
@Component({
  selector: 'app-fire-acceptance',
  templateUrl: './fire-acceptance.component.html',
  styleUrls:['./fire-acceptance.component.less']
})
export class FireAcceptanceComponent  extends PublicFormComponent implements OnInit {


  formResultData;
  companyName;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width:'200px',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          click: (record: any, modal: any) => {

            this.watchItem(record);
          },
        },
        {
          text: '重新申请',
          type: 'modal',
          iif: record => record.status  === 2 && record.isResubmitted!=true,
          click: (record: any, modal: any) => {
            this.router.navigate([`/app/engineering-management/addFireAcceptanceComponent/0/${record.projectId}/${record.id}`]);
          },
        },
        {
          text: '复查申请',
          type: 'modal',
          iif: record => (record.status  === 3 && record.isResubmitted!=true),//当状态是3即为不合格的时候显示此按钮，若需要方便调试可自己更改status的值改变按钮显示
          click: (record: any, modal: any) => {

            this.toreapply(record);
          },
        },
        {
          text: '受理凭证',
          type: 'link',
          iif: record => record.acceptAttachmentUrl!=null,
          // modal: {
          //   component: StatisticsAcceptCredentialsComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if(record.acceptAttachmentUrl){
              window.open(record.acceptAttachmentUrl)
            }else{
              this.message.info('暂无受理凭证');
            }
          },
        },
        {
          text: '意见书',
          type: 'link',
          iif: record => record.opinionAttachmentUrl!=null,
          // modal: {
          //   component: StatisticsPositionPaperComponent,
          //   paramsName: 'record',
          // },
          click: (record: any, modal: any) => {
            if(record.opinionAttachmentUrl){
              window.open(record.opinionAttachmentUrl)
            }else{
              this.message.info('暂无意见书');
            }
          },
        },
      ]
    },
    { title: '消防验收申报编号', index: 'acceptanceNumber' },
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '联系人', index: 'contactPerson' ,width:'120px'},
    { title: '当前处理环节', index: 'currentNodeName',width:'120px' },
    { title: '流程是否超时', index: 'isExpireTime',width:'120px',format:(item:any)=>`${item.isExpireTime==true?"是":"否"}`, type: 'tag', tag: {
      "是": { text: '是', color: 'red' },
      "否": { text: '否', color: '' },
    }},
    { title: '结果', index: 'status',width:'120px',format: (item: any) => `${item.status==0?"未处理":(item.status==1?"受理":(item.status==2?"不受理":(item.status==3?"不合格":(item.status==4?"合格":(item.status==5?"未抽中":"未处理")))))}`,type: 'tag', tag: {
      "未处理": { text: '未处理', color: '' },
      "受理": { text: '受理', color: 'green' },
      "不受理":{ text: '不受理', color: 'red' },
      "不合格":{ text: '不合格', color: 'red' },
      "合格":{ text: '合格', color: '' },
      "未抽中":{ text: '未抽中', color: '' },
    }},
    { title: '操作时间', index: 'applyTime',type:'date',width:'120px' },
  ];

  searchParam = new FireAuditCompleteQueryDto();

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime = [];
  constructor(private _projectFlowServcieServiceProxy: ProjectFlowServcieServiceProxy,
    private _flowServices: FlowServices,
    private router: Router,
    private http: _HttpClient,
    private _eventEmiter: EventEmiter,
    private _publicModel:PublicModel,
    private xlsx: XlsxService, private message: NzMessageService) {
     super();

  }

  ngOnInit() {
    this.searchParam.orgType=1;
    this.resetTime();
    this.init()
    const _slef = this;
    this._eventEmiter.on('fireAcceptanceComponentInit',()=>{
      _slef.init();
    });
  }

  init() {
    this.resetTime();
    this.searchParam.page = 1;
    this.searchParam.maxResultCount = 10;
    this.searchParam.flowPathType = 2
    this.searchParam.sorting = 'projectId desc';
    this.searchParam.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    this.searchParam.endApplyTime =moment(this.rangeTime[1]).add(28800000);
    this.getList();
  }
  reststart(){
    this.resetTime();
    this.searchParam.projectName='';
    this.searchParam.status=-1;
    this.searchParam.page = 1;
    this.searchParam.maxResultCount = 10;
    this.searchParam.flowPathType = 2
    this.searchParam.sorting = 'projectId desc';
    this.searchParam.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    this.searchParam.endApplyTime =moment(this.rangeTime[1]).add(28800000);
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

    this.searchParam.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    this.searchParam.endApplyTime =moment(this.rangeTime[1]).add(28800000);
    this.getList();
  }


  watchItem(item) {
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.id}/${item.flowPathType}/1`]);
  }
  toreapply(item) {console.log(item);
    this.router.navigate([`/app/work-matters/review-apply/${item.id}/2`]);
  }

  change(v) {
    pageOnChange(v, this.searchParam, () => {
      this.getList();
    })
  }

  /**
   * 新增申报
   */
  addDeclare() {
    this.router.navigate([`/app/engineering-management/addFireAcceptanceComponent/0/null/null`]);
  }

  /**
   * 导出
   */
  exportXlsx(){
    this._publicModel.exportXlsx(this.columns,this.formResultData.data);
  }

  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 7)
    this.rangeTime = [startTime, new Date()];
  }
}
