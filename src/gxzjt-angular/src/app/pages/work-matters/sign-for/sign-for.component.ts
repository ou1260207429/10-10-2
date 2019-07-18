import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ActivatedRoute } from '@angular/router';
import { ExamineServiceServiceProxy, ExamineFormDto, FlowNodeUser, SignForDto } from '@shared/service-proxies/service-proxies';
import { WorkFlow, FlowServices } from 'services/flow.services';
import { AppSessionService } from '@shared/session/app-session.service';
import { NzMessageService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';


//签收
@Component({
    selector: 'app-work-matters-sign-for',
    templateUrl: './sign-for.component.html',
})
export class SignForComponent implements OnInit {

    signForDto=new SignForDto();
    examineFormDto 
    workFlowData;
    srcUrl:any;

    constructor(private http: _HttpClient, private modal: ModalHelper,
        private _activatedRoute: ActivatedRoute,
        private _examineService: ExamineServiceServiceProxy,
        private _flowServices: FlowServices,
        public appSession: AppSessionService,
        private message: NzMessageService,
        public _appSessionService: AppSessionService,
        private sanitizer: DomSanitizer) {
        //this.signForDto = new SignForDto();
        this.srcUrl={};
        this.signForDto.flowId = +this._activatedRoute.snapshot.paramMap.get('flowId');
        this.getPrimaryExamine(this.signForDto.flowId);
    }

    ngOnInit() { }

    /**
   * 获取业务审批负责人审批详情的接口 
   */
    getPrimaryExamine(flowId) {
        this._examineService.getPrimaryExamine(flowId).subscribe(data => {
            if (data != null) {
                this.examineFormDto = data;
                this.srcUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.examineFormDto.opinionFileUrl);
            }
        });
    }

    signForOrg() {
        const workFlow: WorkFlow = {
            workFlow_InstanceId: this.examineFormDto.workFlow_Instance_Id,
            workFlow_TemplateInfoId: 10171,
            workFlow_NodeAuditorRecordId: this.examineFormDto.flowNodeUserInfo.userFlowId,
        }

        this._flowServices.tenant_GetWorkFlowInstanceFrowTemplateInfoById(workFlow).subscribe(data => {

            var tenantWorkFlowInstanceDto;
            tenantWorkFlowInstanceDto = data; 
            tenantWorkFlowInstanceDto.workFlow_InstanceId = this.examineFormDto.workFlow_Instance_Id;

            tenantWorkFlowInstanceDto.frow_TemplateInfo_Data = {
                Area: this.examineFormDto.engineeringNo[this.examineFormDto.engineeringNo.length-1],
                IsChoose: 0,
                editWorkFlow_NodeAuditorRecordDto: {
                    deptId: this._appSessionService.user.organizationsId,
        deptFullPath: this._appSessionService.user.organizationsName,
                }
            }
            tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptId = this.appSession.user.organizationsId
            tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto.deptFullPath = this.appSession.user.organizationsName

            this._flowServices.tenant_NodeToNextNodeByPass(tenantWorkFlowInstanceDto).subscribe((data: any) => {
                this._examineService.signForOpinionFile(this.signForDto).subscribe(data=>{
                    this.message.success('签收成功');
                });
            }, (error) => {
                this.message.info(error.error.error.message) 
              });

        });
    }

}
