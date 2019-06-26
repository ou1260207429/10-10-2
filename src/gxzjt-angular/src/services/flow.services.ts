import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FLOW_SERVICES_URL, XIEFENG_SERVICES_URL } from 'infrastructure/expression';

/**
 * 对接谢峰的表单接口和流程接口
 */
@Injectable()
export class FlowServices {
  constructor(public http: HttpClient) { }
  /**
   * 查询已办流程
   */
  tenant_ProcessedWorkFlow_NodeAuditorRecord(page?: any): Observable<any> {
    return this.http.post(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/ProcessedWorkFlow_NodeAuditorRecord', page);
  }

  /**
   * 查询待办流程
   */
  pendingWorkFlow_NodeAuditorRecord(page?: any): Observable<any> {
    return this.http.post(FLOW_SERVICES_URL + '/api/services/app/WorkFlowed/PendingWorkFlow_NodeAuditorRecord', page);
  }

  /**
   * 获取已办流程的详情的路径
   */
  getWorkFlow_NodeRecordAndAuditorRecords(Id: string): Observable<any> {
    return this.http.get(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/getWorkFlow_NodeRecordAndAuditorRecords', {
      params: {
        Id: Id
      }
    });
  }

  /**
   * 获取待办的详情
   */
  tenant_GetWorkFlowInstanceFrowTemplateInfoById(data: WorkFlow) {
    return this.http.post(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/Tenant_GetWorkFlowInstanceFrowTemplateInfoById', data);
  }

  /**
   * 通过操作
   */
  tenant_NodeToNextNodeByPass(data: any) {
    return this.http.post(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/Tenant_NodeToNextNodeByPass', data);
  }

  /**
   * 不通过操作
   */
  tenant_NodeToNextNodeByNoPass(data: any) {
    return this.http.post(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/Tenant_NodeToNextNodeByNoPass', data);
  }

  /**
   * 不通过的操作要选择指定的节点
   */
  getAuditedNodeRecords(id) {
    return this.http.get(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/GetAuditedNodeRecords', {
      params: {
        Id: id
      }
    });
  }

  /**
   * 撤销接口
   * @param data  参数
   */
  tenant_NodeToNextNodeByCancel(data: GXZJT_From) {
    return this.http.post(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/Tenant_NodeToNextNodeByCancel', data);
  }

  GXZJT_StartWorkFlowInstanceAsync(data: GXZJT_From) {
    return this.http.post(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/GXZJT_StartWorkFlowInstanceAsync', data);
  }
}

export interface WorkFlow {
  workFlow_TemplateInfoId?: string | number,
  workFlow_InstanceId: string | number,
  workFlow_NodeAuditorRecordId: string | number,
}


export interface GXZJT_From {
  //表单对象
  frow_TemplateInfo_Data: any

  //identify： 'xfsj,''xfys,'jgys  流程分类  英文简写(消防设计,消防验收,竣工验收)
  identify: string,
  editWorkFlow_NodeAuditorRecordDto: GXZJT_EditWorkFlow_NodeAuditorRecordDto,
  auditors?: GXZJT_Auditors[],
}

export interface GXZJT_EditWorkFlow_NodeAuditorRecordDto {
  //用户EID
  applyEID: string,

  //用户name
  applyEName: string,

  //部门id
  deptId: string,

  //部门路径
  deptFullPath: string,

  //备注
  details?: string
}

export interface GXZJT_Auditors {
  id: number,
  depId: number,
  deptFullPath: string,
  eid: string,
  eName: string
}

/**
export const t = {

    "frow_TemplateInfo_Data": {},


    "identify": "string",

    //
    "editWorkFlow_NodeAuditorRecordDto": {

        //用户EID
        "applyEID": "string",

        //用户name
        "applyEName": "string",

        //部门id
        "deptId": 0,

        //部门路径
        "deptFullPath": "string",

    },

    //保留
    "auditors": [
        {
            "id": 0,
            "depId": 0,
            "deptFullPath": "string",
            "eid": "string",
            "eName": "string"
        }
    ]
}
*/
