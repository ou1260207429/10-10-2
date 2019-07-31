import { ExamineServiceServiceProxy, ExamineFormDto, SignForDto } from './../../../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as BpmnModeler from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FlowServices, WorkFlow } from 'services/flow.services';
import { AdoptEnum } from 'infrastructure/expression';
import { UploadFile, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AcceptServiceServiceProxy, AcceptApplyFormDto, ApplyServiceServiceProxy, FlowFormQueryDto, FlowNodeUser } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { FlowProcessRejectComponent } from '@app/components/flow-process-reject/flow-process-reject.component';
import { ReuseTabService } from '@delon/abc';
import * as moment from 'moment';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { InitiationProcessAddAuditorComponent } from '@app/components/initiation-process-add-auditor/initiation-process-add-auditor.component';
import { checkArrayString, timeTrans } from 'infrastructure/regular-expression';
import { WorkMattersService } from '../work-matters.service'
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
  selectedIndex = 0;

  //路径的对象
  data: any;

  type: boolean = true;

  //通过和不通过
  adoptEnum = AdoptEnum;

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
  formDto: any = new AcceptApplyFormDto(); //流程路径

  //表单json对象
  formJson: any;

  workFlowData: any;

  tenantWorkFlowInstanceDto: any = {
    editWorkFlow_NodeAuditorRecordDto: {
      applyType: ''
    }
  }

  //当前节点的名称
  curNodeName: any;

  examineFormDto: any = {};

  //走流程或者查看  0是走流程  1是查看
  operationType: any;

  //签收的对象
  signForDto: SignForDto = new SignForDto();

  //签收的列表
  signForDtoData
  butNzLoading: boolean = false;

  //判断当前登录人是否是审核人
  isLoginPerson: boolean = true;

  // 的select 多选框只显示单对象
  selectMultiple = []

  isAddProducttyepe1 = false;//控制驳回弹窗界面
  rejectadvices = null;//驳回意见

  //使用性质
  useNatureSelect: any;


  //节点审批意见
  nodeAdvise: String;

  constructor(private _eventEmiter: EventEmiter,
    public _appSessionService: AppSessionService,
    private _examineService: ExamineServiceServiceProxy,
    private reuseTabService: ReuseTabService,
    private ModelHelp: ModalHelper,
    public appSession: AppSessionService,
    private message: NzMessageService,
    private _applyService: ApplyServiceServiceProxy,
    private _acceptServiceServiceProxy: AcceptServiceServiceProxy,
    private WorkMattersService: WorkMattersService,
    private _flowServices: FlowServices,
    private _activatedRoute: ActivatedRoute,
    private _NzModalService: NzModalService) {
    this.flowNo = this._activatedRoute.snapshot.paramMap.get('flowNo')
    this.flowId = this._activatedRoute.snapshot.paramMap.get('flowId')
    this.flowPathType = this._activatedRoute.snapshot.paramMap.get('flowPathType')
    this.operationType = this._activatedRoute.snapshot.paramMap.get('operationType')

  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.getWorkFlow_NodeRecordAndAuditorRecords()

    Promise.all([this.getAcceptApplyForm()]).then((data: any) => {
      this.formDto = data[0];
      // console.log(this.formDto)
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
        this.tenantWorkFlowInstanceDto.workFlow_InstanceId = this.formDto.workFlow_Instance_Id

        //获取当前节点 由这个判断提交的接口
        this.curNodeName = this.workFlowData.nodeViewInfo.curNodeName
        if (this.curNodeName != '大厅受理') {
          this.getPrimaryExamine(() => {
            this.type = false
          })
        } else {
          this.type = false
        };
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

  checkFileList() {
    if (!this.examineFormDto.attachment) {
      return true;
    }

    //文件过滤
    for (let x = 0; x < this.examineFormDto.attachment.length; ++x) {


      if (this.examineFormDto.attachment[x].status != "done"
        || !this.examineFormDto.attachment[x].url
        || this.examineFormDto.attachment[x].url == '') {

        return false;
      }

    }
    return true;
  }

  filterFileList() {

    if (!this.examineFormDto.attachment) {
      return;
    }



    //文件过滤
    var uploadList = [];
    for (let i = 0; i < this.examineFormDto.attachment.length; ++i) {

      if (this.examineFormDto.attachment[i].status == "done"
        && this.examineFormDto.attachment[i].status.url
        && this.examineFormDto.attachment[i].status.url != '') {

        uploadList.push(this.examineFormDto.attachment[i]);

      }
    }
    this.examineFormDto.attachment = uploadList;

  }


  save(bo?: boolean) {
    if (this.checkFileList()) {
      this.savePost(bo);
    } else {
      this._NzModalService.confirm(
        {
          nzTitle: '提示',
          nzContent: "存在没有成功上传的文件，提交不会保留，是否继续？",
          nzOnOk: () => {
            this.savePost(bo);

          }
        }
      );
    }
  }





  /**
   * 点击提交
   */
  savePost(bo?: boolean) {
    switch (this.curNodeName) {
      case '大厅受理':
        if (!this.formDto.fileCodePrefix) {
          this.message.error('请输入必填项')
          return false;
        }
        break;

      case '业务承办人审核':
        // if ((!this.examineFormDto.fileCodePrefix || !this.examineFormDto.opinion) && this.flowPathType != 3) {
        //   this.message.error('请输入必填项')
        //   return false;
        // }
        if ((!this.examineFormDto.fileCodePrefix || !this.examineFormDto.content) && this.flowPathType != 3) {
          this.message.error('请输入必填项')
          return false;
        }
        if (this.flowPathType == 2 && !this.examineFormDto.checkDate) {
          this.message.error('请输入必填项')
          return false;
        } else {
          this.examineFormDto.checkDate = moment(timeTrans(Date.parse(this.examineFormDto.checkDate) / 1000, 'yyyy/MM/dd HH:mm:ss', '/'))
        }

        if (!this.examineFormDto.fileCodePrefix && this.flowPathType == 3) {
          this.message.error('请输入必填项')
          return false;
        } else {
          // if (!bo && !this.examineFormDto.opinion) {
          //   this.message.error('不合格需要填写意见')
          //   return false;
          // }
          if (!bo && !this.examineFormDto.content) {
            this.message.error('不合格需要填写意见')
            return false;
          }
        }
        break;
      default:
        break;
    }




    if (this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType == 3 && (!this.tenantWorkFlowInstanceDto.auditors || this.tenantWorkFlowInstanceDto.auditors.length < 1)) {
      this.message.error('转派必须选择审批人')
      return false;
    }

    // if (this.curNodeName == '业务承办人审核' && this.flowPathType != 3 && this.examineFormDto.attachment) {
    //   if (this.examineFormDto.attachment.length > 0) {
    //     if (checkArrayString(this.examineFormDto.attachment, 'status', 'uploading') != -1) {
    //       this.message.error('要上传完文件才能提交表单')
    //       return false;
    //     }
    //   }
    // }
    this.filterFileList();


    let num = bo ? 1 : 0;
    //判断是竣工备案
    if (this.flowPathType == 3 && !this.formDto.isSelect) {
      //竣工备案判断抽中或者不抽中
      num = 0
    }
    this.tenantWorkFlowInstanceDto.frow_TemplateInfo_Data = {
      Area: this.formJson.engineeringNo[this.formJson.engineeringNo.length - 1],
      IsChoose: num,
    }
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptId = this.appSession.user.organizationsId
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptFullPath = this.appSession.user.organizationsName

    // this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.details = this.curNodeName == '大厅受理' ? this.formDto.opinion : this.examineFormDto.opinion;


    if (this.examineFormDto.content) {
      this.examineFormDto.content = this.examineFormDto.content.replace(/\n/g, "\r\n");
    }
    this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.details = this.nodeAdvise;



    this.formDto.opinion = this.nodeAdvise;



    this.butNzLoading = true
    if (!bo && this.curNodeName == '业务审批负责人审批') {
      // this.noResult((data) => {
      this.tenantWorkFlowInstanceDto.backAuditedNode = {
        nodeId: this.tenantWorkFlowInstanceDto.nodeViewInfo.previousNodeId,
        nodeName: this.tenantWorkFlowInstanceDto.nodeViewInfo.previousNodeName
      }
      this._flowServices.tenant_NodeToNextNodeByNoPass(this.tenantWorkFlowInstanceDto).subscribe((data: any) => {
        this.butNzLoading = false;
        this.examineFormDto.isTransfer = this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType == 3 ? true : false
        this.examineFormDto.isPass = bo;
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
      }, error => {
        this.message.info(error.error.error.message)
        this.butNzLoading = false;
      })
    } else {
      //业务承办人审核 节点点击合格和不合格都是  走通过接口。要传参给后台用于区分
      if (this.curNodeName == '业务承办人审核') {
        this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.result = bo ? 5 : 6
      }
      this._flowServices.tenant_NodeToNextNodeByPass(this.tenantWorkFlowInstanceDto).subscribe((data: any) => {
        // this.butNzLoading = false;
        const type = this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType == 3 ? true : false
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

      }, error => {
        this.isNoResult(error.error.error.message)
        this.butNzLoading = false;
      })
    }


  };


  /**
   * 获取业务审批负责人审批详情的接口
   */
  getPrimaryExamine(then?: Function) {
    this._examineService.getPrimaryExamine(this.flowId).subscribe(data => {
      this.examineFormDto = data;

      if (this.examineFormDto.acceptFileCode)
        this.formDto.acceptFileCode = this.examineFormDto.acceptFileCode;
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
    }, error => {
      this.isNoResult(error.error.error.message)
    })
  }

  /**
   * 签收
   * @param examineFormDto
   */
  signForOpinionFile() {
    this._examineService.signForOpinionFile(this.signForDto).subscribe(data => {
      this.serveResult('签收成功')
    }, error => {
      this.isNoResult(error.error.error.message)
    })
  }

  /**
   * 业务审批负责人审批提交的接口 -->执行人后的接口
   */
  finalExamine(examineFormDto: ExamineFormDto) {
    this._examineService.finalExamine(examineFormDto).subscribe(data => {
      this.serveResult();
    }, error => {
      this.isNoResult(error.error.error.message)
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
    this.reuseTabService.close(this.reuseTabService.curUrl)
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
      } else {
        this.butNzLoading = false;
      }
    }, error => {
      this.isNoResult(error.error.error.message)
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
    }, error => {
      this.isNoResult(error.error.error.message)
    })
  }

  /**
   * 添加审批人或者转派
   */
  goChoicePerson() {
    if (!this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType) {
      this.message.error('选择指定的节点，如转派')
      return false
    }
    const title = this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType == 3 ? '转派列表' : '审核人列表'
    this.tenantWorkFlowInstanceDto.auditors = this.tenantWorkFlowInstanceDto.auditors ? this.tenantWorkFlowInstanceDto.auditors : []
    this.ModelHelp.static(
      InitiationProcessAddAuditorComponent,
      {
        title: title,
        area: this.formJson.engineeringNo[this.formJson.engineeringNo.length - 1],
        auditors: this.tenantWorkFlowInstanceDto.auditors
      }
    ).subscribe((res: any) => {
      if (res.opt) {
        this.tenantWorkFlowInstanceDto.auditors = [];
        const auditors = {
          eName: res.auditors.eName,
          eid: res.auditors.eid,
          auditType: this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType
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

  //控制驳回界面显示
  reject() {
    this.isAddProducttyepe1 = true;
  }
  //驳回界面取消
  handleCancel1(): void {

    this.isAddProducttyepe1 = false;
  }
  //驳回界面确定
  subProducttype1(bo): void {
    if (this.rejectadvices == null || this.rejectadvices == '') {
      this.message.error("驳回意见必须填写！")
      return
    }

    this.tenantWorkFlowInstanceDto.backAuditedNode = {
      nodeId: this.tenantWorkFlowInstanceDto.nodeViewInfo.previousNodeId,
      nodeName: this.tenantWorkFlowInstanceDto.nodeViewInfo.previousNodeName
    }
    this._flowServices.tenant_NodeToNextNodeByNoPass(this.tenantWorkFlowInstanceDto).subscribe((data: any) => {
      this.butNzLoading = false;
      this.examineFormDto.isTransfer = this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.applyType == 3 ? true : false
      this.examineFormDto.isPass = false;
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

      this.RejectedExamine(this.examineFormDto);
    }, error => {
      this.message.info(error.error.error.message)
      this.butNzLoading = false;
    })
    this.isAddProducttyepe1 = false;
    this.serveResult();
  }

  //驳回提交
  RejectedExamine(model) {
    let submodel: any = {};
    submodel.flowId = model.flowId;
    submodel.currentHandleUserName = model.currentHandleUserName;
    submodel.currentHandleUserCode = model.currentHandleUserCode;
    submodel.handleUserList = model.handleUserList;
    debugger
    submodel.currentNodeId = model.currentNodeId;
    submodel.currentNodeName = model.currentNodeName;
    submodel.currentHandleOrgName = model.currentHandleOrgName;
    submodel.currentHandleOrgCode = model.currentHandleOrgCode;
    submodel.nodeAuditorRecordId = model.nodeAuditorRecordId;
    submodel.workFlow_NodeRecord_Id = model.workFlow_NodeRecord_Id;
    submodel.workFlow_Instance_Id = model.workFlow_Instance_Id;
    submodel.workFlow_TemplateInfo_Id = model.workFlow_TemplateInfo_Id;
    submodel.opinion = this.rejectadvices;
    this.WorkMattersService.RejectedExamine(submodel).subscribe(
      res => {
        this.serveResult();

      },
    );
    this.rejectadvices = null;
    this.butNzLoading = false;
    this.isAddProducttyepe1 = false;
  }


}
