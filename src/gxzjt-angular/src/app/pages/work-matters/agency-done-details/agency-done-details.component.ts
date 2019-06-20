import { ExamineServiceServiceProxy, ExamineFormDto } from './../../../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as BpmnModeler from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FlowServices, WorkFlow } from 'services/flow.services';
import { AdoptEnum } from 'infrastructure/expression';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { AcceptServiceServiceProxy, AcceptApplyFormDto, ApplyServiceServiceProxy, FlowFormQueryDto, FlowNodeUser } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { FlowProcessRejectComponent } from '@app/components/flow-process-reject/flow-process-reject.component';
import { ReuseTabService } from '@delon/abc';
import lodash from 'lodash'
import { EventEmiter } from 'infrastructure/eventEmiter';
/**
 * 待办详情->办理页面
 */
@Component({
  selector: 'app-agency-done-details',
  templateUrl: './agency-done-details.component.html',
  styles: []
})
export class AgencyDoneDetailsComponent implements OnInit {

  tabs = [
    {
      name: '表单卡',
    },
    {
      name: '查看路径',
    }
  ];

  selectedIndex = 0

  //路径的对象
  data

  type: boolean = true;

  //通过和不通过
  adoptEnum = AdoptEnum

  uploading = false;
  fileList: UploadFile[] = [];

  textData = { projectNumber: "", opinion: "", projectName: "" }

  //路径的ID 
  flowNo

  //判断类型 消防设计1   消防验收2   消防竣工3 
  flowPathType

  //获取表单详情的ID 
  flowId


  //提交表单的对象
  formDto: AcceptApplyFormDto = new AcceptApplyFormDto();

  //表单json对象
  formJson

  workFlowData

  tenantWorkFlowInstanceDto

  //当前节点的名称
  curNodeName

  examineFormDto = new ExamineFormDto();

  //走流程或者查看  0是走流程  1是查看
  operationType

  constructor(private _eventEmiter: EventEmiter, private _examineService: ExamineServiceServiceProxy, private reuseTabService: ReuseTabService, private ModelHelp: ModalHelper, public appSession: AppSessionService, private message: NzMessageService, private _applyService: ApplyServiceServiceProxy, private _acceptServiceServiceProxy: AcceptServiceServiceProxy, private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, private _ActivatedRoute: ActivatedRoute, ) {
    this.flowNo = this._activatedRoute.snapshot.paramMap.get('flowNo')
    this.flowId = this._activatedRoute.snapshot.paramMap.get('flowId')
    this.flowPathType = this._activatedRoute.snapshot.paramMap.get('flowPathType')
    this.operationType = this._activatedRoute.snapshot.paramMap.get('operationType')
    console.log(this.flowPathType);

  }

  ngOnInit() {
    this.type = false
    this.init()
  }

