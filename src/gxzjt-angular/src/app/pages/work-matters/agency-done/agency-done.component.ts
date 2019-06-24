import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { WorkFlowedServiceProxy, PendingWorkFlow_NodeAuditorRecordDto, DataSourceResult, PagedAndFilteredInputDto, ExamineServiceServiceProxy, SignForDto, ExamineFormDto } from '@shared/service-proxies/service-proxies'

import { PublicFormComponent } from '../public/public-form.component';

import { Router, ActivatedRoute } from '@angular/router';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices, WorkFlow } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { timeTrans } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { AppSessionService } from '@shared/session/app-session.service';
import { NzMessageService } from 'ng-zorro-antd';
/**
 * 待办流程
 */
@Component({
  selector: 'app-agency-done',
  templateUrl: 'agency-done.component.html',
  styles: [],
})
export class AgencyDoneComponent extends PublicFormComponent implements OnInit {
  index;

  signForDto = new SignForDto();
  examineFormDto = new ExamineFormDto();
  workFlowData;
  isVisibleSelectModal:boolean=false;
  isSelectModalOkLoading=false;

  formResultData

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '执行',
          type: 'modal',
          iif: record => record.endTime === null,
          click: (item: any) => {
            this.watchItem(item);
          }
        },
        {
          text: '签收',
          type: 'modal',
          iif: record => record.endTime != null,
          click: (record: any, modal: any) => {
            console.debug(record);
            this.signFor(record);
          },
        },
      ]
    },
    { title: '工程名称', index: 'projectName' },
    { title: '工程编号', index: 'projectCode' },
    { title: '建设单位', index: 'companyName' },
    { title: '工程类型', index: 'flowTypeName' },
    { title: '上一处理人', index: 'cur_NodeAuditorName' },
    { title: '申报时间', index: 'applyTime', type: 'date' },
    { title: '受理时间', index: 'acceptTime', type: 'date' },
    {
      title: '流程是否超时', index: 'isExpire', type: 'tag', tag: {
        true: { text: '超时', color: 'red' },
        false: { text: '未超时', color: 'green' },
      }
    },
  ];

  searchParam = new PendingWorkFlow_NodeAuditorRecordDto();

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime
  constructor(private workFlowedServiceProxy: WorkFlowedServiceProxy,
    private eventEmiter: EventEmiter,
    private _flowServices: FlowServices,
    private router: Router,
    private _publicModel: PublicModel,
    private http: _HttpClient,
    private xlsx: XlsxService,
    private _activatedRoute: ActivatedRoute,
    private _examineService: ExamineServiceServiceProxy,
    public appSession: AppSessionService,
    private message: NzMessageService, ) {

    super();

  }

  ngOnInit() {
    this.init()

    let _self = this;
    this.init();
    this.eventEmiter.on('agencyDoneInit', () => {
      _self.init();
    });
  }

  init() {
    this.searchParam.pagedAndFilteredInputDto = new PagedAndFilteredInputDto();
    this.searchParam.pagedAndFilteredInputDto.page = 1;
    this.searchParam.pagedAndFilteredInputDto.maxResultCount = 10;
    this.searchParam.number = '';
    this.searchParam.projectName = '';
    this.searchParam.companyName = '';
    this.searchParam.pagedAndFilteredInputDto.sorting = 'projectId desc'
    this.searchParam.projectTypeStatu = null;
    if (this.rangeTime != null) {
      this.searchParam.applyTimeStart = this.rangeTime[0];
      this.searchParam.applyTimeEnd = this.rangeTime[1];
    }
    this.getList();
  }


  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {
    this.workFlowedServiceProxy.pendingWorkFlow_NodeAuditorRecord(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
      console.log(this.formResultData)
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
    this.router.navigate([`/app/work-matters/agencyDoneDetailsComponent/${item.flowNo}/${item.flowId}/${item.flowPathType}/0`]);
  }

  signFor(data) {
    //this.router.navigate([`/app/work-matters/sign-for/${data.flowId}`]);
    this.openSignFor(data.flowId);
  }

  change(v) {
    pageOnChange(v, this.searchParam.pagedAndFilteredInputDto, () => {
      this.getList();
    })
  }

  /**
   * 导出
   */
  exportXlsx() {
    this._publicModel.exportXlsx(this.columns, this.formResultData.data);
  }

  okRangeTime(v) {
    console.log(v);
    //const applyTimeStart:any = timeTrans(Date.parse(v[0]) / 1000, 'yyyy-MM-dd', '-')
    //const applyTimeEnd:any = timeTrans(Date.parse(v[1]) / 1000, 'yyyy-MM-dd', '-')
    this.searchParam.applyTimeStart = v[0];
    this.searchParam.applyTimeEnd = v[1];
    // console.log(applyTimeEnd);
  }

  openSignFor(flowId) {
    //this. isVisibleSelectModal=true;
    this.isVisibleSelectModal=false;
    this.signForDto = new SignForDto();
    this.signForDto.flowId = flowId;
    this._examineService.getPrimaryExamine(flowId).subscribe(data => {
      if (data != null) {
        this.examineFormDto = data;
        if(this.examineFormDto.flowNodeUserInfo==null || this.examineFormDto.flowNodeUserInfo.userFlowId==null){
          this.message.error("无权限操作");
          this.isVisibleSelectModal=false;
          return;
        }
        else{
          this.isVisibleSelectModal=true;
        }
      }else{
        this.message.error("找不到签到信息");
      }
    });
  }

  closeSignFor(){
    this.isVisibleSelectModal=false;
  }


  signForOrg() {

    if(this.signForDto.name==null || this.signForDto.name=="" || this.signForDto.phoneNumber==null || this.signForDto.phoneNumber==""){
      this.message.error("请填写签收人信息");
      return;
    }


    const workFlow: WorkFlow = {
      workFlow_InstanceId: this.examineFormDto.workFlow_Instance_Id,
      workFlow_TemplateInfoId: 10171,
      workFlow_NodeAuditorRecordId: this.examineFormDto.flowNodeUserInfo.userFlowId,
    }

    this._flowServices.tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow).subscribe((data:any) => {

      var tenantWorkFlowInstanceDto;
      tenantWorkFlowInstanceDto = data.result; 
      tenantWorkFlowInstanceDto.workFlow_InstanceId = this.examineFormDto.workFlow_Instance_Id;

      tenantWorkFlowInstanceDto.frow_TemplateInfo_Data = {
        Area: this.examineFormDto.area,
        IsChoose: 0,
        editWorkFlow_NodeAuditorRecordDto: {
          deptId: this.appSession.user.organizationsId,
          deptFullPath: this.appSession.user.organizationsName
        }
      }
      debugger

      this._flowServices.tenant_NodeToNextNodeByPass(tenantWorkFlowInstanceDto).subscribe((data: any) => {
        this._examineService.signForOpinionFile(this.signForDto).subscribe(data => {
          this.message.success('签收成功');
          this.isVisibleSelectModal=false;
          this.getList();
        }, error=>{
          this.message.error(error.message);
        });
      }, error=>{
        this.message.error(error.message);
      });

    });
  }


}
