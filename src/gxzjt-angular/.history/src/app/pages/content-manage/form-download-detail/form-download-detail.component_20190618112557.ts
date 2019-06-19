import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttachmentServiceProxy, AttachmentDto } from '@shared/service-proxies/service-proxies';
import { NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-form-download-detail',
  templateUrl: './form-download-detail.component.html',
  styleUrls: ['./form-download-detail.less']
})
export class FormDownloadDetailComponent implements OnInit {
  //表单对象
  data: any;
  fileList: UploadFile[] = [];
  // acceptType: ".doc,.docx,.xls,.xlsx,.pdf"
  acceptType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  uploadUrl= "http://demo.rjtx.net:5001/api/Upload/Upload"
  uploadParams = {
    files: [],
    AppId: "9F947774-8CB4-4504-B441-2B9AAEEAF450",
    module: "table",
    sourceId: ""
  }
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['application/vnd.openxmlformats-officedocument.wordprocessingml.document'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          this.message.error("上传文件格式不正确，请选择.doc文件");
          return filterFiles;
        }
        return fileList;
      }
    },
  ];
  constructor(private http: HttpClient, private _eventEmiter: EventEmiter, private message: NzMessageService, private _attachmentServiceProxy: AttachmentServiceProxy, private _activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.data = new AttachmentDto();
  }
  goBack() {
    history.go(-1);
  }

  /**
   * 提交
   */
  save() {
    this.data.guid = this.createguid();
    this.uploadParams.sourceId = this.createguid();
    this.uploadParams.files = this.fileList;
    this.uploadFiles();
    // this._attachmentServiceProxy.addAttachmentAsync(this.data).subscribe(data => {
    //   this.message.success("新增成功");
    //   this._eventEmiter.emit('init', []);
    //   this.goBack();
    // })
  }
  /**
   * 上传文件
   */
  uploadFiles() {
    const req = new HttpRequest('POST', "http://demo.rjtx.net:5001/api/Upload/Upload", this.uploadParams, {
      // reportProgress: true
    });
    console.log(req)
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (req) => {
          console.log(req)
          //this.fileList = [];
        },
        () => {
        }
      );

  }
  createguid() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var chars = CHARS,
      uuid = [],
      i
    // rfc4122, version 4 form
    var r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }

    var ret = uuid.join('')
    return ret
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    console.log(file)
    return false;
  };
}