  init() {
    Promise.all([this.getWorkFlow_NodeRecordAndAuditorRecords(), this.getAcceptApplyForm()]).then((data: any) => {
      this.data = data[0].result
      this.formDto = data[1]
      // if (data[2]) this.examineFormDto = data[2]
      const flowFormQueryDto = new FlowFormQueryDto();
      flowFormQueryDto.flowType = this.flowPathType
      flowFormQueryDto.projectId = this.formDto.projectId;
      flowFormQueryDto.flowId = this.flowId

      const workFlow: WorkFlow = {
        workFlow_InstanceId: this.formDto.workFlow_Instance_Id,
        workFlow_TemplateInfoId: 10171,
        workFlow_NodeAuditorRecordId: this.formDto.flowNodeUserInfo.userFlowId,
      }
      console.log(this.formDto.workFlow_Instance_Id)
      //获取JSON和节点信息
      Promise.all([this.post_GetFlowFormData(flowFormQueryDto), this.tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow)]).then((value: any) => {
        this.formJson = JSON.parse(value[0].formJson);
        this.tenantWorkFlowInstanceDto = this.workFlowData = value[1].result;
        this.tenantWorkFlowInstanceDto.workFlow_InstanceId = this.formDto.workFlow_Instance_Id

        //获取当前节点 由这个判断提交的接口
        this.curNodeName = this.workFlowData.nodeViewInfo.curNodeName
        console.log(this.workFlowData)
        if(this.curNodeName!='大厅受理'){
          this.getPrimaryExamine(()=>{
            this.type = false
          })
        }else{
          this.type = false
        }
      })

    })
  }

  /**
   * 获取表单JSON数据
   * @param flowFormQueryDto 对象
   */
  post_GetFlowFormData(flowFormQueryDto: FlowFormQueryDto) {
    return this._applyService.post_GetFlowFormData(flowFormQueryDto).toPromise();
  }

  /**
   * 获取路径
   */
  getWorkFlow_NodeRecordAndAuditorRecords() {
    return this._flowServices.getWorkFlow_NodeRecordAndAuditorRecords(this.flowNo).toPromise()
  }


  /**
   * 获取表单
   */
  getAcceptApplyForm() {
    return this._acceptServiceServiceProxy.getAcceptApplyForm(this.flowId).toPromise()
  }

  /**
   * 获取节点和按钮信息
   */
  tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow: WorkFlow) {
    return this._flowServices.tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow).toPromise()
  }



  /**
   * 上传文件之前的钩子
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  /**
   * 点击提交
   */
  save(bo?: boolean) {
    this.tenantWorkFlowInstanceDto.frow_TemplateInfo_Data = {
      Area: "450000"
    }
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptId = this.appSession.user.organizationsId
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptFullPath = this.appSession.user.organizationsName

    if (!bo && this.curNodeName == '大厅受理') {
      this.noResult((data) => {
        this.acceptApply(data);
      })
      return false;
    }


    this._flowServices.tenant_NodeToNextNodeByPass(this.tenantWorkFlowInstanceDto).subscribe((data: any) => {

      let form: any = this.curNodeName == '大厅受理' ? this.formDto : this.examineFormDto;

      form.handleUserList = [];
      form.currentNodeId = data.result.cur_Node_Id
      form.currentNodeName = data.result.cur_NodeName
      form.workFlow_Instance_Id = data.result.workFlow_Instance_Id
      form.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id

      data.result.auditorRecords.forEach(element => {
        const flowNodeUser = new FlowNodeUser()
        flowNodeUser.userFlowId = element.id
        flowNodeUser.userCode = element.applyEID
        flowNodeUser.userName = element.applyEName
        form.handleUserList.push(flowNodeUser)
      });

      switch (this.curNodeName) {
        case '大厅受理':
          form.isAccept = bo;
          this.acceptApply(form);
          break;

        case '业务承办人审核':
          form.isPass = bo
          this.primaryExamine(form);
          break;


        //按钮名字是通过 或者不通过
        case '业务审批负责人审批':
          form.isPass = bo;
          this.finalExamine(form);
          break;

        default:
          break;
      }

    })
  };


  /**
   * 获取业务审批负责人审批详情的接口 
   */
  getPrimaryExamine(then?:Function) {
    this._examineService.getPrimaryExamine(this.flowId).subscribe(data=>{
      this.examineFormDto = data
      if(then) then()
    })
  }

  /**
   * 业务审批负责人审批提交的接口 -->执行人
   */
  primaryExamine(examineFormDto: ExamineFormDto) {
    this._examineService.primaryExamine(examineFormDto).subscribe(data => {
      this.serveResult();
    })
  }

  /**
   * 业务审批负责人审批提交的接口 -->执行人后的接口
   */
  finalExamine(examineFormDto: ExamineFormDto) {
    this._examineService.finalExamine(examineFormDto).subscribe(data => {
      this.serveResult();
    })
  }



  /**
   * 大厅办理提交的接口
   */
  acceptApply(formDto: AcceptApplyFormDto) {
    this._acceptServiceServiceProxy.acceptApply(this.formDto).subscribe(data => {
      this.serveResult();
    })
  }

  serveResult() {
    this.message.success('提交成功')
    history.go(-1)
    this._eventEmiter.emit('agencyDoneInit', []);
  }

  //不通过选择返回指定的节点
  noResult(then?: Function) {
    //选择不通过 
    this.ModelHelp.static(
      FlowProcessRejectComponent,
      {
        tenantWorkFlowInstanceDto: this.tenantWorkFlowInstanceDto,
      }
    ).subscribe(data => {
      //已经驳回成功了
      if (!data) {
        if (then) then(data)
      }
    })
    return false;
  }

  /**
   * 撤销
   */
  revoke() {
    this._flowServices.tenant_NodeToNextNodeByCancel(this.tenantWorkFlowInstanceDto).subscribe(data => {
      this.message.success('撤销成功')
    })
  }


}
