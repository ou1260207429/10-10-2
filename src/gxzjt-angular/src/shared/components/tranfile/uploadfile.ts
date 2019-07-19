import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadXHRArgs, UploadFile, NzMessageService } from 'ng-zorro-antd';
// import { forkJoin } from 'rxjs';
import { Observable, Observer } from 'rxjs';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { URLConfig } from "@shared/config/host";

import { createguid } from 'infrastructure/regular-expression';
import { AppId } from 'infrastructure/expression';

@Component({
    selector: 'nz-rj-upload-file',
    template: `
    <nz-upload [nzAction]="uploadUrl" [nzCustomRequest]="customReq"  [nzRemove]="remove" nzMultiple="true" [nzBeforeUpload]="beforeUpload" [(nzFileList)]="fileList">
      <button nz-button><i nz-icon type="upload"></i><span>点击上传</span></button>
    </nz-upload>
  `,

})
export class UploadFileComponent {
    constructor(private http: HttpClient,
        private msg: NzMessageService,
        private _tokenService: TokenService) { }


    @Output()
    fileList: any;


    @Output() fileListChange = new EventEmitter();



    onChange(value) {
        this.fileListChange.emit(value);
    }


    @Input()
    nzFileType = "";


    @Input()
    errMsg = "";

    @Input()
    beforeUpload = (file: File) => {

        if (this.nzFileType != "" && this.nzFileType !== file.type) {
            this.msg.error(this.errMsg);
            return false;
        }

        return true;

    };


    @Input()
    public uploadUrl = '';

    @Output()
    customReq = (item: UploadXHRArgs) => {
        // 构建一个 FormData 对象，用于存储文件或其他参数
        const formData = new FormData();

        formData.append('files', item.file as any);
        // formData.append('AppId', '9F947774-8CB4-4504-B441-2B9AAEEAF450');
        // formData.append('module', this.module);
        // formData.append('sourceId', this.sourceId);

        var header = new HttpHeaders();
        header.set(
            "Content-Type", "multipart/form-data");
        header.set('Authorization', 'Bearer ' + this._tokenService.getToken());
        let params = {
            sourceId: createguid(),
            AppId: AppId,
            module: "table",
        };

        if (this.uploadUrl == '') {
            this.uploadUrl == "api/Upload/Upload?" + "AppId=" + params.AppId + "&module=" + params.module + "&sourceId=" + params.sourceId;

        }

        const req = new HttpRequest('post', this.uploadUrl, formData, {
            headers: header,
            reportProgress: true,
            withCredentials: true
        });



        // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
        return this.http.request(req).subscribe(
            (event: HttpEvent<{}>) => {
                if (event.type === HttpEventType.UploadProgress) {
                    if (event.total! > 0) {
                        // tslint:disable-next-line:no-any
                        (event as any).percent = (event.loaded / event.total!) * 100;
                    }
                    // 处理上传进度条，必须指定 `percent` 属性来表示进度
                    item.onProgress!(event, item.file!);
                } else if (event instanceof HttpResponse) {



                    // 处理成功
                    item.onSuccess!(event.body, item.file!, event);

                }
            },
            err => {
                // 处理失败
                item.onError!(err, item.file!);
            }
        );
    };

    @Input()
    remove = (file: UploadFile) => {
        // console.log(file);
        if (file.error) {
            return true;
        }
        return true;
    }

}