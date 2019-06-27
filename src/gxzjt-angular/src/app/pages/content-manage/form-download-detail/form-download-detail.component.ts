import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttachmentServiceProxy, AttachmentDto } from '@shared/service-proxies/service-proxies';
import { NzMessageService, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { PublicServices } from 'services/public.services';
import { createguid } from 'infrastructure/regular-expression';
import { PANGBO_SERVICES_URL, AppId } from 'infrastructure/expression';
import lodash from 'lodash'

@Component({
  selector: 'app-form-download-detail',
  templateUrl: './form-download-detail.component.html',
  styleUrls: ['./form-download-detail.less']
})
export class FormDownloadDetailComponent implements OnInit {
  //表单对象
  data: any;
  fileList: any = [];
  // acceptType: ".doc,.docx,.xls,.xlsx,.pdf"
  acceptType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  uploadUrl = "http://demo.rjtx.net:5001/api/Upload/Upload"
  filesUrl: any = {}
  sourceId: string
  constructor(private _publicServices: PublicServices, private _eventEmiter: EventEmiter, private message: NzMessageService, private _attachmentServiceProxy: AttachmentServiceProxy, private _activatedRoute: ActivatedRoute) {
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
    this.data.guid = createguid();
    this.sourceId = createguid();

    this._attachmentServiceProxy.addAttachmentAsync(this.data).subscribe(data => {
      this.message.success("新增成功");
      this._eventEmiter.emit('init', []);
      this.goBack();
    })
  }
  //阻止自动上传
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = []
    this.fileList.push({
      name: file.name,
      status: 'uploading',
      tid: file.uid,
      isUpLoad: true
    })
    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    }

    const formData: any = new FormData();
    formData.append('files', file);
    this._publicServices.newUpload(formData, params).subscribe(data => {
      if (data.result == 0) {
        this.fileList[0].url = PANGBO_SERVICES_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id
        this.fileList[0].status = 'done'
        this.fileList[0].tid = data.data[0].id
        const fileList = lodash.cloneDeep(this.fileList);
        this.fileList = fileList
      } else {
        this.fileList[0].status = 'error'
        this.fileList[0].isUpLoad = false
        const fileList = lodash.cloneDeep(this.fileList);
        this.fileList = []
        this.fileList = fileList
      }
    }, error => {
      this.fileList[0].status = 'error'
      this.fileList[0].isUpLoad = false
      const fileList = lodash.cloneDeep(this.fileList);
      this.fileList = []
      this.fileList = fileList
    })
    return false;
  };
  //删除上传文件
  //删除上传文件
  removeFile = (file: UploadFile): boolean => {
    if (file.isUpLoad) {
      let params = {
        AppId: AppId,
        id: file.tid,
      }
      this._publicServices.delete(params).subscribe(data => {
        if (data.result == 0) {
          this.message.success(data.message)
        } else {
          this.message.error(data.message)
        }
      })
    }
    this.fileList = [];
    return true;
  }
}