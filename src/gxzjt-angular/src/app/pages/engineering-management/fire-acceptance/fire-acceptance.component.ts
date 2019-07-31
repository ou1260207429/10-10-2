import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { ProjectFlowServcieServiceProxy, FireAuditCompleteQueryDto } from '@shared/service-proxies/service-proxies'

import { PublicModel } from 'infrastructure/public-model';
import { Router } from '@angular/router';
import { EngManageService } from '../engineering-management.service';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { PublicFormComponent } from '../public/public-form.component';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { timeTrans } from 'infrastructure/regular-expression';

/**
 * 消防验收
 */
@Component({
  selector: 'app-fire-acceptance',
  templateUrl: './fire-acceptance.component.html',
  styleUrls:['./fire-acceptance.component.less']
})
export class FireAcceptanceComponent  extends PublicFormComponent implements OnInit {

  param={
    natureName:'',
    endApplyTime: "2019-07-31 23:59:59",
    flowPathType: 1,
    maxResultCount: 10,
    orgType: null,
    page: 1,
    sorting: "projectId desc",
    startApplyTime: "2019-07-24 00:00:00",
    status:-1,
    recordNumber: '',
    projectName:'',
    companyName:'',
    currentNodeName: "",
    isExpire: false,
    isSelected: false,
    skipCount: 0,
  }
  formResultData;
  isAddProducttyepe1=false;
  companyName;
  record;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width:'230px',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          click: (record: any, modal: any) => {

            this.watchItem(record);
          },
        },
        {
          text: '撤回申请',
          type: 'modal',
          iif: record => (record.status === 0) ,
          click: (record: any, modal: any) => {
            this.record=record;
            this.withdraw();
            // this.router.navigate([`/app/engineering-management/addFireDesignDeclareComponent/0/${record.projectId}/${record.id}`]);
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
    { title: '消防验收申报编号', index: 'acceptanceNumber',width:'150px'},
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '联系人', index: 'contactPerson' ,width:'100px'},
    { title: '当前处理环节', index: 'currentNodeName',width:'120px' },
    { title: '流程是否超时', index: 'isExpireTime',width:'100px',format:(item:any)=>`${item.isExpireTime==true?"是":"否"}`, type: 'tag', tag: {
      "是": { text: '是', color: 'red' },
      "否": { text: '否', color: '' },
    }},
    { title: '结果', index: 'status',width:'100px',format: (item: any) => `${item.status==0?"未处理":(item.status==1?"受理":(item.status==2?"不受理":(item.status==3?"不合格":(item.status==4?"合格":(item.status==5?"未抽中":"未处理")))))}`,type: 'tag', tag: {
      "未处理": { text: '未处理', color: '' },
      "受理": { text: '受理', color: 'green' },
      "不受理":{ text: '不受理', color: 'red' },
      "不合格":{ text: '不合格', color: 'red' },
      "合格":{ text: '合格', color: '' },
      "未抽中":{ text: '未抽中', color: '' },
    }},
    { title: '操作时间', index: 'applyTime',type:'date',width:'100px' },
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
    private EngManageService:EngManageService,
    private xlsx: XlsxService, private message: NzMessageService) {
     super();

  }

  ngOnInit() {
    this.resetTime();
    this.init()
    const _slef = this;
    this._eventEmiter.on('fireAcceptanceComponentInit',()=>{
      _slef.init();
    });
  }

  init() {
    this.param.page = 1;
    this.param.maxResultCount = 10;
    this.param.flowPathType = 1
    this.param.sorting = 'projectId desc';
    this.resetTime();
    // this.searchParam.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    // this.searchParam.endApplyTime =moment(this.rangeTime[1]).add(28800000);
    if(this.rangeTime.length!=0){
    this.searchParam.startApplyTime=timeTrans(Date.parse(this.rangeTime[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
    this.searchParam.endApplyTime = timeTrans(Date.parse(this.rangeTime[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
    }else{
      this.searchParam.startApplyTime='';
      this.searchParam.endApplyTime ='';
    }
    this.getList();
  }
  reststart(){
     this.param.natureName = '',
    this.param.projectName = '';
     this.param.companyName='',
     this.param.currentNodeName= "",
     this.param.isExpire = false,
     this.param.isSelected = false,
     this.param.skipCount = 0,
     this.param.recordNumber = '';
     this.param.status = -1,
     this.param.orgType = null;
     this.param.page = 1;
     this.param.maxResultCount = 10;
     this.param.flowPathType = 1
     this.param.sorting = 'projectId desc';
     this.resetTime();
    // this.searchParam.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    // this.searchParam.endApplyTime =moment(this.rangeTime[1]).add(28800000);
    if(this.rangeTime.length!=0){
      this.searchParam.startApplyTime=timeTrans(Date.parse(this.rangeTime[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
      this.searchParam.endApplyTime = timeTrans(Date.parse(this.rangeTime[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
      }else{
        this.searchParam.startApplyTime='';
        this.searchParam.endApplyTime ='';
      }
    this.getList();
  }

  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    /*this._projectFlowServcieServiceProxy.post_GetFireAuditCompleteList(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
      console.log(this.formResultData)
    })*/
    this.EngManageService.GetFireAuditCompleteList(this.param).subscribe(
      res => {        
        this.formResultData = res.result
      },
    );
  }

  /**
   * 点击查询
   */
  query() {
    this.searchParam.page = 1;

    // this.searchParam.startApplyTime = moment(this.rangeTime[0]).add(28800000);
    // this.searchParam.endApplyTime =moment(this.rangeTime[1]).add(28800000);
    if(this.rangeTime.length!=0){
      this.searchParam.startApplyTime=timeTrans(Date.parse(this.rangeTime[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
      this.searchParam.endApplyTime = timeTrans(Date.parse(this.rangeTime[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
      }else{
        this.searchParam.startApplyTime='';
        this.searchParam.endApplyTime ='';
      }
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
  withdraw(){
    this.isAddProducttyepe1=true;

  }

  handleCancel1(): void {

    this.isAddProducttyepe1 = false;
  }
  subProducttype1(): void {
    this.EngManageService.CancelApply({flowId:this.record.id}).subscribe(
      res => {
        if(res.result.status==0){
          this.message.error(res.result.message)
        }else if(res.result.status==1){
          this.message.success(res.result.message)
        }else if(res.result.status==2){
          this.message.success(res.result.message)
        }else{
          this.message.error("系统发生异常！")
        }


      },
    );
    this.st.reload();
    this.isAddProducttyepe1 = false;

  }
}
