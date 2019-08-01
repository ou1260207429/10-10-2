import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLConfig } from "@shared/config/host";
type EntityResponseType = HttpResponse<any>;
@Injectable({
  providedIn: 'root',
})
export class WorkMattersService {
  constructor(private http: _HttpClient, private _http: HttpClient) { }

  // //获取用户列表信息
  // GetUserDtoList(model?: any): Observable<any> {
  //   return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/GetUserDtoList', model);
  // }
  // //获取用户详细
  // Details(model?: any): Observable<any> {
  //   return this.http.get(URLConfig.getInstance().REGISTER_URL + 'api/User/Details', model);
  // }

  //获取市县级联
  GetAreaDropdown(model?: any): Observable<any> {
    // api/User/Delete?id=
    return this.http.get(URLConfig.getInstance().SERVER_URL + 'api/services/app/Home/GetAreaDropdown');
  }
  //获取市县级联
  GetHandlingMatters(model?: any): Observable<any> {
    // api/User/Delete?id=
    return this.http.post(URLConfig.getInstance().SERVER_URL + 'api/services/app/WorkFlowed/HandlingMatters', model);
  }

  //获取市县级联
  RejectedExamine(model?: any): Observable<any> {
    // api/User/Delete?id=
    return this.http.post(URLConfig.getInstance().SERVER_URL + 'api/services/app/ExamineService/RejectedExamine', model);
  }
  //代办
  PendingWorkFlow_NodeAuditorRecord(model?: any): Observable<any> {
  // api/User/Delete?id=
  return this.http.post(URLConfig.getInstance().SERVER_URL + '/api/services/app/WorkFlowed/PendingWorkFlow_NodeAuditorRecord', model);
}

  //代办
  ProcessedWorkFlow_NodeAuditorRecord(model?: any): Observable<any> {
    // api/User/Delete?id=
    return this.http.post(URLConfig.getInstance().SERVER_URL + '/api/services/app/WorkFlowed/ProcessedWorkFlow_NodeAuditorRecord', model);
  }

}

/**
 * 分页类
 */
export declare class PageModel {
  public size: number;
  public page: number;
}
