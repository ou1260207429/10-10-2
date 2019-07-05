import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_CONFIG } from 'infrastructure/expression';

/**
 * 对接谢峰的表单接口和流程接口
 */
@Injectable()
export class PublicServices {
    constructor(public http: HttpClient) { }
    /**
     * 统一上传
     */

    upload(page: any): Observable<any> {
        return this.http.post(URL_CONFIG.getInstance().REGISTER_URL + "api/Upload/Upload", page
        );
    }
    newUpload(files: any, params): Observable<any> {
        let url = "api/Upload/Upload?" + "AppId=" + params.AppId + "&module=" + params.module + "&sourceId=" + params.sourceId
        return this.http.post(URL_CONFIG.getInstance().REGISTER_URL + url, files, {
            headers: new HttpHeaders({
                responseType: 'text'
            })
        }
        );
    }
    /**
     * 获取附件信息
     */
    getFilesDetail(page: any): Observable<any> {
        let url = "api/Attachment/AttachmentListBySourceId?" + "appId=" + page.AppId + "&module=" + page.module + "&sourceId=" + page.sourceId

        return this.http.post(URL_CONFIG.getInstance().REGISTER_URL + url, page
        );

    }
    delete(page: any): Observable<any> {
        let url = "api/Attachment/Delete?" + "appId=" + page.AppId + "&id=" + page.id
        return this.http.post(URL_CONFIG.getInstance().REGISTER_URL + url, page);
    }

}

export interface UploadFileModel {
    files: Array<any>,
    AppId: string,
    module?: string,
    sourceId?: string,
}

