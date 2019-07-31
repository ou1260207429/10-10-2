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
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
/**
 * 待办流程
 */
@Component({
  selector: 'app-agency-done',
  templateUrl: 'agency-done.component.html',
})
export class AgencyDoneComponent extends PublicFormComponent implements OnInit {
  index;

  signForDto = new SignForDto();
  examineFormDto = new ExamineFormDto();
  workFlowData;
  isVisibleSelectModal: boolean = false;
  isSelectModalOkLoading = false;

  formResultData

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width:'120px',
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
    { title: '工程名称', index: 'projectName',width:'150px'},
    { title: '工程编号', index: 'projectCode',width:'150px'},
    { title: '建设单位', index: 'companyName', width:'150px'},
    { title: '工程类型', index: 'flowTypeName',width:'150px' },
    // { title: '提交人', index: 'cur_NodeAuditorName' },
    { title: '申报时间', index: 'applyTime', type: 'date',width:'150px' },
    { title: '到达时间', index: 'acceptTime', type: 'date',width:'150px' },
    // {
    //   title: '流程是否超时', index: 'isExpire', type: 'tag', tag: {
    //     true: { text: '超时', color: 'red' },
    //     false: { text: '未超时', color: 'green' },
    //   }
    // },
    {
      title: '流程是否超时', index: 'isExpire',width:'100px', format: (item: any) => `${item.isExpire == true ? "是" : "否"}`, type: 'tag', tag: {
        "是": { text: '是', color: 'red' },
        "否": { text: '否', color: '' },
      }
    },
  ];

  searchParam: any = {
    pagedAndFilteredInputDto:{}
  };

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime

  //获取表单对象
  @ViewChild('f') ngForm: FormGroup; 
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
    this.resetTime();
    let _self = this; 
    this.eventEmiter.on('fireAcceptanceComponentInit', () => {
      _self.init();
    });

    this.eventEmiter.on('fireDesignComponentInit', () => {
      _self.init();
    });

    this.eventEmiter.on('completedAcceptanceComponentInit', () => {
      _self.init();
    });

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
    this.searchParam.pagedAndFilteredInputDto.sorting = 'applyTime desc'
    this.searchParam.projectTypeStatu = null;
    this.searchParam.isAlreadyDone = true
    if (this.rangeTime != null) {
      
      this.searchParam.applyTimeStart = this.rangeTime[0];
      this.searchParam.applyTimeEnd = this.rangeTime[1];
    }
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
    this.workFlowedServiceProxy.pendingWorkFlow_NodeAuditorRecord(this.searchParam).subscribe((data: any) => {
      this.formResultData = data
      console.log(this.formResultData)
    })
  }

  /**
   * 点击查询
   */
  query() {  
    this.searchParam.applyTimeStart = this.rangeTime[0] ? timeTrans(Date.parse(this.rangeTime[0]) / 1000, 'yyyy-MM-dd', '-') + " 00:00:00":this.searchParam.applyTimeStart
    this.searchParam.applyTimeEnd  = this.rangeTime[1] ?timeTrans(Date.parse(this.rangeTime[1]) / 1000, 'yyyy-MM-dd', '-') + " 23:59:59":this.searchParam.applyTimeEnd
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
    this.isVisibleSelectModal = false;
    this.signForDto = new SignForDto();
    this.signForDto.flowId = flowId;
    this._examineService.getPrimaryExamine(flowId).subscribe(data => {
      if (data != null) {
        this.examineFormDto = data;
        if (this.examineFormDto.flowNodeUserInfo == null || this.examineFormDto.flowNodeUserInfo.userFlowId == null) {
          this.message.error("无权限操作");
          this.isVisibleSelectModal = false;
          return;
        }
        else {
          this.isVisibleSelectModal = true;
        }
      } else {
        this.message.error("找不到签到信息");
      }
    });
  }

  closeSignFor() {
    this.isVisibleSelectModal = false;
  }


  signForOrg() {

    if (this.signForDto.name == null || this.signForDto.name == "" || this.signForDto.phoneNumber == null || this.signForDto.phoneNumber == "") {
      this.message.error("请填写签收人信息");
      return;
    }
 
    if (!this.ngForm.valid) {
      this.message.error("请填写正确的信息");
      return;
    } 


    const workFlow: WorkFlow = {
      workFlow_InstanceId: this.examineFormDto.workFlow_Instance_Id,
      workFlow_TemplateInfoId: this.examineFormDto.workFlow_TemplateInfo_Id,
      workFlow_NodeAuditorRecordId: +this.examineFormDto.flowNodeUserInfo.userFlowId,
    }

    this._flowServices.tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow).subscribe((data: any) => {

      var tenantWorkFlowInstanceDto;
      tenantWorkFlowInstanceDto = data.result;
      tenantWorkFlowInstanceDto.workFlow_InstanceId = this.examineFormDto.workFlow_Instance_Id;
      console.log(this.examineFormDto);
      tenantWorkFlowInstanceDto.frow_TemplateInfo_Data = {
        Area: this.examineFormDto.orgCode,
        IsChoose: 0,
        editWorkFlow_NodeAuditorRecordDto: {
          deptId: this.appSession.user.organizationsId,
          deptFullPath: this.appSession.user.organizationsName
        }
      }

      this._flowServices.tenant_NodeToNextNodeByPass(tenantWorkFlowInstanceDto).subscribe((data: any) => {
        this._examineService.signForOpinionFile(this.signForDto).subscribe(data => {
          this.message.success('签收成功');
          this.isVisibleSelectModal = false;
          this.getList();
        }, error => {
          this.message.error(error.message);
        });
      }, error => {
        this.message.error(error.message);
      });

    });
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }

}
