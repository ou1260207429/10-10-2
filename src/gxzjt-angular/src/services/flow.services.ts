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
        return this.http.post(FLOW_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/ProcessedWorkFlow_NodeAuditorRecord', page);
    }

    /**
     * 查询待办流程
     */
    tenant_PendingWorkFlow_NodeAuditorRecord(page?: any): Observable<any> {
        return this.http.post(FLOW_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/PendingWorkFlow_NodeAuditorRecord', page);
    }

    /**
     * 获取已办流程的详情的路径
     */
    getWorkFlow_NodeRecordAndAuditorRecords(Id: string): Observable<any> {
        return this.http.get(FLOW_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/getWorkFlow_NodeRecordAndAuditorRecords', {
            params: {
                Id: Id
            }
        });
    }

    GXZJT_StartWorkFlowInstanceAsync(data: GXZJT_From) {
        return this.http.post(XIEFENG_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/GXZJT_StartWorkFlowInstanceAsync', data);
    }
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
    deptId: number,

    //部门路径
    deptFullPath: string,
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