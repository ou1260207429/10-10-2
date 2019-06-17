import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { AttachmentServiceProxy, AttachmentDto } from '@shared/service-proxies/service-proxies';
import { NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
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
  acceptType: ".doc,.docx"
  uploadUrl: "http://demo.rjtx.net:5001/api/Upload/Upload"
  uploadParams: {
    files: [],
    AppId: "9F947774-8CB4-4504-B441-2B9AAEEAF450",
    module: "table",
    sourceId: ""
  }
  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => ~['image/png'].indexOf(w.type));
        if (filterFiles.length !== fileList.length) {
          this.msg.error(`包含文件格式不正确，只支持 png 格式`);
          return filterFiles;
        }
        return fileList;
      }
    },
    {
      name: 'async',
      fn: (fileList: UploadFile[]) => {
        return new Observable((observer: Observer<UploadFile[]>) => {
          // doing
          observer.next(fileList);
          observer.complete();
        });
      }
    }
  ];
  constructor(private _eventEmiter: EventEmiter, private message: NzMessageService, private _attachmentServiceProxy: AttachmentServiceProxy, private _activatedRoute: ActivatedRoute) {


  }
  ngOnInit() {
    this.data = new AttachmentDto();
    console.log(this.fileList)
  }
  goBack() {
    history.go(-1);
  }

  /**
   * 提交
   */
  save() {
    this.data.guid = this.createguid();
    this._attachmentServiceProxy.addAttachmentAsync(this.data).subscribe(data => {
      this.message.success("新增成功");
      this._eventEmiter.emit('init', []);
      this.goBack();
    })
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
    console.log(ret);
    return ret
  }
  beforeUpload = (file: UploadFile): boolean => {
    console.log(file)
    this.fileList = this.fileList.concat(file);
    console.log(this.fileList)
    return false;
  };
}