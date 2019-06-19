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

  test = {

  }

  //测试
  checkOptionsOne = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  }
  checkOptionsTwo = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  };
  checkOptionsThree = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  };
  checkOptionsFour = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  };


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

  constructor(private _examineService: ExamineServiceServiceProxy, private reuseTabService: ReuseTabService, private ModelHelp: ModalHelper, public appSession: AppSessionService, private message: NzMessageService, private _applyService: ApplyServiceServiceProxy, private _acceptServiceServiceProxy: AcceptServiceServiceProxy, private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, private _ActivatedRoute: ActivatedRoute, ) {
    this.flowNo = this._activatedRoute.snapshot.paramMap.get('flowNo')
    this.flowId = this._activatedRoute.snapshot.paramMap.get('flowId')
    this.flowPathType = this._activatedRoute.snapshot.paramMap.get('flowPathType')
    console.log(this.flowPathType);

  }

  ngOnInit() {
    this.type = false
    this.init()
  }

  init() {
    Promise.all([this.getWorkFlow_NodeRecordAndAuditorRecords(), this.getAcceptApplyForm(), this.getPrimaryExamine()]).then((data: any) => {
      this.data = data[0].result
      this.formDto = data[1]
      if (data[2]) this.examineFormDto = data[2]
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
        console.log()
        this.tenantWorkFlowInstanceDto = this.workFlowData = value[1].result;
        this.tenantWorkFlowInstanceDto.workFlow_InstanceId = this.formDto.workFlow_Instance_Id

        //获取当前节点 由这个判断提交的接口
        this.curNodeName = this.workFlowData.nodeViewInfo.curNodeName
        console.log(this.workFlowData)
        this.type = false
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

    //选择不通过
    if (!this.formDto.isAccept) {
      this.ModelHelp.static(
        FlowProcessRejectComponent,
        {
          tenantWorkFlowInstanceDto: this.tenantWorkFlowInstanceDto,
        }
      ).subscribe(data => {
        //已经驳回成功了
        if (!data) {
          this.acceptApply(data);
        }
      })
      return false;
    }

    this._flowServices.tenant_NodeToNextNodeByPass(this.tenantWorkFlowInstanceDto).subscribe((data: any) => {


      console.log(this.curNodeName);
      switch (this.curNodeName) {
        case '大厅受理':
          this.acceptApply(data);
          break;

        case '业务承办人审核':
          this.examineFormDto.isPass = bo;
          this.examineFormDto.handleUserList = [];
          this.examineFormDto.currentNodeId = data.result.cur_Node_Id
          this.examineFormDto.currentNodeName = data.result.cur_NodeName
          this.examineFormDto.workFlow_Instance_Id = data.result.workFlow_Instance_Id
          this.examineFormDto.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id
          data.result.auditorRecords.forEach(element => {
            const flowNodeUser = new FlowNodeUser()
            flowNodeUser.userFlowId = element.id
            this.examineFormDto.handleUserList.push(flowNodeUser)
          });
          console.log(data);
          console.log(this.examineFormDto)
          this.primaryExamine(this.examineFormDto);
          // this.primaryExamine(this.examineFormDto, () => {
          //   if (!bo) {
          //     this.ModelHelp.static(
          //       FlowProcessRejectComponent,
          //       {
          //         tenantWorkFlowInstanceDto: this.tenantWorkFlowInstanceDto,
          //       }
          //     ).subscribe(data => {
          //       //已经驳回成功了
          //       if (!data) {
          //         this.finalExamine(this.examineFormDto);
          //       }
          //     })
          //   }
          //   this.finalExamine(this.examineFormDto);
          // });
          break;


          //按钮名字是通过 或者不通过
        case '业务审批负责人审批': 
          this.examineFormDto.isPass = bo;
          this.examineFormDto.handleUserList = [];
          this.examineFormDto.currentNodeId = data.result.cur_Node_Id
          this.examineFormDto.currentNodeName = data.result.cur_NodeName
          this.examineFormDto.workFlow_Instance_Id = data.result.workFlow_Instance_Id
          this.examineFormDto.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id
          data.result.auditorRecords.forEach(element => {
            const flowNodeUser = new FlowNodeUser()
            flowNodeUser.userFlowId = element.id
            this.examineFormDto.handleUserList.push(flowNodeUser)
          }); 
          this.finalExamine(this.examineFormDto);
          break;

        default:
          break;
      }

    })
  };


  /**
   * 获取业务审批负责人审批详情的接口 
   */
  getPrimaryExamine() {
    return this._examineService.getPrimaryExamine(this.flowId).toPromise();
  }

  /**
   * 业务审批负责人审批提交的接口 -->执行人
   */
  primaryExamine(examineFormDto: ExamineFormDto) {
    this._examineService.primaryExamine(examineFormDto).subscribe(data => {
      this.message.success('提交成功')
      history.go(-1)
    })
  }

  /**
   * 业务审批负责人审批提交的接口 -->执行人后的接口
   */
  finalExamine(examineFormDto: ExamineFormDto) {
    this._examineService.finalExamine(examineFormDto).subscribe(data => {
      this.message.success('提交成功')
      history.go(-1)
    })
  }



  /**
   * 大厅办理提交的接口
   */
  acceptApply(data) {
    this.formDto.handleUserList = [];
    this.formDto.currentNodeId = data.result.cur_Node_Id
    this.formDto.currentNodeName = data.result.cur_NodeName
    this.formDto.workFlow_Instance_Id = data.result.workFlow_Instance_Id
    this.formDto.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id

    data.result.auditorRecords.forEach(element => {
      const flowNodeUser = new FlowNodeUser()
      flowNodeUser.userFlowId = element.id
      this.formDto.handleUserList.push(flowNodeUser)
    });
    this._acceptServiceServiceProxy.acceptApply(this.formDto).subscribe(data => {
      this.message.success('提交成功')
      history.go(-1)
    })
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
