import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PANGBO_SERVICES_URL } from 'infrastructure/expression';

/**
 * 对接谢峰的表单接口和流程接口
 */
@Injectable()
export class UserServices {
    constructor(public http: HttpClient) { }


    /** *  * 岗位列表操作 * *  */


    /**
     * 查询岗位列表
     */

    queryStation(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/Upload/Upload", params
        );
    }
    /**
 * 添加岗位列表
 */

    addStation(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/createRoleAsync", params
        );
    }
    /**
   * 编辑岗位列表
   */

    editStation(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/updateRoleAsync", params
        );
    }
    /**
      * 编辑岗位列表
      */

    deleteStation(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/deleteRoleByIdsAsync", params
        );
    }



    /** *  * 角色列表操作 * *  */



    /**
        * 查询角色列表
        */

    queryRoles(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/Upload/Upload", params
        );
    }
    /**
 * 添加角色列表
 */

    addRoles(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/createRoleAsync", params
        );
    }
    /**
   * 编辑角色列表
   */

    editRoles(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/updateRoleAsync", params
        );
    }
    /**
      * 编辑角色列表
      */

    deleteRoles(params: any): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + "api/deleteRoleByIdsAsync", params
        );
    }



}

export interface UploadFileModel {
    files: Array<any>,
    AppId: string,
    module?: string,
    sourceId?: string,
}

