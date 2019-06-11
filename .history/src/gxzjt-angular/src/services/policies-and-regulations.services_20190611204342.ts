
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FLOW_SERVICES_URL } from 'infrastructure/expression';

@Injectable()
export class PoliciesAndRegulationsServices {
    constructor(public http: HttpClient) { }
    /**
     * 查询政策法规列表
     */
    get_PoliciesAndRegulations(params?: any): Observable<any> { 
        console.log(params);
        return this.http.post(FLOW_SERVICES_URL + '/api/services/app/Regulation/RegulationListAsync', {
            params
        });
    }

    /**
     * 编辑政策法规
     */
    edit_PoliciesAndRegulations_NodeAuditorRecord(page?: any): Observable<any> {
        return this.http.post(FLOW_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/PendingWorkFlow_NodeAuditorRecord', page);
    }

    /**
     * 获取政策法规的详情的路径
     */
    get_PoliciesAndRegulationsDetail(Id: string): Observable<any> {
        return this.http.get(FLOW_SERVICES_URL + '/api/services/app/WorkFlowInstanceManager/getWorkFlow_NodeRecordAndAuditorRecords', {
            params: {
                Id: Id
            }
        });
    }
}