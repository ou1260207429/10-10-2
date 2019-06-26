import { ExamineServiceServiceProxy, ExamineFormDto, SignForDto } from './../../../../shared/service-proxies/service-proxies';
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
import { InitiationProcessAddAuditorComponent } from '@app/components/initiation-process-add-auditor/initiation-process-add-auditor.component';
/**
 * 待办详情->办理页面
 */
@Component({
  selector: 'app-agency-done-details',
  templateUrl: './agency-done-details.component.html',

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
  showError = {
    projectCategoryId: false,
    specialEngineering: false,
    fireFightingFacilities: false
  }
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
  formDto: any = new AcceptApplyFormDto();

  //表单json对象
  formJson

  workFlowData

  tenantWorkFlowInstanceDto: any = {
    editWorkFlow_NodeAuditorRecordDto:{
      applyType:''
    }
  }

  //当前节点的名称
  curNodeName

  examineFormDto = new ExamineFormDto();

  //走流程或者查看  0是走流程  1是查看
  operationType

  //签收的对象
  signForDto: SignForDto = new SignForDto()

  //签收的列表
  signForDtoData
  butNzLoading: boolean = false;

  //判断当前登录人是否是审核人
  isLoginPerson: boolean = true;

  // 的select 多选框只显示单对象 
  selectMultiple = []

  //使用性质
  useNatureSelect
  constructor(private _eventEmiter: EventEmiter, public _appSessionService: AppSessionService, private _examineService: ExamineServiceServiceProxy, private reuseTabService: ReuseTabService, private ModelHelp: ModalHelper, public appSession: AppSessionService, private message: NzMessageService, private _applyService: ApplyServiceServiceProxy, private _acceptServiceServiceProxy: AcceptServiceServiceProxy, private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, private _ActivatedRoute: ActivatedRoute, ) {
    this.flowNo = this._activatedRoute.snapshot.paramMap.get('flowNo')
    this.flowId = this._activatedRoute.snapshot.paramMap.get('flowId')
    this.flowPathType = this._activatedRoute.snapshot.paramMap.get('flowPathType')
    this.operationType = this._activatedRoute.snapshot.paramMap.get('operationType')

  }

  ngOnInit() {
    this.init()
  }

  init() {
    Promise.all([this.getWorkFlow_NodeRecordAndAuditorRecords(), this.getAcceptApplyForm()]).then((data: any) => {
      this.data = data[0].result
      this.formDto = data[1]
      const flowFormQueryDto = new FlowFormQueryDto();
      flowFormQueryDto.flowType = this.flowPathType
      flowFormQueryDto.projectId = this.formDto.projectId;
      flowFormQueryDto.flowId = this.flowId

      //判断当前登录人是否是审核人  
      this.isLoginPerson = this.formDto.flowNodeUserInfo.userCode == this._appSessionService.user.id ? true : false
      const workFlow: WorkFlow = {
        workFlow_InstanceId: this.formDto.workFlow_Instance_Id,
        workFlow_TemplateInfoId: 10171,
        workFlow_NodeAuditorRecordId: this.formDto.flowNodeUserInfo.userFlowId,
      }

      //获取JSON和节点信息
      Promise.all([this.post_GetFlowFormData(flowFormQueryDto), this.tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow)]).then((value: any) => {
        this.formJson = JSON.parse(value[0].formJson);
        this.useNatureSelect = value[0].natures
        console.log(this.useNatureSelect)
        this.tenantWorkFlowInstanceDto = this.workFlowData = value[1].result;
        this.tenantWorkFlowInstanceDto.workFlow_InstanceId = this.formDto.workFlow_Instance_Id 

        //获取当前节点 由这个判断提交的接口
        this.curNodeName = this.workFlowData.nodeViewInfo.curNodeName
        console.log(this.curNodeName);
        if (this.curNodeName != '大厅受理') {
          this.getPrimaryExamine(() => {
            this.type = false
          })
        } else {
          this.type = false

          console.log(this.type)
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
    let num = bo ? 1 : 0;
    //判断是竣工备案  
    if (this.flowPathType == 3) {
      //竣工备案判断抽中或者不抽中
      num = this.formDto.isSelect?1:0
    }
    this.tenantWorkFlowInstanceDto.frow_TemplateInfo_Data = {
      Area: this.formDto.area,
      IsChoose: num, 
    } 
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptId = this.appSession.user.organizationsId
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptFullPath = this.appSession.user.organizationsName
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.details = this.formDto.opinion
    this.butNzLoading = true 
    if (!bo && this.curNodeName == '业务审批负责人审批') {
      this.noResult((data) => {
        this._flowServices.tenant_NodeToNextNodeByNoPass(data.data).subscribe((data: any) => {
          this.butNzLoading = false;
          this.examineFormDto.handleUserList = [];
          this.examineFormDto.currentNodeId = data.result.cur_Node_Id
          this.examineFormDto.currentNodeName = data.result.cur_NodeName
          this.examineFormDto.workFlow_Instance_Id = data.result.workFlow_Instance_Id
          this.examineFormDto.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id
          data.result.auditorRecords.forEach(element => {
            const flowNodeUser = new FlowNodeUser()
            flowNodeUser.userFlowId = element.id
            flowNodeUser.userCode = element.applyEID
            flowNodeUser.userName = element.applyEName
            this.examineFormDto.handleUserList.push(flowNodeUser)
          });

          this.finalExamine(this.examineFormDto);
        },error=>{
          this.butNzLoading = false;
        })
      })

    } else {
 
      this._flowServices.tenant_NodeToNextNodeByPass(this.tenantWorkFlowInstanceDto).subscribe((data: any) => {

        const type = this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType == 3?true:false
        this.examineFormDto.isTransfer = this.formDto.isTransfer = type
        this.examineFormDto.isPass = this.formDto.isAccept = bo; 
        let form: any = this.curNodeName == '大厅受理' ? this.formDto : this.examineFormDto;
        this.formDto.handleUserList = [];
        this.formDto.currentNodeId = data.result.cur_Node_Id
        this.formDto.currentNodeName = data.result.cur_NodeName
        this.formDto.workFlow_Instance_Id = data.result.workFlow_Instance_Id
        this.formDto.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id
        data.result.auditorRecords.forEach(element => {
          const flowNodeUser = new FlowNodeUser()
          flowNodeUser.userFlowId = element.id
          flowNodeUser.userCode = element.applyEID
          flowNodeUser.userName = element.applyEName
          this.formDto.handleUserList.push(flowNodeUser)
        });

        this.examineFormDto.handleUserList = [];
        this.examineFormDto.currentNodeId = data.result.cur_Node_Id
        this.examineFormDto.currentNodeName = data.result.cur_NodeName
        this.examineFormDto.workFlow_Instance_Id = data.result.workFlow_Instance_Id
        this.examineFormDto.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id
        data.result.auditorRecords.forEach(element => {
          const flowNodeUser = new FlowNodeUser()
          flowNodeUser.userFlowId = element.id
          flowNodeUser.userCode = element.applyEID
          flowNodeUser.userName = element.applyEName
          this.examineFormDto.handleUserList.push(flowNodeUser)
        });
 

        switch (this.curNodeName) {
          case '大厅受理':
            this.acceptApply(form);
            break;

          case '业务承办人审核':
            this.primaryExamine(form);
            break;


          //按钮名字是通过 或者不通过
          case '业务审批负责人审批':
            this.finalExamine(this.examineFormDto);
            break;

          default:
            break;
        }

      },error=>{
        this.isNoResult(error.error.message)
      })
    }


  };


  /**
   * 获取业务审批负责人审批详情的接口 
   */
  getPrimaryExamine(then?: Function) {
    this._examineService.getPrimaryExamine(this.flowId).subscribe(data => {
      this.examineFormDto = data;
      if (then) {
        then();
      }
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

  //获取签收的列表详情
  getReview(flowId, then?: Function) {
    this._applyService.getReview(flowId).subscribe(data => {
      this.signForDtoData = data
      if (then) then()
    },error=>{
      this.isNoResult(error.error.message)
    })
  }

  /**
   * 签收
   * @param examineFormDto 
   */
  signForOpinionFile() {
    this._examineService.signForOpinionFile(this.signForDto).subscribe(data => {
      this.serveResult('签收成功')
    },error=>{
      this.isNoResult(error.error.message)
    })
  }

  /**
   * 业务审批负责人审批提交的接口 -->执行人后的接口
   */
  finalExamine(examineFormDto: ExamineFormDto) {
    this._examineService.finalExamine(examineFormDto).subscribe(data => {
      this.serveResult();
    },error=>{
      this.isNoResult(error.error.message)
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

  isNoResult(name: string = "错误信息，请联系管理员") {
    this.butNzLoading = false
    this.message.error(name) 
  }

  serveResult(name: string = "提交成功") {
    this.butNzLoading = false
    this.message.success(name)
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
      if (!data.type) {
        if (then) then(data)
      }
    },error=>{
      this.isNoResult(error.error.message)
    })
    return false;
  }

  /**
   * 撤销
   */
  revoke() {
    this.butNzLoading = true
    this._flowServices.tenant_NodeToNextNodeByCancel(this.tenantWorkFlowInstanceDto).subscribe(data => {
      this.butNzLoading = false
      this.message.success('撤销成功')
    },error=>{
      this.isNoResult(error.error.message)
    })
  }

  /**
   * 添加审批人或者转派
   */
  goChoicePerson(){ 
    if(!this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType){
      this.message.error('选择指定的节点，如转派')
      return false
    }
    const title = this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType ==3 ? '转派列表':'审核人列表'
    this.tenantWorkFlowInstanceDto.auditors = this.tenantWorkFlowInstanceDto.auditors ?this.tenantWorkFlowInstanceDto.auditors:[]
    this.ModelHelp.static(
      InitiationProcessAddAuditorComponent,
      {
         title:title,
         auditors:this.tenantWorkFlowInstanceDto.auditors
      }
    ).subscribe((res: any) => {
      if (res.opt) {
        this.tenantWorkFlowInstanceDto.auditors = [];
        const auditors = {
          eName: res.auditors.eName,
          eid: res.auditors.id,
          auditType:this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType
        }
        this.tenantWorkFlowInstanceDto.auditors.push(auditors) 

        // ng-zorro 的select 多选框只显示单对象 
        this.selectMultiple = []
        this.tenantWorkFlowInstanceDto.auditors.forEach(item => {
          this.selectMultiple.push(item.eName);
        }); 
 
      } else {
        // this.input.selectMultiplee = res.copyControlSourceDatas
      }
    })
  }


}
