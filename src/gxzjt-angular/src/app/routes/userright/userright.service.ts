import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLConfig } from "@shared/config/host";
type EntityResponseType = HttpResponse<any>;
@Injectable({
  providedIn: 'root',
})
export class UserRightService {
  constructor(private http: _HttpClient, private _http: HttpClient) { }

  //获取用户列表信息
  GetUserDtoList(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/GetUserDtoList', model);
  }
  //获取用户详细
  Details(model?: any): Observable<any> {
    return this.http.get(URLConfig.getInstance().REGISTER_URL + 'api/User/Details', model);
  }
  //获取岗位下拉数据
  Position(): Observable<any> {
    return this.http.get(URLConfig.getInstance().REGISTER_URL + 'api/Position/DropDownData');
  }
  //获取岗位下拉数据
  Role(): Observable<any> {
    return this.http.get(URLConfig.getInstance().REGISTER_URL + 'api/Role/DropDownData');
  }
  //添加用户
  Add(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/Add', model);
  }
  //编辑用户
  Edit(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/Edit', model);
  }
  //锁定用户
  Lock(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/Lock', model);
  }
  //获取组织框架树
  GetTreeData(model?: any): Observable<any> {
    return this.http.get(URLConfig.getInstance().REGISTER_URL + 'api/Organizations/GetTreeData', model);
  }
  //重置密码
  ResetPassword(model?: any): Observable<any> {
    return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/ResetPassword', model);
  }
    //重置密码
  Delete(model?: any): Observable<any> {
    // api/User/Delete?id=
      return this.http.post(URLConfig.getInstance().REGISTER_URL + 'api/User/Delete', model,model);
    }
   //获取市县级联
  GetAreaDropdown(model?: any): Observable<any> {
    // api/User/Delete?id=
      return this.http.get(URLConfig.getInstance().SERVER_URL+ 'api/services/app/Home/GetAreaDropdown');
    }
}

/**
 * 分页类
 */
export declare class PageModel {
  public size: number;
  public page: number;
}
