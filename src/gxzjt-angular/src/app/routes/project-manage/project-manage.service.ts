import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { URLConfig } from '@shared/config/host';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<any>;
@Injectable({
  providedIn: 'root',
})
export class ProjectManageService {
  constructor(private http: _HttpClient, private _http: HttpClient) { }


   //获取使用性质
   GetPost_GetFlowFormDataList(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().SERVER_URL + '/api/services/app/ApplyService/Post_GetFlowFormData', model);
  }

}

/**
 * 分页类
 */
export declare class PageModel {
  public size: number;
  public page: number;
}
