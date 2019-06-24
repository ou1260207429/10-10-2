import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PANGBO_SERVICES_URL } from 'infrastructure/expression';
type EntityResponseType = HttpResponse<any>;
@Injectable({
  providedIn: 'root',
})
export class UserRightService {
  constructor(private http: _HttpClient, private _http: HttpClient) {}

  //获取用户信息
  GetUserDtoList(model?: any): Observable<any> {
    return this.http.post(PANGBO_SERVICES_URL + 'api/User/GetUserDtoList', model);
  }
  login(model){
    return this.http.post(PANGBO_SERVICES_URL +'api/User/Register',model);
  }
}

/**
 * 分页类
 */
export declare class PageModel {
  public size: number;
  public page: number;
}
