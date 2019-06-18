import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PANGBO_SERVICES_URL } from 'infrastructure/expression';

/**
 * 对接谢峰的表单接口和流程接口
 */
@Injectable()
export class PublicServices {
    constructor(public http: HttpClient) { }
    /**
     * 统一上传
     */
    upload(page: UploadFileModel): Observable<any> {
        return this.http.post(PANGBO_SERVICES_URL + 'api/Upload/Upload', page,
        {
           Content-Typ:" application/x-www-form-urlencoded; charset=UTF-8  ",
        }
        );
    }

}

export interface UploadFileModel {
    files: Array<any>,
    AppId?: string,
    module?: string,
    sourceId?: string,
}

