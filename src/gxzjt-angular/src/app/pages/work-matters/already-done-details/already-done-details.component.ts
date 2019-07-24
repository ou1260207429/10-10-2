import { ExamineServiceServiceProxy, ExamineFormDto } from './../../../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FlowServices, WorkFlow } from 'services/flow.services';
import { AdoptEnum } from 'infrastructure/expression';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { AcceptServiceServiceProxy, AcceptApplyFormDto, ApplyServiceServiceProxy, FlowFormQueryDto, FlowNodeUser } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { FlowProcessRejectComponent } from '@app/components/flow-process-reject/flow-process-reject.component';
import { ReuseTabService } from '@delon/abc';
/**
 * 已办流程的详情
 */
@Component({
  selector: 'app-already-done-details',
  templateUrl: './already-done-details.component.html',
})
export class AlreadyDoneDetailsComponent implements OnInit {

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
  showError = {
    projectCategoryId: false,
    specialEngineering: false,
    fireFightingFacilities: false
  }
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

  //使用性质
  useNatureSelect
  constructor(private _examineService: ExamineServiceServiceProxy, private reuseTabService: ReuseTabService, private ModelHelp: ModalHelper, public appSession: AppSessionService, private message: NzMessageService, private _applyService: ApplyServiceServiceProxy, private _acceptServiceServiceProxy: AcceptServiceServiceProxy, private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, private _ActivatedRoute: ActivatedRoute, ) {
    this.flowNo = this._activatedRoute.snapshot.paramMap.get('flowNo')
    this.flowId = this._activatedRoute.snapshot.paramMap.get('flowId')
    this.flowPathType = this._activatedRoute.snapshot.paramMap.get('flowPathType')
    // this.operationType = this._activatedRoute.snapshot.paramMap.get('operationType')

  }

  ngOnInit() {
    this.type = false
    this.init()
  }

  init() {
    this.getWorkFlow_NodeRecordAndAuditorRecords()
    Promise.all([this.getAcceptApplyForm(), this.getPrimaryExamine()]).then((data: any) => {
      this.formDto = data[0]
      if (data[1]) this.examineFormDto = data[1]
      const flowFormQueryDto = new FlowFormQueryDto();
      flowFormQueryDto.flowType = this.flowPathType
      flowFormQueryDto.projectId = this.formDto.projectId;
      flowFormQueryDto.flowId = this.flowId
      const workFlow: WorkFlow = {
        workFlow_InstanceId: this.formDto.workFlow_Instance_Id,
        workFlow_TemplateInfoId: 10171,
        workFlow_NodeAuditorRecordId: this.formDto.flowNodeUserInfo.userFlowId,
      }
      //获取JSON和节点信息
      Promise.all([this.post_GetFlowFormData(flowFormQueryDto), this.tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow)]).then((value: any) => {
        const json = JSON.parse(value[0].formJson);
        json.constructionUnit = json.constructionUnit instanceof Array ? json.constructionUnit : [{ designUnit: '', qualificationLevel: '', legalRepresentative: '', contacts: '', contactsNumber: '' }]
        json.design = json.design ? json.design : [{ designUnit: '', qualificationLevel: '', legalRepresentative: '', contacts: '', contactsNumber: '' }],
          json.engineeringId = json.engineeringId ? json.engineeringId : ''
        json.engineeringNo = json.engineeringNo ? json.engineeringNo : ''
        json.applyName = json.applyName ? json.applyName : ''
        json.constructionProject = json.constructionProject ? json.constructionProject : {
          arr: [
            { label: '顶棚', value: false, checked: false },
            { label: '墙面', value: false, checked: false },
            { label: '地面', value: false, checked: false },
            { label: '隔断 ', value: false, checked: false },
            { label: '固定家具', value: false, checked: false },
            { label: '装饰织物', value: false, checked: false },
            { label: '其他装饰材料 ', value: false, checked: false },
          ],
          decorationArea: '',
          ground: '',
          useNature: '',
          originallyUsed: ''
        }
        this.formJson = json;
        this.useNatureSelect = value[0].natures
        this.tenantWorkFlowInstanceDto = this.workFlowData = value[1].result;
        this.tenantWorkFlowInstanceDto.workFlow_InstanceId = this.formDto.workFlow_Instance_Id;

        //获取当前节点 由这个判断提交的接口
        this.curNodeName = this.workFlowData.nodeViewInfo.curNodeName;

        this.type = false;
        this.filterFileList();
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
    this._flowServices.getWorkFlow_NodeRecordAndAuditorRecords(this.flowNo).subscribe(data => {
      this.data = data.result
    })
  }



  filterFileList() {

    if (!this.data.fileList) {
      return;
    }
    console.log("--------------------------------------");
    //文件过滤
    for (let x = 0; x < this.data.fileList.length; ++x) {
      if (this.data.fileList[x].array) {
        var uploadList = [];
        for (let y = 0; y < this.data.fileList[x].array.length; ++y) {
          if (this.data.fileList[x].array[y].status == "done"
            && this.data.fileList[x].array[y].url
            && this.data.fileList[x].array[y].url != '') {
            uploadList.push(this.data.fileList[x].array[y]);

          }
        }
        this.data.fileList[x].array = uploadList;

      }

    }
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
   * 获取业务审批负责人审批详情的接口 
   */
  getPrimaryExamine(then?: Function) {
    this._examineService.getPrimaryExamine(this.flowId).subscribe(data => {
      this.examineFormDto = data
      if (this.examineFormDto.acceptFileCode)
        this.formDto.acceptFileCode = this.examineFormDto.acceptFileCode;

      if (then) then()
    })
    // return this._examineService.getPrimaryExamine(this.flowId).toPromise();
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
  acceptApply(formDto: AcceptApplyFormDto) {
    this._acceptServiceServiceProxy.acceptApply(this.formDto).subscribe(data => {
      this.message.success('提交成功')
      history.go(-1)
    })
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
