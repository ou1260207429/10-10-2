import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { FlowServices } from 'services/flow.services';

/**
 * 流程不通过弹窗
 */
@Component({
  selector: 'app-flow-process-reject',
  templateUrl: './flow-process-reject.component.html',
  styles: []
})
export class FlowProcessRejectComponent implements OnInit {

  //选中的
  radioValue

  data

  tenantWorkFlowInstanceDto
  constructor(private _flowServices: FlowServices, private subject: NzModalRef, private message: NzMessageService) { }

  ngOnInit() {
    this._flowServices.getAuditedNodeRecords(this.tenantWorkFlowInstanceDto.workFlow_InstanceId).subscribe((data: any) => {
      this.data = data.result
    })
  }

  close() {
    this.subject.destroy(true)
  }


  save() {
    if (!this.radioValue) {
      this.message.success('请选择一个节点');
      return false
    }
    this.tenantWorkFlowInstanceDto.backAuditedNode = this.data[this.radioValue];
    const turnBack = {
      backAuditedNode: this.data[this.radioValue],
      editWorkFlow_NodeAuditorRecordDto: this.tenantWorkFlowInstanceDto.editWorkFlow_NodeAuditorRecordDto,
      workFlow_InstanceId: this.tenantWorkFlowInstanceDto.workFlow_InstanceId,
      workFlow_TemplateInfoId: this.tenantWorkFlowInstanceDto.workFlow_TemplateInfoId
    }
    this._flowServices.tenant_NodeToNextNodeByNoPass(turnBack).subscribe(data => {
      this.subject.destroy(false)
    })
  }
}
