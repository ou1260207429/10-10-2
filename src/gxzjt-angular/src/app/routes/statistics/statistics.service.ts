import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLConfig } from "@shared/config/host";
type EntityResponseType = HttpResponse<any>;
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: _HttpClient, private _http: HttpClient) { }

  // //获取用户列表信息
  // GetUserDtoList(model?: any): Observable<any> {
  //   return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/GetUserDtoList', model);
  // }
  // //获取用户详细
  // Details(model?: any): Observable<any> {
  //   return this.http.get(URLConfig.getInstance().REGISTER_URL + 'api/User/Details', model);
  // }


  //项目申报列表
  GetProjectApplyList(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().SERVER_URL + 'api/services/app/StatisticalService/Post_GetProjectApplyList', model);
  }

  GetHandleLimitList(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().SERVER_URL + 'api/services/app/StatisticalService/Post_GetHandleLimitList', model);
  }
  GetTimeoutList(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().SERVER_URL + 'api/services/app/StatisticalService/Post_GetTimeoutList', model);
  }
}

/**
 * 分页类
 */
export declare class PageModel {
  public size: number;
  public page: number;
}
