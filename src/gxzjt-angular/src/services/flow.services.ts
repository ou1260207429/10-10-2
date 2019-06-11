import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FLOW_SERVICES_URL } from 'infrastructure/expression';

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
}