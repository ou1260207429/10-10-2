import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ActivatedRoute } from '@angular/router';
import { ExamineServiceServiceProxy, ApplyServiceServiceProxy, ReviewFormDto, ProjectCompany, FlowDataDto, FlowNodeUser } from '@shared/service-proxies/service-proxies';
import { FlowServices, GXZJT_From } from 'services/flow.services';
import { AppSessionService } from '@shared/session/app-session.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-work-matters-review-apply',
  templateUrl: './review-apply.component.html',
})
export class WorkMattersReviewApplyComponent implements OnInit {

  reviewFormDto;
  flowType;
  applyName;
  constructor(private _activatedRoute: ActivatedRoute,
    private _applyService: ApplyServiceServiceProxy,
    private _flowServices: FlowServices,
    public appSession: AppSessionService,
    private message: NzMessageService,
    private _appSessionService: AppSessionService, ) {
    this.reviewFormDto = {};
    this.reviewFormDto.constructOrg = new ProjectCompany();
    var flowId = +this._activatedRoute.snapshot.paramMap.get('flowId');
    this.flowType = +this._activatedRoute.snapshot.paramMap.get('flowType');
    this.getReview(flowId);
  }

  ngOnInit() { }

  /**
   * 获取业务审批负责人审批详情的接口 
   */
  getReview(flowId) {
    this._applyService.getReview(flowId).subscribe(data => {
      if (data != null) {
        this.reviewFormDto = data;
      }
    });
  }

  saving = false;
  applay() {
    this.saving = true;
    var flowTypeFlag;
    if (this.flowType == 2) {
      flowTypeFlag = "xfys"+this.reviewFormDto.flowTemplateSuffix;
    } else {
      flowTypeFlag = "jgys"+this.reviewFormDto.flowTemplateSuffix;
    }
    const from: GXZJT_From = {
      frow_TemplateInfo_Data: {
        //市县区  
        Area: this.reviewFormDto.orgCode
      },
      //'xfsj,''xfys,'jgys  流程分类  英文简写(消防设计,消防验收,竣工验收)
      identify: flowTypeFlag,

      //登录的用户的id  名字  部门id  部门路径
      editWorkFlow_NodeAuditorRecordDto: {
        applyEID: this._appSessionService.user.id,
        applyEName: this._appSessionService.user.eName,
        deptId: this._appSessionService.user.organizationsId,
        deptFullPath: this._appSessionService.user.organizationsName,
      }
    };

    this._flowServices.GXZJT_StartWorkFlowInstanceAsync(from).subscribe((data: any) => {

      this.reviewFormDto.timeLimit = data.result.timeLimit
      this.reviewFormDto.flowNo = data.result.workFlow_Instance_Id
      this.reviewFormDto.currentNodeId = data.result.cur_Node_Id
      this.reviewFormDto.currentNodeName = data.result.cur_NodeName
      this.reviewFormDto.workFlow_Instance_Id = data.result.workFlow_Instance_Id
      this.reviewFormDto.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id

      this.reviewFormDto.handleUserList = [];
      data.result.auditorRecords.forEach(element => {
        const flowNodeUser = new FlowNodeUser()
        flowNodeUser.userFlowId = element.id
        flowNodeUser.userName = element.applyEName
        flowNodeUser.userCode = element.applyEID
        this.reviewFormDto.handleUserList.push(flowNodeUser)
      });

      this._applyService.reviewApply(this.reviewFormDto).subscribe(data => {
        this.message.success('提交成功')
        this.saving = false;
        history.go(-1)
      })
    }, (error) => {
      this.message.info(error.error.error.message);
      this.saving = false;
    })

  }
}

